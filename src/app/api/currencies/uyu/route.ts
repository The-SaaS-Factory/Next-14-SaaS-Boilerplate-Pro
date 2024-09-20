import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/9bc07d54f15b8736f9866e75/latest/USD`
  );
  const data = await response.json();

  const tasaDolarEnUruguay = data.conversion_rates.UYU;

  return NextResponse.json({
    dolarCompra: tasaDolarEnUruguay,
    dolarVenta: tasaDolarEnUruguay,
  });
}
