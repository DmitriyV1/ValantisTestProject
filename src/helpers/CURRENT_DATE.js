const date = new Date();
const year = date.getFullYear();
const month =
  date.getMonth() <= 9 ? 0 + `${date.getMonth() + 1}` : date.getMonth();
// const day = date.getDate();
const day = 27;

const CURRENT_DATE = year + month + day;

export default CURRENT_DATE;
