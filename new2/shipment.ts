class Shipment {
    private status: string;
    private observers: ((status: string) => void)[];

    constructor(private orderId: number) {
        this.status = "pending";
        this.observers = [];
    }

    subscribe(observer: (status: string) => void) {
        this.observers.push(observer);
    }

    updateStatus(newStatus: string) {
        this.status = newStatus;
        this.observers.forEach(observer => observer(newStatus));
    }
}

class Customer {
    constructor(private name: string) { }

    notify(status: string) {
        console.log(`${this.name}, your order status is now: ${status}`);
    }
}

// Usage
const shipment = new Shipment(5001);
const customer = new Customer("Alice");
shipment.subscribe(customer.notify.bind(customer));
shipment.updateStatus("shipped"); // Output: Alice, your order status is now: shipped
