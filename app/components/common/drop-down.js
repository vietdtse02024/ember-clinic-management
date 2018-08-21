import Component from '@ember/component';
import { scheduleOnce } from '@ember/runloop';
import { schedule } from '@ember/runloop';
import { A } from '@ember/array';

export default Component.extend({

  isNumberValue: false,

  value: -1,

  content: A(),

  tagName: 'select',

  classNames: ['selectpicker', 'form-control'],

  'data-style': null,

  'data-live-search':false,

  attributeBindings: ['data-style', 'data-live-search'],

  disabled: false,

  init(){
	  this._super(...arguments);
    //this.set('value', 2);
  },

  //TODO: didRender?
  didRender: function() {
    this._super(...arguments);
    schedule('afterRender', this, () => {
      this.$().selectpicker('val', this.get('value'));
      this.$().selectpicker('refresh');
    });
  },

  didInsertElement: function() {
    this._super();
    let $select = this.$();
    scheduleOnce('afterRender', () => {
      $select.val(this.get('value')).selectpicker({
        //mobile: nativeStyle
      }).on('hidden.bs.select change', e => {

    	 if(e.type === 'change') {
    		 return;
    	 }
    	 let isNumberValue = this.get('isNumberValue');
    	 let value = e.target.value;
    	 if (isNumberValue) {
    	   value = value * 1;
    	 }
    	 this.setValue(value);
        let fieldName = this.get('fieldName');
        this.get('changeset').set(fieldName, value);
        this.get('changeset').validate(fieldName).then(function(r){
        }.bind(this));
      });
    });
  },

  willDestroyElement: function() {
    this._super(...arguments);
    this.$().selectpicker('destroy');
  },

  setValue: function(v) {
    this.set('value', v);
  }
});
