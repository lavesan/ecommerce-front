import axios from "axios";

export const server = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
