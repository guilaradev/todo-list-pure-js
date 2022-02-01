
const dataCriation = new Date();
let hora =  dataCriation.getHours();
let minutos = dataCriation.getMinutes();
let segundos = dataCriation.getSeconds();

(function(window) {
    function View() {
        this.todoTemplate = '<input type="checkbox" class="form-check-input is-completed" />' +
            '<span>{{todoVal}}   </span>  || Criado as  '+ hora +':'+ minutos+':'+segundos;

        this.$todoVal = document.getElementById('todo-value');
        this.$todolist = document.getElementsByClassName('todo-list')[0];
        this.$delete = document.getElementById('delete');

        //event listners
        this.$todoVal.addEventListener('change', this.addTemplate.bind(this));
        this.$todolist.addEventListener('click', this.changeTodoStatus.bind(this));
        this.$delete.addEventListener('click', this.removeCompletedTodo.bind(this));

        return this;
    }

//Event handlers
    View.prototype.addTemplate = function (e) {
        // TODO.controller.addTemplate(e.target.value);
        TODO.eventBus.publish("addTemplate",e.target.value);
    };

    View.prototype.changeTodoStatus = function (e) {
        if (e.target.classList.contains('is-completed')) {
            var index = this.getIndex(e.target, e.target.parentElement.parentElement);
            TODO.eventBus.publish("toggleTodo",{index:index, isDone:e.target.checked});
        }
    };
    View.prototype.removeCompletedTodo = function (e) {
        TODO.eventBus.publish("removeCompletedTodo");
    };


//render view method will handle adding /removing and hashchange updates
    View.prototype.renderView = function (type, obj) {
        if (type === 'add') {
            var $div = document.createElement('DIV');
            $div.innerHTML = this.todoTemplate.replace('{{todoVal}}', obj.value);
            // var renderTemplate =

            this.$todolist.appendChild($div);
            this.$todoVal.value = '';
            location.hash = '#/all';
        } else if (type === 'hash') {
            var $allItems = document.getElementsByClassName('is-completed');

            for (var i = 0; i < $allItems.length; i++) {

                if (!$allItems[i].checked && obj === 'completed') {
                    $allItems[i].parentElement.style.display = 'none';
                } else {
                    $allItems[i].parentElement.style.display = 'block';
                }
            }
        } else if (type === 'clear') {
            this.$todolist.innerHTML = ' ';
            var arrTodo = TODO.model.arrTodo;
            for (var i = 0; i < arrTodo.length; i++) {
                this.renderView('add', {value: arrTodo[i].value, isDone: false});
            }
        }
    };

    View.prototype.getIndex = function (ele, parent) {
        var index;

        for (var i = 0; i < parent.children.length; i++) {
            if (parent.children[i] == ele.parentElement) {
                index = i;
            }
        }
        return index;
    };

    window.TODO = window.TODO || {};
    window.TODO.view = new View();
})(window);