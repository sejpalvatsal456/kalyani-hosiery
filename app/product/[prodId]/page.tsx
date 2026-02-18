import ProductOverview from '@/app/_components/ProductOverview';

export default async function page(
  { params } : { params: Promise<{ prodId: string }> }
) {

  const { prodId } = await params;

  return (
    <ProductOverview prodId={prodId} />
  )
}
