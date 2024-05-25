export const generateBetweenDateFilter = (date = new Date()) => {
  const startDate = new Date(date.toISOString());
  startDate.setHours(0, 0, 0, 1);

  const endDate = new Date(date.toISOString());
  endDate.setHours(23, 59, 59);

  return `${startDate.toISOString()},${endDate.toISOString()}`;
};
