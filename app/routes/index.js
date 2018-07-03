import Route from '@ember/routing/route';

export default Route.extend({
  init() {
    this._super(...arguments);
  },
  model() {
    return "";
  },
  afterModel(model) {
    this._super(...arguments);
    this.replaceWith('index.login');

  },
  setupController: function(controller, model) {
    this._super(...arguments);
  }
});
