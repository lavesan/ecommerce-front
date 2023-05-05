export interface IToastState {
  message: string;
  status: "success" | "info" | "warning" | "error";
  isOpen: boolean;
}
