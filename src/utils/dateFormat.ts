export const dateFormat = (date: string) => {
  const currentDate = new Date(date);

  const monthArr = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month = Number(currentDate.getMonth() + 1);
  const day = String(currentDate.getDate());
  const hour = String(currentDate.getHours());
  const minute = String(currentDate.getMinutes());
  const second = String(currentDate.getSeconds());

  return `${monthArr[month - 1]} ${day}, ${currentDate.getFullYear()}`;
};
