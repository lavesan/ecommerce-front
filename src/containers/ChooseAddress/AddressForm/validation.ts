import { REQUIRED_MSG } from "@/helpers/validation.helper";
import * as yup from "yup";

export const validationSchema = yup.object({
  cep: yup.string().required(REQUIRED_MSG),
  street: yup.string().required(REQUIRED_MSG),
  complement: yup.string().required(REQUIRED_MSG),
  number: yup.string().required(REQUIRED_MSG),
  district: yup.string().required(REQUIRED_MSG),
  shortName: yup.string().notRequired(),
});
