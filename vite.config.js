/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";

const isCodeSandbox =
  "SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), glsl()],
  server: {
    host: true,
    open: !isCodeSandbox, // Open if it's not a CodeSandbox
  },
});
