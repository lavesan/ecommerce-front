export const getImgUrl = (imageKey: string) =>
  imageKey ? `${process.env.NEXT_PUBLIC_CDN_URL}/${imageKey}` : imageKey;
