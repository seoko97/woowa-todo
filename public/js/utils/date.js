const ONE_MINUTE = 60;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_WEEK = 7 * ONE_WEEK;
const ONE_MONTH = 30 * ONE_WEEK;
const ONE_YEAR = 365 * ONE_DAY;

const DATE_DIFF = [
  {
    diff: ONE_MINUTE,
    label: "초 전",
    prevDiff: 1,
  },
  {
    diff: ONE_HOUR,
    label: "분 전",
    prevDiff: ONE_MINUTE,
  },
  {
    diff: ONE_DAY,
    label: "시간 전",
    prevDiff: ONE_HOUR,
  },
  {
    diff: ONE_WEEK,
    label: "일 전",
    prevDiff: ONE_DAY,
  },
  {
    diff: ONE_MONTH,
    label: "주 전",
    prevDiff: ONE_WEEK,
  },
  {
    diff: ONE_YEAR,
    label: "달 전",
    prevDiff: ONE_MONTH,
  },
];

function getSecondDiff(startDate, endDate) {
  return Math.max(
    Math.floor((endDate.getTime() - startDate.getTime()) / 1000) - 9 * ONE_HOUR,
    0
  );
}

export function getDateDiff(startDate) {
  const endDate = new Date();
  const secondDiff = getSecondDiff(new Date(startDate), endDate);

  for (const { diff, label, prevDiff } of DATE_DIFF) {
    if (secondDiff < diff) {
      return `${Math.floor(secondDiff / prevDiff)}${label}`;
    }
  }

  return `${Math.floor(secondDiff / ONE_YEAR)}${label}`;
}
