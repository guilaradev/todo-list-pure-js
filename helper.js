(function (window){
    var topics =  {};

    var subscribe =  function(topic, listener) {
        // create the topic if not yet created
        if(!topics[topic]) topics[topic] = [];

        // add the listener
        topics[topic].push(listener);
    };

    var  publish =  function(topic, data) {
        // return if the topic doesn't exist, or there are no listeners
        if(!topics[topic] || topics[topic].length < 1) return;

        // send the event to all listeners
        topics[topic].forEach(function(listener) {
            listener(data || {});
        });
    }


    window.TODO = window.TODO || {};
    window.TODO.eventBus = {
        subscribe : subscribe,
        publish   : publish
    }
})(window);