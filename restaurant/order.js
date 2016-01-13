"use strict";
var CustomError         = require('custom-error-instance');
var inventory           = require('./inventory');
var menu                = require('./menu');

var OrderError = CustomError('OrderError');

module.exports = function() {
    var done = false;
    var factory = {};
    var store = {};

    /**
     * Add an item from the menu to the order.
     * @param {string} name The name of the menu item to add.
     */
    factory.add = function(name) {
        var item = menu.get(name);
        if (done) throw new OrderError('Order has been closed.', { code: 'EDONE' });
        if (!item) throw new OrderError('Menu item does not exist: ' + name, { code: 'EDNE' });
        if (!menu.available(name)) throw new OrderError('Insufficient inventory', { code: 'EINV' });

        if (!store.hasOwnProperty(name)) store[name] = 0;
        store[name]++;

        item.ingredients.forEach(function(ingredient) {
            inventory.changeQuantity(ingredient.name, -1 * ingredient.quantity);
        });

        return factory;
    };

    factory.checkout = function() {
        done = true;
        console.log('Order complete. Income: $' + factory.cost());
    };

    factory.cost = function() {
        var total = 0;
        Object.keys(store).forEach(function(menuItemName) {
            var item = menu.get(menuItemName);
            if (item) {
                total += item.cost;
            } else {
                factory.remove(menuItemName);
            }
        });
        return total;
    };

    factory.remove = function(name) {
        var item;

        if (done) throw new OrderError('Order has been closed.', { code: 'EDONE' });
        if (!store.hasOwnProperty(name)) return;

        store[name]--;
        if (store[name] <= 0) delete store[name];

        item = menu.get(name);
        item.ingredients.forEach(function(ingredient) {
            inventory.changeQuantity(ingredient.name, ingredient.quantity);
        });

        return factory;
    };

    return factory;
};