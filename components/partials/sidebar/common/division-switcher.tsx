"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator
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
import { Division } from "@/types/divisions.type";
import { motion } from "framer-motion";

const groups = [
  {
    label: "Divisions",
    teams: [
      {
        label: "Select a division",
        value: "personal",
      },
    ],
  },
];

type Team = (typeof groups)[number]["teams"][number];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface DivisionsFilterProps {
  divisions?: Division[];
  onFilterChange: (customerId: string) => void;
  selectedDivision?: string;
}

interface DivisionSwitcherProps
  extends PopoverTriggerProps,
    DivisionsFilterProps {}

export default function DivisionsSwitcher({
  className,
  divisions,
  onFilterChange,
  selectedDivision,
}: DivisionSwitcherProps) {
  const [config] = useConfig();
  const [hoverConfig] = useMenuHoverConfig();
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
                <div className="">
                  <ChevronsUpDown className="ml-auto h-5 w-5 shrink-0  text-default-500 dark:text-default-700" />
                </div>
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
                  <div className="flex-1 text-start w-[100px]">
                    <div className=" text-xs font-normal text-default-500 dark:text-default-700 truncate ">
                      {divisions?.find((div) => div.id === selectedDivision)
                        ?.label ?? "Select a division"}
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
              <CommandEmpty>No division found.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {divisions?.map((division) => (
                    <CommandItem
                      key={division.id}
                      onSelect={() => {
                        onFilterChange(division.id);
                        setOpen(false);
                      }}
                      className="text-sm font-normal"
                    >
                      {division.label}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedDivision === division.id
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
