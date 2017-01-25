'use strict';
describe('Task Model', function() {

  describe('Instance Properties', function() {

    var list, task;
    beforeEach(function() {
      emptyArr(List.all); // for deleting instances between tests
      list = new List('Jon\'s List');
      task = new Task('Walk the dog', 'high', list);
    });

    describe('Properties from initialization', function() {
      it('should take a description when the task is created', function() {
        expect(task.description).toBe('Walk the dog');
      });

      it('should be assigned a priority when a new Task is created', function() {
        expect(task.priority).toBe('high');
      });

      it('should be assigned to a list when a new Task is created', function() {
        expect(task.list.title).toBe('Jon\'s List');
      });

      it('should add itself to the list\'s tasks array', function() {
        expect(list.tasks[0]).toBe(task);
      });

      it('should be assigned an autoincremented id when a new Task is created based on the length of the list.tasks array', function() {
        var newTask = new Task('Walk the dog again', 'high', list);
        expect(task.id).toBe(0);
        expect(newTask.id).toBe(1);
      });
    });

    describe('creating new task elements', function() {
      it('the el method should create a string representing the li', function() {
        var anotherTask = new Task('give the dog a bath', 'high', list),
            expectedString1 = '<li data-id="0"><button class="destroy-task">x</button> Walk the dog, high</li>',
            expectedString2 = '<li data-id="1"><button class="destroy-task">x</button> give the dog a bath, high</li>';
        expect(task.liEl()).toEqual(expectedString1);
        expect(anotherTask.liEl()).toEqual(expectedString2);
      });

      it('the build method should append the el string the tasks corresponding list', function() {
        setFixtures('<div class="list"><h2><button class="destroy-list">x</button> Jon\'s List</h2><ul id="list-0" data-id="0"></ul></div>');
        task.build();
        expect($('#list-0 li').length).toEqual(1);
      });
    }); // end creating new task elements

  }); //end Instance Properties

}); //end Task model tests
