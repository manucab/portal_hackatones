let t = [1, 2, 3, 4];
let l = [2, 3];

let res = t.filter((i, index) => !l.includes(i));

console.log(res);