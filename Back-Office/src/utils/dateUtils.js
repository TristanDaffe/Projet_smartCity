import { format } from 'date-fns';

function formatDate(date) {
  return format(date, 'dd/MM/yyyy');
}

export { formatDate };