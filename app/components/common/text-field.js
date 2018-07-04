import Component from '@ember/component';

export default Component.extend({
  maxlength: null,
  placeholder: null,
  fieldName: null,
  init(){
    this._super(...arguments);
  }
});
