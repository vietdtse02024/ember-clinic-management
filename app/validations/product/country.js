import validateValidateTextfieldRequire from 'ember-clinic-management/validators/validate-textfield-require';

export default {
  countryName: [
    validateValidateTextfieldRequire({ presence: true,  ignoreBlank : true})
  ]

}
