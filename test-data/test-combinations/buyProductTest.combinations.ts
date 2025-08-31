import { ProductName } from "../../enums/product.enum";
import { BillingCycle } from "../../enums/billing.enum";
import { UserType } from "../../enums/user.enum";
import { DataCombinationsBuyProduct } from "../../models/parametrizedData.model";

/** Test Combinations for 'Buy Product' page tests 
 * e.g. { CLion, Organization, Yearly } or {IntelliJ, Individual, Monthly}
*/
export const testCombinationsBuyProduct: DataCombinationsBuyProduct[] = [
    {
        productName: ProductName.CLION,
        userType: UserType.INDIVIDUAL,
        billingCycle: BillingCycle.MONTHLY,
    },
    {
        productName: ProductName.CLION,
        userType: UserType.INDIVIDUAL,
        billingCycle: BillingCycle.YEARLY,
    },
    {
        productName: ProductName.CLION,
        userType: UserType.ORGANIZATION,
        billingCycle: BillingCycle.MONTHLY,
    },
    {
        productName: ProductName.CLION,
        userType: UserType.ORGANIZATION,
        billingCycle: BillingCycle.YEARLY,
    },
    {
        productName: ProductName.INTELLIJ,
        userType: UserType.INDIVIDUAL,
        billingCycle: BillingCycle.MONTHLY,
    },
    {
        productName: ProductName.INTELLIJ,
        userType: UserType.ORGANIZATION,
        billingCycle: BillingCycle.MONTHLY,
    },
    {
        productName: ProductName.INTELLIJ,
        userType: UserType.ORGANIZATION,
        billingCycle: BillingCycle.YEARLY,
    },
    {
        productName: ProductName.RUSTROVER,
        userType: UserType.INDIVIDUAL,
        billingCycle: BillingCycle.MONTHLY,
    },
    {
        productName: ProductName.RUSTROVER,
        userType: UserType.ORGANIZATION,
        billingCycle: BillingCycle.MONTHLY,
    },
    {
        productName: ProductName.RUSTROVER,
        userType: UserType.INDIVIDUAL,
        billingCycle: BillingCycle.YEARLY,
    },
    {
        productName: ProductName.RUSTROVER,
        userType: UserType.ORGANIZATION,
        billingCycle: BillingCycle.YEARLY,
    },
];