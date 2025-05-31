export const FINAL_DATE = new Date(2024, 6, 6, 13);
export const FINAL_DATE_TIME = FINAL_DATE.getTime();
export const checkIsPast = () => FINAL_DATE.getTime() < Date.now();
