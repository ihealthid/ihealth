import dayjs from "dayjs";

export const ageCounter = (date: string) => {
  const current = new Date();

  const years = dayjs(current).diff(date, "years");
  const month = dayjs(current).subtract(years, "years").diff(date, "months");
  const day = dayjs(current)
    .subtract(years, "years")
    .subtract(month, "months")
    .diff(date, "days");

  return {
    years,
    month,
    day,
  };
};

export const humanizedDate = (date: string) => {
  return dayjs(date).format("DD MMM YYYY");
};

export const today = () => dayjs().format("YYYY-MM-DD");
