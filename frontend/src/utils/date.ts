// eg: Mon 14, Fri 18
export const formatDate = (input: Date | string) => {
  const date = typeof input === 'string' ? new Date(input) : input;

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short', // "Mon"
    day: 'numeric',   // "14"
  };

  return date.toLocaleDateString('en-US', options).replace(',', ''); // "Mon 14"
};