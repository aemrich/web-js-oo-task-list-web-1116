'use strict';
describe('Lists Controller', function() {

  var listsController;
  beforeEach(function() {
    setFixtures('<body><div id="wrapper"><h1>my task list</h1><form id="add_list" action="#" methos="post"><label for="list_title">Add a new list:</label><input type="text" id="list_title" name="list_title" placeholder="title"><input type="submit" value="(+) add"></form><form id="add_task" action="#" method="post"><label for="select_list">Select List:</label><select id="select_list" name="select_list"></select><label for="task_description">Task description:</label><input type="text" id="task_description" name="task_description" placeholder="description"><label for="task_priority">Priority level:</label><input type="text" id="task_priority" name="task_priority" placeholder="priority"><input type="submit" value="(+) add"></form><section id="lists"></section></div></body>');
    preventDefaultOnForms(); // prevents forms from submitting during tests
    deleteLists(); // deletes any lists and their tasks
    listsController = new ListsController();
  });

  describe('creating a new List Controller', function() {
    it('should have a $addListForm property that holds a selected element with the id \'#add_list\'', function() {
      expect(listsController.$addListForm).toEqual($('#add_list'));
    });
    it('should have a $listTitleInput property that holds a selected element with the id \'#list_title\'', function() {
      expect(listsController.$listTitleInput).toEqual($('#list_title'));
    });
    it('should have a $selectListMenu property that holds a selected element with the id \'#select_list\'', function() {
      expect(listsController.$selectListMenu).toEqual($('#select_list'));
    });
    it('should have a $addTaskForm property that holds a selected element with the id \'#add_task\'', function() {
      expect(listsController.$addTaskForm).toEqual($('#add_task'));
    });
    it('should have a $wrapper property that holds a selected element with the id \'#wrapper\'', function() {
      expect(listsController.$wrapper).toEqual($('#wrapper'));
    });
  });

  describe('#init (note you can always use #init as a delegator...)', function() {
    beforeEach(function(){
      listsController.init();
    });

    it('should hide the add task form', function() {
      expect(listsController.$addTaskForm.css('display')).toEqual('none');
    });

    it('should display the add task form when a list is created', function() {
      $('#add_list input:first').val('grocerries');
      submitListForm();
      expect(listsController.$addTaskForm.css('display')).toEqual('block');
    });

    it('should have added listener for creating new lists', function() {
      $('#add_list input:first').val('grocerries');
      submitListForm();
      expect($('#lists .list').length).toEqual(1);
      expect($('#lists .list').find('h2').text()).toEqual('x grocerries');
    });

    it('should have added a live event listener for deleting lists', function() {
      $('#add_list input:first').val('grocerries');
      submitListForm();
      $('#add_list input:first').val('more grocerries');
      submitListForm();
      expect($('#lists .list').length).toEqual(2);
      $('#lists .list').first().find('h2 button').click();
      expect($('#lists .list').length).toEqual(1);
      $('#lists .list').first().find('h2 button').click();
      expect($('#lists .list').length).toEqual(0);
    });
  });
});
