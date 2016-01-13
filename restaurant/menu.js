"use strict";
var CustomError         = require('custom-error-instance');
var is                  = require('./is');
var inventory           = require('./inventory');

var MenuError = CustomError('MenuError');
var store = {};

/**
 * Add an item to the menu.
 * @param {string} name The menu item name.
 * @param {number} cost The cost of the item.
 * @param {{ name: string, quantity: number}[]} ingredients The needed ingredients to make the item.
 */
exports.add = function(name, cost, ingredients) {
    if (store.hasOwnProperty(name)) throw new MenuError('Item already registered.', { code: 'EEXIST' });
    if (!is.nonNegativeNumber(cost)) throw new MenuError('Cost must be a non-negative number.', { code: 'ECOST' });

    ingredients.forEach(function(ingredient) {
        if (!inventory.has(ingredient.name)) throw new MenuError('Inventory does not have needed ingredient: ' + ingredient, { code: 'EINV' });
    });

    store[name] = {
        name: name,
        cost: cost,
        ingredients: ingredients
    };
};

/**
 * Check to see if a menu item is available by checking if all ingredients are available in inventory.
 * @param {string} name The menu item name.
 * @returns {boolean}
 */
exports.available = function(name) {
    if (!store.hasOwnProperty(name)) return false;
    return store[name].ingredients.every(function(value) {
        var ingredient = inventory.get(value.name);
        return ingredient && ingredient.quantity >= value.quantity;
    });
};

/**
 * Get a menu item's data.
 * @param {string} name The menu item name.
 * @returns {object}
 */
exports.get = function(name) {
    return store.hasOwnProperty(name) ? Object.assign({}, store[name]) : null;
};

/**
 * Remove a menu item.
 * @param {string} name The menu item name.
 */
exports.remove = function(name) {
    delete store[name];
};