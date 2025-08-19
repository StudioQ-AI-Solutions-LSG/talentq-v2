import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Filter, Search } from 'lucide-react';
import type { RequisitionFilters } from '../types/requisitions.types';
import type { Account } from '@/types/accounts.types';

interface AdvancedFiltersProps {
  filters: RequisitionFilters;
  onFiltersChange: (filters: RequisitionFilters) => void;
  onClose: () => void;
  isOpen: boolean;
  selectedAccount?: Account | null;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFiltersChange,
  onClose,
  isOpen,
  selectedAccount
}) => {
  const [localFilters, setLocalFilters] = useState<RequisitionFilters>(filters);

  // Sincronizar filtros locales cuando cambien los filtros externos
  React.useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Opciones para los filtros
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'Active', label: 'Active' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Closed', label: 'Closed' }
  ];

  const seniorityOptions = [
    { value: 'all', label: 'All Seniorities' },
    { value: 'Junior', label: 'Junior' },
    { value: 'Mid', label: 'Mid' },
    { value: 'Senior', label: 'Senior' },
    { value: 'Architect', label: 'Architect' },
    { value: 'Lead', label: 'Lead' }
  ];

  const positionOptions = [
    { value: 'all', label: 'All Positions' },
    { value: '1', label: 'Software Engineer' },
    { value: '2', label: 'Data Engineer' },
    { value: '3', label: 'Product Manager' },
    { value: '4', label: 'UX Designer' }
  ];



  const divisionOptions = [
    { value: 'all', label: 'All Divisions' },
    { value: 'db4f54f5-4c79-4cb6-bb89-30a7deb69b4d', label: 'Engineering' },
    { value: 'division-2', label: 'Product' },
    { value: 'division-3', label: 'Design' }
  ];

  const handleFilterChange = (key: keyof RequisitionFilters, value: string | string[]) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters: RequisitionFilters = {
      search_criteria: '',
      status: 'all',
      skills: [],
      seniority_id: 'all',
      position_id: 'all',
      customer_id: selectedAccount?.id || undefined, // Mantener el account seleccionado
      division_id: 'all'
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = localFilters.skills?.filter(skill => skill !== skillToRemove) || [];
    setLocalFilters(prev => ({
      ...prev,
      skills: updatedSkills
    }));
  };

  const handleAddSkill = (skill: string) => {
    if (skill.trim() && !localFilters.skills?.includes(skill.trim())) {
      const updatedSkills = [...(localFilters.skills || []), skill.trim()];
      setLocalFilters(prev => ({
        ...prev,
        skills: updatedSkills
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Advanced Filters
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Filtros */}
        <div className="p-6 space-y-6">
          {/* Búsqueda */}
          <div className="space-y-2">
            <Label htmlFor="search">Search Criteria</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                placeholder="Search requisitions..."
                value={localFilters.search_criteria || ''}
                onChange={(e) => handleFilterChange('search_criteria', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={localFilters.status || 'all'}
              onValueChange={(value) => handleFilterChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label htmlFor="skills">Skills</Label>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <Input
                  id="skills"
                  placeholder="Add a skill..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    const input = document.getElementById('skills') as HTMLInputElement;
                    handleAddSkill(input.value);
                    input.value = '';
                  }}
                >
                  Add
                </Button>
              </div>
              {localFilters.skills && localFilters.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {localFilters.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      className="flex items-center space-x-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Seniority */}
          <div className="space-y-2">
            <Label htmlFor="seniority">Seniority</Label>
            <Select
              value={localFilters.seniority_id || 'all'}
              onValueChange={(value) => handleFilterChange('seniority_id', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select seniority" />
              </SelectTrigger>
              <SelectContent>
                {seniorityOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Position */}
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Select
              value={localFilters.position_id || 'all'}
              onValueChange={(value) => handleFilterChange('position_id', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                {positionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>



          {/* Division */}
          <div className="space-y-2">
            <Label htmlFor="division">Division</Label>
            <Select
              value={localFilters.division_id || 'all'}
              onValueChange={(value) => handleFilterChange('division_id', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select division" />
              </SelectTrigger>
              <SelectContent>
                {divisionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Información del Account Seleccionado */}
          {selectedAccount && selectedAccount.id !== "all" && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  Filtering by Customer: {selectedAccount.name}
                </span>
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                This filter is automatically applied based on your selected account.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="text-red-600 hover:text-red-700"
          >
            Clear All
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
