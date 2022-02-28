export const getStartDate = () => {
  return new Date().toISOString().slice(0, -8);
};

export const getEndDate = () => {
  let now = new Date();
  let diff = now.getHours() + 1;
  now.setHours(diff);
  return now.toISOString().slice(0, -8);
};
