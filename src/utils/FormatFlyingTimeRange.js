import formatTime from './FormatTime';

export default (startDate, duration) => {
  const startTime = new Date(startDate);
  const finishTime = new Date(startDate);

  finishTime.setTime(startTime.getTime() + duration * 60000);

  return `${formatTime(startTime)} - ${formatTime(finishTime)}`;
}
