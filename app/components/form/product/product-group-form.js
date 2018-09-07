import BaseCompenent from 'ember-clinic-management/components/common/base-component';
import GroupValidations from 'ember-clinic-management/validations/product/product-group';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';
import $ from 'jquery';
import { copy } from '@ember/object/internals';

export default BaseCompenent.extend({
  resultSearch : null,
  successMsg : null,
  errorMsg : null,
  groupId : null,
  init() {
    this._super(...arguments);
    this.changeset = new Changeset(this, lookupValidator(GroupValidations), GroupValidations, { skipValidate : true });
    this.send("searchGroup");
    $("#tab-product").addClass('active');
  },
  actions:{
    searchGroup() {
      let ajax = this.get('ajax');
      let self = this;
      ajax.get('product-group/search-group.php').then((r) => {
        if (r.type === 'DATA' && r.data) {
          self.set('resultSearch', r.data);
        }
      });
    },
    editGroup(item){
      this.setProperties({
        successMsg: null,
        errorMsg: null
      });
      let changeset = this.get('changeset');
      if (item) {
        this.set('editModalTitle', "Cập nhật thông tin nhóm sản phẩm");
        changeset.setProperties({
          groupName : item.ProductGroupName,
          note : item.Description,
        });
        this.setProperties({
          groupId : item.ID
        });
      } else {
        this.set('editModalTitle', "Thêm mới nhóm sản phẩm");
        changeset.setProperties({
          groupName : null,
          note : null,
        });
        this.setProperties({
          groupId : null
        });
      }
      this.openModal('edit');
    },
    saveEditGroup(){
      let self = this;
      let ajax = this.get('ajax');
      let changeset = this.get('changeset');
      let jsonData = {
        "groupId": self.get('groupId'),
        "groupName": changeset.get('groupName'),
        "note" : changeset.get('note')
      };

      let snapshot = changeset.snapshot();
      changeset.validate().then(() => {
        if (changeset.get('isValid')) {
          changeset.execute();
          changeset.save();
          ajax.postJsonData('product-group/save-group.php', jsonData).then((r) => {
            if (r && r.result == "SUCCESS") {
              self.set('successMsg', "Cập nhật thông tin thành công");
              self.set('errorMsg', null);

            } else {
              self.set('errorMsg', r.message);
              self.set('successMsg', null);
            }
            self.send("searchGroup");

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
    deleteGroup(groupId){
      this.set('groupId', groupId);
      this.openModal('delete');
    },
    search() {
      this.setProperties({
        successMsg: null,
        errorMsg: null
      });
      this.send("searchGroup");
    },
  }
});
