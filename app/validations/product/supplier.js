import validateValidateTextfieldRequire from 'ember-clinic-management/validators/validate-textfield-require';

export default {
  supplierName: [
    validateValidateTextfieldRequire({ presence: true,  ignoreBlank : true})
  ]

}
