import { getLocale } from "next-intl/server";
import Button from "../../_components/Button";
import { getMessages } from "next-intl/server";

type FailurePage = {
  title: string;
  bookmarkNotice: string;
  trackingId: string;
  referenceId: string;
  message: string;
  actions: {
    retry: string;
    support: string;
  };
};

export default async function ShipmentFailure({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; barcode?: string }>;
}) {
  const locale = await getLocale();
  const { id, barcode } = await searchParams;
  const failureMessages = (await getMessages())?.createShipmentPage.failure as FailurePage;

  return (
    <section
      className="mt-[70px] flex min-h-[70vh] w-full flex-col items-center justify-center px-4 text-center"
      aria-label="Shipment failure notification"
    >
      {/* Failure notice */}
      <header>
        <h5 className="rounded-md bg-red-200 px-3 py-1 text-sm font-medium text-red-800">
          {failureMessages.bookmarkNotice}
        </h5>
      </header>

      {/* Tracking info if available */}
      {barcode && (
        <div className="mt-6">
          <h4 className="rounded-md border-2 border-dashed bg-red-400/20 px-3 py-2 text-xl font-semibold text-red-700">
            {failureMessages.trackingId} : {barcode}
          </h4>
        </div>
      )}

      {id && (
        <p className="mt-2 text-sm text-gray-600">
          {failureMessages.referenceId} : {id}
        </p>
      )}

      {/* Failure message */}
      <h3 className="my-6 text-3xl font-bold text-red-700">{failureMessages.title}</h3>
      <p className="mb-6 max-w-md text-gray-600">{failureMessages.message}</p>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          href={`/${locale}/create-shipment`}
          text={failureMessages.actions.retry}
          className="rounded-xl bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600"
        />
        <Button
          href={`/${locale}/contact`}
          text={failureMessages.actions.support}
          className="rounded-xl bg-gray-500 px-4 py-2 font-medium text-white hover:bg-gray-600"
        />
      </div>
    </section>
  );
}
