import React from 'react';
import { Separator } from "./ui/separator";
import { Heart, Zap, Github, Linkedin, Mail } from "lucide-react";
import { mockData } from '../mock';

const Footer = () => {
  const { personalInfo } = mockData;
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: personalInfo.github,
      label: "GitHub"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: personalInfo.linkedin,
      label: "LinkedIn"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: `mailto:${personalInfo.email}`,
      label: "Email"
    }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black border-t border-gray-800">
      {/* Racing stripe */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-white to-red-600"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Yathish C M</h3>
                <p className="text-gray-400">Motorsport Data Analyst</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Passionate about combining motorsport enthusiasm with cutting-edge data analysis 
              to drive performance optimization and strategic decision-making in racing.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-all duration-200 hover:scale-110"
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-red-400 transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Get In Touch</h4>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">{personalInfo.location}</p>
              <a 
                href={`mailto:${personalInfo.email}`}
                className="text-gray-400 hover:text-red-400 transition-colors duration-200 text-sm block"
              >
                {personalInfo.email}
              </a>
              <a 
                href={`tel:${personalInfo.phone}`}
                className="text-gray-400 hover:text-red-400 transition-colors duration-200 text-sm block"
              >
                {personalInfo.phone}
              </a>
            </div>
            
            {/* Availability Status */}
            <div className="mt-4 inline-flex items-center px-3 py-1 bg-green-600/10 border border-green-600/20 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-green-400 text-xs font-medium">Available for Projects</span>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center text-gray-400 text-sm">
            <span>© {currentYear} Yathish C M. Made with</span>
            <Heart className="w-4 h-4 text-red-500 mx-1" />
            <span>and passion for motorsports</span>
          </div>
          
          <div className="flex items-center text-gray-400 text-sm space-x-4">
            <span>Powered by React & FastAPI</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;