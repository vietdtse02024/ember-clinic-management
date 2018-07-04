import Component from '@ember/component';

export default Component.extend({
  init() {
    this._super(...arguments);
    let model = this.get('model');
  },
  getFormData() {
    let form = new FormData();
    form.append('userName', this.get('userName'));
    form.append('password', this.get('password'));
    return form;
  },
  actions:{
    login(){
      console.log(this.get('model').userName);
      $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "http://localhost/API/search.php",
        data: self.getFormData(),
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (r) {
          console.log(r);
        },
        error: function (e) {
        }
      });
    }
  }
});
