import axios from "axios";
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

type Response = Promise<{
  isSubmitted: boolean;
  error: unknown;
}>;

export async function SubmitSubscriptionForm(data: { email: string }): Response {
  try {
    const postUrl = process.env.SUBSCRIPTION_FORM_URL;

    if (!postUrl) {
      throw new Error("Form Url Not Found");
    }

    await api.post(postUrl, data);

    return { isSubmitted: true, error: null };
  } catch (error) {
    return { isSubmitted: false, error: error };
  }
}
