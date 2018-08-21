import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';
import $ from 'jquery';
import Changeset from 'ember-changeset';
export default Component.extend({
  ajax: service(),
  resultSearch : null,
  successMsg : null,
  errorMsg : null,
  customerId : null,
  init() {
    this._super(...arguments);
    this.changeset = new Changeset(this);
    this.searchCustomer();
    
  },
  searchCustomer() {
    let ajax = this.get('ajax');
    let self = this;
    ajax.get('search-customer.php?customerId=' + this.get('changeset').get('customerIdSearch')).then((r) => {
      if (r.type === 'DATA' && r.data) {
        self.set('resultSearch', r.data);
      }
    });
  },
  actions:{
    editCustomer(customerId){
      let self = this;
      let ajax = this.get('ajax');
      ajax.get('search-customer.php?customerId='+customerId).then((r) => {
        if (r.type === 'DATA' && r.data) {
          let data = r.data[0];
          self.setProperties({
            customerId : customerId,
            note : data.CustomerDescription, 
            province : data.CustomerProvinceID,
            district : data.CustomerDistrictID
          });
          self.get('changeset').setProperties({
            customerName : data.CustomerName,
            phoneNo : data.CustomerPhoneNo,
            email : data.CustomerEmail,
            province : data.CustomerProvinceID,
            district : data.CustomerDistrictID,
            address : data.CustomerAddress
          });
          $("#edit").modal({
            refresh: true
          });
        } else {
          self.set('errorMsg', "Có lỗi xảy ra!!!");
          self.set('successMsg', null);
        }
      });
    },
    saveEditCustomer(){
      let self = this;
      let ajax = this.get('ajax');
      let changeset = this.get('changeset');
      let jsonData = {
        "customerName": changeset.get('customerName'),
        "phoneNo": changeset.get('phoneNo'),
        "email": changeset.get('email'),
        "province" : changeset.get('province'),
        "district" : changeset.get('district'),
        "address" : changeset.get('address'),
        "note" : self.get('note'),
        "customerId": self.get('customerId')
      };
      
      ajax.postJsonData('save-customer.php', jsonData).then((r) => {
        if (r && r.result == "SUCCESS") {
          self.set('successMsg', "Cập nhật thông tin thành công");
          self.set('errorMsg', null);

        } else {
          self.set('errorMsg', r.message);
          self.set('successMsg', null);
        }
        self.searchCustomer();
        
      }, function () {
        self.set('errorMsg', "Có lỗi xảy ra.");
        self.set('successMsg', null);
      });
      $('#edit').modal('toggle');
    },
    deleteCustomer(customerId){
      this.set('customerId', customerId);
      $("#delete").modal({
        refresh: true
      });
    },
    confirmDeleteCustomer(){
      let self = this;
      let ajax = this.get('ajax');
      ajax.get('delete-customer.php?customerId='+self.get('customerId')).then((r) => {
        if (r && r.result === 'SUCCESS') {
          self.set('errorMsg', null);
          self.set('successMsg', "Xóa thành công");
          self.searchCustomer();
        } else {
          self.set('errorMsg', "Xóa thất bại");
          self.set('successMsg', null);
        }
        $('#delete').modal('toggle');
      });
    },
    search(){
      this.setProperties({
        successMsg : null,
        errorMsg : null
      });
      this.searchCustomer();
    },
    addCustomer(){
      this.setProperties({
        customerId : null,
        note : null, 
        province : null,
        district : null
      });
      this.get('changeset').setProperties({
        customerName : null,
        phoneNo : null,
        email : null,
        province : null,
        district : null,
        address : null
      });
      $("#edit").modal({
        refresh: true
      });
    }
  }
});