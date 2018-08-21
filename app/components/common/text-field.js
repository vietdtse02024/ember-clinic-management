import Component from '@ember/component';

export default Component.extend({
  maxlength: null,
  fieldName: null,
  init(){
    this._super(...arguments);
  },
  actions: {
    validate(){
      this.get('changeset').validate(this.get('fieldName')).then(function(r){
        this.get('changeset').set('validating', this.get('fieldName'));
      }.bind(this));
    },
  }
});
