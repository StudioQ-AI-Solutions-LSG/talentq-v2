"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Dialog } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useConfig } from "@/hooks/use-config";
import { useMenuHoverConfig } from "@/hooks/use-menu-hover";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";
import { motion } from "framer-motion";

const groups = [
  {
    label: "Customers",
    teams: [
      {
        label: "Select a customer",
        value: "personal",
      },
    ],
  },
];

type Team = (typeof groups)[number]["teams"][number];

interface Customer {
  id: string;
  name: string;
}

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface CustomersFilterProps {
  customers?: Customer[];
  onFilterChange: (customerId: string) => void;
  selectedCustomer?: string;
}

interface CustomerSwitcherProps
  extends PopoverTriggerProps,
    CustomersFilterProps {}

export default function CustomerSwitcher({
  className,
  customers,
  onFilterChange,
  selectedCustomer,
}: CustomerSwitcherProps) {
  const [config] = useConfig();
  const [hoverConfig] = useMenuHoverConfig();
  const user = useAuthStore((state) => state.user);
  const { hovered } = hoverConfig;
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
  if (config.showSwitcher === false || config.sidebar === "compact")
    return null;

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <motion.div
            key={config.collapsed && !hovered ? "collapsed" : "expanded"}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {config.collapsed && !hovered ? (
              <Button
                variant="outline"
                color="secondary"
                role="combobox"
                fullWidth
                aria-expanded={open}
                aria-label="Select a team"
                className={cn(
                  "  h-14 w-14 mx-auto  p-0 md:p-0  dark:border-secondary ring-offset-sidebar",
                  className
                )}
              >
                <Avatar className="">
                  <AvatarImage
                    height={24}
                    width={24}
                    src="/images/avatar/av-1.jpg"
                    alt={"User"}
                    className="grayscale"
                  />

                  <AvatarFallback>{}</AvatarFallback>
                </Avatar>
              </Button>
            ) : (
              <Button
                variant="outline"
                color="secondary"
                role="combobox"
                fullWidth
                aria-expanded={open}
                aria-label="Select a customer"
                className={cn(
                  "  h-auto py-3 md:px-3 px-3 justify-start dark:border-secondary ring-offset-sidebar",
                  className
                )}
              >
                <div className=" flex  gap-2 flex-1 items-center">
                  <Avatar className=" flex-none h-[38px] w-[38px]">
                    <AvatarImage
                      height={38}
                      width={38}
                      src="/images/avatar/av-1.jpg"
                      alt=""
                      className="grayscale"
                    />

                    <AvatarFallback>{}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-start w-[100px]">
                    <div className=" text-sm  font-semibold text-default-900">
                      {user?.name ?? "User"}
                    </div>
                    <div className=" text-xs font-normal text-default-500 dark:text-default-700 truncate ">
                      {customers?.find((cust) => cust.id === selectedCustomer)
                        ?.name ?? "Select a customer"}
                    </div>
                  </div>
                  <div className="">
                    <ChevronsUpDown className="ml-auto h-5 w-5 shrink-0  text-default-500 dark:text-default-700" />
                  </div>
                </div>
              </Button>
            )}
          </motion.div>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput
                placeholder="Search customer..."
                className=" placeholder:text-xs"
              />
              <CommandEmpty>No customer found.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {customers?.map((customer) => (
                    <CommandItem
                      key={customer.id}
                      onSelect={() => {
                        onFilterChange(customer.id);
                        setOpen(false);
                      }}
                      className="text-sm font-normal"
                    >
                      {customer.name}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedCustomer === customer.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
          </Command>
        </PopoverContent>
      </Popover>
    </Dialog>
  );
}
