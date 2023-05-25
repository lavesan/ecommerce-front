import { useEffect, useMemo } from "react";
import { SwipeableDrawer } from "@mui/material";

import { Cart } from "../Cart";
import { useResponsive } from "@/hooks/useResponsive";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import { useRouter } from "next/router";

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

  const router = useRouter();

  const hideCart = useMemo(() => {
    const dontShowRoutes = ["/pagamento"];

    return dontShowRoutes.some((route) => router.pathname.includes(route));
  }, [router.pathname]);

  useEffect(() => {
    if (!hasProducts) onClose();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasProducts]);

  if (hideCart) return <></>;

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
