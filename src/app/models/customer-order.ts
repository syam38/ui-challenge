export interface ICustomerOrder {
    id: string;
    recipient: IRecipient;
    created_at: string;
    items: IItem[];
    delivery: IDelivery;
    charge_customer: IChargeCustomer;
}

interface IRecipient {
    name: string;
    email: string;
}

export interface IItem {
    id: string;
    name: string;
    quantity: number;
    total_price: ITotalPrice;
}

interface ITotalPrice {
    currency: string;
    amount: string;
}

interface IDelivery {
    courier: string;
    method: string;
}

interface IChargeCustomer {
    currency: string;
    total_price: string;
}