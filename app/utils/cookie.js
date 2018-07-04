export function getCookie(name) {
  let match = document.cookie.match(new RegExp(name + '=([^;]+)'));
  if (match) return match[1];
  return null;
}
