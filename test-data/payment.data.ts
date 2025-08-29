import { CreditCardDetails } from "../models/payment.model";

export const creditCardDetails: CreditCardDetails = {
    cardNumber: '2223 0000 4841 0010',
    expiryDate: '0330',
    securityCode: '737',
    nameOnCard: 'John Doe'
};

export const creditCardDetailsInvalid: CreditCardDetails = {
    cardNumber: '5555 3412 4444 1111',
    expiryDate: '0320',
    securityCode: '737',
    nameOnCard: 'John Doe'
};

export const payPalDetails = {
    username: '',
    password: ''
};