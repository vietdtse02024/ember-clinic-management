import {
  validateNumber
} from 'ember-changeset-validations/validators';
import validateValidateTextfieldRequire from 'ember-clinic-management/validators/validate-textfield-require';

export default {
  unitName: [
    validateValidateTextfieldRequire({ presence: true,  ignoreBlank : true})
  ],
  unitExchange: [
    validateValidateTextfieldRequire({ presence: true,  ignoreBlank : true}),
    validateNumber({ gt: 0, integer: true }),
  ]

}
