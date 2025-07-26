import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Github, Play, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { mockData } from '../mock';

const Projects = () => {
  const { projects } = mockData;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Self-Initiated':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'In Progress':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'Concept':
        return <AlertCircle className="w-4 h-4 text-blue-400" />;
      default:
        return <Play className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Self-Initiated':
        return 'border-green-600/30 text-green-400 bg-green-600/10';
      case 'In Progress':
        return 'border-yellow-600/30 text-yellow-400 bg-yellow-600/10';
      case 'Concept':
        return 'border-blue-600/30 text-blue-400 bg-blue-600/10';
      default:
        return 'border-gray-600/30 text-gray-400 bg-gray-600/10';
    }
  };

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Racing Projects
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Motorsport-driven data analysis and performance optimization projects
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="bg-black/50 border-gray-800 hover:border-red-600/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/10 overflow-hidden group">
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className={`flex items-center space-x-1 ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)}
                    <span className="text-xs font-medium">{project.status}</span>
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-white text-xl group-hover:text-red-400 transition-colors duration-200">
                  {project.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-400 leading-relaxed">
                  {project.description}
                </p>

                {/* Tools/Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, index) => (
                    <Badge key={index} variant="outline" className="border-red-600/30 text-red-400 text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    size="sm" 
                    className="bg-red-600 hover:bg-red-700 text-white flex-1 transition-all duration-200 hover:shadow-lg hover:shadow-red-600/25"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white flex-1"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Projects Section */}
        <div className="mt-16 text-center">
          <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-4">More Projects Coming Soon</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Currently working on advanced F1 telemetry analysis tools and machine learning models for race strategy optimization. 
              Follow my GitHub for the latest updates.
            </p>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2"
              onClick={() => window.open('https://github.com/Yathishcm', '_blank')}
            >
              <Github className="w-4 h-4 mr-2" />
              Follow on GitHub
            </Button>
          </div>
        </div>

        {/* Racing-inspired separator */}
        <div className="mt-16 flex justify-center">
          <div className="relative">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;