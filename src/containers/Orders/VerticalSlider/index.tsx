import React from "react";
import { Swiper } from "swiper/react";
// @ts-ignore
import { FreeMode } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import { useResponsive } from "@/hooks/useResponsive";

export const VerticalSlider = ({ children }: React.PropsWithChildren) => {
  const { isMobile } = useResponsive();

  return (
    <Swiper
      freeMode
      centeredSlides
      grabCursor
      slidesPerView={isMobile ? 1 : 3}
      spaceBetween={30}
      modules={[FreeMode]}
    >
      {children}
    </Swiper>
  );
};
