import { isTouchDevice } from 'oversea/utils/browser';

export default Ember.Component.extend({

  isNumberValue: false,

  value: -1,

  content: Ember.A(),
  
  tagName: 'select',
  
  classNames: ['selectpicker', 'form-control'],
  
  'data-style': null,
  
  'data-live-search':false,
  
  'title':null,
  
  translate: false,
  
  attributeBindings: ['data-style', 'data-live-search', 'title'],

  disabled: false,

  nativeStyle: function() {
    return isTouchDevice;
  }.property(),
  
  init(){
	  this._super(...arguments);
	  this.set('value', this.get('changeset').get(this.get('fieldName')));
  },
	  
  //TODO: didRender?
  didRender: function() {
    this._super(...arguments);
    Ember.run.schedule('afterRender', this, () => {
      this.$().selectpicker('val', this.get('value'));
      this.$().selectpicker('refresh');
    });
  },

  didInsertElement: function() {
    this._super();
    let $select = this.$();
    Ember.run.scheduleOnce('afterRender', () => {
      let nativeStyle = this.get('nativeStyle');
      $select.val(this.get('value')).selectpicker({
        mobile: nativeStyle
      }).on('hidden.bs.select change', e => {
    	 
    	 if(!isTouchDevice && e.type === 'change') {
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