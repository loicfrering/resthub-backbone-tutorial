define(['backbone', 'hbs!templates/task-form'], function(Backbone, taskFormTemplate) {

  var TaskFormView = Backbone.View.extend({
    events: {
      'submit form': 'save'
    },
    className: 'task',
    render: function() {
      this.$el.html(taskFormTemplate(this.model.attributes));
      return this;
    },
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

  return TaskFormView;

});
