import { ApiError, ReportFile } from "./types";
import { api } from "./api";

export async function printLabel({ id }: { id: string }): Promise<ApiError | ReportFile> {
  try {
    const reqBody = {
      ids: [id],
    };

    const response = await api.post(`/guests/${process.env.COMPANY_ID}/packages/pdf`, reqBody);

    return response.data as ReportFile;
  } catch (err) {
    console.log(err);

    return { error: "Unable to get label link" };
  }
}
