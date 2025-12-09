import { GetAQouteForm } from "../../_components/components";
export default async function GetAQoutePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <GetAQouteForm slug={slug} />;
}
