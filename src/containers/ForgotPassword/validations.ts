import { EMAIL_MSG, REQUIRED_MSG } from "@/helpers/validation.helper";
import * as yup from "yup";

export const validationSchema = yup.object({
  email: yup.string().email(EMAIL_MSG).required(REQUIRED_MSG),
});
