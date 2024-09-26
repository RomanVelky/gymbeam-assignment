import { useMemo } from "react";

const useDateFormatter = () => {
  const formatter = useMemo(() => {
    return new Intl.DateTimeFormat("en", {
      timeZone: "Europe/Prague",
    });
  }, []);

  const formatDate = (date: Date | string) => {
    const dateInstance = typeof date === "string" ? new Date(date) : date;
    return formatter.format(dateInstance);
  };

  return { formatDate };
};

export default useDateFormatter;
