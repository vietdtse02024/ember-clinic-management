import Component from '@ember/component';
import { inject as service } from '@ember/service';
import $ from 'jquery';
export default Component.extend({
  ajax: service(),
  bootstrap: service(),
  storeName : null,
  storeAddress : null,
  phoneNo : null,
  commission : null,
  successMsg : null,
  errorMsg : null,
  init() {
    this._super(...arguments);
    let bootstrap = this.get('bootstrap');
    this.set('storeName', bootstrap.get('settingModel').STORE_NAME)
    this.set('storeAddress', bootstrap.get('settingModel').STORE_ADDRESS);
    this.set('phoneNo', bootstrap.get('settingModel').PHONE);
    this.set('commission', bootstrap.get('settingModel').COMMISSION);
  },
  actions:{
    saveOption(){
      let self = this;
      let ajax = this.get('ajax');
      let bootstrap = this.get('bootstrap');
      self.set('successMsg', null);
      self.set('errorMsg', null);
      ajax.postFormData('save-setting.php', $("#option-form").serialize()).then((r) => {
        if (r && r.result == "SUCCESS") {
          self.set('successMsg', "Lưu thông tin cài đặt thành công");
          self.set('errorMsg', null);
          ajax.get('search-setting.php').then((response) => {
            if (response.type === 'DATA' && response.data) {
              bootstrap.pushSettingModel(response.data[0]);
            }
          });
        } else {
          self.set('errorMsg', "Lưu thông tin cài đặt thất bại");
          self.set('successMsg', null);
        }
      }, function () {
        self.set('errorMsg', "Có lỗi xảy ra.");
        self.set('successMsg', null);
      });

    }

  }
});
