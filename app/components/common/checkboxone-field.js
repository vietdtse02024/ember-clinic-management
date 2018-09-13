import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({
  invalid: null,
  fieldName: null,
  ckId: null,
  state : false,
  url : null,
  init(){
    this._super(...arguments);
    let fieldName = this.get('fieldName');
    if(Ember.isBlank(this.get("changeset").get(fieldName))){
      this.set('invalid', true);
      this.set('state',false);
    }else{
      if(!this.get("changeset").get(fieldName)){
        this.set('invalid', true);
      }else{
        this.set('invalid', false);
        this.set('state',true);
      }
    }
  },

  click: function(e) {
    let $target = $(e.target);
    if ($target.is('input')) {
      this.get('changeset').set(this.get('fieldName'), $target.prop('checked'));
      this.get('changeset').validate(this.get('fieldName')).then(function(r){
        if(r && r.validation){
          this.set('invalid', true);
//					$target.closest(".checkbox-primary").parent().addClass('invalid');
        }else{
          this.set('invalid', false);
//					$target.closest(".checkbox-primary").parent().removeClass('invalid');
        }
      }.bind(this));
    }
  }
});

