export const IMTCounter = ({
  height,
  weight,
}: {
  weight: number;
  height: number;
}) => {
  const heightQ = height / 100;
  const imt = weight / (heightQ * heightQ);

  let status = "obesity";

  if (imt <= 18.5) {
    status = "thin";
  }

  if (imt >= 18.5 && imt < 23) {
    status = "normal";
  }

  if (imt >= 23 && imt <= 27.5) {
    status = "overweight";
  }

  return {
    imt: imt.toFixed(2),
    status,
  };
};
