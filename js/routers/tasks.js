define(['backbone', 'models/task', 'views/tasks'], function(Backbone, Task, TasksView) {

  var TasksRouter = Backbone.Router.extend({
    routes: {
      '':                'index',
      'tasks':           'list',
      'task/new':        'create',
      'task/:id':        'show',
      'task/:id/edit':   'edit',
      'task/:id/remove': 'remove'
    },

    initialize: function(options) {
      this.tasks = options.tasks;
    },

    index: function() {
      require(['views/index'], function(IndexView) {
        var indexView = new IndexView();
        $('#tasks').html(indexView.render().el);
      });
    },

    list: function(activeTaskId) {
      if (!this.tasksView) {
        this.tasksView = new TasksView({collection: this.tasks});
      }

      if (this.tasks.get(this.activeTaskId)) {
        this.tasks.get(this.activeTaskId).set('active', false);
      }
      if (activeTaskId) {
        this.activeTaskId = activeTaskId;
        this.tasks.get(activeTaskId).set('active', true);
      }

      if (this.tasksView.$el.parent().size() === 0) {
        $('#tasks').html(this.tasksView.render().el);
      }

      if (this.currentView) {
        this.currentView.remove();
      }
    },

    create: function() {
      var task = new Task({id: this.tasks.last().get('id') + 1});
      this.tasks.add(task);
      this.list(task.get('id'));

      require(['views/task-form'], _.bind(function(TaskFormView) {
        var taskFormView = this.currentView = new TaskFormView({model: task});
        $('#tasks').append(taskFormView.render().el);
      }, this));
    },

    show: function(id) {
      this.list(id);
      var task = this.tasks.get(id);

      require(['views/task-details'], _.bind(function(TaskDetailsView) {
        var taskView = this.currentView = new TaskDetailsView({model: task});
        $('#tasks').append(taskView.render().el);
      }, this));
    },

    edit: function(id) {
      this.list(id);
      var task = this.tasks.get(id);

      require(['views/task-form'], _.bind(function(TaskFormView) {
        var taskFormView = this.currentView = new TaskFormView({model: task});
        $('#tasks').append(taskFormView.render().el);
      }, this));
    },

    remove: function(id) {
      if (confirm('Do you really want to remove "' + this.tasks.get(id).get('title') + '"?')) {
        this.tasks.remove(this.tasks.get(id));
        this.navigate('#tasks', true);
      } else {
        this.navigate('#task/' + id + '/edit', true);
      }
    }
  });

  return TasksRouter;

});
