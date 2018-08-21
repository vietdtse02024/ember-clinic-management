import Component from '@ember/component';
import { inject as service } from '@ember/service';
import $ from 'jquery';
export default Component.extend({
  ajax: service(),
  bootstrap: service(),
  router: service(),
  loginFailed: false,
  isProcessing: false,
  init() {
    this._super(...arguments);
    let model = this.get('model');
  },
  success(userData) {
    let bootstrap = this.get('bootstrap');
    bootstrap.boot("isAuthen", true);
    bootstrap.pushUserModel(userData);
    this.get('router').transitionTo('index.welcome');
  },
  failure() {
    let bootstrap = this.get('bootstrap');
    bootstrap.boot("isAuthen", false);
    this.set("loginFailed", true);
  },
  actions:{
    login(){
      this.setProperties({
        loginFailed: false,
        isProcessing: true
      });
      let self = this;
      let ajax = this.get('ajax');
      ajax.postFormData('login.php', $("#login-form").serialize()).then((r) => {
        self.set("isProcessing", false);
        if (r && r.result == "SUCCESS") {
          self.success(r.data[0]);
        } else {
          self.failure();
        }
      }, function () {
        self.set("isProcessing", false);
        self.failure();
      });

    }

  }
});
