import validateValidateTextfieldRequire from 'ember-clinic-management/validators/validate-textfield-require';

export default {
  groupName: [
    validateValidateTextfieldRequire({ presence: true,  ignoreBlank : true})
  ]

}
