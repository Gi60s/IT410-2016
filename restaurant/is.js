
exports.integer = function(value) {
    return value === Math.round(value);
};

exports.nonNegativeInteger = function(value) {
    return exports.nonNegativeNumber(value) && exports.integer(value);
};

exports.nonNegativeNumber = function(value) {
    return exports.number(value) && value >= 0;
};

exports.number = function(value) {
    return typeof value === 'number' && !isNaN(value);
};