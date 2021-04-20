export const getStringMaxLen = (data, target) =>
  data.reduce((prev, cur) => {
    if (typeof prev !== 'number') {
      prev = [...prev[target]].length;
    }
    const curLen = [...cur[target]].length;
    return prev > curLen ? prev : curLen;
  });
