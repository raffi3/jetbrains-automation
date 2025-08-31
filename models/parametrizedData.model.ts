import { BillingCycle } from "../enums/billing.enum";
import { PaymentMethod } from "../enums/payment.enum";
import { ProductName } from "../enums/product.enum";
import { UserType } from "../enums/user.enum";

export interface DataCombinationsBuyProduct {
    productName: Exclude<ProductName, ProductName.ALL_PRODUCTS | ProductName.AI_PRO>;
    userType: UserType;
    billingCycle: BillingCycle;
    paymentMethod?: PaymentMethod;
}