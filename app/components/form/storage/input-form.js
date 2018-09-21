import BaseCompenent from 'ember-clinic-management/components/common/base-component';
import $ from 'jquery';
import Changeset from 'ember-changeset';
import { FunctionNames } from 'ember-clinic-management/utils/enums';
import { inject as service } from '@ember/service';
import lookupValidator from "ember-changeset-validations";
import numeral from 'numeral';

export default BaseCompenent.extend({
  ajax: service(),
  barcode : "",
  paperWitdth: 312,
  paperHeight: 71,
  productUnits : null,
  init() {
    this._super(...arguments);
    this.changeset = new Changeset(this);
    this.send('search');
  },
  actions:{
    search : function(){
      let ajax = this.get('ajax');
      let self = this;
      ajax.get('input-storage/search-storage.php?productId=' + this.get('changeset').get('productIdSearch')).then((r) => {
        if (r.type === 'DATA' && r.data) {
          self.set('resultSearch', r.data);
        }
      });
    }
  }

});
