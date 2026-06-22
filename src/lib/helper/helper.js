export const generateSlug = (name) => {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "") +
    "-" +
    Date.now()
  );
}

export const formatMonthYear = (date) => {
  return new Date(date).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getInitials = (name = "") =>
  name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase();

export const handleSelect = (setter) => (key) => (keys) => {
  const value = Array.from(keys)[0];
  setter(key, value);
};