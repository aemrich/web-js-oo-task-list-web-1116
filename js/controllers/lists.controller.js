'use strict';
// Lists Controller

class ListsController {
  constructor() {
    this.$addListForm = $('#add_list')
    this.$listTitleInput = $('#list_title')
    this.$selectListMenu = $('#select_list')
    this.$addTaskForm = $('#add_task')
    this.$wrapper = $('#wrapper')
  }

  init() {
    var thisClass = this
    this.$addTaskForm.hide()

    this.$addListForm.on("submit", function onSubmit(evt) {
      evt.preventDefault()
      thisClass.$addTaskForm.show()

      appendList(this, thisClass)
    })

    function appendList(thisList, thisClass) {
      let title = thisClass.$listTitleInput.val()

      let list = new List(title)
      var $listsSection = $(thisList).parent().children('#lists')

      $listsSection.append(list.listEl())

      thisClass.$selectListMenu.append(`<option value="${list.id}" >${title}</option>`)

      var $destroyButton = $(thisList).parent().find('button.destroy-list')
      $destroyButton.on("click", function onDestroy(evt){
        evt.preventDefault()
        debugger
        // thisClass.$selectListMenu.children(`option`).attr(`value=${list.id}`).remove()

        // for(var i = 0; i < selector.length; i++){
        //     var temp = selector[i].getAttribute('value')
        // 	if( parseInt(temp) === list.id){
        //        console.log('true')
        // 	} else {
        //     	console.log('false')
        // 	}
        // }

        $(this).parent().parent().remove()
      })
    }
  }
}
