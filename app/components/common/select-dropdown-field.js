import DropDown from 'oversea/components/common/drop-down';
import EnumDropDownHbs from 'oversea/templates/components/common/drop-down';


export default DropDown.extend({
	
  bootstrap : Ember.inject.service(),
  layout: EnumDropDownHbs,
  name: null,

  emptyOption: false,

  emptyLabel: 'label.common.empty',

  content: function() {

    let name = this.get('name');
    let bootstrap = this.get('bootstrap');
    let content = bootstrap.get(name);

    let r = [];
    let emptyOption = this.get('emptyOption');

    if (emptyOption) {
      let emptyLabel = this.get('emptyLabel');

      r.push({
        name: emptyLabel,
        value: 0
      });
    }

    if (content) {
    	content.forEach(e => {
	      r.push({
	        name: e.name,
	        value: e.value
	      });
	    });
    }

    return r;
  }.property('name')
});