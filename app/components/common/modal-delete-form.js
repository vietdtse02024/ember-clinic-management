import BaseCompenent from 'ember-clinic-management/components/common/base-component';
import $ from 'jquery';

export default BaseCompenent.extend({
  title : "",
  apiUrl : "",
  paramValue : "",
  pramName : "",
  parent : null,
  callback : "",
  actions:{
    confirmDelete(){
      let self = this;
      let ajax = self.get('ajax');
      let parent = self.get('parent');
      ajax.get(self.get('apiUrl') + '?' + self.get('pramName') + '=' + self.get('paramValue')).then((r) => {
        if (r && r.result === 'SUCCESS') {
          parent.setProperties({
            successMsg :  "Xóa thành công",
            errorMsg : null
          });
          parent.send(self.get("callback"));
        } else {
          parent.setProperties({
            successMsg : null,
            errorMsg : "Xóa thất bại"
          });
        }
        $('#delete').modal('toggle');
      }, (reason) => {
        $('#delete').modal('toggle');
        parent.setProperties({
          successMsg : null,
          errorMsg : "Xóa thất bại"
        });
      });
    }
  }

});
