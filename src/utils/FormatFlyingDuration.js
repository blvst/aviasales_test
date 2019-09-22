export default (duration) => {
  const days = Math.floor(duration / 60 / 24);
  const hours = Math.floor(duration / 60) - days * 24;
  const minutes = duration % 60;

  const daysString = (days > 0) ? `${days}д ` : '';
  return `${daysString}${hours}ч ${minutes}м`;
}
