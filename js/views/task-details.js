define(['backbone', 'hbs!templates/task-details'], function(Backbone, taskDetailsTemplate) {

  var TaskDetailsView = Backbone.View.extend({
    className: 'task',
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
      this.$el.html(taskDetailsTemplate(this.model.attributes));
      return this;
    }
  });

  return TaskDetailsView;

});
