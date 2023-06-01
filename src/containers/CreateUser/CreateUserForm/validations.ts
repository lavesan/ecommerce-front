import {
  CONFIRM_PASSWORD_MSG,
  CPF_MSG,
  EMAIL_MSG,
  PHONE_MSG,
  REQUIRED_MSG,
  cpfReg,
  phoneReg,
} from "@/helpers/validation.helper";
import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required(REQUIRED_MSG),
  email: yup.string().email(EMAIL_MSG).required(REQUIRED_MSG),
  password: yup.string().required(REQUIRED_MSG),
  confirmPassword: yup
    .string()
    .test("passwords-match", CONFIRM_PASSWORD_MSG, function (value) {
      return this.parent.password === value;
    })
    .required(REQUIRED_MSG),
  cpf: yup.string().matches(cpfReg, CPF_MSG).required(REQUIRED_MSG),
  phone: yup.string().matches(phoneReg, PHONE_MSG).required(REQUIRED_MSG),
});
