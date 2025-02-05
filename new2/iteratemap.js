// Creating a map using Map object
let newMap = new Map();

// Adding values to the map
newMap.set("Monday", 1);
newMap.set("Tuesday", 2);
newMap.set("Wednesday", 3);

// Logging map object to console
newMap.forEach((values, keys) => {
    console.log(values, keys);
});

let newMap = new Map()

newMap.set("Cricket", "sport");
newMap.set("Apple", "fruit");

for (let [key, value] of newMap) {
    console.log(key + " is " + value);
}

let myMap = new Map([['a', 1],
['b', 3], ['d', 10]])
let keys = myMap.keys();

while (true) {
    let result = keys.next();
    if (result.done) break;
    console.log(result.value);
}

function iterateMap() {
    let myMap = new Map();
    myMap.set("Cricket", "sport");
    myMap.set("Apple", "fruit");

    Array.from(myMap.entries()).forEach(([key, value]) => {
        console.log(key + " is " + value);
    });
}

iterateMap();