import { useEffect } from "react";
import { SwipeableDrawer } from "@mui/material";

import { Cart } from "../Cart";
import { useResponsive } from "@/hooks/useResponsive";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";

interface SwipeableCartProps {
  isOpen: boolean;
  onClose: VoidFunction;
  onOpen: VoidFunction;
}

export const SwipeableCart = ({
  isOpen,
  onClose,
  onOpen,
}: SwipeableCartProps) => {
  const { isMobile } = useResponsive();

  const { hasProducts } = useCheckoutContext();

  useEffect(() => {
    if (!hasProducts) onClose();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasProducts]);

  return (
    <SwipeableDrawer
      anchor={isMobile ? "bottom" : "right"}
      open={isOpen}
      onClose={onClose}
      onOpen={onOpen}
    >
      <Cart onClose={onClose} />
    </SwipeableDrawer>
  );
};
