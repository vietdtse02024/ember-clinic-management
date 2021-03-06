import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default Route.extend({
  bootstrap: service(),
  ajax: service(),

  init() {
    this._super(...arguments);
    this.getUserSetting();
  },
  model() {
    if (localStorage.isAuthen =='true') {
      let bootstrap = this.get('bootstrap');
      let activeUser = bootstrap.getActiveUser();
      return {
        fullName : activeUser.FULL_NAME
      }
    }
  },
  afterModel(model) {
    this._super(...arguments);
    let bootstrap = this.get('bootstrap');
    if (localStorage.isAuthen == 'false') {
      this.replaceWith('authen.login');
    }

  },
  setupController: function(controller, model) {
    this._super(...arguments);
  },
  getUserSetting() {
    let ajax = this.get('ajax');
    let bootstrap = this.get('bootstrap');
    ajax.get('setting/search-setting.php').then((r) => {
      if (r.type === 'DATA' && r.data) {
        bootstrap.pushSettingModel(r.data[0]);
      }
    });
  }
});
