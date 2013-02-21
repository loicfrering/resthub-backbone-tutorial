define(['backbone', 'resthub', 'hbs!templates/task-form'], function(Backbone, Resthub, taskFormTemplate) {

  var TaskFormView = Resthub.View.extend({
    root: '#tasks',
    strategy: 'append',
    template: taskFormTemplate,
    events: {
      'submit form': 'save'
    },
    className: 'task',
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
