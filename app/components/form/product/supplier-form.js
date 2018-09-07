import BaseCompenent from 'ember-clinic-management/components/common/base-component';
import SupplierValidations from 'ember-clinic-management/validations/product/supplier';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';
import $ from 'jquery';
import { copy } from '@ember/object/internals';

export default BaseCompenent.extend({
  resultSearch : null,
  successMsg : null,
  errorMsg : null,
  supplierId : null,
  init() {
    this._super(...arguments);
    this.changeset = new Changeset(this, lookupValidator(SupplierValidations), SupplierValidations, { skipValidate : true });
    this.send("searchSupplier");
    $("#tab-product").addClass('active');
  },
  actions:{
    searchSupplier() {
      let ajax = this.get('ajax');
      let self = this;
      ajax.get('supplier/search-supplier.php').then((r) => {
        if (r.type === 'DATA' && r.data) {
          self.set('resultSearch', r.data);
        }
      });
    },
    editSupplier(item){
      this.setProperties({
        successMsg: null,
        errorMsg: null
      });
      let changeset = this.get('changeset');
      if (item) {
        this.set('editModalTitle', "Cập nhật thông tin nước sản xuất");
        changeset.setProperties({
          supplierName : item.SupplierName,
          note : item.Description,
        });
        this.setProperties({
          supplierId : item.ID
        });
      } else {
        this.set('editModalTitle', "Thêm mới nước sản xuất");
        changeset.setProperties({
          supplierName : null,
          note : null,
        });
        this.setProperties({
          supplierId : null
        });
      }
      this.openModal('edit');
    },
    saveEditSupplier(){
      let self = this;
      let ajax = this.get('ajax');
      let changeset = this.get('changeset');
      let jsonData = {
        "supplierId": self.get('supplierId'),
        "supplierName": changeset.get('supplierName'),
        "note" : changeset.get('note')
      };

      let snapshot = changeset.snapshot();
      changeset.validate().then(() => {
        if (changeset.get('isValid')) {
          changeset.execute();
          changeset.save();
          ajax.postJsonData('supplier/save-supplier.php', jsonData).then((r) => {
            if (r && r.result == "SUCCESS") {
              self.set('successMsg', "Cập nhật thông tin thành công");
              self.set('errorMsg', null);

            } else {
              self.set('errorMsg', r.message);
              self.set('successMsg', null);
            }
            self.send("searchSupplier");

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
    deleteSupplier(supplierId){
      this.set('supplierId', supplierId);
      this.openModal('delete');
    },
    search() {
      this.setProperties({
        successMsg: null,
        errorMsg: null
      });
      this.send("searchSupplier");
    },
  }
});
