'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

interface ExperienceSectionProps {
  experiences?: Experience[];
}

const ExperienceSection = ({
  experiences = [
    {
      id: "1",
      company: "TechCorp Solutions",
      position: "Senior Frontend Developer",
      location: "San Francisco, CA",
      startDate: "2022-03",
      endDate: "2024-01",
      current: false,
      description: "Led frontend development for multiple client projects, focusing on React and TypeScript implementations.",
      achievements: [
        "Improved application performance by 40% through code optimization",
        "Mentored 3 junior developers and conducted code reviews",
        "Implemented CI/CD pipeline reducing deployment time by 60%"
      ],
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Jest", "Docker"]
    },
    {
      id: "2",
      company: "StartupXYZ",
      position: "Frontend Developer",
      location: "Remote",
      startDate: "2020-06",
      endDate: "2022-02",
      current: false,
      description: "Developed and maintained web applications using modern JavaScript frameworks and libraries.",
      achievements: [
        "Built responsive web applications serving 10,000+ daily users",
        "Collaborated with design team to implement pixel-perfect UIs",
        "Reduced bundle size by 30% through code splitting and optimization"
      ],
      technologies: ["React", "JavaScript", "Redux", "SASS", "Webpack", "Git"]
    },
    {
      id: "3",
      company: "Digital Agency Pro",
      position: "Junior Web Developer",
      location: "New York, NY",
      startDate: "2019-01",
      endDate: "2020-05",
      current: false,
      description: "Created and maintained websites for various clients using HTML, CSS, and JavaScript.",
      achievements: [
        "Developed 15+ client websites with 100% client satisfaction",
        "Learned modern development practices and version control",
        "Contributed to team projects and gained experience in agile methodologies"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "jQuery", "Bootstrap", "PHP"]
    }
  ]
}: ExperienceSectionProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const calculateDuration = (startDate: string, endDate: string, current: boolean) => {
    const start = new Date(startDate);
    const end = current ? new Date() : new Date(endDate);
    
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;
    
    if (years > 0) {
      return `${years}y ${months}m`;
    }
    return `${months}m`;
  };

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-xl font-normal flex items-center gap-2">
          <Icon icon="heroicons:briefcase" className="text-primary" />
          Work Experience
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative">
              {/* Timeline line */}
              {index < experiences.length - 1 && (
                <div className="absolute left-4 top-12 w-0.5 h-full bg-default-200"></div>
              )}
              
              <div className="flex gap-4">
                {/* Timeline dot */}
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center relative z-10">
                  <Icon icon="heroicons:briefcase" className="w-4 h-4 text-white" />
                </div>
                
                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-default-900">
                        {exp.position}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-primary font-medium">
                        <Icon icon="heroicons:building-office" className="w-4 h-4" />
                        {exp.company}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-default-600 mt-1">
                        <Icon icon="heroicons:map-pin" className="w-4 h-4" />
                        {exp.location}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm text-default-600">
                        <Icon icon="heroicons:calendar" className="w-4 h-4" />
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </div>
                      <div className="text-xs text-default-500 mt-1">
                        {calculateDuration(exp.startDate, exp.endDate, exp.current)}
                      </div>
                      {exp.current && (
                        <Badge color="success" className="text-xs mt-1">
                          Current
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-default-600 mb-4 leading-relaxed">
                    {exp.description}
                  </p>
                  
                  {/* Achievements */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-default-900 mb-2 flex items-center gap-2">
                      <Icon icon="heroicons:trophy" className="w-4 h-4" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-default-600">
                          <Icon icon="heroicons:check-circle" className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-medium text-default-900 mb-2 flex items-center gap-2">
                      <Icon icon="heroicons:wrench-screwdriver" className="w-4 h-4" />
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} color="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceSection;
