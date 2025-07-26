import React from 'react';
import { Button } from "./ui/button";
import { ArrowRight, Download, MapPin, Mail, Phone } from "lucide-react";
import { mockData } from '../mock';

const Hero = () => {
  const { personalInfo, professionalSummary } = mockData;

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen bg-black relative overflow-hidden">
      {/* Racing stripes background */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-gradient-to-br from-red-600/20 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-white to-red-600"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-6rem)]">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-full">
                <div className="w-2 h-2 bg-red-600 rounded-full mr-2 animate-pulse"></div>
                <span className="text-red-400 text-sm font-medium">Available for Opportunities</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                {personalInfo.name}
              </h1>
              
              <h2 className="text-xl lg:text-2xl text-gray-300 font-medium">
                {personalInfo.title}
              </h2>
              
              <div className="flex items-center text-gray-400 space-x-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-red-400" />
                  <span>{personalInfo.location}</span>
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
              {professionalSummary}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection('#projects')}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md text-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-red-600/25 hover:scale-105"
              >
                View My Work
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-3 rounded-md text-lg font-medium transition-all duration-200"
              >
                <Download className="mr-2 w-5 h-5" />
                Download CV
              </Button>
            </div>

            {/* Quick Contact */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-800">
              <a 
                href={`mailto:${personalInfo.email}`}
                className="flex items-center text-gray-400 hover:text-red-400 transition-colors duration-200"
              >
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">{personalInfo.email}</span>
              </a>
              <a 
                href={`tel:${personalInfo.phone}`}
                className="flex items-center text-gray-400 hover:text-red-400 transition-colors duration-200"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">{personalInfo.phone}</span>
              </a>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-red-600/20 shadow-2xl">
                <img 
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Racing elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-600 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-white rounded-full"></div>
              
              {/* Speed lines */}
              <div className="absolute top-1/2 -left-20 w-16 h-0.5 bg-gradient-to-r from-transparent to-red-600/60 transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 -left-16 w-12 h-0.5 bg-gradient-to-r from-transparent to-red-600/40 transform -translate-y-1/2 mt-2"></div>
              <div className="absolute top-1/2 -left-14 w-8 h-0.5 bg-gradient-to-r from-transparent to-red-600/20 transform -translate-y-1/2 mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;