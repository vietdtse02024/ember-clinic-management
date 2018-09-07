import BaseCompenent from 'ember-clinic-management/components/common/base-component';
import ProducerValidations from 'ember-clinic-management/validations/product/producer';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';
import $ from 'jquery';
import { copy } from '@ember/object/internals';

export default BaseCompenent.extend({
  resultSearch : null,
  successMsg : null,
  errorMsg : null,
  producerId : null,
  init() {
    this._super(...arguments);
    this.changeset = new Changeset(this, lookupValidator(ProducerValidations), ProducerValidations, { skipValidate : true });
    this.send("searchProducer");
    $("#tab-product").addClass('active');
  },
  actions:{
    searchProducer() {
      let ajax = this.get('ajax');
      let self = this;
      ajax.get('producer/search-producer.php').then((r) => {
        if (r.type === 'DATA' && r.data) {
          self.set('resultSearch', r.data);
        }
      });
    },
    editProducer(item){
      this.setProperties({
        successMsg: null,
        errorMsg: null
      });
      let changeset = this.get('changeset');
      if (item) {
        this.set('editModalTitle', "Cập nhật thông tin nước sản xuất");
        changeset.setProperties({
          producerName : item.ProducterName,
          note : item.Description,
        });
        this.setProperties({
          producerId : item.ID
        });
      } else {
        this.set('editModalTitle', "Thêm mới nước sản xuất");
        changeset.setProperties({
          producerName : null,
          note : null,
        });
        this.setProperties({
          producerId : null
        });
      }
      this.openModal('edit');
    },
    saveEditProducer(){
      let self = this;
      let ajax = this.get('ajax');
      let changeset = this.get('changeset');
      let jsonData = {
        "producerId": self.get('producerId'),
        "producerName": changeset.get('producerName'),
        "note" : changeset.get('note')
      };

      let snapshot = changeset.snapshot();
      changeset.validate().then(() => {
        if (changeset.get('isValid')) {
          changeset.execute();
          changeset.save();
          ajax.postJsonData('producer/save-producer.php', jsonData).then((r) => {
            if (r && r.result == "SUCCESS") {
              self.set('successMsg', "Cập nhật thông tin thành công");
              self.set('errorMsg', null);

            } else {
              self.set('errorMsg', r.message);
              self.set('successMsg', null);
            }
            self.send("searchProducer");

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
    deleteProducer(producerId){
      this.set('producerId', producerId);
      this.openModal('delete');
    },
    search() {
      this.setProperties({
        successMsg: null,
        errorMsg: null
      });
      this.send("searchProducer");
    },
  }
});
