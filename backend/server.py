from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
from dotenv import load_dotenv
from pathlib import Path
import os
import logging
import uuid
from bson import ObjectId

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Yathish CM Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Pydantic Models
class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr = Field(..., description="Valid email address")
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)

class ContactMessageResponse(BaseModel):
    id: str = Field(..., description="Message ID")
    name: str
    email: str
    subject: str
    message: str
    created_at: datetime
    status: str = "new"

class ContactSubmissionResponse(BaseModel):
    success: bool
    message: str
    id: Optional[str] = None

class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Yathish CM Portfolio API - F1 Themed", "version": "1.0.0"}

@api_router.post("/contact", response_model=ContactSubmissionResponse)
async def submit_contact_form(contact_data: ContactMessageCreate):
    """Submit a contact form message"""
    try:
        # Create contact message document
        contact_doc = {
            "_id": str(uuid.uuid4()),
            "name": contact_data.name.strip(),
            "email": contact_data.email.lower().strip(),
            "subject": contact_data.subject.strip(),
            "message": contact_data.message.strip(),
            "created_at": datetime.utcnow(),
            "status": "new"
        }
        
        # Insert into database
        await db.contact_messages.insert_one(contact_doc)
        
        return ContactSubmissionResponse(
            success=True,
            message="Thank you for reaching out! I'll get back to you soon.",
            id=contact_doc["_id"]
        )
        
    except Exception as e:
        logging.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to submit contact form. Please try again later."
        )

@api_router.get("/contact/messages", response_model=List[ContactMessageResponse])
async def get_contact_messages():
    """Get all contact messages (admin endpoint)"""
    try:
        messages = await db.contact_messages.find().sort("created_at", -1).to_list(100)
        
        response_messages = []
        for msg in messages:
            response_messages.append(ContactMessageResponse(
                id=msg["_id"],
                name=msg["name"],
                email=msg["email"],
                subject=msg["subject"],
                message=msg["message"],
                created_at=msg["created_at"],
                status=msg.get("status", "new")
            ))
        
        return response_messages
        
    except Exception as e:
        logging.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch messages")

@api_router.put("/contact/messages/{message_id}/status")
async def update_message_status(message_id: str, status: str):
    """Update contact message status"""
    if status not in ["new", "read", "replied"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    try:
        result = await db.contact_messages.update_one(
            {"_id": message_id},
            {"$set": {"status": status, "updated_at": datetime.utcnow()}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Message not found")
        
        return {"success": True, "message": f"Status updated to {status}"}
        
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error updating message status: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update message status")

# Legacy endpoints for compatibility
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
