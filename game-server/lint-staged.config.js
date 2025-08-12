export default {
  "*": (files) => {
    return [`eslint .`, `prettier ${files} -w`];
  },
};
