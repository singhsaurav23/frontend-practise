type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
type JSONObject = { [key: string]: JSONValue };
type JSONArray = JSONValue[];

function parseJSON(json: JSONValue): {
    strings: string[];
    numbers: number[];
    arrays: JSONArray[];
} {
    const strings: string[] = [];
    const numbers: number[] = [];
    const arrays: JSONArray[] = [];

    function traverse(value: JSONValue): void {
        if (typeof value === "string") {
            strings.push(value); // Collect strings
        } else if (typeof value === "number") {
            numbers.push(value); // Collect numbers
        } else if (Array.isArray(value)) {
            arrays.push(value); // Collect arrays
            value.forEach((item) => traverse(item)); // Recursively traverse array items
        } else if (typeof value === "object" && value !== null) {
            // Recursively traverse object properties
            Object.values(value).forEach((val) => traverse(val));
        }
    }

    traverse(json); // Start traversal
    return { strings, numbers, arrays };
}

// Example usage
const json = {
    name: "John",
    age: 30,
    hobbies: ["reading", "coding"],
    address: {
        city: "New York",
        zip: 10001,
    },
    scores: [95, 89, 78],
    isActive: true,
    metadata: {
        tags: ["user", "admin"],
        details: {
            id: 123,
            notes: ["important", "urgent"],
        },
    },
};

const result = parseJSON(json);
console.log("Strings:", result.strings);
console.log("Numbers:", result.numbers);
console.log("Arrays:", result.arrays);

function toSnakeCase(obj: any): any {
    if (Array.isArray(obj)) return obj.map(toSnakeCase);
    if (typeof obj === "object" && obj !== null) {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [
                key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
                toSnakeCase(value),
            ])
        );
    }
    return obj;
}

// Example Usage:
console.log(toSnakeCase({ firstName: "John", lastName: "Doe" }));
// { first_name: "John", last_name: "Doe" }
