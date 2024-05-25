const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@UI": path.resolve(__dirname, "src/Components/UI/"),
      "@Pages": path.resolve(__dirname, "src/Components/Pages/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@store": path.resolve(__dirname, "src/store/"),
      "@services": path.resolve(__dirname, "src/services/"),
      "@Constants": path.resolve(__dirname, "src/Constants/"),
    },
  },
};
