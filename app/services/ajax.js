import { computed } from '@ember/object'
import AjaxService from 'ember-ajax/services/ajax';
import config from './config/environment';
import { getCookie } from './utils/cookie';

export default AjaxService.extend({
  namespace: config.rootURL + 'rest',
  headers: computed({
    get() {
      let headers = {};
      const csrfToken = getCookie('csrf_token');
      if (csrfToken) {
        headers['X-Csrf-Token'] = csrfToken;
      }
      return headers;
    }
  }).volatile(),

  request() {
    return this._super(...arguments).then((resp) => {
      if (resp && resp.redirect) {
        location.href = resp.redirect;
        return;
      } else {
        return resp;
      }
    });

  },

  post(url, param){
    return this.request(url, {
      method: 'POST',
      data: param,
    })
  },

  init() {
    this._super(...arguments);
    let namespace = this.get('namespace');
    $.ajaxSetup({
      cache: false,
      timeout: config.APP.TIMEOUT
    });
  }

});
