import { SharePageView } from "@/components/SharePageView";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SharePage({ params }: Props) {
  const { id } = await params;
  return <SharePageView id={id} />;
}

