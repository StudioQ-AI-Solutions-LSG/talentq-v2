import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { authService } from "../services/auth.service";
import type { LoginCredentials, User } from "../types";
import { useAuthStore } from "@/store/auth.store";

const getcConfigurations = (userProfile: User) => {
  const customerIdentifier =
    userProfile?.general_properties?.talentq_configuration?.customer_identifier;

  const defaultDivisionIdConfiguration =
    customerIdentifier?.studioq_organization_default_division_id;

  const defaultCustomerIdConfiguration =
    customerIdentifier?.studioq_organization_customer_id;

  const divisionList = userProfile?.division_list;

  const divisions = divisionList
    ?.filter((division: any) => division.platform === "talentq")
    .map((div: any) => {
      return {
        id: div.id,
        label: div.name,
        value: div.name,
      };
    });

  const defaultDivision = !defaultDivisionIdConfiguration
    ? divisions?.length > 0
      ? divisions[0].id
      : ""
    : defaultDivisionIdConfiguration;

  return {
    divisions: divisions || [],
    defaultDivision: defaultDivision || "",
    defaultCustomerId: defaultCustomerIdConfiguration || "",
  };
};

export const useAuth = () => {
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || "en";
  const { login: storeLogin, logout: storeLogout } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      try {
        // First, login to get the token
        const loginResponse = await authService.login(credentials);

        if (!loginResponse || !loginResponse.authToken) {
          throw new Error("Invalid login response: missing token");
        }

        // Store the token in the zustand store (user will be initially null)
        storeLogin(loginResponse.authToken);

        // Then fetch the complete profile
        const profile = await authService.getProfile();
        const { divisions, defaultDivision, defaultCustomerId } =
          getcConfigurations(profile);
        // Update the user in the store with the profile
        useAuthStore.getState().setUser(profile);

        useAuthStore.getState().setSelectedDivision(defaultDivision);
        useAuthStore.getState().setSelectedCustomer(defaultCustomerId);
        useAuthStore.getState().setDivisions(divisions);

        return profile;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      router.push(`/${locale}/dashboard`);
    },
  });

  const profileQuery = useQuery({
    queryKey: ["user-profile"],
    queryFn: authService.getProfile,
    enabled: useAuthStore.getState().isAuthenticated, // Only run if authenticated
    retry: 1,
  });

  const logout = () => {
    storeLogout();
    // Use dynamic locale for logout redirection
    router.push(`/${locale}/auth/login`);
  };

  // Create a wrapper function that properly passes options to mutate
  const login = (credentials: LoginCredentials, options?: any) => {
    return loginMutation.mutate(credentials, options);
  };

  return {
    login,
    logout,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    profile: profileQuery.data,
    isLoadingProfile: profileQuery.isLoading,
    profileError: profileQuery.error,
  };
};
