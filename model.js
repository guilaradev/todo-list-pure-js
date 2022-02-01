
(function(window) {
    function Model() {
        this.arrTodo = [];
        this.addTodo = function (todo) {
            this.arrTodo.push(todo);
        };

        this.updateTodo = function (index, isDone) {
            this.arrTodo[index].isDone = isDone;
        };

        this.removeCompletedTodo = function () {
            this.arrTodo = this.arrTodo.filter(function (obj) {
                return !obj.isDone;
            });
        };
    }
    window.TODO = window.TODO || {};
    window.TODO.model =  new Model();
})(window);

