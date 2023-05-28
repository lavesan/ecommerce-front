import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { SwiperSlide } from "swiper/react";

import { OrderCard } from "./OrderCard";
import { useResponsive } from "@/hooks/useResponsive";
import { useTodayPromotionsQuery } from "@/hooks/useTodayPromotionsQuery";
import { usePaginateOrders } from "@/hooks/fetch/usePaginateOrders";
import { VerticalSlider } from "./VerticalSlider";

const Orders = () => {
  const { data: promotions } = useTodayPromotionsQuery();

  const {
    data: activePages,
    hasNextPage: hasActiveNextPage,
    fetchNextPage: fetchActiveNextPage,
  } = usePaginateOrders({ isActive: true });

  const {
    data: finishedPages,
    hasNextPage: hasFinishedNextPage,
    fetchNextPage: fetchFinishedNextPage,
  } = usePaginateOrders({ isActive: false });

  const { isMobile } = useResponsive();

  return (
    <Box display="flex" flexDirection="column" px={4}>
      <Box>
        <VerticalSlider>
          {activePages?.pages.map((page, index) => (
            <React.Fragment key={`active_page_${index}`}>
              {page.data.map((order, orderIndex) => (
                <SwiperSlide key={`order_${order.id}`}>
                  <OrderCard
                    isActive
                    order={order}
                    fetchNextPage={fetchActiveNextPage}
                    hasNextPage={!!hasActiveNextPage}
                    isLast={
                      orderIndex === page.data.length - 1 &&
                      index === activePages.pages.length - 1
                    }
                    promotions={promotions}
                  />
                </SwiperSlide>
              ))}
            </React.Fragment>
          ))}
        </VerticalSlider>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography component="h2">Pedidos finalizados</Typography>
      <Box
        display="flex"
        flexDirection={["column", "row"]}
        gap={2}
        sx={{
          "> *": {
            width: isMobile ? "100%" : "49%",
          },
        }}
      >
        {finishedPages?.pages.map((page, index) => (
          <React.Fragment key={`finished_page_${index}`}>
            {page.data.map((order, orderIndex) => (
              <OrderCard
                key={`order_${order.id}`}
                order={order}
                fetchNextPage={fetchFinishedNextPage}
                hasNextPage={!!hasFinishedNextPage}
                isLast={
                  orderIndex === page.data.length - 1 &&
                  index === finishedPages.pages.length - 1
                }
                promotions={promotions}
              />
            ))}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default Orders;
