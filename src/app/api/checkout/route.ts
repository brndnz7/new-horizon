import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation des données de base
    const { amount, currency = 'EUR' } = body;
    
    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: 'Montant invalide' },
        { status: 400 }
      );
    }

    // Log de la demande de checkout
    console.log('=== NOUVEAU CHECKOUT DEMANDÉ ===');
    console.log('Montant:', amount, currency);
    console.log('Date:', new Date().toISOString());
    console.log('================================');

    // Simulation d'une session Stripe
    const mockSessionId = `cs_test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Simulation d'un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 200));

    return NextResponse.json(
      { 
        sessionId: mockSessionId,
        checkoutUrl: `https://checkout.stripe.com/c/pay/${mockSessionId}`,
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors de la création de la session de checkout:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la session de paiement' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Endpoint de checkout - utilisez POST pour créer une session' },
    { status: 200 }
  );
} 