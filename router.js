
(function(window) {
    window.onload = function(){
        window.addEventListener('hashchange', TODO.controller.handleHash);
    };
})(window);