import moment from 'moment';

export const uuid = () => {
  var d = Date.now();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};

export const generateRandomMoney = () => {
  return Math.floor(Math.random() * 90000) + 22000;
};

export const generateRandomAge = () => {
  return Math.floor(Math.random() * 50) + 18;
};

export const encodeFormParameters = formData => {
  const { id, name, age, money } = formData;

  return {
    name,
    age: Number(age) || 1,
    money: Number(money) || 0,
    ...(id ? { id } : null),
    updateTime: moment().valueOf()
  };
};
