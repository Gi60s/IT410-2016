(function() {
    "use strict";

    var ct = document.getElementById('Main');
    var header = document.createElement('div');
    var i;
    var index;
    var location = getLocation().path;
    var navInner;
    var next;
    var pages = [];
    var page;
    var pageNum = document.createElement('div');
    var prev;
    var transition = false;

    document.addEventListener('keydown', function(event) {
        if (!event)
            event = window.event;
        var code = event.keyCode;
        if (event.charCode && code == 0)
            code = event.charCode;
        switch(code) {
            case 37: // Key left.
                event.preventDefault();
                setPage(index - 1, null);
                break;
            case 39: // Key right.
                event.preventDefault();
                setPage(index + 1, null);
                break;
        }
    });

    window.addEventListener('popstate', function(event) {
        var l = getLocation();
        if (location === l.path && !isNaN(l.query.page)) setPage(parseInt(l.query.page), null, { noPush: true });
    });

    function getLocation() {
        var match = /^([ \S]+?)(?:\?([ \S]*?))?(?:#([ \S]+))?$/.exec(window.location.href);
        var query = {};
        if (match[2]) {
            match[2].split('&').forEach(function(pair) {
                var ar = pair.split('=');
                query[ar[0]] = ar[1];
            });
        }
        return {
            hash: match[3],
            path: match[1],
            query: query
        };
    }

    function init() {
        var l = getLocation();
        var showAll = l.query.hasOwnProperty('all');

        document.body.style.overflow = 'scroll';

        ct.style.width = '888px';
        ct.style.maxWidth = '100%';
        ct.style.margin = '20px auto';

        var style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.innerHTML = 'a.disabled { opacity: .2; cursor: default; } a.disabled:hover { text-decoration: none; } ' +
            '#Main { -webkit-transition: opacity 150ms ease-in-out; -moz-transition: opacity 150ms ease-in-out; ' +
            '-ms-transition: opacity 150ms ease-in-out; -o-transition: opacity 150ms ease-in-out; ' +
            'transition: opacity 150ms ease-in-out;';
        document.body.appendChild(style);

        var nav = document.createElement('div');
        if (showAll) nav.style.display = 'none';
        nav.style.position = 'fixed';
        nav.style.top = 0;
        ct.appendChild(nav);

        navInner = document.createElement('div');
        navInner.style.width = '888px';
        navInner.style.maxWidth = '100%';
        navInner.style.margin = '0 auto';
        navInner.style.position = 'relative';
        navInner.style.backgroundColor = 'rgba(255, 255, 255, .7)';
        navInner.style.height = '1.6em';
        nav.appendChild(navInner);

        prev = document.createElement('a');
        prev.innerHTML = 'Prev';
        prev.setAttribute('href', '#');
        prev.style.marginRight = '10px';
        prev.addEventListener('click', function(e) {
            e.preventDefault();
            if (index > 0) setPage(index - 1, null);
        });
        navInner.appendChild(prev);

        next = document.createElement('a');
        next.innerHTML = 'Next';
        next.setAttribute('href', '#');
        next.addEventListener('click', function(e) {
            e.preventDefault();
            if (index < pages.length - 1) setPage(index + 1, null);
        });
        navInner.appendChild(next);

        pageNum.style.position = 'absolute';
        pageNum.style.right = 0;
        pageNum.style.top = 0;
        navInner.appendChild(pageNum);

        setPage(!isNaN(l.query.page) ? parseInt(l.query.page) : 0, l.hash, { init: true, noPush: true, all: showAll });
    }

    function makePage() {
        page = document.createElement('div');
        page.className = 'page';
        page.setAttribute('id', 'page_' + pages.length);
        pages.push(page);
    }

    function setPage(page, hash, config) {
        if (page < 1) page = 1;
        if (page > pages.length) page = pages.length;
        if (index === page) return;
        if (!config) config = {};

        transition = true;
        if (!config.init) ct.style.opacity = 0;
        setTimeout(function() {
            var hashEl;
            var hashPos;

            index = page;

            pages.forEach(function(pg, index) {
                pg.style.display = config.all || (index + 1) === page ? 'block' : 'none';
            });

            prev.className = page <= 1 ? 'disabled' : '';
            prev.setAttribute('href', '?page=' + (page > 0 ? (page - 1) : ''));

            next.className = page >= pages.length - 1 ? 'disabled' : '';
            next.setAttribute('href', '?page=' + (page < pages.length - 1 ? (page + 1) : ''));

            pageNum.innerHTML = 'Page ' + page + ' / ' + pages.length;

            if (!config.noPush) history.pushState({}, '', '?page=' + page);

            if (!hash) {
                window.scrollTo(0, 0);
            } else {
                hashEl = pages[page - 1].querySelector('#user-resources-' + hash);
                hashPos = hashEl ? hashEl.getBoundingClientRect().top : 0;
                window.scrollTo(0, hashPos - navInner.offsetHeight);
            }

            ct.style.opacity = 1;
        }, !config.init ? 0 : 150);

    }

    // pull nodes off of container and put into pages
    while (ct.firstChild) {
        if (ct.firstChild.nodeType === 1 && ct.firstChild.tagName == 'HR') {
            makePage();
            ct.removeChild(ct.firstChild);
        } else if (!page) {
            header.appendChild(ct.firstChild);
        } else {
            page.appendChild(ct.firstChild);
        }
    }

    // add pages to the container
    ct.appendChild(header);
    pages.forEach(function(page) {
        ct.appendChild(page);
    });

    // init
    init();

})();