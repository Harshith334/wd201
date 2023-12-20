/* eslint-disable no-undef */
const todoList = () => {
  all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    // Write the date check condition here and return the array
    // of overdue items accordingly.
    let dt = new Date();
    dt = dt.toISOString().split("T")[0];
    arr = [];
    all.forEach((i) => {
      if (i.dueDate < dt) arr.push(i);
    });
    return arr;
  };

  const dueToday = () => {
    // Write the date check condition here and return the array
    // of todo items that are due today accordingly.
    let dt = new Date();
    dt = dt.toISOString().split("T")[0];
    arr = [];
    all.forEach((i) => {
      if (i.dueDate == dt) arr.push(i);
    });
    return arr;
  };

  const dueLater = () => {
    // Write the date check condition here and return the array
    // of todo items that are due later accordingly.
    let dt = new Date();
    dt = dt.toISOString().split("T")[0];
    arr = [];
    all.forEach((i) => {
      if (i.dueDate > dt) arr.push(i);
    });
    return arr;
  };

  const toDisplayableList = (list) => {
    // Format the To-Do list here, and return the output string
    // as per the format given above.
    let dt = new Date();
    dt = dt.toISOString().split("T")[0];
    arr = [];
    list.forEach((i) => {
      if (i.completed && i.dueDate != dt) {
        arr.push(`[x]` + ` ` + i.title + ` ` + i.dueDate);
      } else if (i.completed && i.dueDate == dt) {
        arr.push(`[x]` + ` ` + i.title);
      } else if (i.completed == false && i.dueDate == dt) {
        arr.push(`[ ]` + ` ` + i.title);
      } else {
        arr.push(`[ ]` + ` ` + i.title + ` ` + i.dueDate);
      }
    });
    return arr.join("\n").toString();
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};


module.exports = todoList;
