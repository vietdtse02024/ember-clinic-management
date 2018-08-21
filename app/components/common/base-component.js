import Component from '@ember/component';
import { inject as service } from '@ember/service';
import $ from 'jquery';
export default Component.extend({
  ajax: service(),
  bootstrap: service(),
  init() {
    this._super(...arguments);

    this.searchRole();
  },
  initComboBox(table, key, value, isPutAll) {
    let ajax = this.get('ajax');
    let self = this;
    let jsonData = {
      "tableName": table,
      "key": key,
      "value": value,
      "isPutAll" : isPutAll
    };
    return ajax.postJsonData('init-combobox.php', jsonData).then((r) => {
      if (r.type === 'DATA' && r.data) {
        let result = r.data;
        return r.data;
      }
    });
  }
});
