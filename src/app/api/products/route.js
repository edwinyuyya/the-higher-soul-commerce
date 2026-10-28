import { NextResponse } from "next/server";
import { PRODUCTS, BUNDLE, BUNDLE_VALUE } from "@/lib/products";

// Dibaca halaman tarot (situs statis) supaya harga tetap satu sumber.
export function GET() {
  return NextResponse.json({ products: PRODUCTS, bundle: BUNDLE, bundleValue: BUNDLE_VALUE });
}
