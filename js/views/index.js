define(['backbone', 'resthub', 'hbs!templates/index'], function(Backbone, Resthub, indexTemplate) {

  var IndexView = Resthub.View.extend({
    root: '#tasks',
    template: indexTemplate
  });

  return IndexView;

});
