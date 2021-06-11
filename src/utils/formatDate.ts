function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  const mouth = months[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const difference = now.getDate() - date.getDate();

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
