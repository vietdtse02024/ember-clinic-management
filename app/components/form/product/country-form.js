import BaseCompenent from 'ember-clinic-management/components/common/base-component';
import CountryValidations from 'ember-clinic-management/validations/product/country';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';
import $ from 'jquery';
import { copy } from '@ember/object/internals';

export default BaseCompenent.extend({
  resultSearch : null,
  successMsg : null,
  errorMsg : null,
  countryId : null,
  init() {
    this._super(...arguments);
    this.changeset = new Changeset(this, lookupValidator(CountryValidations), CountryValidations, { skipValidate : true });
    this.send("searchCountry");
    $("#tab-product").addClass('active');
  },
  actions:{
    searchCountry() {
      let ajax = this.get('ajax');
      let self = this;
      ajax.get('country/search-country.php').then((r) => {
        if (r.type === 'DATA' && r.data) {
          self.set('resultSearch', r.data);
        }
      });
    },
    editCountry(item){
      this.setProperties({
        successMsg: null,
        errorMsg: null
      });
      let changeset = this.get('changeset');
      if (item) {
        this.set('editModalTitle', "Cập nhật thông tin nước sản xuất");
        changeset.setProperties({
          countryName : item.CountryName,
          note : item.Description,
        });
        this.setProperties({
          countryId : item.ID
        });
      } else {
        this.set('editModalTitle', "Thêm mới nước sản xuất");
        changeset.setProperties({
          countryName : null,
          note : null,
        });
        this.setProperties({
          countryId : null
        });
      }
      this.openModal('edit');
    },
    saveEditCountry(){
      let self = this;
      let ajax = this.get('ajax');
      let changeset = this.get('changeset');
      let jsonData = {
        "countryId": self.get('countryId'),
        "countryName": changeset.get('countryName'),
        "note" : changeset.get('note')
      };

      let snapshot = changeset.snapshot();
      changeset.validate().then(() => {
        if (changeset.get('isValid')) {
          changeset.execute();
          changeset.save();
          ajax.postJsonData('country/save-country.php', jsonData).then((r) => {
            if (r && r.result == "SUCCESS") {
              self.set('successMsg', "Cập nhật thông tin thành công");
              self.set('errorMsg', null);

            } else {
              self.set('errorMsg', r.message);
              self.set('successMsg', null);
            }
            self.send("searchCountry");

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
    deleteCountry(countryId){
      this.set('countryId', countryId);
      this.openModal('delete');
    },
    search() {
      this.setProperties({
        successMsg: null,
        errorMsg: null
      });
      this.send("searchCountry");
    },
  }
});
