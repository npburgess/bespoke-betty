import { defineConfig } from "astro/config";

// Static output → deploys to Netlify as plain files.
export default defineConfig({
  site: "https://bespokebetty.com.au",
  output: "static",
});
