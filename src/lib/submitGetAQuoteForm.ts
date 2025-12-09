import axios from "axios";
import type { GetAQuoteFormData } from "./types";
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

type Response = Promise<{
  isSubmitted: boolean;
  error: unknown;
}>;

export async function submitGetAQuoteForm(data: GetAQuoteFormData): Response {
  try {
    const postUrl = process.env.GET_A_QUOTE_FORM_URL;

    if (!postUrl) {
      throw new Error("Get A Quote Form Url Not Found");
    }

    await api.post(postUrl, data);

    return { isSubmitted: true, error: null };
  } catch (error) {
    return { isSubmitted: false, error: error };
  }
}
