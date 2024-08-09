const blackList = new Set();

export const tokenBlackList = {
  addToTokenBlackList: (token) => {
    blackList.add(token);
  },

  isTokenBlackListed: (token) => {
    return blackList.has(token);
  },
};
