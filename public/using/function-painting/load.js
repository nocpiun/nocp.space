(function(window) {

    window.onload = function() {
        var js_elems = document.getElementsByTagName("script");
        var css_elems = document.getElementsByTagName("link");
        for(let i in js_elems) {
            js_elems[i].src += "?"+ Math.floor(Math.random() * (9999999 - 100000) + 100000);
        }
        for(let i in css_elems) {
            if(css_elems[i].rel == "stylesheet") {
                css_elems[i].href += "?"+ Math.floor(Math.random() * (9999999 - 100000) + 100000);
            }
        }
    };
    
})(window);
