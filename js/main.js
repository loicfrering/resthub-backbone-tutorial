require.config({
  shim: {
    'underscore': {
      exports: '_'
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    'backbone': {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    'backbone.handlebars': {
      deps: [
        'backbone',
        'handlebars'
      ],
      exports: 'Backbone'
    }
  },

  paths: {
    text:                  'libs/text',
    hbs:                   'libs/resthub/require-handlebars',
    jquery:                'libs/jquery',
    underscore:            'libs/underscore',
    backbone:              'libs/backbone',
    handlebars:            'libs/handlebars',
    'backbone.handlebars': 'libs/backbone.handlebars'
  }
});

require(['backbone.handlebars'], function(BackboneHandlebars) {
  require(['app']);
});
