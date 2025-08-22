import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Calendar, Building2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Requisition } from '../types/requisitions.types';

interface RequisitionCardProps {
  requisition: Requisition;
  onViewDetails: (id: string) => void;
}

export const RequisitionCard: React.FC<RequisitionCardProps> = ({
  requisition,
  onViewDetails
}) => {
  // Function to get customer initials (for now we use position_name initials)
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Function to format date
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0]; // YYYY-MM-DD
    } catch {
      return dateString;
    }
  };

  // Function to get badge color based on status
  const getStatusBadgeColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'closed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  // Function to get badge color based on seniority
  const getSeniorityBadgeColor = (seniority: string): string => {
    switch (seniority.toLowerCase()) {
      case 'junior':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'mid':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'senior':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'architect':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      case 'lead':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 dark:border-gray-700 h-[520px] flex flex-col">
      {/* Header with image, name and menu - Fixed height */}
      <div className="p-4 border-b border-gray-50 dark:border-gray-800/30 h-24 flex-shrink-0">
        <div className="flex items-start justify-between h-full">
          <div className="flex items-start space-x-3 flex-1 min-w-0">
            {/* Avatar with initials */}
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
              {getInitials(requisition.position_name)}
            </div>
            
            {/* Position name - Fixed height with controlled overflow */}
            <div className="flex-1 min-w-0 pr-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight line-clamp-2 h-12">
                {requisition.position_name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-tight mt-1 line-clamp-1">
                {requisition.custom_name}
              </p>
            </div>
          </div>

          {/* Three dots menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Description - Fixed height */}
      <div className="p-4 border-b border-gray-50 dark:border-gray-800/30 h-20 flex-shrink-0">
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 h-full">
          We are looking for a talented professional to join our team. This position requires strong technical skills and experience in the field.
        </p>
      </div>

      {/* Dates - Fixed height */}
      <div className="p-4 border-b border-gray-50 dark:border-gray-800/30 h-20 flex-shrink-0">
        <div className="grid grid-cols-2 gap-4 h-full">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Start Date</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {formatDate(requisition.start_date)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">End Date</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {/* For now we use the same date, can be adjusted when we have the end_date field */}
                {formatDate(requisition.start_date)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Status and seniority badges - Fixed height */}
      <div className="p-4 border-b border-gray-50 dark:border-gray-800/30 h-16 flex-shrink-0">
        <div className="flex flex-wrap gap-2">
          <Badge className={getStatusBadgeColor(requisition.status)}>
            {requisition.status}
          </Badge>
          <Badge className={getSeniorityBadgeColor(requisition.position_seniority)}>
            {requisition.position_seniority}
          </Badge>
          {requisition.rate > 0 && (
            <Badge className="border border-gray-300 text-gray-700 bg-white">
              ${requisition.rate.toLocaleString()}/{requisition.rate_type}
            </Badge>
          )}
        </div>
      </div>

      {/* Progress Bar - Fixed height */}
      <div className="p-4 border-b border-gray-50 dark:border-gray-800/30 h-16 flex-shrink-0">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Completion</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">68%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: '68%' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Footer with button - Fixed height, always at the bottom */}
      <div className="p-4 mt-auto flex-shrink-0">
        <Button
          onClick={() => onViewDetails(requisition.id)}
          className="w-full h-[42px] px-6 py-2 rounded-[4px] font-medium text-white hover:opacity-90 transition-opacity duration-200"
          style={{ 
            backgroundColor: '#0A0933',
            boxShadow: `
              0px 1px 8px 0px rgba(76, 78, 100, 0.12),
              0px 3px 4px 0px rgba(76, 78, 100, 0.14),
              0px 3px 3px -2px rgba(76, 78, 100, 0.20)
            `
          }}
        >
          See Details
        </Button>
      </div>
    </div>
  );
};

// ========================================
// REQUISITION CARD V2 - Based on Sales Automation design
// ========================================

export const RequisitionCardV2: React.FC<RequisitionCardProps> = ({
  requisition,
  onViewDetails
}) => {
  // Function to get customer initials (for now we use position_name initials)
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Function to format date
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0]; // YYYY-MM-DD
    } catch {
      return dateString;
    }
  };

  // Function to get badge color based on status
  const getStatusBadgeColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'closed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  // Function to get badge color based on seniority
  const getSeniorityBadgeColor = (seniority: string): string => {
    switch (seniority.toLowerCase()) {
      case 'junior':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'mid':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'senior':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'architect':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      case 'lead':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header with image and menu - Based on Sales Automation card */}
      <div className="relative">
        {/* Background image with gradient overlay */}
        <div 
          className="w-full h-[200px] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)`
          }}
        >
          {/* Position initials in the center */}
          <div className="text-white font-bold text-4xl">
            {getInitials(requisition.position_name)}
          </div>
        </div>
        
        {/* Three dots menu - positioned absolutely over the image */}
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white border border-white/30"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content section - Based on Sales Automation card structure */}
      <div className="p-6">
        {/* Title and subtitle */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {requisition.position_name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {requisition.custom_name}
          </p>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            We are looking for a talented professional to join our team. This position requires strong technical skills and experience in the field.
          </p>
        </div>

        {/* Dates section */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Start Date</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatDate(requisition.start_date)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">End Date</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatDate(requisition.start_date)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Status and seniority badges */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <Badge className={getStatusBadgeColor(requisition.status)}>
              {requisition.status}
            </Badge>
            <Badge className={getSeniorityBadgeColor(requisition.position_seniority)}>
              {requisition.position_seniority}
            </Badge>
            {requisition.rate > 0 && (
              <Badge className="border border-gray-300 text-gray-700 bg-white">
                ${requisition.rate.toLocaleString()}/{requisition.rate_type}
              </Badge>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Completion</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">68%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: '68%' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Action button - Based on Sales Automation card */}
        <Button
          onClick={() => onViewDetails(requisition.id)}
          className="w-full h-[42px] px-6 py-2 rounded-[4px] font-medium text-white hover:opacity-90 transition-opacity duration-200"
          style={{ 
            backgroundColor: '#0A0933',
            boxShadow: `
              0px 1px 8px 0px rgba(76, 78, 100, 0.12),
              0px 3px 4px 0px rgba(76, 78, 100, 0.14),
              0px 3px 3px -2px rgba(76, 78, 100, 0.20)
            `
          }}
        >
          See Details
        </Button>
      </div>
    </div>
  );
};

// ========================================
// REQUISITION CARD V3 - Exact same structure as Sales Automation reference
// ========================================

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export const RequisitionCardV3: React.FC<RequisitionCardProps> = ({
  requisition,
  onViewDetails
}) => {
  // Function to get customer initials (for now we use position_name initials)
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      {/* Image above - exactly like Sales Automation reference */}
      <div className="w-full h-[200px] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center rounded-t-md">
        <div className="text-white font-bold text-4xl">
          {getInitials(requisition.position_name)}
        </div>
      </div>
      
      {/* CardHeader - exactly like Sales Automation reference */}
      <CardHeader>
        <CardTitle>{requisition.position_name}</CardTitle>
      </CardHeader>
      
      {/* CardContent - exactly like Sales Automation reference */}
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {requisition.custom_name} • {requisition.position_seniority} • {requisition.status}
        </p>
      </CardContent>
      
      {/* CardFooter - exactly like Sales Automation reference */}
      <CardFooter className="gap-6">
        <Button 
          variant="ghost" 
          className="text-sm text-default underline p-0 h-auto"
          onClick={() => onViewDetails(requisition.id)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
