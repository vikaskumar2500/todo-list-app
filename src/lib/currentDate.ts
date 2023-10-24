const CurrentDate = () => {
  const date = new Date();

  const currentDate = date.toLocaleString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });

  return currentDate.toString();
};

export default CurrentDate;
