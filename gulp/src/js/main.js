(function() {
    "use strict";

    var h1Elements = document.getElementsByTagName('h1');
    var h1Element = h1Elements[0];
    var classIndex = 0;
    var classNames = ['red', 'green', 'blue'];

    function changeClass() {
        classIndex++;
        if (classIndex >= classNames.length) classIndex = 0;
        h1Element.className = classNames[classIndex];
    }

    setInterval(changeClass, 1000);
})();