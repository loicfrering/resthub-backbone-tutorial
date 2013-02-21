define(['backbone', 'resthub', 'hbs!templates/task-details'], function(Backbone, Resthub, taskDetailsTemplate) {

  var TaskDetailsView = Resthub.View.extend({
    root: '#tasks',
    strategy: 'append',
    className: 'task',
    template: taskDetailsTemplate,
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    }
  });

  return TaskDetailsView;

});
