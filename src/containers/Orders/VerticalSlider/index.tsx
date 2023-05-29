import React from "react";
import { Swiper } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper";

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
      mousewheel
      slidesPerView={isMobile ? 1 : 3}
      spaceBetween={30}
      modules={[FreeMode, Mousewheel]}
    >
      {children}
    </Swiper>
  );
};
