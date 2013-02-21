define(['backbone', 'hbs!templates/index'], function(Backbone, indexTemplate) {

  var IndexView = Backbone.View.extend({
    render: function() {
      this.$el.html(indexTemplate());
      return this;
    }
  });

  return IndexView;

});
