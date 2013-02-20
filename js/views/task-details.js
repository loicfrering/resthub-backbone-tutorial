define(['backbone', 'hbs!templates/task-details'], function(Backbone, taskDetailsTemplate) {

  var TaskDetailsView = Backbone.HandlebarsView.extend({
    className: 'task',
    template: taskDetailsTemplate,
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    }
  });

  return TaskDetailsView;

});
