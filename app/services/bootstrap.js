import Service from '@ember/service';
import UserModel from 'ember-clinic-management/models/user-model';
import SettingModel from 'ember-clinic-management/models/setting-model';
import { Enums} from 'ember-clinic-management/utils/enums';
import EmberObject from '@ember/object';
export default Service.extend({
  userModel : null,
  settingModel : SettingModel.create({}),
  init() {
    this._super(...arguments);
    this.set('enums', EmberObject.create(Enums));
  },
  boot: function(name, value) {
    this.set(name, value);
    localStorage.setItem(name, JSON.stringify(value));
  },
  pushUserModel: function(data) {
    this.set('userModel', UserModel.create({
      ID: data.ID,
      USER_NAME: data.USER_NAME,
      PASSWORD: data.PASSWORD,
      FULL_NAME: data.FULL_NAME,
      RIGHT_ID: data.RIGHT_ID
    }));
    localStorage.setItem('userModel', JSON.stringify(this.get('userModel')));
  },
  pushSettingModel: function(data) {
    this.set('settingModel', SettingModel.create({
      SETTING_ID:  data.SETTING_ID,
      COMMISSION:  data.COMMISSION,
      LANGUAGE:  data.LANGUAGE,
      INPUT_STAFF_CODE:  data.INPUT_STAFF_CODE,
      DEFAULT_STAFF_CODE:  data.DEFAULT_STAFF_CODE,
      IS_EMPTY_PRODUCT_CODE:  data.IS_EMPTY_PRODUCT_CODE,
      INPUT_PRODUCT_CODE:  data.INPUT_PRODUCT_CODE,
      DEFAULT_PRODUCT_CODE:  data.DEFAULT_PRODUCT_CODE,
      IS_EMPTY_SERIAL:  data.IS_EMPTY_SERIAL,
      IS_EMPTY_IMPORT_ORDER:  data.IS_EMPTY_IMPORT_ORDER,
      INPUT_IMPORT_ORDER:  data.INPUT_IMPORT_ORDER,
      DEFAULT_IMPORT_CODE:  data.DEFAULT_IMPORT_CODE,
      IS_EMPTY_EXPORT_ORDER:  data.IS_EMPTY_EXPORT_ORDER,
      INPUT_EXPORT_ORDER:  data.INPUT_EXPORT_ORDER,
      DEFAULT_EXPORT_CODE:  data.DEFAULT_EXPORT_CODE,
      IS_EMPTY_SELL_ORDER:  data.IS_EMPTY_SELL_ORDER,
      INPUT_SELL_ORDER:  data.INPUT_SELL_ORDER,
      DEFAULT_SELL_CODE:  data.DEFAULT_SELL_CODE,
      DEFAULT_IMPORT_INVENTORY:  data.DEFAULT_IMPORT_INVENTORY,
      DEFAULT_EXPORT_INVENTORY:  data.DEFAULT_EXPORT_INVENTORY,
      DAILY_REPORT:  data.DAILY_REPORT,
      MONTHLY_REPORT:  data.MONTHLY_REPORT,
      STORE_NAME:  data.STORE_NAME,
      STORE_ADDRESS:  data.STORE_ADDRESS,
      PHONE:  data.PHONE
    }));
  },
  getActiveUser(){
    var user = this.get('userModel');
    if (user) {
      return user;
    } else {
      // try to get the user from localStorage
      var foundUser = JSON.parse(localStorage.userModel);
      if (foundUser) {
        this.set('userModel', foundUser);
        return foundUser;
      } else {
        return null;
      }
    }
  }
});
