import Component from '@ember/component';

export default Component.extend({
  init() {
    this._super(...arguments);
    let model = this.get('model');
  },
});
