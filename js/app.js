require(['backbone', 'collections/tasks', 'routers/tasks'], function(Backbone, Tasks, TasksRouter) {

  new TasksRouter();
  Backbone.history.start();

});
