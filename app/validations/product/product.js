
import validateValidateTextfieldRequire from 'ember-clinic-management/validators/validate-textfield-require'

export default {
  productName: [
    validateValidateTextfieldRequire({ presence: true,  ignoreBlank : true})
  ]

}
