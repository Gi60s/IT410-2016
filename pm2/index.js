console.log("I'm running");
setInterval(function() {
    if (Math.random() < 0.2) throw Error('Crash!');
    console.log('Still running');
}, 1000);