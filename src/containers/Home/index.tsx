import { Box, Stack, Typography } from "@mui/material";

import { useResponsive } from "@/hooks/useResponsive";
import { EnterpriseCard } from "./EnterpriseCard";
import { PromotionSlider } from "./PromotionSlider";
import { useFindAllPromotionsQuery } from "@/hooks/fetch/useFindAllPromotionsQuery";
import { getWeekDay } from "@/helpers/date.helper";
import { useFindEnterprisesQuery } from "@/hooks/fetch/useFindEnterprisesQuery";

const Home = () => {
  const { isMobile } = useResponsive();

  const todayWeekDay = getWeekDay();

  const { data: promotions } = useFindAllPromotionsQuery({
    weekDay: todayWeekDay,
  });
  const { data: enterprises } = useFindEnterprisesQuery();

  return (
    <main>
      {!!promotions?.length && (
        <>
          <Typography variant="h2" marginBottom={4} paddingX={4}>
            Hoje é dia de{" "}
            <Box component="span" color="primary.main" fontWeight="bold">
              promoção!
            </Box>
          </Typography>
          <Box paddingX={4}>
            <PromotionSlider promotions={promotions} />
          </Box>
        </>
      )}
      <Typography variant="h2" marginBottom={4} paddingX={4}>
        Lojas
      </Typography>
      <Stack
        spacing={4}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        paddingX={4}
      >
        {enterprises?.map((enterprise) => (
          <EnterpriseCard
            key={enterprise.id}
            enterprise={enterprise}
            sx={{ width: isMobile ? "100%" : "32%" }}
          />
        ))}
      </Stack>
    </main>
  );
};

export default Home;
