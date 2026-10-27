import { NextResponse } from "next/server";
import { PRODUCTS, BUNDLE, SINGLES_TOTAL } from "@/lib/products";

// Dibaca halaman tarot (situs statis) supaya harga tetap satu sumber.
export function GET() {
  return NextResponse.json({ products: PRODUCTS, bundle: BUNDLE, singlesTotal: SINGLES_TOTAL });
}
