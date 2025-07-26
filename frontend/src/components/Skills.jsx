import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Code, Database, BarChart3, Users, Zap, Cpu } from "lucide-react";
import { mockData } from '../mock';

const Skills = () => {
  const { skills } = mockData;

  const skillCategories = [
    {
      title: "Motorsport & Data Analysis",
      icon: <Zap className="w-6 h-6" />,
      skills: skills.motorsportAndData,
      color: "red"
    },
    {
      title: "Programming & Tools",
      icon: <Code className="w-6 h-6" />,
      skills: skills.programmingAndTools,
      color: "blue"
    },
    {
      title: "Soft Skills",
      icon: <Users className="w-6 h-6" />,
      skills: skills.softSkills,
      color: "green"
    }
  ];

  const technicalSkills = [
    { name: "Python", level: 85, icon: <Code className="w-5 h-5" /> },
    { name: "Data Analysis", level: 80, icon: <BarChart3 className="w-5 h-5" /> },
    { name: "SQL", level: 75, icon: <Database className="w-5 h-5" /> },
    { name: "C++", level: 70, icon: <Cpu className="w-5 h-5" /> },
    { name: "Motorsport Analytics", level: 85, icon: <Zap className="w-5 h-5" /> },
    { name: "Machine Learning", level: 65, icon: <BarChart3 className="w-5 h-5" /> }
  ];

  return (
    <section id="skills" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Combining motorsport passion with technical expertise
          </p>
        </div>

        {/* Skill Categories */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-red-600/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/10">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                    category.color === 'red' ? 'bg-red-600/10 text-red-400' :
                    category.color === 'blue' ? 'bg-blue-600/10 text-blue-400' :
                    'bg-green-600/10 text-green-400'
                  }`}>
                    {category.icon}
                  </div>
                  <span className="text-lg">{category.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center">
                      <Badge 
                        variant="outline" 
                        className={`text-sm ${
                          category.color === 'red' ? 'border-red-600/30 text-red-400' :
                          category.color === 'blue' ? 'border-blue-600/30 text-blue-400' :
                          'border-green-600/30 text-green-400'
                        }`}
                      >
                        {skill}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technical Proficiency */}
        <div className="bg-gray-900/30 rounded-2xl p-8 border border-gray-800">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Technical Proficiency</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {technicalSkills.map((skill, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-red-400 mr-3">
                      {skill.icon}
                    </div>
                    <span className="text-white font-medium">{skill.name}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{skill.level}%</span>
                </div>
                <Progress 
                  value={skill.level} 
                  className="h-2 bg-gray-800"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Racing-inspired visual element */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-1 bg-gradient-to-r from-red-600 to-transparent"></div>
            <div className="w-8 h-8 border-2 border-red-600 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            </div>
            <div className="w-16 h-1 bg-gradient-to-l from-red-600 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;