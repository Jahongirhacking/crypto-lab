import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import dotenv package
import dotenv from "dotenv";
import process from "process";

// run package config
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // define process env
  define: {
    "process.env": process.env,
  },
});
