import {} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import { IPromotion } from "@/models/entities/IPromotion";
import { PromotionCard } from "./PromotionCard";
import { useResponsive } from "@/hooks/useResponsive";

interface IPromotionSliderProps {
  promotions: IPromotion[];
}

export const PromotionSlider = ({ promotions }: IPromotionSliderProps) => {
  const { isMobile } = useResponsive();

  return (
    <Swiper
      loop
      slidesPerView={isMobile ? 1 : 3}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
    >
      {promotions.map((promotion) => (
        <SwiperSlide key={`promotion_${promotion.id}`}>
          <PromotionCard promotion={promotion} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
