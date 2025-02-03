//@ts-ignore
Array.prototype.myMap= function <T, U>(callback: (value: T, index: Number, array: T[]) => U): U[] {
    let res: U[] = []
    for (i = 0; i < this.length; i++) {
        res.push(callback(this[i], i, this));
    }
    return res;
};

let arra: any= [1, 2, 3];
console.log(arra.myMap((ar) => ar * 2))

