define(['backbone', 'hbs!templates/task-form'], function(Backbone, taskFormTemplate) {

  var TaskFormView = Backbone.HandlebarsView.extend({
    events: {
      'submit form': 'save'
    },
    className: 'task',
    template: taskFormTemplate,
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
