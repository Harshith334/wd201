


"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      
    }
    static addTodo({ title, dueDate }) {
      return this.create({ title: title, dueDate: dueDate, completed: false });
    }
    
    static getTodos() {
      return this.findAll();
    }
    static async getTodos() {
      const all = await this.findAll();
      
      if (all.length >= 1) {
        return all;
      } else {
        await this.addTodo({
          title: "Buy milk",
          dueDate: new Date().toISOString(),
          completed: false,
        });
        
        await this.addTodo({
          title: "Buy xbox",
          dueDate: new Date().toISOString(),
          completed: false,
        });

        
        const allTodos = await this.findAll();
        return allTodos;
      }
    }
    
    markAsCompleted() {
      return this.update({ completed: true });
    }
  }
  
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
