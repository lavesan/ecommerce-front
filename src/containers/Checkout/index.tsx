import {
  Box,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Cart } from "@/components/Cart";
import { FormCheckout } from "./FornCheckout";
import { useResponsive } from "@/hooks/useResponsive";

const Checkout = () => {
  const { isMobile } = useResponsive();

  return (
    <Box
      component="section"
      display="flex"
      flexDirection={["column-reverse", "row"]}
      flexWrap="nowrap"
      gap={2}
      px={4}
      mb={2}
      sx={{
        "> *": {
          width: isMobile ? "100%" : "50%",
        },
      }}
    >
      <FormCheckout />
      {!isMobile && (
        <Paper
          elevation={3}
          sx={{
            position: "sticky",
            top: 130,
            left: 0,
            height: "fit-content",
            px: 2,
          }}
        >
          <Cart isOnCheckoutPage />
        </Paper>
      )}
    </Box>
  );
};

export default Checkout;
