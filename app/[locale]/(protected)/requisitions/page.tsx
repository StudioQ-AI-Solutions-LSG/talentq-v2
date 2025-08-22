"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Search, Filter, Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RequisitionCard } from "./components/requisition-card";
import { AdvancedFilters } from "./components/advanced-filters";
import { Pagination } from "@/components/ui/pagination";
import { useRequisitions } from "./hooks/useRequisitions";
import { useAuthStore } from "@/store/auth.store";
import SiteBreadcrumb from "@/components/site-breadcrumb";
import type { RequisitionFilters } from "./types/requisitions.types";

const RequisitionsPage = () => {
  const t = useTranslations("Requisitions");
  
  // Estados locales
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Obtener el account seleccionado del store
  const selectedAccount = useAuthStore((state) => state.selectedAccount);
  
  // Filtros avanzados
  const [advancedFilters, setAdvancedFilters] = useState<RequisitionFilters>({
    search_criteria: "",
    status: "all",
    skills: [],
    seniority_id: "all",
    position_id: "all",
    customer_id: undefined, // undefined para "All Accounts"
    division_id: "all"
  });

  // Hook to automatically update the customer_id when the selected account changes
  useEffect(() => {
    if (selectedAccount && selectedAccount.id !== "all") {
      setAdvancedFilters(prev => ({
        ...prev,
        customer_id: selectedAccount.id
      }));
      console.log('🔒 Setting customer_id to:', selectedAccount.id);
    } else {
      setAdvancedFilters(prev => ({
        ...prev,
        customer_id: undefined // Use undefined for "All Accounts"
      }));
      console.log('🌍 Setting customer_id to undefined (All Accounts)');
    }
  }, [selectedAccount]);

  // Mixing basic and advanced filters
  const filters: RequisitionFilters = {
    ...advancedFilters,
    search_criteria: searchTerm || advancedFilters.search_criteria
  };

  // Hook to get data
  const {
    requisitions,
    total,
    totalPages,
    stats,
    isLoading,
    statsLoading
  } = useRequisitions(filters, currentPage, 8);

  // Handlers
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset a la primera página
  };

  const handleAdvancedFiltersChange = (newFilters: RequisitionFilters) => {
    setAdvancedFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetails = (id: string) => {
    // TODO: Implement navigation to the details view
    console.log("View details for requisition:", id);
  };

  return (
    <div className="w-full">
      <SiteBreadcrumb />
      
      {/* Header - similar a candidates */}
      <div className="flex items-center justify-between w-full mb-6">
        <div className="flex items-center justify-start text-2xl font-medium text-default-900">
          {t("title")}
        </div>
        
        {/* Show the selected account */}
        {selectedAccount && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Filtering by:</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              {selectedAccount.name}
            </span>
          </div>
        )}
      </div>

      {/* Filters and Actions - alineados a la derecha como candidates */}
      <div className="flex items-center justify-end gap-3 w-full mb-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t("search.placeholder")}
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-[350px] h-[40px] text-xs text-gray-900 placeholder:text-gray-400 pl-10 pr-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white"
          />
        </div>

        {/* Advanced filters button */}
        <Button
          variant="outline"
          onClick={() => setShowAdvancedFilters(true)}
          className="flex items-center space-x-2"
        >
          <Filter className="h-4 w-4" />
          <span>{t("filters.allFilters")}</span>
        </Button>

        {/* Reset button */}
        <Button
          variant="ghost"
          onClick={() => {
            setSearchTerm("");
            setAdvancedFilters({
              search_criteria: "",
              status: "all",
              skills: [],
              seniority_id: "all",
              position_id: "all",
              customer_id: selectedAccount?.id || undefined,
              division_id: "all"
            });
            setCurrentPage(1);
          }}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <RotateCcw className="h-4 w-4" />
          <span>{t("filters.reset")}</span>
        </Button>

        {/* Create Requisition button */}
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>{t("actions.createRequisition")}</span>
        </Button>
      </div>

      {/* Statistics */}
      {!statsLoading && stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t("stats.total")}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.total || total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
                <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t("stats.open")}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.active || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900">
                <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t("stats.inProgress")}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.pending || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-red-100 dark:bg-red-900">
                <div className="w-4 h-4 bg-red-600 rounded-full"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t("stats.closed")}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.closed || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contenido Principal */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Header de la lista */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("table.title")}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {total} requisitions found
            </p>
          </div>
        </div>

        {/* Grid de Tarjetas */}
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Loading requisitions...</p>
          </div>
        ) : requisitions.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t("table.noData")}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requisitions.map((requisition) => (
                <RequisitionCard
                  key={requisition.id}
                  requisition={requisition}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Advanced Filters Modal */}
      <AdvancedFilters
        filters={advancedFilters}
        onFiltersChange={handleAdvancedFiltersChange}
        onClose={() => setShowAdvancedFilters(false)}
        isOpen={showAdvancedFilters}
        selectedAccount={selectedAccount}
      />
    </div>
  );
};

export default RequisitionsPage;
