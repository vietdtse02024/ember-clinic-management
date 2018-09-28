import BaseCompenent from 'ember-clinic-management/components/common/base-component';
import $ from 'jquery';
import Changeset from 'ember-changeset';
import { FunctionNames } from 'ember-clinic-management/utils/enums';
import { inject as service } from '@ember/service';
import numeral from 'numeral';
import moment from 'moment';

export default BaseCompenent.extend({
  ajax: service(),
  barcode : "",
  paperWitdth: 312,
  paperHeight: 71,
  productUnits : null,
  init() {
    this._super(...arguments);
    this.changeset = new Changeset(this);
    this.get('changeset').setProperties({
      fromDate : moment().format('DD/MM/YYYY'),
      toDate : moment().format('DD/MM/YYYY')
    });
    this.send('search');

  },
  actions:{
    search : function(){
      let ajax = this.get('ajax');
      let self = this;
      let productId = this.get('changeset').get('productIdSearch');
      let fromDate = this.get('changeset').get('fromDate');
      let toDate = this.get('changeset').get('toDate');
      ajax.get('input-storage/search-storage.php?productId=' + productId + '&fromDate=' + fromDate + '&toDate=' + toDate).then((r) => {
        if (r.type === 'DATA' && r.data) {
          self.set('resultSearch', r.data);
        }
      });
    }
  }

});
