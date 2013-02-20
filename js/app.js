(function() {

  var Task  = Backbone.Model.extend({
    defaults: {
      title: 'New Task'
    }
  });

  var Tasks = Backbone.Collection.extend({
    model: Task
  });

  var IndexView = Backbone.HandlebarsView.extend({
    template: $('#index-template').html()
  });

  var TaskView = Backbone.HandlebarsView.extend({
    template: $('#task-template').html(),
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
      if (this.model.get('active')) {
        this.$el.addClass('active');
      } else {
        this.$el.removeClass('active');
      }
      return TaskView.__super__.render.apply(this, arguments);
    }
  });

  var TasksView = Backbone.HandlebarsView.extend({
    className: 'tasks',
    template: $('#tasks-template').html(),
    context: function() {
      return {
        collection: this.collection,
        TaskView:   TaskView
      };
    },
    initialize: function() {
      this.listenTo(this.collection, 'add remove reset', this.render);
    },
    render: function() {
      console.log('rendering');
      return TasksView.__super__.render.apply(this, arguments);
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
      var indexView = new IndexView();
      $('#tasks').html(indexView.render().el);
    },

    list: function(activeTaskId) {
      if (!this.tasksView) {
        this.tasksView = new TasksView({collection: tasks});
      }

      if (tasks.get(this.activeTaskId)) {
        tasks.get(this.activeTaskId).set('active', false);
      }
      if (activeTaskId) {
        this.activeTaskId = activeTaskId;
        tasks.get(activeTaskId).set('active', true);
      }

      if (this.tasksView.$el.parent().size() === 0) {
        $('#tasks').html(this.tasksView.render().el);
      }

      if (this.currentView) {
        this.currentView.remove();
      }
    },

    create: function() {
      var task = new Task({id: tasks.last().get('id') + 1});
      tasks.add(task);

      this.list(task.get('id'));

      var taskEditView = this.currentView = new TaskEditView({model: task});
      $('#tasks').append(taskEditView.render().el);
    },

    show: function(id) {
      this.list(id);

      var task = tasks.get(id);
      var taskView = this.currentView = new TaskDetailsView({model: task});
      $('#tasks').append(taskView.render().el);
    },

    edit: function(id) {
      this.list(id);

      var task = tasks.get(id);
      var taskEditView = this.currentView = new TaskEditView({model: task});
      $('#tasks').append(taskEditView.render().el);
    },

    remove: function(id) {
      if (confirm('Do you really want to remove "' + tasks.get(id).get('title') + '"?')) {
        tasks.remove(tasks.get(id));
        this.navigate('#tasks', true);
      } else {
        this.navigate('#task/' + id + '/edit', true);
      }
    }
  });

  var router = new Router();
  Backbone.history.start();

})();
