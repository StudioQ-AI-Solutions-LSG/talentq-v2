import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

/**
 * Hook que sincroniza los cambios de customer y división del store con la URL
 * para que la paginación funcione correctamente cuando cambian estos filtros
 */
export const useRequisitionsUrlSync = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedCustomer, selectedDivision } = useAuthStore();

  useEffect(() => {
    // Solo actualizar la URL si estamos en una página de requisitions
    const currentPath = window.location.pathname;
    if (!currentPath.includes('/requisitions/')) {
      return;
    }

    // Crear nuevos parámetros de URL manteniendo los existentes
    const newSearchParams = new URLSearchParams(searchParams);
    
    // Resetear la página a 1 cuando cambien los filtros principales
    newSearchParams.set('page', '1');
    
    // Actualizar la URL solo si hay cambios
    const newUrl = `?${newSearchParams.toString()}`;
    const currentUrl = `?${searchParams.toString()}`;
    
    if (newUrl !== currentUrl) {
      router.push(newUrl);
    }
  }, [selectedCustomer, selectedDivision, router, searchParams]);
};
