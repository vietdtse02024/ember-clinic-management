import { computed } from '@ember/object'
import AjaxService from 'ember-ajax/services/ajax';
import config from '../config/environment';
import { getCookie } from '../utils/cookie';
import $ from 'jquery';
import { Promise } from 'rsvp';
export default AjaxService.extend({
  namespace: config.rootURL,
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

  get(url) {
    $("#loading-page").show();
    return new Promise(function(resolve, reject){
      $.ajax({
        type: 'GET',
        url: config.apiURL + url,
        success: function (data) {
          $("#loading-page").hide();
          resolve(data);
        },
        error: function (r) {
          console.log(r.responseText);
          $("#loading-page").hide();
          reject(r);
        }
      });
    });
  },

  postFormData(url, formData){
    $("#loading-page").show();
    return $.ajax({
      type: "POST",
      url: config.apiURL + url,
      data: formData,
      processData: false,
      cache: false,
      timeout: 600000,
      success: function (r) {
        $("#loading-page").hide();
        return r;
      },
      error: function (r) {
        console.log(r.responseText);
        $("#loading-page").hide();
        return Promise.reject(r);
      }
    });
  },
  postJsonData(url, jsonData){
    $("#loading-page").show();
    return $.ajax({
      type: "POST",
      url: config.apiURL + url,
      data: {mydata : JSON.stringify(jsonData)},
      dataType: 'json',
      success: function (r) {
        $("#loading-page").hide();
        return r;
      },
      error: function (r) {
        console.log(r.responseText);
        $("#loading-page").hide();
        return Promise.reject(r);
      }
    });
  },

  init() {
    this._super(...arguments);
    $.ajaxSetup({
      cache: false,
      timeout: config.APP.TIMEOUT
    });
  }

});
