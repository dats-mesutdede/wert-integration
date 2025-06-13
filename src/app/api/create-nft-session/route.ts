import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { currency_amount } = await request.json();

    if (!currency_amount || currency_amount < 1) {
      return NextResponse.json(
        { error: "Tutar zorunludur ve 1 USD'den büyük olmalıdır" },
        { status: 400 }
      );
    }

    const response = await fetch('https://partner-sandbox.wert.io/api/external/hpp/create-session', {
      method: 'POST',
      headers: {
        'X-Api-Key': '776572742d6465762d37333166353661372d313466332d346461622d613165372d663136316266656665343833',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        flow_type: 'simple_full_restrict',
        wallet_address: '0x2963F85d81C116DDbB853fA7032D4bdD429ea078',
        currency: 'USD',
        currency_amount: parseFloat(currency_amount),
        commodity: 'ETH',
        network: 'sepolia',
        sc_address: '0x3b2305502bd6f8b1eb2ed474ac15c61c6702b18b',
        sc_input_data: '0x9dae76ea000000000000000000000000000000000000000000000000000000000000003700000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001'
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Session oluşturulamadı" },
        { status: response.status }
      );
    }

    return NextResponse.json({ sessionId: data.sessionId });
  } catch (error) {
    console.error("Session oluşturma hatası:", error);
    return NextResponse.json(
      { error: "Session oluşturulurken bir hata oluştu" },
      { status: 500 }
    );
  }
} 