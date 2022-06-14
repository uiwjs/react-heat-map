import { SVGProps, HeatMapValue } from './SVG';

export const oneDayTime = 24 * 60 * 60 * 1000;

export function isValidDate(date: Date) {
  return date instanceof Date && !isNaN(date.getTime());
}

export function getDateToString(date: Date) {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

export function formatData(data: SVGProps['value'] = []) {
  const result: Record<string, HeatMapValue> = {};
  data.forEach((item) => {
    if (item.date && isValidDate(new Date(item.date))) {
      item.date = getDateToString(new Date(item.date));
      result[item.date] = item;
    }
  });
  return result;
}

/** 排序 比较函数 */
export function numberSort(keys: number[] = []) {
  return keys.sort((x, y) => {
    if (x < y) return -1;
    else if (x > y) return 1;
    return 0;
  });
}

export function existColor(num: number = 0, nums: number[], panelColors: Record<number, string> = {}) {
  let color = '';
  for (let a = 0; a < nums.length; a += 1) {
    if (nums[a] > num) {
      color = panelColors[nums[a]];
      break;
    }
    color = panelColors[nums[a]];
  }
  return color;
}
