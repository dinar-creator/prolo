import { getLocale, getMessages } from "next-intl/server";
import { Button } from "../_components/components";

type TrackingMessages = {
  title: string;
  trackingId: string;
  message: string;
  reasons: {
    para: string;
    reasons: string[];
  };
  formatHint: string;
  actions: {
    retry: string;
    support: string;
    faq: string;
  };
};
export default async function TrackingFailure({ barcode }: { barcode: string }) {
  const locale = await getLocale();
  const page = (await getMessages()).trackingPage.failure as TrackingMessages;

  return (
    <section
      className="mt-[70px] flex min-h-[70vh] w-full flex-col items-center justify-center px-4"
      aria-label="Tracking failure notification"
    >
      {/* Failure notice */}
      <header>
        <h5 className="rounded-md bg-red-200 px-3 py-1 text-center text-sm font-medium text-red-800">
          <span className="text-lg">⚠️</span> {page.title}
        </h5>
      </header>

      {/* Barcode info */}
      {barcode && (
        <div className="mt-6">
          <h4 className="rounded-md border-2 border-dashed bg-red-400/20 px-3 py-2 text-xl font-semibold text-red-700">
            {page.trackingId}: {barcode}
          </h4>
        </div>
      )}

      {/* Explanation */}
      <h3 className="my-6 text-2xl font-bold text-red-700">{page.message}</h3>
      <div className="mb-4 w-full max-w-md text-sm text-gray-600">
        <p className="font-medium">{page.reasons.para}</p>
        <ul className="w-full list-disc">
          {page.reasons.reasons.map((res, ind) => (
            <li key={ind}>{res}</li>
          ))}
        </ul>
      </div>

      {/* Format hint */}
      <p className="mb-6 rounded-xl border-2 border-black/45 bg-blue-300/50 px-4 py-2 text-sm text-gray-500">
        {page.formatHint}
      </p>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          href={`/${locale}/tracking`}
          text={page.actions.retry}
          className="rounded-xl bg-green-500 px-4 py-2 font-medium text-white hover:bg-red-600"
        />
        <Button
          href={`/${locale}/contact`}
          text={page.actions.support}
          className="rounded-xl bg-gray-500 px-4 py-2 font-medium text-white hover:bg-gray-600"
        />
      </div>
    </section>
  );
}
