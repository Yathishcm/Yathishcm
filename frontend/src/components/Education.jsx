import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { GraduationCap, Calendar, MapPin, BookOpen, Award, Trophy } from "lucide-react";
import { mockData } from '../mock';

const Education = () => {
  const { education, certifications, achievements } = mockData;

  return (
    <section id="education" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Education & Achievements
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Academic foundation and continuous learning journey
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div className="space-y-8">
            <Card className="bg-gray-900/50 border-gray-800 hover:border-red-600/30 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-white text-2xl">
                  <div className="w-12 h-12 bg-red-600/10 rounded-lg flex items-center justify-center text-red-400 mr-4">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-black/30 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-xl font-bold text-white mb-2">{education.degree}</h3>
                  <div className="flex flex-col space-y-2 mb-4">
                    <div className="flex items-center text-red-400">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="font-medium">{education.college}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{education.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <BookOpen className="w-4 h-4 mr-2" />
                      <span>Current: {education.semester}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Relevant Courses</h4>
                    <div className="flex flex-wrap gap-2">
                      {education.courses.map((course, index) => (
                        <Badge key={index} variant="outline" className="border-red-600/30 text-red-400">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-gray-900/50 border-gray-800 hover:border-red-600/30 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-white text-2xl">
                  <div className="w-12 h-12 bg-red-600/10 rounded-lg flex items-center justify-center text-red-400 mr-4">
                    <Trophy className="w-6 h-6" />
                  </div>
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-300 leading-relaxed">{achievement}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Certifications */}
          <div>
            <Card className="bg-gray-900/50 border-gray-800 hover:border-red-600/30 transition-all duration-300 h-full">
              <CardHeader>
                <CardTitle className="flex items-center text-white text-2xl">
                  <div className="w-12 h-12 bg-red-600/10 rounded-lg flex items-center justify-center text-red-400 mr-4">
                    <Award className="w-6 h-6" />
                  </div>
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                  {certifications.map((cert, index) => (
                    <div key={index} className="bg-black/30 rounded-lg p-4 border border-gray-800 hover:border-red-600/20 transition-all duration-200">
                      <div className="flex items-start">
                        <div className="w-3 h-3 bg-red-600 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                        <div>
                          <p className="text-gray-300 leading-relaxed text-sm">{cert}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Future Goals Section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-red-600/10 to-transparent border-red-600/20">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Career Goals</h3>
                <p className="text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto">
                  Aspiring to work with Formula 1 teams as a Data Analyst, contributing to race strategy optimization 
                  and driver performance analysis. Currently building expertise in motorsport telemetry systems and 
                  advanced data analytics to make data-driven decisions that can impact race outcomes.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Racing-inspired visual element */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-2 bg-red-600 rounded-full"></div>
            <div className="w-8 h-2 bg-white rounded-full"></div>
            <div className="w-8 h-2 bg-red-600 rounded-full"></div>
            <div className="w-8 h-2 bg-white rounded-full"></div>
            <div className="w-8 h-2 bg-red-600 rounded-full"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #dc2626 #374151;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #dc2626;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #b91c1c;
        }
      `}</style>
    </section>
  );
};

export default Education;