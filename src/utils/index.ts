import type { TimeDelta, CronExpression } from 'interfaces';

export const formatDigits = (digit: number) => (
  digit.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })
);

export function formatScheduleCode(scheduleInterval: TimeDelta | CronExpression): string {
  if ('value' in scheduleInterval) return scheduleInterval.value;
  return `
    ${scheduleInterval.days} day${scheduleInterval.days > 1 ? 's' : ''}
    ${' '}
    0:${formatDigits(scheduleInterval.seconds)}:${formatDigits(scheduleInterval.microseconds)}
  `;
}

export const isObject = (obj: any) => Object.prototype.toString.call(obj) === '[object Object]';

export const camelToSnakeCase = (obj: Record<string, any>) => {
  const newObj: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    const newKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    const value = obj[key];
    if (isObject(value)) {
      newObj[newKey] = camelToSnakeCase(value);
    } else {
      newObj[newKey] = value;
    }
  });
  return newObj;
};
