import { SVGProps, HeatMapValue } from './SVG';

export const oneDayTime = 24 * 60 * 60 * 1000;

export function isValidDate(date: Date) {
  return date instanceof Date && !isNaN(date.getTime());
}

const DATE_ONLY_PATTERN = /^(\d{4})[/-](\d{1,2})[/-](\d{1,2})$/;

export function parseDate(value: string | Date) {
  if (value instanceof Date) {
    return isValidDate(value) ? new Date(value.getTime()) : null;
  }

  const matched = value.match(DATE_ONLY_PATTERN);
  if (matched) {
    const year = Number(matched[1]);
    const month = Number(matched[2]) - 1;
    const day = Number(matched[3]);
    const date = new Date(year, month, day);
    if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
      return date;
    }
    return null;
  }

  const date = new Date(value);
  return isValidDate(date) ? date : null;
}

export function addDays(date: Date, days: number) {
  const nextDate = new Date(date.getTime());
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

export function getStartOfWeek(date: Date) {
  const startDate = new Date(date.getTime());
  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(startDate.getDate() - startDate.getDay());
  return startDate;
}

export function getDateToString(date: Date) {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

export function formatData(data: SVGProps['value'] = []) {
  const result: Record<string, HeatMapValue> = {};
  data.forEach((item) => {
    if (item.date) {
      const date = parseDate(item.date);
      if (!date) return;
      const dateString = getDateToString(date);
      result[dateString] = {
        ...item,
        date: dateString,
      };
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

export const convertPanelColors = (colors: string[], maxCount: number): Record<number, string> => {
  const step = Math.ceil(maxCount / (colors.length - 1));
  const panelColors: Record<number, string> = {};
  colors.forEach((color, index) => {
    panelColors[index * step] = color;
  });
  return panelColors;
};