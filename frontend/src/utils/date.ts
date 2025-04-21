// eg: Mon 14, Fri 18
export const formatDate = (input: Date | string) => {
  const date = typeof input === 'string' ? new Date(input) : input;

  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' }); // Mon
  const day = date.getDate(); // 24

  return `${weekday} ${day}`;
};