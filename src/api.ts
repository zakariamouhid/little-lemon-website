// https://raw.githubusercontent.com/courseraap/capstone/main/api.js
const seededRandom = function (seed: number) {
  const m = 2 ** 35 - 31;
  const a = 185852;
  let s = seed % m;
  return function () {
    return (s = (s * a) % m) / m;
  };
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchAPI = async function (date: Date) {
  await sleep(200);
  const result = [];
  const random = seededRandom(date.getDate());

  for (let i = 17; i <= 23; i++) {
    if (random() < 0.5) {
      result.push(i + ":00");
    }
    if (random() < 0.5) {
      result.push(i + ":30");
    }
  }
  return result;
};
export const submitAPI = function (formData: unknown) {
  console.log("Form data submitted:", formData);
  return true;
};
