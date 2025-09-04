import { Metadata } from "next";
import ProjectWrapper from "./components/requisition-wrapper";
import SiteBreadcrumb from "@/components/site-breadcrumb";

export const metadata: Metadata = {
  title: "Requisitions",
  description: "Requisitions Page",
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SiteBreadcrumb />
      <ProjectWrapper>{children}</ProjectWrapper>
    </>
  );
};

export default Layout;
