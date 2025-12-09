import axios from "axios";
import type { CreateShipmentFormData } from "./types";
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

type Response = Promise<{
  isSubmitted: boolean;
  error: unknown;
}>;

export async function submitCreateShipmentForm(data: CreateShipmentFormData): Response {
  try {
    const postUrl = process.env.CREATE_SHIPMENT_FORM_URL;

    if (!postUrl) {
      throw new Error("Create Shipment Form Url Not Found");
    }

    await api.post(postUrl, data);

    return { isSubmitted: true, error: null };
  } catch (error) {
    return { isSubmitted: false, error: error };
  }
}
