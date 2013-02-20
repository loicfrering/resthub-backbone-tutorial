define(['backbone', 'hbs!templates/task'], function(Backbone, taskTemplate) {

  var TaskView = Backbone.HandlebarsView.extend({
    template: taskTemplate,
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'remove', this.remove);
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

  return TaskView;

});
