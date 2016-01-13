"use strict";
var inventory           = require('./inventory');
var menu                = require('./menu');
var order               = require('./order');

inventory.add('apple', 10);
inventory.add('pie crust', 2);

menu.add('apple pie', 2.5, [
    {
        name: 'apple',
        quantity: 3
    },
    {
        name: 'pie crust',
        quantity: 1
    }
]);

order().add('apple pie').checkout();
console.log(inventory.get('apple').quantity);
console.log(inventory.get('pie crust').quantity);