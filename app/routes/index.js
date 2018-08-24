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
    let bootstrap = this.get('bootstrap');
    return {
      fullName : bootstrap.get('userModel').FULL_NAME
    }
  },
  afterModel(model) {
    this._super(...arguments);
    let bootstrap = this.get('bootstrap');
    if (!bootstrap.isAuthen) {
      //this.replaceWith('authen.login');
    }

  },
  setupController: function(controller, model) {
    this._super(...arguments);
  },
  getUserSetting() {
    let ajax = this.get('ajax');
    let bootstrap = this.get('bootstrap');
    ajax.get('search-setting.php').then((r) => {
      if (r.type === 'DATA' && r.data) {
        bootstrap.pushSettingModel(r.data[0]);
      }
    });
  }
});
