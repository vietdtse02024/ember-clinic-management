import {
  validatePresence,
  validateNumber
} from 'ember-changeset-validations/validators';
import validateValidateTextfieldRequire from 'ember-clinic-management/validators/validate-textfield-require'

export default {
  productName: [
    validateValidateTextfieldRequire({ presence: true,  ignoreBlank : true})
  ],
  importPrice: [
    validateValidateTextfieldRequire({ presence: true,  ignoreBlank : true}),
    validateNumber({gt : 0}),
  ]

}
