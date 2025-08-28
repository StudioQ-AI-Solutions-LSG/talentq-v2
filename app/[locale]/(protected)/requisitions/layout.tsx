import { Metadata } from "next";
import ProjectWrapper from "./requisition-wrapper";
export const metadata: Metadata = {
  title: "Requisitions",
  description: "Requisitions Page",
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <ProjectWrapper>{children}</ProjectWrapper>;
};

export default Layout;
