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
