export default async function NewsByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div>NewsByIdPage {id}</div>;
}
