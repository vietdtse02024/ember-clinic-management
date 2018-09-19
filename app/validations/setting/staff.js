import {
  validateLength,
  validateFormat,
  validateInclusion,
  validateConfirmation
} from 'ember-changeset-validations/validators';

import validateValidateDropdownRequire from 'ember-clinic-management/validators/validate-dropdown-require';
import validateValidateTextfieldRequire from 'ember-clinic-management/validators/validate-textfield-require';

export default {
  userRight: [
    validateValidateDropdownRequire(-1),
  ],
  userName: [
    validateValidateTextfieldRequire({ presence: true,  ignoreBlank : true})
  ],
  password: [
    validateValidateTextfieldRequire({ presence: true,  ignoreBlank : true})
  ],
  confirmPassword: [
    validateConfirmation({ on: 'password' })
  ],

}
