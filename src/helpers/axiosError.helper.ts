export const parseError = (err: any) => {
  if (err?.response?.data?.data) {
    return {
      status: err?.response?.status,
      message: err?.response?.data?.message,
      data: err.response.data.data,
    };
  }
  return err;
};
