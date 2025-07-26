import React from 'react';
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Target, Zap, Code, BarChart3 } from "lucide-react";
import { mockData } from '../mock';

const About = () => {
  const { professionalSummary, technicalProficiency } = mockData;

  const highlights = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Motorsport Focus",
      description: "Specialized in F1 telemetry analysis and race strategy optimization"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Technical Skills",
      description: "Strong foundation in Python, data structures, and algorithms"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Data Analytics",
      description: "Experience with data visualization and performance analysis tools"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "High Performance",
      description: "Ready to contribute to high-performance teams and environments"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Passionate about the intersection of motorsports and technology
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Professional Summary */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Professional Summary</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {professionalSummary}
            </p>

            {/* Technical Proficiency */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-white">Languages & Tools</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-red-400 font-medium">Languages:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {technicalProficiency.languages.map((lang, index) => (
                      <Badge key={index} variant="outline" className="border-red-600/30 text-red-400">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-red-400 font-medium">Tools:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {technicalProficiency.tools.slice(0, 6).map((tool, index) => (
                      <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-red-400 font-medium">Platforms:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {technicalProficiency.platforms.map((platform, index) => (
                      <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="bg-black/50 border-gray-800 hover:border-red-600/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/10">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-red-600/10 rounded-lg flex items-center justify-center text-red-400 mr-4">
                      {highlight.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-white">{highlight.title}</h4>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Racing-inspired divider */}
        <div className="mt-16 flex items-center justify-center">
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-red-600 rounded-full"></div>
            <div className="w-4 h-4 bg-white rounded-full"></div>
            <div className="w-4 h-4 bg-red-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;