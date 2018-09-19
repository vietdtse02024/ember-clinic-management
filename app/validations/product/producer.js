import validateValidateTextfieldRequire from 'ember-clinic-management/validators/validate-textfield-require';

export default {
  producerName: [
    validateValidateTextfieldRequire({ presence: true,  ignoreBlank : true})
  ]

}
