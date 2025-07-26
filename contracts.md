# API Contracts & Integration Protocol

## Overview
This document outlines the API contracts and integration plan for Yathish C M's F1-themed portfolio website.

## Current Mock Data Structure

### Personal Information
- **Location**: `mock.js` - `personalInfo` object
- **Contains**: Name, title, location, contact details, profile image
- **Status**: Static data - no backend integration needed

### Professional Summary
- **Location**: `mock.js` - `professionalSummary` string
- **Status**: Static content - no backend integration needed

### Education & Skills
- **Location**: `mock.js` - `education`, `skills`, `technicalProficiency` objects
- **Status**: Static data - no backend integration needed

### Projects
- **Location**: `mock.js` - `projects` array
- **Status**: Static data - potential for future CRUD operations

### Certifications & Achievements
- **Location**: `mock.js` - `certifications`, `achievements` arrays
- **Status**: Static data - no immediate backend needs

### Motorsport Gallery
- **Location**: `mock.js` - `motorsportGallery` array
- **Status**: Static data - no backend integration needed

## Backend Implementation Plan

### 1. Contact Form API
**Endpoint**: `POST /api/contact`

**Request Body**:
```json
{
  "name": "string",
  "email": "string", 
  "subject": "string",
  "message": "string"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Message sent successfully",
  "id": "contact_id"
}
```

**MongoDB Model**: `ContactMessage`
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: Date,
  status: String // 'new', 'read', 'replied'
}
```

### 2. Contact Messages Management API
**Endpoint**: `GET /api/contact/messages`
- **Purpose**: Retrieve all contact messages for admin review
- **Auth**: Basic admin authentication (future enhancement)

**Endpoint**: `PUT /api/contact/messages/:id/status`
- **Purpose**: Update message status (mark as read/replied)

### 3. Website Analytics API (Optional)
**Endpoint**: `POST /api/analytics/visit`
- **Purpose**: Track page visits and user interactions
- **Data**: Page views, time spent, interaction events

## Frontend Integration Changes

### Contact Form Component (`/frontend/src/components/Contact.jsx`)

**Current Mock Behavior**:
```javascript
// Simulates form submission with setTimeout
setTimeout(() => {
  toast({ title: "Message Sent!", description: "Thank you for reaching out..." });
  setFormData({ name: '', email: '', subject: '', message: '' });
  setIsSubmitting(false);
}, 1000);
```

**Backend Integration**:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const response = await axios.post(`${API}/contact`, formData);
    if (response.data.success) {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon!"
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to send message. Please try again.",
      variant: "destructive"
    });
  } finally {
    setIsSubmitting(false);
  }
};
```

## Database Schema

### Contact Messages Collection
```javascript
{
  _id: ObjectId,
  name: String (required, max: 100),
  email: String (required, email format),
  subject: String (required, max: 200),
  message: String (required, max: 2000),
  createdAt: Date (default: Date.now),
  status: String (enum: ['new', 'read', 'replied'], default: 'new'),
  ipAddress: String (optional, for spam protection),
  userAgent: String (optional, for analytics)
}
```

### Indexes
- `createdAt: -1` (for chronological sorting)
- `status: 1` (for filtering by status)
- `email: 1` (for searching by sender)

## Validation Rules

### Frontend Validation
- **Name**: Required, 2-100 characters, no special characters except spaces and hyphens
- **Email**: Required, valid email format
- **Subject**: Required, 5-200 characters
- **Message**: Required, 10-2000 characters

### Backend Validation
- Same as frontend + server-side email format validation
- Rate limiting: Max 5 submissions per IP per hour
- Spam protection: Basic keyword filtering

## Error Handling

### Frontend Error States
1. **Network Error**: "Failed to send message. Please check your connection."
2. **Validation Error**: Display specific field errors
3. **Rate Limit**: "Too many requests. Please try again later."
4. **Server Error**: "Something went wrong. Please try again."

### Backend Error Responses
```javascript
// Validation Error (400)
{ success: false, message: "Validation failed", errors: [...] }

// Rate Limit Error (429) 
{ success: false, message: "Too many requests", retryAfter: 3600 }

// Server Error (500)
{ success: false, message: "Internal server error" }
```

## Testing Strategy

### Backend Testing
1. **Contact Form Submission**: Valid data creates database record
2. **Validation**: Invalid data returns appropriate errors
3. **Rate Limiting**: Multiple requests from same IP are blocked
4. **Database Operations**: Messages are stored and retrievable

### Frontend Integration Testing
1. **Form Submission**: Success shows toast and clears form
2. **Error Handling**: Network errors show appropriate messages
3. **Loading States**: Submit button shows loading during request
4. **Form Validation**: Client-side validation prevents invalid submissions

## Security Considerations

### Input Sanitization
- HTML escaping for all text inputs
- Email validation using proper regex
- Message length limits to prevent large payloads

### Rate Limiting
- IP-based rate limiting (5 requests/hour)
- Consider implementing CAPTCHA for additional protection

### Data Privacy
- No sensitive data collection beyond contact information
- Consider adding privacy policy compliance

## Deployment Notes

### Environment Variables
- `MONGO_URL`: Already configured
- `DB_NAME`: Already configured
- Optional: `ADMIN_EMAIL` for forwarding contact messages

### Future Enhancements
1. **Email Notifications**: Send email alerts for new contact messages
2. **Admin Panel**: Web interface to manage contact messages
3. **Analytics Dashboard**: Track website performance and user engagement
4. **Project Management**: CRUD operations for projects and skills

## Integration Timeline

1. **Phase 1**: Implement contact form API and database models
2. **Phase 2**: Update frontend contact form to use backend API
3. **Phase 3**: Add error handling and validation
4. **Phase 4**: Test complete contact form functionality
5. **Phase 5**: Optional enhancements (email notifications, admin panel)

---

## Notes
- All other sections (About, Skills, Projects, Education) remain static as they represent portfolio content
- Contact form is the primary dynamic feature requiring backend integration
- Future expansions could include blog functionality or project showcases with admin management