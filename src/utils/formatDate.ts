function formatDate(isoDate: string | null): string | null {
  if (!isoDate) {
    return null;
  }
  const date = new Date(isoDate);
  const now = new Date();
  const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  const mouth = months[date.getMonth()];
  const day = date.getDate();
  const memoizedHours = date.getHours();
  const hours = memoizedHours >= 10 ? memoizedHours : `0${memoizedHours}`;
  const memoizedMinutes = date.getMinutes();
  const minutes = memoizedMinutes >= 10 ? memoizedMinutes : `0${memoizedMinutes}`;
  const difference = now.getDate() - day;

  let dateString = `${day} ${mouth}`;

  if (difference < 1) {
    dateString = `${hours}:${minutes}`;
  }

  if (difference === 1) {
    dateString = 'Вчера';
  }

  return dateString;
}

export default formatDate;
