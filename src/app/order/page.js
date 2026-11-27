import OrderForm from "@/components/OrderForm";
import { PRODUCTS, BUNDLE } from "@/lib/products";

export const metadata = {
  title: "Pesan · The Higher Soul",
};

export default function OrderPage({ searchParams }) {
  const initial = String(searchParams?.items || "")
    .split(",")
    .filter((id) => id === BUNDLE.id || PRODUCTS.some((p) => p.id === id));

  return (
    <>
      <header className="site-header">
        <div className="wrap header-inner">
          <a className="logo" href="/">
            The Higher Soul
          </a>
        </div>
      </header>

      <div className="order-page">
        <div className="wrap">
          <div className="order-card">
            <h2>Pesananmu</h2>
            <OrderForm initialItems={initial} />
          </div>
        </div>
      </div>
    </>
  );
}
