import { getLocale, getMessages } from "next-intl/server";
import Button from "../../_components/Button";
import CopyButtonClient from "../../_components/CopyButtonClient"; // client component
import { PrintLableButton } from "../../_components/components";

type SuccessPage = {
  title: string;
  bookmarkNotice: string;
  trackingId: string;
  referenceId: string;
  actions: {
    track: string;
    print: string;
  };
};

export default async function ShipmentSuccess({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; barcode?: string }>;
}) {
  const locale = await getLocale();
  const successMessages = (await getMessages())?.createShipmentPage.success as SuccessPage;

  const { id, barcode } = await searchParams;

  return (
    <section
      className="mt-[70px] flex min-h-[70vh] w-full flex-col items-center justify-center px-4 text-center"
      aria-label="Shipment success confirmation"
    >
      {/* Bookmark notice */}
      <header>
        <h5 className="rounded-md bg-yellow-200 px-3 py-1 text-sm font-medium">
          {successMessages?.bookmarkNotice}
        </h5>
      </header>

      {/* Tracking info */}
      {barcode && (
        <div className="mt-6 flex items-center gap-2">
          <h4 className="rounded-md border-2 border-dashed bg-gray-400/20 px-3 py-2 text-xl font-semibold">
            {successMessages.trackingId} : {barcode}
          </h4>
          {/* Client-only copy button */}
          <CopyButtonClient value={barcode} />
        </div>
      )}

      {id && (
        <p className="mt-2 text-sm text-gray-600">
          {successMessages?.referenceId}: {id}
        </p>
      )}

      {/* Success message */}
      <h3 className="my-6 text-3xl font-bold text-green-700">{successMessages?.title}</h3>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          href={`/${locale}/tracking/${barcode}`}
          text={successMessages?.actions.track}
          className="bg-base1/70 hover:bg-base1 rounded-xl px-4 py-2 font-medium"
        />
        <PrintLableButton id={id} text={successMessages?.actions.print} />
      </div>
    </section>
  );
}
