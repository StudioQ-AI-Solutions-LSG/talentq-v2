"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { RequisitionSkill } from "../../types/requisitions.types";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface SkillsListCardProps {
  skills: RequisitionSkill[];
}

const SkillsListCard = ({ skills }: SkillsListCardProps) => {
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillType, setNewSkillType] = useState<'hard' | 'soft'>('hard');
  const [localSkills, setLocalSkills] = useState<RequisitionSkill[]>(skills);

  const handleAddSkill = () => {
    if (newSkillName.trim()) {
      const newSkill: RequisitionSkill = {
        id: `temp-${Date.now()}`,
        name: newSkillName.trim(),
        type: newSkillType,
        requisition_position_skill_id: `temp-${Date.now()}`,
      };
      setLocalSkills([...localSkills, newSkill]);
      setNewSkillName("");
      setIsAddingSkill(false);
    }
  };

  const handleRemoveSkill = (skillId: string) => {
    setLocalSkills(localSkills.filter(skill => skill.id !== skillId));
  };

  const getSkillTypeColor = (type: 'hard' | 'soft') => {
    return type === 'hard' 
      ? "bg-primary/20 text-primary border-primary/30" 
      : "bg-secondary/20 text-secondary border-secondary/30";
  };

  const getSkillTypeIcon = (type: 'hard' | 'soft') => {
    return type === 'hard' 
      ? "heroicons:cog-6-tooth" 
      : "heroicons:heart";
  };

  const hardSkills = localSkills.filter(skill => skill.type === 'hard');
  const softSkills = localSkills.filter(skill => skill.type === 'soft');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Required Skills</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddingSkill(true)}
            className="text-xs"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Skill
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Skill Form */}
        {isAddingSkill && (
          <div className="bg-default-50 rounded-lg p-4 border border-dashed border-default-300">
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-default-700 mb-1 block">
                  Skill Name
                </label>
                <input
                  type="text"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="Enter skill name..."
                  className="w-full px-3 py-2 text-sm border border-default-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-default-700 mb-1 block">
                  Skill Type
                </label>
                <select
                  value={newSkillType}
                  onChange={(e) => setNewSkillType(e.target.value as 'hard' | 'soft')}
                  className="w-full px-3 py-2 text-sm border border-default-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="hard">Hard Skill</option>
                  <option value="soft">Soft Skill</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleAddSkill}
                  disabled={!newSkillName.trim()}
                  className="text-xs"
                >
                  Add Skill
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsAddingSkill(false);
                    setNewSkillName("");
                  }}
                  className="text-xs"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Skills Display */}
        {localSkills.length > 0 ? (
          <div className="space-y-4">
            {/* Hard Skills */}
            {hardSkills.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Icon
                    icon="heroicons:cog-6-tooth"
                    className="w-4 h-4 text-primary"
                  />
                  <h4 className="text-sm font-semibold text-default-700">
                    Technical Skills ({hardSkills.length})
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {hardSkills.map((skill) => (
                    <Badge
                      key={skill.id}
                      className={`${getSkillTypeColor(skill.type)} flex items-center gap-1`}
                    >
                      <Icon
                        icon={getSkillTypeIcon(skill.type)}
                        className="w-3 h-3"
                      />
                      {skill.name}
                      <button
                        onClick={() => handleRemoveSkill(skill.id)}
                        className="ml-1 hover:bg-black/10 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Soft Skills */}
            {softSkills.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Icon
                    icon="heroicons:heart"
                    className="w-4 h-4 text-secondary"
                  />
                  <h4 className="text-sm font-semibold text-default-700">
                    Soft Skills ({softSkills.length})
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill) => (
                    <Badge
                      key={skill.id}
                      className={`${getSkillTypeColor(skill.type)} flex items-center gap-1`}
                    >
                      <Icon
                        icon={getSkillTypeIcon(skill.type)}
                        className="w-3 h-3"
                      />
                      {skill.name}
                      <button
                        onClick={() => handleRemoveSkill(skill.id)}
                        className="ml-1 hover:bg-black/10 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon
              icon="heroicons:academic-cap"
              className="w-12 h-12 text-default-400 mx-auto mb-3"
            />
            <p className="text-sm text-default-500 mb-2">No skills defined yet</p>
            <p className="text-xs text-default-400">
              Add technical and soft skills required for this position
            </p>
          </div>
        )}

        {/* Skills Summary */}
        {localSkills.length > 0 && (
          <div className="bg-default-50 rounded-lg p-3 border-t">
            <div className="flex items-center justify-between text-xs text-default-600">
              <span>Total Skills: {localSkills.length}</span>
              <span>
                {hardSkills.length} Technical • {softSkills.length} Soft
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillsListCard;
