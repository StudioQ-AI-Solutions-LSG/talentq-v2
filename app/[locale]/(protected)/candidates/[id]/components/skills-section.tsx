'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Icon } from "@/components/ui/icon";

interface Skill {
  id: string;
  name: string;
  level: number; // 1-100
  category: string;
  yearsOfExperience?: number;
}

interface SkillsSectionProps {
  skills?: Skill[];
  categories?: string[];
}

const SkillsSection = ({
  skills = [
    { id: "1", name: "React", level: 95, category: "Frontend", yearsOfExperience: 4 },
    { id: "2", name: "TypeScript", level: 90, category: "Frontend", yearsOfExperience: 3 },
    { id: "3", name: "JavaScript", level: 95, category: "Frontend", yearsOfExperience: 5 },
    { id: "4", name: "Node.js", level: 80, category: "Backend", yearsOfExperience: 3 },
    { id: "5", name: "Python", level: 75, category: "Backend", yearsOfExperience: 2 },
    { id: "6", name: "AWS", level: 70, category: "Cloud", yearsOfExperience: 2 },
    { id: "7", name: "Docker", level: 65, category: "DevOps", yearsOfExperience: 1 },
    { id: "8", name: "Git", level: 85, category: "Tools", yearsOfExperience: 4 },
    { id: "9", name: "Figma", level: 60, category: "Design", yearsOfExperience: 1 },
    { id: "10", name: "SQL", level: 80, category: "Database", yearsOfExperience: 3 }
  ],
  categories = ["Frontend", "Backend", "Cloud", "DevOps", "Tools", "Design", "Database"]
}: SkillsSectionProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend": return "heroicons:computer-desktop";
      case "Backend": return "heroicons:server";
      case "Cloud": return "heroicons:cloud";
      case "DevOps": return "heroicons:wrench-screwdriver";
      case "Tools": return "heroicons:toolbox";
      case "Design": return "heroicons:paint-brush";
      case "Database": return "heroicons:circle-stack";
      default: return "heroicons:star";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Frontend": return "primary";
      case "Backend": return "success";
      case "Cloud": return "info";
      case "DevOps": return "warning";
      case "Tools": return "secondary";
      case "Design": return "destructive";
      case "Database": return "default";
      default: return "default";
    }
  };

  const getLevelColor = (level: number) => {
    if (level >= 80) return "success";
    if (level >= 60) return "warning";
    return "destructive";
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-xl font-normal flex items-center gap-2">
          <Icon icon="heroicons:star" className="text-primary" />
          Skills & Expertise
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-6">
        {categories.map((category) => {
          const categorySkills = groupedSkills[category] || [];
          if (categorySkills.length === 0) return null;

          return (
            <div key={category}>
              <h3 className="text-sm font-semibold text-default-900 mb-3 flex items-center gap-2">
                <Icon 
                  icon={getCategoryIcon(category)} 
                  className={`w-4 h-4 text-${getCategoryColor(category)}-500`} 
                />
                {category}
              </h3>
              
              <div className="space-y-3">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-default-900">
                          {skill.name}
                        </span>
                        {skill.yearsOfExperience && (
                          <Badge color="secondary" className="text-xs">
                            {skill.yearsOfExperience}y exp
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-default-500">
                          {skill.level}%
                        </span>
                        <Badge 
                          color={getLevelColor(skill.level) as any}
                          className="text-xs"
                        >
                          {skill.level >= 80 ? "Expert" : skill.level >= 60 ? "Intermediate" : "Beginner"}
                        </Badge>
                      </div>
                    </div>
                    
                    <Progress 
                      value={skill.level} 
                      className="h-2"
                      color={getLevelColor(skill.level) as any}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Skills Summary */}
        <div className="pt-4 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {skills.filter(s => s.level >= 80).length}
              </div>
              <div className="text-xs text-default-500">Expert Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">
                {skills.filter(s => s.level >= 60 && s.level < 80).length}
              </div>
              <div className="text-xs text-default-500">Intermediate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-info">
                {skills.length}
              </div>
              <div className="text-xs text-default-500">Total Skills</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                {categories.length}
              </div>
              <div className="text-xs text-default-500">Categories</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsSection;
