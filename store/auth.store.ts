import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/app/[locale]/auth/login/types";
import { Account, Division } from "@/types/accounts.types";

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  selectedAccount: Account | null; // Cuenta seleccionada por el usuario
  selectedDivision: string | null; // Selected division by the user
  selectedCustomer: string | null; // Selected customer by the user
  divisions: Division[];
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  setSelectedAccount: (account: Account | null) => void; // Acción para establecer la cuenta seleccionada
  setSelectedDivision: (divisionId: string | null) => void;
  setSelectedCustomer: (customerId: string | null) => void;
  setDivisions: (divisions: Division[] | null) => void;
  login: (token: string, user?: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      selectedAccount: null, // Inicializar la cuenta seleccionada como null
      selectedDivision: null,
      selectedCustomer: null,
      divisions: [],
      // Actions
      setToken: (token) => set({ token, isAuthenticated: !!token }),

      setUser: (user) => set({ user }),

      setError: (error) => set({ error }),

      setLoading: (isLoading) => set({ isLoading }),

      setSelectedAccount: (account) => {
        console.log('🏪 Store - setSelectedAccount called with:', account);
        set({ selectedAccount: account });
      }, // Acción para establecer la cuenta seleccionada

      setSelectedDivision: (divisionId) =>
        set({ selectedDivision: divisionId }),

      setSelectedCustomer: (customerId) =>
        set({ selectedCustomer: customerId }),

      setDivisions: (divisions) => set({ divisions: divisions || [] }),

      login: (token, user = null) =>
        set({
          token,
          user,
          isAuthenticated: true,
          error: null,
        }),

      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          error: null,
          selectedAccount: null, // Limpiar la cuenta seleccionada al cerrar sesión
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        selectedAccount: state.selectedAccount, // Persistir la cuenta seleccionada
        selectedDivision: state.selectedDivision, // Persist the selected division
        selectedCustomer: state.selectedCustomer, // Persist the selected customer
        divisions: state.divisions, // Persist the divisions
      }),
    }
  )
);
