"use server";
import { api } from "./api";
import { CreateShipmentFormInputs, ShipmentRequest, ApiError, ShipmentResponse } from "./types";

import { buildShipmentRequest } from "./buildShipmentRequest";

export async function createShipment(
  formData: CreateShipmentFormInputs
): Promise<ShipmentResponse | ApiError> {
  try {
    // 1. Build request body
    const reqBody: ShipmentRequest = buildShipmentRequest(formData);

    // 2. Validate env variables
    if (!process.env.COMPANY_ID) {
      return { error: "COMPANY_ID is missing in environment config" };
    }

    // 3. API call
    const response = await api.post(`/ship/request/by-email`, reqBody, {
      headers: {
        "company-id": process.env.COMPANY_ID,
      },
    });

    // 4. Return API response
    return response.data as ShipmentResponse;
  } catch (err: unknown) {
    console.log("Error in API :: ", err);
    if (typeof err === "object" && err !== null) {
      const axiosErr = err as { response?: { data?: { message?: string } } };

      const message =
        axiosErr.response?.data?.message ?? "Unknown error occurred while creating the shipment";

      return { error: `Create shipment failed: ${message}` };
    }

    // Fallback for non-object errors
    return { error: "An unexpected error occurred" };
  }
}
