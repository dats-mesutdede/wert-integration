import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { currency_amount } = await request.json();

    if (!currency_amount || currency_amount < 1) {
      return NextResponse.json(
        { error: 'Tutar zorunludur ve 1 USD\'den büyük olmalıdır' },
        { status: 400 }
      );
    }

    const response = await fetch('https://partner-sandbox.wert.io/api/external/hpp/create-session', {
      method: 'POST',
      headers: {
        'X-Api-Key': '776572742d6465762d37333166353661372d313466332d346461622d613165372d663136316266656665343833', // Wert'ten alınan API key
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        flow_type: 'simple_full_restrict',
        phone: "+905548443072",
        wallet_address: '0x2963F85d81C116DDbB853fA7032D4bdD429ea078',
        currency: 'USD',
        commodity: 'TT',
        network: 'amoy',
        currency_amount: parseFloat(currency_amount),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Wert API Hatası:', data);
      return NextResponse.json(
        { error: data.message || 'Session oluşturulamadı' },
        { status: response.status }
      );
    }

    if (!data.sessionId) {
      console.error('Session ID bulunamadı:', data);
      return NextResponse.json(
        { error: 'Session ID alınamadı' },
        { status: 500 }
      );
    }

    return NextResponse.json({ sessionId: data.sessionId });
  } catch (error) {
    console.error('Session oluşturma hatası:', error);
    return NextResponse.json(
      { error: 'Session oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
} 