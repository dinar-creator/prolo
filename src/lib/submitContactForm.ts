import axios from "axios";
import type { ContactFormData } from "./types";
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

type Response = Promise<{
  isSubmitted: boolean;
  error: unknown;
}>;

export async function submitContactForm(data: ContactFormData): Response {
  try {
    const postUrl = process.env.CONTACT_FORM_URL;

    if (!postUrl) {
      throw new Error("Contact Form Url Not Found");
    }

    await api.post(postUrl, data);

    return { isSubmitted: true, error: null };
  } catch (error) {
    return { isSubmitted: false, error: error };
  }
}
