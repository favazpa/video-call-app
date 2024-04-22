export const generateCallingID = () => {
  return `${Math.floor(Math.random() * 10000)}-${Math.floor(
    Math.random() * 10000,
  )}-${Math.floor(Math.random() * 10000)}`;
};
