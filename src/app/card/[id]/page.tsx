import { CardPageView } from "@/components/CardPageView";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CardPage({ params }: Props) {
  const { id } = await params;
  return <CardPageView id={id} />;
}

