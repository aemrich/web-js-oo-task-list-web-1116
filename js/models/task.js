'use strict';
// Task Model

class Task {
  constructor(description, priority, list) {
    this.description = description
    this.priority = priority
    this.list = list
    this.list.tasks.push(this)
    this.id = (this.list.tasks.length-1)
  }

  liEl(){
    return `<li data-id="${this.id}"><button class="destroy-task">x</button> ${this.description}, ${this.priority}</li>`
  }

  build(){
    $(`#list-${this.list.id}`).append(this.liEl())
  }
}
