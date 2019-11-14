define([
  'core/js/adapt',
  './model',
  './view'
], function(Adapt, Model, View) {

  return Adapt.register('quicknav', {
    model: Model,
    view: View
  });

});
