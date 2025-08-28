import { faker } from "@faker-js/faker";
import { requisitionsService } from "./requitisions-service";
import { RequisitionFilters } from "../types/requisitions.types";


export const defaultRequisitions = [
  {
    id: "c06d48bf-7f35-4789-b71e-d80fee5b430f",
    title: "CRM Dashboard ",
    requisitionLogo: "/images/project/p-2.png",
    desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    startDate: "2022-10-03",
    endDate: "2022-10-06",
    progress: 90,
    assignee: [
      {
        image: "/images/avatar/av-1.svg",
        name: "Mahedi Amin",
      },
      {
        image: "/images/avatar/av-2.svg",
        name: "Sovo Haldar",
      },
      {
        image: "/images/avatar/av-3.svg",
        name: "Rakibul Islam",
      }
    ],
    remainingDays: 3
  },
  {
    id: faker.string.uuid(),
    title: "Business Dashboard ",
    requisitionLogo: "/images/project/p-2.png",
    desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    startDate: "2022-10-03",
    endDate: "2022-10-06",
    progress: 90,
    assignee: [
      {
        image: "/images/avatar/av-1.svg",
        name: "Mahedi Amin",
      },
      {
        image: "/images/avatar/av-2.svg",
        name: "Sovo Haldar",
      },
      {
        image: "/images/avatar/av-3.svg",
        name: "Rakibul Islam",
      }
    ],
    remainingDays: 3
  },
  {
    id: faker.string.uuid(),
    title: "Management Dashboard ",
    requisitionLogo: "/images/project/p-2.png",
    desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    startDate: "2022-10-03",
    endDate: "2022-10-06",
    progress: 90,
    assignee: [
      {
        image: "/images/avatar/av-1.svg",
        name: "Mahedi Amin",
      },
      {
        image: "/images/avatar/av-2.svg",
        name: "Sovo Haldar",
      },
      {
        image: "/images/avatar/av-3.svg",
        name: "Rakibul Islam",
      }
    ],
    remainingDays: 3
  },
  {
    id: faker.string.uuid(),
    title: "Analytics Dashboard ",
    requisitionLogo: "/images/project/p-2.png",
    desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    startDate: "2022-10-03",
    endDate: "2022-10-06",
    progress: 90,
    assignee: [
      {
        image: "/images/avatar/av-1.svg",
        name: "Mahedi Amin",
      },
      {
        image: "/images/avatar/av-2.svg",
        name: "Sovo Haldar",
      },
      {
        image: "/images/avatar/av-3.svg",
        name: "Rakibul Islam",
      }
    ],
    remainingDays: 3
  },
  {
    id: faker.string.uuid(),
    title: "Marketing Dashboard ",
    requisitionLogo: "/images/project/p-2.png",
    desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    startDate: "2022-10-03",
    endDate: "2022-10-06",
    progress: 90,
    assignee: [
      {
        image: "/images/avatar/av-1.svg",
        name: "Mahedi Amin",
      },
      {
        image: "/images/avatar/av-2.svg",
        name: "Sovo Haldar",
      },
      {
        image: "/images/avatar/av-3.svg",
        name: "Rakibul Islam",
      }
    ],
    remainingDays: 3
  }
];

export const getRequisitions = async (filters?: RequisitionFilters, page: number = 1, limit: number = 8) => {
  return await requisitionsService.getRequisitions(filters)
}

export const getRequisitionById = async (id: string) => {
  return defaultRequisitions.find(requisition => requisition.id === id)
}

interface RequisitionNav {
  label: string
  href: string
  active: boolean
}

export function getRequisitionNav(pathname: string): RequisitionNav[] {
  return [
    {
      label: 'grid view',
      href: "/requisitions/grid",
      active: pathname === "/requisitions/grid",
    },
    {
      label: 'list view',
      href: "/requisitions/list",
      active: pathname === "/requisitions/list",
    }
  ]
}

// export type Requisition = (typeof defaultRequisitions)[number]