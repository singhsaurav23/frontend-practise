class Inventory {
    private products: Map<number, { name: string; quantity: number; price: number }>;

    constructor() {
        this.products = new Map();
    }

    addProduct(id: number, name: string, quantity: number, price: number) {
        if (this.products.has(id)) {
            console.log("Product already exists.");
            return;
        }
        this.products.set(id, { name, quantity, price });
    }

    updateStock(id: number, amount: number) {
        if (!this.products.has(id)) {
            console.log("Product not found.");
            return;
        }
        this.products.get(id)!.quantity += amount;
    }

    getTotalInventoryValue(): number {
        return Array.from(this.products.values()).reduce(
            (total, product) => total + product.quantity * product.price,
            0
        );
    }
}

// Usage
const inventory = new Inventory();
inventory.addProduct(1, "Laptop", 10, 50000);
inventory.addProduct(2, "Monitor", 5, 15000);
inventory.updateStock(1, 5);
console.log(inventory.getTotalInventoryValue()); // Output: 625000

