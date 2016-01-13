"use strict";
var CustomError         = require('custom-error-instance');
var is                  = require('./is');

var InventoryError = CustomError('InventoryError');
var store = {};

/**
 * Add a new inventory item.
 * @param {string} name The name of the inventory item.
 * @param {number} quantity The initial quantity.
 */
exports.add = function(name, quantity) {
    if (store.hasOwnProperty(name)) throw new InventoryError('Item already registered.', { code: 'EEXIST' });
    if (!is.nonNegativeInteger(quantity)) throw new InventoryError('Quantity must be a non-negative integer.', { code: 'EQTY' });
    store[name] = {
        name: name,
        quantity: quantity
    };
};

/**
 * Change the quantity of the inventory item by a specific amount.
 * @param {string} name The name of the inventory item.
 * @param {number} difference The change in quantity.
 * @returns {number} the new quantity.
 */
exports.changeQuantity = function(name, difference) {
    if (!store.hasOwnProperty(name)) throw new InventoryError('Item does not exist.', { code: 'EDNE' });
    if (!is.integer(difference)) throw new InventoryError('Invalid change in quantity. It must be an integer.', { code: 'EQTY' });
    if (store[name].quantity + difference < 0) throw new InventoryError('Insufficient quantity.', { code: 'EQTY' });
    store[name].quantity += difference;
    return store[name].quantity;
};

/**
 * Get the status of an inventory item.
 * @param {string} name The name of the inventory item.
 * @returns {object}
 */
exports.get = function(name) {
    if (!store.hasOwnProperty(name)) return null;
    return Object.assign({}, store[name]);
};

/**
 * Check to see if inventory has an item with the specified name.
 * @param {string} name The name of the inventory item.
 * @returns {boolean}
 */
exports.has = function(name) {
    return store.hasOwnProperty(name);
};

/**
 * Completely remove an inventory item from the system.
 * @param {string} name The name of the inventory item.
 */
exports.remove = function(name) {
    delete store[name];
};