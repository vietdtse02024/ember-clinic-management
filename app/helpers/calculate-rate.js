import { helper } from '@ember/component/helper';

export function calculateRate(params) {
  return Number(params[0]) * Number(params[1]);
}

export default helper(calculateRate);
