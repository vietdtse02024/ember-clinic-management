import Component from '@ember/component';
import { inject as service } from '@ember/service';
import $ from 'jquery';
export default Component.extend({
  ajax: service(),
  bootstrap: service(),
  resultSearch : null,
  successMsg : null,
  errorMsg : null,
  roleName : null,
  description : null,
  roleId : null,
  init() {
    this._super(...arguments);
    $("#tab-option").addClass('active');
    this.searchRole();
  },
  searchRole() {
    let ajax = this.get('ajax');
    let self = this;
    ajax.get('search-role.php').then((r) => {
      if (r.type === 'DATA' && r.data) {
        self.set('resultSearch', r.data);
      }
    });
  },
  actions:{
    editRole(roleId){
      let self = this;
      let ajax = this.get('ajax');
      $("input[type=checkbox]").prop('checked', false);
      ajax.get('search-role-edit.php?roleId='+roleId).then((r) => {
        if (r.type === 'DATA' && r.data) {
          let data = r.data;
          data.forEach(function(item) {
            self.set('roleName', item.RightName);
            self.set('description', item.Description);
            $("#"+item.ScreenID).prop('checked', true);
          });
          this.set('roleId', roleId);
          $("#edit").modal();
        } else {
          self.set('errorMsg', "Cõ lỗi xảy ra!!!");
          self.set('successMsg', null);
        }
      });
    },
    saveEditRole(){
      let self = this;
      let ajax = this.get('ajax');
      let jsonData = {
        "roleName": this.get('roleName'),
        "description": this.get('description'),
        "roleId": this.get('roleId'),
        "roleData" : null
      };
      var checkedList = new Array();
      $("#edit-role-form").find('input[type=checkbox]').each(function () {
        if (this.checked) {
          checkedList.push($(this).attr('name'));
        }
      });

      if ((!jsonData.description || jsonData.description.trim() == '') || (!jsonData.roleName || jsonData.roleName.trim() == '') || checkedList.length === 0) {
        this.setProperties({
          successMsg : null,
          errorMsg : "Thông tin không được để trống"
        });
        $('#edit').modal('toggle');
        return;
      }

      jsonData.roleData = checkedList;
      ajax.postJsonData('save-role.php', jsonData).then((r) => {
        if (r && r.result == "SUCCESS") {
          self.set('successMsg', "Cập nhật thông tin thành công");
          self.set('errorMsg', null);

        } else {
          self.set('errorMsg', "Cập nhật thông tin thất bại");
          self.set('successMsg', null);
        }
        self.searchRole();
        $('#edit').modal('toggle');
      }, function () {
        self.set('errorMsg', "Có lỗi xảy ra.");
        self.set('successMsg', null);
      });
    },
    deleteRole(roleId){
      this.set('roleId', roleId);
      $("#delete").modal();
    },
    confirmDeleteRole(){
      let self = this;
      let ajax = this.get('ajax');
      ajax.get('delete-role.php?roleId='+self.get('roleId')).then((r) => {
        if (r && r.result === 'SUCCESS') {
          self.set('errorMsg', null);
          self.set('successMsg', "Xóa thành công");
          self.searchRole();
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
      this.searchRole();
    },
    addRole(){
      this.setProperties({
        successMsg : null,
        errorMsg : null,
        roleName : null,
        description : null,
        roleId : null
      });
      $("input[type=checkbox]").prop('checked', false);
      $("#edit").modal();
    }

  }
});
