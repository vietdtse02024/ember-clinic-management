import { isMac, isTouchDevice } from 'ember-clinic-management/utils/browser';
import BaseTooltip from 'ember-clinic-management/components/common/base-tooltip';
import moment from 'moment';
import $ from 'jquery';
import { computed } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';

export default BaseTooltip.extend({

  classNames: ['input-group-datetimepicker'],

  value: null,

  format: computed(function() {
    let format = 'DD/MM/YYYY'; // update: always this format
    return format;
  }),

  start: null,

  end: null,

  didInsertElement() {
    this._super(...arguments);
    this.$inputContainer = this.$('input').parent();
    let format = this.get('format');
    let initValue = this.get('value');
    let options = {
      locale: 'en',
      format: format,
      focusOnShow: !isTouchDevice,
      useStrict: true, // avoid invalid date
      allowInputToggle: true,
      useCurrent: false,
      // autoclose: isTouchDevice,
      icons: {
        time: 'flaticon-clock',
        date: 'fa fa-calendar',
        up: 'fa fa-chevron-circle-up',
        down: 'fa fa-chevron-circle-down',
        previous: 'fa fa-chevron-circle-left',
        next: 'fa fa-chevron-circle-right',
      },
      minDate : this.get('start') ? Number(this.get('start')) : false,
      maxDate : this.get('end') ? Number(this.get('end')) : false,
    };
    // defalut value
    if (initValue) {
      let defaultDate = moment(new Date(initValue));
      if (defaultDate.isValid()) {
        options.defaultDate = defaultDate;
      }
    }
    // avoid ember warning: You should never change properties on components
    scheduleOnce('afterRender', () => {
      this.$inputContainer.datetimepicker(options)
        .on('dp.change', this.changeFunction.bind(this))
        .on('dp.show', this.removeTooltip.bind(this))
        .on('dp.show', (e) => {
          if (isMac && isTouchDevice) {
            let $target = $(e.target);
            $('body').one('touchend', (e) => {
              if ($(e.target).closest('.bootstrap-datetimepicker-widget').length === 0) {
                $target.datetimepicker('hide');
              }
            });
          }
        });
      this.addTouchListener();
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    this.removeTouchListener();
    this.$inputContainer.data("DateTimePicker").destroy();
  },

  addTouchListener() {
    if (isTouchDevice) {
      let $date = this.$inputContainer;
      $date.on('dp.show', (e) => {
        let $target = $(e.target);
        let elementId = this.get('elementId');
        let eventName = `touchend.${elementId}.datetimepicker`;
        $('body').off(eventName).on(eventName, (e) => {
          if ($(e.target).closest('.bootstrap-datetimepicker-widget').length === 0) {
            $('body').off(eventName);
            setTimeout(() => {
              $target.data("DateTimePicker").hide();
            }, 200);
          }
        });
      })
        .on('dp.hide', () => {
          this.removeTouchListener();
        });
    }
  },

  removeTouchListener() {
    if (isTouchDevice) {
      let elementId = this.get('elementId');
      let eventName = `touchend.${elementId}.datetimepicker`;
      $('body').off(eventName);
    }
  },

  changeFunction: function(e) {
    let date = e.date;
    let value = null;
    if (date && date.isValid()) {
      value = date.format('DD/MM/YYYY');
    }
    this.set('value', value);
  },

  actions: {
    validate(){
      this.get('changeset').validate(this.get('fieldName')).then(function(r){
      }.bind(this));
    },
  }

});
