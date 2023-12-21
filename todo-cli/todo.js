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
    let s = new Date();
    s = s.toISOString().split("T")[0];
    array = [];
    all.forEach((i) => {
      if (i.dueDate < s) array.push(i);
    });
    return array;
  };
const dueToday = () => {
    let s = new Date();
    s = s.toISOString().split("T")[0];
    array = [];
    all.forEach((i) => {

      if (i.dueDate == s) array.push(i);
    });
    return array;
  };
const dueLater = () => {
    let s = new Date();
    s = s.toISOString().split("T")[0];
    array = [];
    all.forEach((i) => {
      
      if (i.dueDate > s) array.push(i);
    });
    return array;
  };
const toDisplayableList = (list) => {
    let s = new Date();
  
    s = s.toISOString().split("T")[0];
    array = [];
    list.forEach((i) => {
      if (i.completed && i.dueDate != s) {
        array.push(`[x]` + ` ` + i.title + ` ` + i.dueDate);
      } 
      else if (i.completed && i.dueDate == s) {
        array.push(`[x]` + ` ` + i.title);
      } 
      else if (i.completed == false && i.dueDate == s) {
        array.push(`[ ]` + ` ` + i.title);
      } 
      else {
        array.push(`[ ]` + ` ` + i.title + ` ` + i.dueDate);
      }
    });
    return array.join("\n").toString();
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
 // ####################################### #
  // DO NOT CHANGE ANYTHING BELOW THIS LINE. #
  // ####################################### #
  


module.exports = todoList;
