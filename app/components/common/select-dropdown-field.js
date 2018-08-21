import DropDown from 'ember-clinic-management/components/common/drop-down';
import EnumDropDownHbs from 'ember-clinic-management/templates/components/common/drop-down';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';

export default DropDown.extend({

  bootstrap : service(),
  ajax : service(),
  layout: EnumDropDownHbs,
  emptyOption: false,

  emptyLabel: 'Tất cả',
  init(){
    this._super();
    let self = this;
    this.getContent().then(function(r){
      self.set('content', r);
    });
  },
  getContent: function() {
    let ajax = this.get('ajax');
    let self = this;

    let result = [];
    let emptyOption = self.get('emptyOption');

    if (emptyOption) {
      let emptyLabel = self.get('emptyLabel');

      result.push({
        name: emptyLabel,
        value: -1
      });
    }
    return new Promise(function(resolve, reject){
      ajax.get('init-combobox.php?tableName='+ self.get('tableName') + '&columnKey='+ self.get('columnKey') + '&columnValue='+ self.get('columnValue')).then((r) => {
        if (r.type === 'DATA' && r.data) {
          let content = r.data;
          if (content) {
            content.forEach(e => {
              result.push({
                name: e.name,
                value: e.value
              });
            });
          }
          resolve(result);
        }
      });
    });
  }
});
