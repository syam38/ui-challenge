import { ICustomerOrder, IItem } from './customer-order';

export class CustomerOrderTable {
    recipientName: string;
    emailAddress: string;
    totalPrice: number;
    orderedDate: Date;
    deliveryDetails: string;
    itemNames: string;
    totalChargeForDelivery = 0;

    constructor(customerOrder: ICustomerOrder) {
        this.recipientName = customerOrder.recipient.name;
        this.emailAddress = customerOrder.recipient.email;
        this.totalPrice = this.getTotalPrice(customerOrder.items);
        this.orderedDate = new Date(customerOrder.created_at);
        this.deliveryDetails = customerOrder.delivery.courier + ' (' + customerOrder.delivery.courier + ')';
        this.itemNames = this.getAllItemNames(customerOrder.items);
        this.totalChargeForDelivery += parseFloat(customerOrder.charge_customer.total_price);
    }

    getTotalPrice(items: IItem[]): number {
        return items.map((item) => item.total_price).map((tp) => parseFloat(tp.amount)).reduce((a, b) => a + b, 0);
    }

    getAllItemNames(items: IItem[]): string {
        return items.map((item) => item.name).toString();
    }

}
