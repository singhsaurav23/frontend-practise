class ProductCache {
    private static instance: ProductCache;
    private cache: Map<number, string>;

    private constructor() {
        this.cache = new Map();
    }

    static getInstance(): ProductCache {
        if (!ProductCache.instance) {
            ProductCache.instance = new ProductCache();
        }
        return ProductCache.instance;
    }

    fetchProduct(productId: number): string {
        if (this.cache.has(productId)) {
            return `From cache: ${this.cache.get(productId)}`;
        }
        const product = `Product ${productId}`; // Simulated API response
        this.cache.set(productId, product);
        return `Fetched from API: ${product}`;
    }
}

// Usage
const cache = ProductCache.getInstance();
console.log(cache.fetchProduct(1)); // Fetched from API: Product 1
console.log(cache.fetchProduct(1)); // From cache: Product 1
