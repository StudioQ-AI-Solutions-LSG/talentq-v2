export type SubChildren = {
  href: string;
  label: string;
  active: boolean;
  children?: SubChildren[];
};
export type Submenu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus?: Submenu[];
  children?: SubChildren[];
};

export type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
  id: string;
};

export type Group = {
  groupLabel: string;
  menus: Menu[];
  id: string;
};

export function getMenuList(pathname: string, t: any): Group[] {
  return [
    {
      groupLabel: t("dashboard"),
      id: "dashboard",
      menus: [
        {
          id: "dashboard",
          href: "/",
          label: t("dashboard"),
          active: pathname.includes("/dashboard") && !pathname.includes("/requisitions"),
          icon: "heroicons-outline:home",
          submenus: [],
        },
        {
          id: "requisitions",
          href: "/requisitions",
          label: t("requisitions"),
          active: pathname.includes("/requisitions"),
          icon: "heroicons-outline:document-text",
          submenus: [],
        },
        {
          id: "candidates",
          href: "/candidates",
          label: t("candidates"),
          active: pathname.startsWith("/candidates"),
          icon: "heroicons:user-group",
          submenus: [],
        },
        {
          id: "card-components",
          href: "/requisitions/components/card",
          label: "Card Components",
          active: pathname.includes("/requisitions/components/card"),
          icon: "heroicons:rectangle-stack",
          submenus: [],
        },
      ],
    },
  ];
}
export function getHorizontalMenuList(pathname: string, t: any): Group[] {
  return [
    {
      groupLabel: t("dashboard"),
      id: "dashboard",
      menus: [
        {
          id: "dashboard",
          href: "/",
          label: t("dashboard"),
          active: pathname.includes("/") && !pathname.includes("/requisitions"),
          icon: "heroicons-outline:home",
          submenus: [],
        },
        {
          id: "requisitions",
          href: "/requisitions",
          label: t("requisitions"),
          active: pathname.includes("/requisitions"),
          icon: "heroicons-outline:document-text",
          submenus: [],
        },
        {
          id: "candidates",
          href: "/candidates",
          label: t("Candidates"),
          active: pathname.startsWith("/candidates"),
          icon: "heroicons:user-group",
          submenus: [],
        },
        {
          id: "card-components",
          href: "/requisitions/components/card",
          label: "Card Components",
          active: pathname.includes("/requisitions/components/card"),
          icon: "heroicons:rectangle-stack",
          submenus: [],
        },
      ],
    },
  ];
}
