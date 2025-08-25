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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Requisition } from '../types/requisitions.types';

interface RequisitionCardProps {
  requisition: Requisition;
  onViewDetails: (id: string) => void;
}

export const RequisitionCard: React.FC<RequisitionCardProps> = ({
  requisition,
  onViewDetails
}) => {
  // Function to get customer initials
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

  // Calculate days remaining (mock calculation)
  const daysRemaining = 3; // This would be calculated from actual dates

  // Calculate progress percentage (mock calculation)
  const progressPercentage = 90; // This would be calculated from actual data

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">{getInitials(requisition.position_name)}</span>
            </div>

            <div>
              <CardTitle className="text-xl">{requisition.position_name}</CardTitle>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewDetails(requisition.id)}>
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-4">
        <p className="text-sm text-muted-foreground">
          We are looking for a talented professional to join our team. This position requires strong technical skills and experience in the field.
        </p>
      </CardContent>

      <CardContent className="pt-0 pb-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Start Date</p>
            <p className="text-sm font-medium">
              {formatDate(requisition.start_date)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">End Date</p>
            <p className="text-sm font-medium">
              {formatDate(requisition.start_date)}
            </p>
          </div>
        </div>
      </CardContent>

      <CardContent className="pt-0 pb-4">
        <div className="flex items-center space-x-3">
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-sm font-medium">{progressPercentage}%</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Candidates</span>
            <div className="flex items-center space-x-1">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                {getInitials(requisition.position_name).charAt(0)}
              </div>
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                {getInitials(requisition.custom_name).charAt(0)}
              </div>
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                {getInitials(requisition.position_seniority).charAt(0)}
              </div>
              <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                +2
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1 bg-red-500 text-white px-2 py-1 rounded-full">
            <span className="text-xs">⏰</span>
            <span className="text-xs font-medium">{daysRemaining} days left</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

