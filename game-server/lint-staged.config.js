export default {
  "*": (_files) => {
    return [`pnpm eslint . --max-warnings=0`, `pnpm prettier . -w`];
  },
};
