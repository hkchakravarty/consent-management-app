Object.defineProperty(global, "import", {
  value: {
    meta: {
      env: {
        VITE_API_URL: "http://localhost:3000/api",
        VITE_ITEMS_PER_PAGE: "2",
      },
    },
  },
  writable: true,
});
