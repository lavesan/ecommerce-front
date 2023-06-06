import {
  CONFIRM_PASSWORD_MSG,
  REQUIRED_MSG,
} from "@/helpers/validation.helper";
import * as yup from "yup";

export const validationSchema = yup.object({
  password: yup.string().required(REQUIRED_MSG),
  confirmPassword: yup
    .string()
    .test("passwords-match", CONFIRM_PASSWORD_MSG, function (value) {
      return this.parent.password === value;
    })
    .required(REQUIRED_MSG),
});
