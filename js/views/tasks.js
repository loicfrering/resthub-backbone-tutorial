define(['backbone', 'views/task', 'hbs!templates/tasks'], function(Backbone, TaskView, tasksTemplate) {

  var TasksView = Backbone.View.extend({
    className: 'tasks',
    initialize: function() {
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'add', this.add);
    },
    render: function() {
      console.log('TasksView rendering...');
      this.$el.html(tasksTemplate());
      this.collection.each(this.add, this);
      return this;
    },
    add: function(task) {
      var taskView = new TaskView({model: task, tagName: 'li'});
      this.$('li').last().before(taskView.render().el);
    }
  });

  return TasksView;

});
