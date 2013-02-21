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
    }
  },

  paths: {
    text:       'libs/text',
    hbs:        'libs/resthub/require-handlebars',
    jquery:     'libs/jquery',
    underscore: 'libs/underscore',
    backbone:   'libs/backbone',
    handlebars: 'libs/handlebars',
    resthub:    'libs/resthub/resthub'
  }
});

require(['app']);
