const todoList = () => {
    const all = [];
    const add = (todoItem) => {
      all.push(todoItem);
    };
    const markAsComplete = (index) => {
      all[index].completed = true;
    };
  
    const overdue = () => {
      // Write the date check condition here and return the array
      // of overdue items accordingly.
  
      let dateToday = new Date();
      const today = new Date(formattedDate(dateToday)).getTime();
      const overdueList = all.filter((item) => {
        let givenDate = new Date(item.dueDate).getTime();
        if (givenDate < today) return true;
      });
      return overdueList;
    };
  
    const dueToday = () => {
      // Write the date check condition here and return the array
      // of todo items that are due today accordingly.
      let dateToday = new Date();
      const today = new Date(formattedDate(dateToday)).getTime();
      const dueTodayList = all.filter((item) => {
        let givenDate = new Date(item.dueDate).getTime();
        if (givenDate == today) return true;
      });
      return dueTodayList;
    };
  
    const dueLater = () => {
      // Write the date check condition here and return the array
      // of todo items that are due later according.
      let dateToday = new Date();
      const today = new Date(formattedDate(dateToday)).getTime();
      const dueLaterList = all.filter((item) => {
        let givenDate = new Date(item.dueDate).getTime();
        if (givenDate > today) return true;
      });
      return dueLaterList;
    };
  
    const toDisplayableList = (list) => {
      // Format the To-Do list here, and return the output string
      // as per the format given above.
      let res = "";
      list.forEach((item) => {
        res += `[${item.completed ? "x" : " "}] ${item.title} ${
          new Date(item.dueDate).getTime() ==
          new Date(formattedDate(new Date())).getTime()
            ? ""
            : item.dueDate
        }\n`;
      });
      return res.substring(0, res.length - 1);
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
  
  // // ####################################### #
  // // DO NOT CHANGE ANYTHING BELOW THIS LINE. #
  // // ####################################### #
  
  
  const formattedDate = (d) => {
    return d.toISOString().split("T")[0];
  };
  module.exports = todoList;