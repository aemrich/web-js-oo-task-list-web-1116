'use strict';
// Tasks Controller
class TasksController{
  constructor(){
    this.$addTaskForm = $('#add_task')
    this.$taskDescriptionInput = $('#task_description')
    this.$selectListMenu = $('#select_list')
    this.$taskPriorityInput = $('#task_priority')
    this.$wrapper = $('#wrapper')
  }

  init(){
    var thisClass = this
    this.$addTaskForm.on('submit', function(evt) {
      evt.preventDefault()
      let desc = thisClass.$taskDescriptionInput.val()
      let priority = thisClass.$taskPriorityInput.val()
      let selector = parseInt(thisClass.$selectListMenu.val(), 10)

      let task = new Task(desc, priority, List.all[selector])
      $(document).find(`#list-${selector}`).append(`<li data-id="${task.id}"><button class="destroy-task">x</button>${desc}, ${priority}</li>`)

      var $taskDestroyButton = $(this).parent().find('button.destroy-task')
      $taskDestroyButton.on("click", function onDestroy(evt){
        evt.preventDefault()
        $(this).parent().remove()
        List.all[selector]['tasks'][task.id] = null
      })
    })
  }

}
