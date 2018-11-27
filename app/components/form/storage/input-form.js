import BaseCompenent from 'ember-clinic-management/components/common/base-component';
import $ from 'jquery';
import Changeset from 'ember-changeset';
import { FunctionNames } from 'ember-clinic-management/utils/enums';
import { inject as service } from '@ember/service';
import numeral from 'numeral';
import moment from 'moment';
import { scheduleOnce } from '@ember/runloop';

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
  didRender() {
    $(document).scannerDetection({
      timeBeforeScanTest: 200, // wait for the next character for upto 200ms
      avgTimeByChar: 40, // it's not a barcode if a character takes longer than 100ms
      preventDefault: true,
      endChar: [13],
      onComplete: function(barcode, qty){
        console.log(barcode);
      },
      onError: function(string, qty) {
        console.log("error: " + string);
      }
    });

  },
  actions:{
    search : function(){
      let ajax = this.get('ajax');
      let self = this;
      let productId = this.get('changeset').get('productIdSearch');
      //let fromDate = this.get('changeset').get('fromDate');
      let fromDate = '01/01/2017';
      let toDate = this.get('changeset').get('toDate');
      ajax.get('input-storage/search-storage.php?productId=' + productId + '&fromDate=' + fromDate + '&toDate=' + toDate).then((r) => {
        if (r.type === 'DATA' && r.data) {
          self.set('resultSearch', r.data);
        }
      });
    },
    editBill : function(item) {
      this.setProperties({
        successMsg: null,
        errorMsg: null
      });
      let ajax = this.get('ajax');
      let changeset = this.get('changeset');
      if (item) {
        changeset.setProperties({

        });
        this.setProperties({

        });
      } else {
        changeset.setProperties({
          inputDate : moment().format('DD/MM/YYYY'),
        });
        this.setProperties({

        });
      }
      this.openModal('edit');
    },

    initProductInit : function () {
      let self = this;
      let ajax = self.get('ajax');
      let changeset = self.get('changeset');
      if (changeset.get('productId')) {
        let url = 'functions.php?function='+ FunctionNames.PRODUCT.INIT_PRODUCT_UNIT + '&productCode=' + changeset.get('productId');
        ajax.get(url).then((r) => {
          if (r.type === 'DATA') {
            self.set('productUnits', r.productUnits);
            self.set('productUnit', null);
            changeset.set('unitId', null);
          }
        });
      }
    },
  }

});
