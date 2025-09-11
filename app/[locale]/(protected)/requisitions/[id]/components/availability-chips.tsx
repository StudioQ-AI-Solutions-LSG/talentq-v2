"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useState } from "react";
import { Plus, X, Clock, MapPin, Users } from "lucide-react";
import { AvailabilityOption } from "../../types/requisitions.types";

interface AvailabilityChipsProps {
  availabilities?: AvailabilityOption[];
  onUpdateAvailabilities?: (availabilities: AvailabilityOption[]) => void;
  isEditable?: boolean;
  isUpdating?: boolean;
}

const AvailabilityChips = ({
  availabilities = [],
  onUpdateAvailabilities,
  isEditable = true,
  isUpdating = false
}: AvailabilityChipsProps) => {
  // const [availabilityOptions, setAvailabilityOptions] = useState<AvailabilityOption[]>([
  //   {
  //     id: '1',
  //     type: 'location',
  //     label: 'Remote',
  //     value: 'remote',
  //     color: 'bg-blue-100 text-blue-800 border-blue-200'
  //   },
  //   {
  //     id: '2',
  //     type: 'location',
  //     label: 'Hybrid',
  //     value: 'hybrid',
  //     color: 'bg-green-100 text-green-800 border-green-200'
  //   },
  //   {
  //     id: '3',
  //     type: 'schedule',
  //     label: 'Full-time',
  //     value: 'full-time',
  //     color: 'bg-purple-100 text-purple-800 border-purple-200'
  //   },
  //   {
  //     id: '4',
  //     type: 'schedule',
  //     label: 'Flexible Hours',
  //     value: 'flexible',
  //     color: 'bg-orange-100 text-orange-800 border-orange-200'
  //   },
  //   {
  //     id: '5',
  //     type: 'team_size',
  //     label: 'Small Team',
  //     value: 'small',
  //     color: 'bg-pink-100 text-pink-800 border-pink-200'
  //   }
  // ]);
  const availabilityOptions = availabilities;

  const [isAddingOption, setIsAddingOption] = useState(false);
  const [newOptionLabel, setNewOptionLabel] = useState("");
  const [newOptionType, setNewOptionType] = useState<'location' | 'schedule' | 'team_size'>('location');

  // Opciones predefinidas basadas en los valores del backend con full_name
  const predefinedOptions = {
    location: [
      { value: 'on-site', label: 'On Site' },
      { value: 'hybrid', label: 'Hybrid' },
      { value: 'remote', label: 'Remote' }
    ],
    schedule: [
      { value: 'full', label: 'Full / Complete' },
      { value: 'rg', label: 'Regular Hours' },
      { value: 'regular', label: 'Regular' },
      { value: 'regular/full', label: 'Regular/Full' },
      { value: 'full-business days', label: 'Full-Business Days' },
      { value: 'full - bd', label: 'Business Days' },
      { value: 'after hours', label: 'After Hours' },
      { value: 'rgwk', label: 'Weekends' },
      { value: 'regular weekend', label: 'Regular Weekend' },
      { value: 'any', label: 'Any' }
    ],
    team_size: [
      { value: 'small', label: 'Small Team' },
      { value: 'medium', label: 'Medium Team' },
      { value: 'large', label: 'Large Team' }
    ]
  };

  const getTypeIcon = (type: 'location' | 'schedule' | 'team_size') => {
    switch (type) {
      case 'location':
        return <MapPin className="w-3 h-3" />;
      case 'schedule':
        return <Clock className="w-3 h-3" />;
      case 'team_size':
        return <Users className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const getTypeColor = (type: 'location' | 'schedule' | 'team_size') => {
    switch (type) {
      case 'location':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'schedule':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'team_size':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleAddOption = () => {
    if (newOptionLabel.trim()) {
      const newOption: AvailabilityOption = {
        id: `temp-${Date.now()}`,
        type: newOptionType,
        label: newOptionLabel.trim(),
        value: newOptionLabel.trim().toLowerCase().replace(/\s+/g, '-'),
        color: getTypeColor(newOptionType)
      };
      onUpdateAvailabilities?.([...availabilityOptions, newOption]);
      setNewOptionLabel("");
      setIsAddingOption(false);
    }
  };

  const handleSelectPredefinedOption = (option: { value: string; label: string }) => {
    const newOption: AvailabilityOption = {
      id: `temp-${Date.now()}`,
      type: newOptionType,
      label: option.label,
      value: option.value,
      color: getTypeColor(newOptionType)
    };
    onUpdateAvailabilities?.([...availabilityOptions, newOption]);
    setIsAddingOption(false);
  };

  const handleRemoveOption = (id: string) => {
    onUpdateAvailabilities?.(availabilityOptions.filter(option => option.id !== id));
  };

  const groupedOptions = availabilityOptions.reduce((acc, option) => {
    if (!acc[option.type]) {
      acc[option.type] = [];
    }
    acc[option.type].push(option);
    return acc;
  }, {} as Record<string, AvailabilityOption[]>);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'location':
        return 'Work Location';
      case 'schedule':
        return 'Work Schedule';
      case 'team_size':
        return 'Team Size';
      default:
        return type;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Availability</span>
          {isEditable && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddingOption(true)}
              className="text-xs"
              disabled={isUpdating}
            >
              <Plus className="w-3 h-3 mr-1" />
              Add Option
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Option Form */}
        {isAddingOption && isEditable && (
          <div className="bg-default-50 rounded-lg p-4 border border-dashed border-default-300">
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-default-700 mb-1 block">
                  Category
                </label>
                <select
                  value={newOptionType}
                  onChange={(e) => setNewOptionType(e.target.value as 'location' | 'schedule' | 'team_size')}
                  className="w-full px-3 py-2 text-sm border border-default-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="location">Work Location</option>
                  <option value="schedule">Work Schedule</option>
                  <option value="team_size">Team Size</option>
                </select>
              </div>
              
              <div>
                <label className="text-xs font-medium text-default-700 mb-2 block">
                  Select Option
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {predefinedOptions[newOptionType].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSelectPredefinedOption(option)}
                      className="px-3 py-2 text-xs text-left border border-default-300 rounded-md hover:bg-default-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t pt-3">
                <div>
                  <label className="text-xs font-medium text-default-700 mb-1 block">
                    Or add custom option
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newOptionLabel}
                      onChange={(e) => setNewOptionLabel(e.target.value)}
                      placeholder="e.g., Custom option..."
                      className="flex-1 px-3 py-2 text-sm border border-default-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <Button
                      size="sm"
                      onClick={handleAddOption}
                      disabled={!newOptionLabel.trim()}
                      className="text-xs"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsAddingOption(false);
                    setNewOptionLabel("");
                  }}
                  className="text-xs"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Availability Options Display */}
        {availabilityOptions.length > 0 ? (
          <div className="space-y-4">
            {Object.entries(groupedOptions).map(([type, options]) => (
              <div key={type}>
                <div className="flex items-center gap-2 mb-3">
                  {getTypeIcon(type as 'location' | 'schedule' | 'team_size')}
                  <h4 className="text-sm font-semibold text-default-700">
                    {getTypeLabel(type)} ({options.length})
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {options.map((option) => (
                    <Badge
                      key={option.id}
                      className={`${option.color} flex items-center gap-1 border`}
                    >
                      {getTypeIcon(option.type)}
                      {option.label}
                      {isEditable && (
                        <button
                          onClick={() => handleRemoveOption(option.id)}
                          className="ml-1 hover:bg-black/10 rounded-full p-0.5"
                          disabled={isUpdating}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon
              icon="heroicons:calendar-days"
              className="w-12 h-12 text-default-400 mx-auto mb-3"
            />
            <p className="text-sm text-default-500 mb-2">No availability options set</p>
            <p className="text-xs text-default-400">
              Add work location, schedule, and team size preferences
            </p>
          </div>
        )}

        {/* Summary */}
        {availabilityOptions.length > 0 && (
          <div className="bg-default-50 rounded-lg p-3 border-t">
            <div className="flex items-center justify-between text-xs text-default-600">
              <span>Total Options: {availabilityOptions.length}</span>
              <span>
                {groupedOptions.location?.length || 0} Location • {' '}
                {groupedOptions.schedule?.length || 0} Schedule • {' '}
                {groupedOptions.team_size?.length || 0} Team
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AvailabilityChips;
