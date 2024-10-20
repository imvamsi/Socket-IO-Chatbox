import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/socket": {
  //       target: "http://localhost:4000", // Change this to your socket server's port
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/socket/, ""),
  //     },
  //   },
  // },
});
