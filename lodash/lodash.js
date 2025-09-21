const _ = require('lodash');


const array = [1, 2, undefined, 3, 4, undefined];


_.pull(array, undefined);
 _.remove(array,(n) => n % 2 === 0);

console.log( array);
