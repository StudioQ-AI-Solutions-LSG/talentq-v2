"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
const SeeMoreButton = () => {
  const t = useTranslations("EcommerceApp");
  const [show, setShow] = React.useState<boolean>(false);

  return (
    <>
      {!show && (
        <Button
          variant="outline"
          fullWidth
          size="md"
          onClick={() => setShow(true)}
          className="cursor-pointer"
        >
          {t("see_more")}
        </Button>
      )}
    </>
  );
};

export default SeeMoreButton;
