export default function validateValidateDropdownRequire(defaultValue) {
  return (key, newValue, oldValue, changes, content) => {
    if (!newValue || newValue == defaultValue) {
      return "Thông tin này yêu cầu phải nhập";
    } else {
      return true;
    }
  };
}
