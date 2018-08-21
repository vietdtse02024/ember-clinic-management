import DropDown from 'ember-clinic-management/components/common/drop-down';
import EnumDropDownHbs from 'ember-clinic-management/templates/components/common/drop-down';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
export default DropDown.extend({

  bootstrap : service(),
  layout: EnumDropDownHbs,
  name: null,
  emptyOption: false,
  translate: true,

  emptyLabel: 'Tất cả',

  content: computed(name, function() {

    let name = this.get('name');
    let bootstrap = this.get('bootstrap');
    let enums = bootstrap.get('enums');

    let enumsArray = enums[name];

    let r = [];
    let emptyOption = this.get('emptyOption');

    if (emptyOption) {
      let emptyLabel = this.get('emptyLabel');

      r.push({
        name: emptyLabel,
        value: 0
      });
    }

    if (enumsArray) {
	    enumsArray.forEach(e => {
	      r.push({
	        name: e.name,
	        value: e.value
	      });
	    });
    }

    return r;
  })
});
