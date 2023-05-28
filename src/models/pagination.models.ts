export interface IPaginationRequest {
  page: number;
  size: number;
  isActive: boolean;
}

export interface IPaginationResponse<Data> {
  data: Data[];
  count: number;
  page: number;
  size: number;
}
