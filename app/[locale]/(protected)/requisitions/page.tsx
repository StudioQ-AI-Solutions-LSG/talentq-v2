import { redirect } from "@/components/navigation";

const RequisitionsPage = () => {
  redirect({ href: "/app/requisitions/grid", locale: "en" });
  return null;
};

export default RequisitionsPage;
