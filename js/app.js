(function() {

  var Task  = Backbone.Model.extend({
    defaults: {
      title: 'New Task'
    }
  });

  var Tasks = Backbone.Collection.extend({
    model: Task
  });

  var TaskView = Backbone.HandlebarsView.extend({
    template: $('#task-template').html(),
    className: function() {
      return this.model.get('id') == this.options.activeId ? 'active' : '';
    },
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    }
  });

  var TasksView = Backbone.HandlebarsView.extend({
    className: 'tasks',
    template: $('#tasks-template').html(),
    context: function() {
      return {
        collection: this.collection,
        activeId:   this.options.activeTaskId,
        TaskView:   TaskView
      };
    },
    initialize: function() {
      this.listenTo(this.collection, 'add remove reset', this.render);
    }
  });

  var TaskDetailsView = Backbone.HandlebarsView.extend({
    className: 'task',
    template: $('#task-details-template').html(),
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    }
  });

  var TaskEditView = Backbone.HandlebarsView.extend({
    events: {
      'submit form': 'save'
    },
    className: 'task',
    template: $('#task-edit-template').html(),
    save: function() {
      this.model.set({
        title: this.$('#title').val(),
        description: this.$('#description').val()
      });
      //this.model.save();
      Backbone.history.navigate("#task/" + this.model.get('id'), true);
      return false;
    }
  });

  var tasks = new Tasks([{id: 1, title: 'Task1', description: 'Task1 desc.'}, {id: 2, title: 'Task2', description: 'Task2 desc.'}]);

  var Router = Backbone.Router.extend({
    routes: {
      '':                'index',
      'tasks':           'list',
      'task/new':        'create',
      'task/:id':        'show',
      'task/:id/edit':   'edit',
      'task/:id/remove': 'remove'
    },

    index: function() {
      this.navigate('#tasks', true);
    },

    list: function() {
      var tasksView = new TasksView({collection: tasks});
      $('#tasks').html(tasksView.render().el);
    },

    create: function() {
      var task = new Task({id: tasks.last().get('id') + 1});
      tasks.add(task);

      var tasksView = new TasksView({collection: tasks, activeTaskId: task.get('id')});
      $('#tasks').html(tasksView.render().el);

      var taskEditView = new TaskEditView({model: task});
      $('#tasks').append(taskEditView.render().el);
    },

    show: function(id) {
      var tasksView = new TasksView({collection: tasks, activeTaskId: id});
      $('#tasks').html(tasksView.render().el);

      var task = tasks.get(id);
      var taskView = new TaskDetailsView({model: task});
      $('#tasks').append(taskView.render().el);
    },

    edit: function(id) {
      var tasksView = new TasksView({collection: tasks, activeTaskId: id});
      $('#tasks').html(tasksView.render().el);

      var task = tasks.get(id);
      var taskEditView = new TaskEditView({model: task});
      $('#tasks').append(taskEditView.render().el);
    },

    remove: function(id) {
      if (confirm('Do you really want to remove "' + tasks.get(id).get('title') + '"?')) {
        tasks.remove(tasks.get(id));
        this.navigate('#', true);
      } else {
        this.navigate('#task/' + id + '/edit', true);
      }
    }
  });

  new Router();
  Backbone.history.start();

})();
