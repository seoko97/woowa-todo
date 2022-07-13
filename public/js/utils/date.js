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
  },
  {
    diff: ONE_HOUR,
    label: "분 전",
  },
  {
    diff: ONE_DAY,
    label: "시간 전",
  },
  {
    diff: ONE_WEEK,
    label: "일 전",
  },
  {
    diff: ONE_MONTH,
    label: "주 전",
  },
  {
    diff: ONE_YEAR,
    label: "달 전",
  },
];

function getSecondDiff(startDate, endDate) {
  return Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
}

export function getDateDiff(startDate, endDate) {
  const secondDiff = getSecondDiff(startDate, endDate);
  const currentDiff = DATE_DIFF.find(({ diff }) => secondDiff < diff);

  if (!currentDiff) {
    return `${Math.floor(secondDiff / ONE_YEAR)}${label}`;
  }

  return `${secondDiff % currentDiff.diff}${currentDiff.label}`;
}
