import OrderForm from "@/components/OrderForm";
import { PRODUCTS, BUNDLE } from "@/lib/products";

export const metadata = {
  title: "Order — The Higher Soul Blueprint",
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
            <h2 style={{ textAlign: "center" }}>Isi Data untuk Blueprint-mu</h2>
            <OrderForm initialItems={initial} />
          </div>
        </div>
      </div>
    </>
  );
}
