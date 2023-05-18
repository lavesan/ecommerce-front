import { Box, Paper } from "@mui/material";

import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import { Cart } from "@/components/Cart";
import { FormCheckout } from "./FornCheckout";

const Checkout = () => {
  const { total, prodTotal, freightTotal } = useCheckoutContext();

  return (
    <Box
      component="section"
      display="flex"
      flexDirection="row"
      flexWrap="nowrap"
      gap={2}
      sx={{
        "> *": {
          width: "50%",
        },
      }}
    >
      <FormCheckout width="48%" />
      <Paper
        elevation={3}
        sx={{
          position: "sticky",
          top: 76,
          left: 0,
          height: "fit-content",
          px: 2,
        }}
      >
        <Cart isOnCheckoutPage />
      </Paper>
    </Box>
  );
};

export default Checkout;
