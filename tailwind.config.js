/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["/index.html"],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        tb: "790px",
        lg: "1024px",
        xl: "1280px",
        pr: "1300px",
      },
      gridTemplateColumns: {
        "sidebar-cart-xl": "2fr, 0.5fr",
        "sidebar-cart-md": "2fr, 1fr",
      },
      colors: {
        "hero-bg":
          "background: linear-gradient(0deg, rgba(1,1,3, 1) 3%, rgba(255, 255, 255, 0) 25%)",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
