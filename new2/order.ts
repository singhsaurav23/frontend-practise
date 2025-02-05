// Define an enum for order status
enum OrderStatus {
    Pending = "Pending",
    Confirmed = "Confirmed",
    Cancelled = "Cancelled",
}

// Order class representing a single order
class Order {
    constructor(
        public id: number,
        public amount: number,
        public status: OrderStatus = OrderStatus.Pending
    ) { }

    // Method to confirm the order
    confirmOrder(): void {
        this.status = OrderStatus.Confirmed;
    }

    // Method to cancel the order
    cancelOrder(): void {
        this.status = OrderStatus.Cancelled;
    }
}

// OrderManager class to manage multiple orders
class OrderManager {
    private orders: Order[] = [];

    // Add an order to the manager
    addOrder(order: Order): void {
        this.orders.push(order);
    }

    // Remove an order by ID
    removeOrder(orderId: number): void {
        this.orders = this.orders.filter((order) => order.id !== orderId);
    }

    // Calculate discount based on the amount
    private calculateDiscount(amount: number): number {
        if (amount < 40) {
            return 20; // Flat discount of $20
        } else if (amount >= 40 && amount <= 100) {
            return amount * 0.2; // 20% discount
        } else {
            return amount * 0.15; // 15% discount
        }
    }

    // Generate the total bill after applying discounts
    generateBill(): { totalAmount: number; totalDiscount: number; finalAmount: number } {
        let totalAmount = 0;
        let totalDiscount = 0;

        for (const order of this.orders) {
            if (order.status === OrderStatus.Confirmed) {
                totalAmount += order.amount;
                totalDiscount += this.calculateDiscount(order.amount);
            }
        }

        const finalAmount = totalAmount - totalDiscount;
        return { totalAmount, totalDiscount, finalAmount };
    }

    // Get all orders (for debugging or display purposes)
    getAllOrders(): Order[] {
        return this.orders;
    }
}

// Example usage
const order1 = new Order(1, 40);
const order2 = new Order(2, 100);
const order3 = new Order(3, 120);

const orderManager = new OrderManager();

// Add orders to the manager
orderManager.addOrder(order1);
orderManager.addOrder(order2);
orderManager.addOrder(order3);

// Confirm orders (only confirmed orders are included in the bill)
order1.confirmOrder();
order2.confirmOrder();
order3.confirmOrder();

// Generate the bill
const bill = orderManager.generateBill();
console.log("Total Amount:", bill.totalAmount);
console.log("Total Discount:", bill.totalDiscount);
console.log("Final Amount:", bill.finalAmount);

// Output all orders for debugging
console.log("All Orders:", orderManager.getAllOrders());

class Order {
    constructor(id, amount) {
        this.id = id;
        this.amount = amount;
    }
}

class OrderBill {
    constructor() {
        this.orders = [];
    }

    addOrder(order) {
        this.orders.push(order);
    }

    calculateDiscount(amount) {
        if (amount < 40) {
            return 20; // Flat discount of $20
        } else if (amount >= 40 && amount <= 100) {
            return amount * 0.20; // 20% discount
        } else if (amount > 100) {
            return amount * 0.15; // 15% discount
        }
    }

    calculateTotalBill() {
        let totalAmount = 0;
        let totalDiscount = 0;

        for (const order of this.orders) {
            totalAmount += order.amount;
            totalDiscount += this.calculateDiscount(order.amount);
        }

        const finalAmount = totalAmount - totalDiscount;
        return {
            totalAmount,
            totalDiscount,
            finalAmount
        };
    }
}

// Example usage
const order1 = new Order(1, 40);
const order2 = new Order(2, 100);

const orderBill = new OrderBill();
orderBill.addOrder(order1);
orderBill.addOrder(order2);

const billDetails = orderBill.calculateTotalBill();
console.log("Total Amount:", billDetails.totalAmount);
console.log("Total Discount:", billDetails.totalDiscount);
console.log("Final Amount:", billDetails.finalAmount);