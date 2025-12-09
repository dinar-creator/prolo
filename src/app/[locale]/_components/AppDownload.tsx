import Link from "next/link";
import Image from "next/image";
import { getMessages } from "next-intl/server";

export default async function AppDownload({ qr = true }: { qr?: boolean }) {
  const appDownload = (await getMessages()).appDownload;

  return (
    <div>
      <h4 className="mb-2 text-lg font-bold">{appDownload?.title}</h4>
      {qr && (
        <div className="mt-4 size-[100px]">
          <Image
            src={"/icons/qr.svg"}
            width={100}
            height={100}
            alt="QR scanner"
            className="rounded-md"
          />
        </div>
      )}
      <Link href={appDownload.playstore} className="mt-4 block w-[100px]">
        <Image
          src={"/icons/playstore.svg"}
          width={100}
          height={100}
          alt="Playstore Prolo App Link"
        />
      </Link>
      <Link href={appDownload.appstore} className="mt-2 block w-[100px]">
        <Image
          src={"/icons/appstore.svg"}
          width={100}
          height={100}
          alt="Playstore Prolo App Link"
        />
      </Link>
    </div>
  );
}
