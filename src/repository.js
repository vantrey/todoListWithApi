export const repository = {
  saveTodoLists(todoLists) {
    let stateAsString = JSON.stringify(todoLists)
    localStorage.setItem("todoListState", stateAsString)
  },
  getTodoLists() {
    let stateAsString = localStorage.getItem("todoListState")
    if (stateAsString != null) {
      let state = JSON.parse(stateAsString)
      return state
    }
    return null
  }
}