import Component from '@ember/component';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import StaffValidations from 'ember-clinic-management/validations/setting/staff';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';
export default Component.extend({
  ajax: service(),
  bootstrap: service(),
  resultSearch : null,
  successMsg : null,
  errorMsg : null,
  staffId : null,
  editForm : false,
  init() {
    this._super(...arguments);
    $("#tab-option").addClass('active');
    this.changeset = new Changeset(this, lookupValidator(StaffValidations), StaffValidations, { skipValidate : true });
    this.send("searchStaff");
  },

  actions:{
    searchStaff() {
      let ajax = this.get('ajax');
      let self = this;
      ajax.get('staff/search-staff.php').then((r) => {
        if (r.type === 'DATA' && r.data) {
          self.set('resultSearch', r.data);
        }
      });
    },
    editStaff(staffId){
      let self = this;
      let ajax = this.get('ajax');
      ajax.get('staff/search-staff-edit.php?staffId='+staffId).then((r) => {
        if (r.type === 'DATA' && r.data) {
          let data = r.data[0];
          self.get('changeset').setProperties({
            userName : data.USER_NAME,
            fullName : data.FULL_NAME,
            description : data.DESCRIPTION,
            userRight : data.RIGHT_ID,
            password : undefined,
            confirmPassword : undefined
          });
          self.setProperties({
            staffId : staffId,
            userRight : data.RIGHT_ID,
            editForm : true
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
    saveEditStaff(){
      let self = this;
      let ajax = this.get('ajax');
      let changeset = this.get('changeset');
      let bootstrap = this.get('bootstrap');
      let jsonData = {
        "fullName": changeset.get('fullName'),
        "description": changeset.get('description'),
        "staffId": self.get('staffId'),
        "userRight" : changeset.get('userRight'),
        "password" : changeset.get('password'),
        "userName" : changeset.get('userName'),
        "userLogin" : bootstrap.get('userModel').ID
      };
      let snapshot = changeset.snapshot();
      changeset.validate().then(() => {
        if (changeset.get('isValid')) {
          changeset.execute();
          changeset.save();
          ajax.postJsonData('staff/save-staff.php', jsonData).then((r) => {
            if (r && r.result == "SUCCESS") {
              self.set('successMsg', "Cập nhật thông tin thành công");
              self.set('errorMsg', null);

            } else {
              self.set('errorMsg', r.message);
              self.set('successMsg', null);
            }
            self.send("searchStaff");

          }, function () {
            self.set('errorMsg', "Có lỗi xảy ra.");
            self.set('successMsg', null);
          });
          $('#edit').modal('toggle');
        }
      }).catch(() => {
        changeset.restore(snapshot);
      });

    },
    deleteStaff(staffId){
      this.set('staffId', staffId);
      $("#delete").modal({
        refresh: true
      });
    },
    search(){
      this.setProperties({
        successMsg : null,
        errorMsg : null
      });
      this.send("searchStaff");
    },
    addStaff(){
      this.get('changeset').setProperties({
        userName : null,
        userRight : null,
        fullName : null,
        description : null,
        password : null,
        confirmPassword : null
      });
      this.setProperties({
        staffId : null,
        userRight : null,
        editForm : false
      });
      $("#edit").modal({
        refresh: true
      });
    },
    changePassword(staffId){

      this.get('changeset').setProperties({
        password : null,
        confirmPassword : null
      });
      this.setProperties({
        staffId : staffId
      });
      $("#change-pass").modal({
        refresh: true
      });
    },
    saveChangePassword(){
      let self = this;
      let ajax = this.get('ajax');
      let changeset = this.get('changeset');
      let bootstrap = this.get('bootstrap');
      let jsonData = {
        "staffId": self.get('staffId'),
        "password" : changeset.get('password'),
        "userLogin" : bootstrap.get('userModel').ID
      };
      ajax.postJsonData('staff/change-password.php', jsonData).then((r) => {
        if (r && r.result == "SUCCESS") {
          self.set('successMsg', "Đổi mật khẩu thành công");
          self.set('errorMsg', null);

        } else {
          self.set('errorMsg', "Đổi mật khẩu thất bại");
          self.set('successMsg', null);
        }
      }, function () {
        self.set('errorMsg', "Có lỗi xảy ra.");
        self.set('successMsg', null);
      });
      $('#change-pass').modal('toggle');

    },

  }
});
