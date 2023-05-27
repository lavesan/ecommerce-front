import { useState } from "react";

export const usePagination = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  return {
    page,
    setPage,
    size,
    setSize,
  };
};
