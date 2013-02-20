define(['backbone', 'hbs!templates/index'], function(Backbone, indexTemplate) {

  var IndexView = Backbone.HandlebarsView.extend({
    template: indexTemplate
  });

  return IndexView;

});
