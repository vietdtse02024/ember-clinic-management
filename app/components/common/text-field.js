import Component from '@ember/component';
import BaseCompenent from 'ember-clinic-management/components/common/base-component';

export default BaseCompenent.extend({
  maxlength: null,
  fieldName: null,
  changeset: null,
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
