"use strict";


function add(a, b, filter) {
    if (arguments.length < 2) b = 0;
    console.log(a + b);

    if (arguments.length < 3) filter = function(path, type) { return true; };

}

add(5);
add(10, 5);,