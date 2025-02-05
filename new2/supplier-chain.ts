class Supplier {
    constructor(public name: string, public location: string, public products: string[]) { }

    listProducts() {
        return this.products;
    }
}

class LocalSupplier extends Supplier {
    constructor(name: string, location: string, products: string[], private deliveryTime: number) {
        super(name, location, products);
    }

    estimateDelivery() {
        return `Estimated delivery: ${this.deliveryTime} days`;
    }
}

class InternationalSupplier extends Supplier {
    constructor(name: string, location: string, products: string[], private customsFee: number) {
        super(name, location, products);
    }

    calculateImportCost(price: number) {
        return `Customs fee: ${price * (this.customsFee / 100)}`;
    }
}

// Usage
const localSupplier = new LocalSupplier("XYZ Supplies", "Delhi", ["Laptops"], 3);
const internationalSupplier = new InternationalSupplier("GlobalTech", "USA", ["Monitors"], 10);

console.log(localSupplier.estimateDelivery()); // Output: Estimated delivery: 3 days
console.log(internationalSupplier.calculateImportCost(50000)); // Output: Customs fee: 5000
