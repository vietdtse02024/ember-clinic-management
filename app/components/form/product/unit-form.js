import BaseCompenent from 'ember-clinic-management/components/common/base-component';
import UnitValidations from 'ember-clinic-management/validations/product/unit';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';
import $ from 'jquery';
import { copy } from '@ember/object/internals';

export default BaseCompenent.extend({
  resultSearch : null,
  successMsg : null,
  errorMsg : null,
  unitId : null,
  init() {
    this._super(...arguments);
    this.changeset = new Changeset(this, lookupValidator(UnitValidations), UnitValidations, { skipValidate : true });
    this.send("searchUnit");
    $("#tab-product").addClass('active');
  },
  actions:{
    searchUnit() {
      let ajax = this.get('ajax');
      let self = this;
      ajax.get('product-unit/search-unit.php').then((r) => {
        if (r.type === 'DATA' && r.data) {
          self.set('resultSearch', r.data);
        }
      });
    },
    editUnit(item){
      this.setProperties({
        successMsg: null,
        errorMsg: null
      });
      let changeset = this.get('changeset');
      if (item) {
        this.set('editModalTitle', "Cập nhật thông tin đơn vị sản phẩm");
        changeset.setProperties({
          unitName : item.Name,
          unitExchange : item.Exchange,
          note : item.Description,
        });
        this.setProperties({
          unitId : item.ID
        });
      } else {
        this.set('editModalTitle', "Thêm mới đơn vị sản phẩm");
        changeset.setProperties({
          unitName : null,
          unitExchange : null,
          note : null,
        });
        this.setProperties({
          unitId : null
        });
      }
      this.openModal('edit');
    },
    saveEditUnit(){
      let self = this;
      let ajax = this.get('ajax');
      let changeset = this.get('changeset');
      let jsonData = {
        "unitId": self.get('unitId'),
        "unitName": changeset.get('unitName'),
        "unitExchange": changeset.get('unitExchange'),
        "note" : changeset.get('note')
      };

      let snapshot = changeset.snapshot();
      changeset.validate().then(() => {
        if (changeset.get('isValid')) {
          changeset.execute();
          changeset.save();
          ajax.postJsonData('product-unit/save-unit.php', jsonData).then((r) => {
            if (r && r.result == "SUCCESS") {
              self.set('successMsg', "Cập nhật thông tin thành công");
              self.set('errorMsg', null);

            } else {
              self.set('errorMsg', r.message);
              self.set('successMsg', null);
            }
            self.send("searchUnit");

          }, function () {
            self.set('errorMsg', "Có lỗi xảy ra.");
            self.set('successMsg', null);
          });
          self.toggleModal('edit');
        }
      }).catch(() => {
        changeset.restore(snapshot);
      });


    },
    deleteUnit(unitId){
      this.set('unitId', unitId);
      this.openModal('delete');
    },
    search() {
      this.setProperties({
        successMsg: null,
        errorMsg: null
      });
      this.send("searchUnit");
    },
  }
});
