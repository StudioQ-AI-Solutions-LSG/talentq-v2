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
  // Función para obtener las iniciales del customer (por ahora usamos las iniciales del position_name)
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Función para formatear fecha
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0]; // YYYY-MM-DD
    } catch {
      return dateString;
    }
  };

  // Función para obtener el color del badge según el status
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

  // Función para obtener el color del badge según la seniority
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
      {/* Header con imagen, nombre y menú - Altura fija */}
      <div className="p-4 border-b border-gray-50 dark:border-gray-800/30 h-24 flex-shrink-0">
        <div className="flex items-start justify-between h-full">
          <div className="flex items-start space-x-3 flex-1 min-w-0">
            {/* Avatar con iniciales */}
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
              {getInitials(requisition.position_name)}
            </div>
            
            {/* Nombre de la posición - Altura fija con overflow controlado */}
            <div className="flex-1 min-w-0 pr-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight line-clamp-2 h-12">
                {requisition.position_name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-tight mt-1 line-clamp-1">
                {requisition.custom_name}
              </p>
            </div>
          </div>

          {/* Menú de tres puntos */}
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

      {/* Descripción - Altura fija */}
      <div className="p-4 border-b border-gray-50 dark:border-gray-800/30 h-20 flex-shrink-0">
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 h-full">
          We are looking for a talented professional to join our team. This position requires strong technical skills and experience in the field.
        </p>
      </div>

      {/* Fechas - Altura fija */}
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
                {/* Por ahora usamos la misma fecha, se puede ajustar cuando tengamos el campo end_date */}
                {formatDate(requisition.start_date)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Badges de estado y seniority - Altura fija */}
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

      {/* Barra de Progreso - Altura fija */}
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

      {/* Footer con botón - Altura fija, siempre al final */}
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
