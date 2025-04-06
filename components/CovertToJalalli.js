import jalaali from "jalaali-js";

export const convertToJalali = (isoDate) => {
  const date = new Date(isoDate);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  const { jy, jm, jd } = jalaali.toJalaali(year, month, day);
  return `${jy}/${jm}/${jd}`;
};
