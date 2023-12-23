const todoList = require("../todo");
const { all, markAsComplete, add, overdue,dueToday,dueLater } = todoList();
const day = new Date(); 
const OD = 60 * 60 * 24 * 1000;


describe("todoList", () => {
  beforeAll(() => {
    const day =  new Date();
    
    add({
      title: "todo",
      completed: false,
      dueDate: new Date(day.getTime() - 1 * OD).toLocaleDateString("en-CA",),
    });

    add({
      title: "todo1",
      completed: false,
      dueDate: new Date(day.getTime() + 1 * OD).toLocaleDateString("en-CA",),

    });
    add({
      title: "todo2",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

  });
  test("Should add new todo", () => {
    const TodoItems = all.length;
    add({
      title: "todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toBe(TodoItems + 1);
  });

  test("should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("checks return a list of overdue todos", () => {
    const OverDueTodoItems =overdue().length;
    add({
        title: "todo",
        completed: false,
        dueDate: new Date(day.getTime() - 1 * OD).toLocaleDateString("en-CA",),
      });
    expect(overdue().length).toEqual(OverDueTodoItems+1) 
  });

  test("checks return a list of todos due today", () => {
    const DueTodayTodoItems =dueToday().length;
    add({
        title: "todo2",
        completed: false,
        dueDate: new Date().toLocaleDateString("en-CA"),
      });
    expect(dueToday().length).toEqual(DueTodayTodoItems+1) ;
  });

  test("checks return a list of todos due later", () => {
    const DueLaterTodoItems =dueLater().length;
    add({
        title: "todo3",
        completed: false,
        dueDate: new Date(day.getTime() + 2 * OD).toISOString().slice(0, 10),
      });

    expect(dueLater().length).toEqual(DueLaterTodoItems+1);
  });
});
//END
