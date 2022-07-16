import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { TimeHTMLAttributes } from "react";

const defaultOptions: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: "America/Sao_Paulo",
};

function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = defaultOptions,
) {
  return Intl.DateTimeFormat("pt-BR", options).format(new Date(date));
}

interface TimeAgoProps extends TimeHTMLAttributes<HTMLTimeElement> {
  startDate: string | Date;
}

export function TimeAgo({ startDate, ...rest }: TimeAgoProps) {
  const startDateFormatted = formatDate(startDate);
  const textTimeAgo = formatDistanceToNow(new Date(startDate), {
    addSuffix: true,
    locale: ptBR,
  });
  return (
    <time dateTime={startDateFormatted} title={startDateFormatted} {...rest}>
      {textTimeAgo}
    </time>
  );
}
