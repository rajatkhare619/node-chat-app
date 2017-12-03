const moment = require('moment');

let date = moment();
date.add(1, 'years').subtract(9, 'year').subtract(3, 'hours').subtract(50, 'minute');
console.log(date.format('Do MMMM, YYYY h:mm a'));