define(['backbone'], function(Backbone) {

  var Task  = Backbone.Model.extend({
    defaults: {
      title: 'New Task'
    }
  });

  return Task;

});
