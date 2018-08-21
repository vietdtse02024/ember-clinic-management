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
  doctorId : null,
  init() {
    this._super(...arguments);
    this.changeset = new Changeset(this);
    $("#tab-customer").addClass('active');
    this.searchDoctor();
    
  },
  searchDoctor() {
    let ajax = this.get('ajax');
    let self = this;
    ajax.get('search-doctor.php?doctorId=' + this.get('changeset').get('doctorIdSearch')).then((r) => {
      if (r.type === 'DATA' && r.data) {
        self.set('resultSearch', r.data);
      }
    });
  },
  actions:{
    editDoctor(doctorId){
      let self = this;
      let ajax = this.get('ajax');
      ajax.get('search-doctor.php?doctorId='+doctorId).then((r) => {
        if (r.type === 'DATA' && r.data) {
          let data = r.data[0];
          self.setProperties({
            doctorId : doctorId,
            note : data.DoctorDescription, 
            province : data.DoctorProvinceID,
            district : data.DoctorDistrictID
          });
          self.get('changeset').setProperties({
            doctorName : data.DoctorName,
            phoneNo : data.DoctorPhoneNo,
            email : data.DoctorEmail,
            province : data.DoctorProvinceID,
            district : data.DoctorDistrictID,
            address : data.DoctorAddress
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
    saveEditDoctor(){
      let self = this;
      let ajax = this.get('ajax');
      let changeset = this.get('changeset');
      let jsonData = {
        "doctorName": changeset.get('doctorName'),
        "phoneNo": changeset.get('phoneNo'),
        "email": changeset.get('email'),
        "province" : changeset.get('province'),
        "district" : changeset.get('district'),
        "address" : changeset.get('address'),
        "note" : self.get('note'),
        "doctorId": self.get('doctorId')
      };
      
      ajax.postJsonData('save-doctor.php', jsonData).then((r) => {
        if (r && r.result == "SUCCESS") {
          self.set('successMsg', "Cập nhật thông tin thành công");
          self.set('errorMsg', null);

        } else {
          self.set('errorMsg', r.message);
          self.set('successMsg', null);
        }
        self.searchDoctor();
        
      }, function () {
        self.set('errorMsg', "Có lỗi xảy ra.");
        self.set('successMsg', null);
      });
      $('#edit').modal('toggle');
    },
    deleteDoctor(doctorId){
      this.set('doctorId', doctorId);
      $("#delete").modal({
        refresh: true
      });
    },
    confirmDeleteDoctor(){
      let self = this;
      let ajax = this.get('ajax');
      ajax.get('delete-doctor.php?doctorId='+self.get('doctorId')).then((r) => {
        if (r && r.result === 'SUCCESS') {
          self.set('errorMsg', null);
          self.set('successMsg', "Xóa thành công");
          self.searchDoctor();
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
      this.searchDoctor();
    },
    addDoctor(){
      this.setProperties({
        doctorId : null,
        note : null, 
        province : null,
        district : null
      });
      this.get('changeset').setProperties({
        doctorName : null,
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