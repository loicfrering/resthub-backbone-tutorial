require(['backbone', 'collections/tasks', 'routers/tasks'], function(Backbone, Tasks, TasksRouter) {

  var tasks = new Tasks([{id: 1, title: 'Task1', description: 'Task1 desc.'}, {id: 2, title: 'Task2', description: 'Task2 desc.'}]);
  new TasksRouter({tasks: tasks});
  Backbone.history.start();

});
