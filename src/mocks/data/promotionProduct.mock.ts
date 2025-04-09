import { IPromotionProduct } from "@/models/entities/IPromotionProduct";

const now = new Date().toISOString();

export const promotionProductMock: IPromotionProduct[] = [
  {
    id: "1",
    value: 39.9,
    created_at: now,
    updated_at: now,
    deleted_at: undefined,
    product: undefined,
    promotion: undefined,
  },
];
