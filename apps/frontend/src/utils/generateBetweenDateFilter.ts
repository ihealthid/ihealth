export const generateBetweenDateFilter = (date = new Date()) => {
  const startDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0,
  );
  const endDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    999,
  );

  return "$btw:" + [startDate.toISOString(), endDate.toISOString()].join(",");
};
