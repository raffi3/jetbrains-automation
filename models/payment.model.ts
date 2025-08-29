export interface CreditCardDetails { 
    cardNumber: string
    expiryDate: string
    securityCode: string
    nameOnCard: string
}

export type AdyenField = "card number" | "expiry date" | "security code" | "name on card"; 