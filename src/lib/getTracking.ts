import { api } from "./api";
import { TrackingResponse, TrackingError } from "./types";

export async function getTracking(barcode: string): Promise<TrackingResponse | TrackingError> {
  try {
    const response = await api.get(`/guests/${process.env.COMPANY_ID}/packages/tracking`, {
      params: { barcode },
    });

    return response.data as TrackingResponse;
  } catch (error) {
    console.log("Error occured in Tracking API for barcode: ${barcode} :: ERROR :: ", error);

    return {
      error: "Failed to get shipment status",
    };
  }
}
