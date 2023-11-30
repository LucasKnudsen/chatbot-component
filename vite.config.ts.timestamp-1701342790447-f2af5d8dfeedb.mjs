// vite.config.ts
import path from "path";
import { defineConfig } from "file:///Users/zolutiontech/zolutiontech/ai/fraia-embed/node_modules/vite/dist/node/index.js";
import solid from "file:///Users/zolutiontech/zolutiontech/ai/fraia-embed/node_modules/vite-plugin-solid/dist/esm/index.mjs";
var __vite_injected_original_dirname = "/Users/zolutiontech/zolutiontech/ai/fraia-embed";
var vite_config_default = defineConfig(({ mode }) => {
  let defineConfig2 = {
    // Fixes a script runtime error that "process is not defined"
    "process.env.NODE_ENV": JSON.stringify("production")
  };
  if (mode === "development") {
    defineConfig2 = {
      ...defineConfig2,
      // Definitions specific to development mode
      global: {}
    };
  }
  return {
    plugins: [solid()],
    build: {
      lib: {
        name: "Chatbot",
        entry: path.resolve(__vite_injected_original_dirname, "src/web.ts")
      }
    },
    define: defineConfig2,
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src"),
        "./runtimeConfig": "./runtimeConfig.browser"
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvem9sdXRpb250ZWNoL3pvbHV0aW9udGVjaC9haS9mcmFpYS1lbWJlZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3pvbHV0aW9udGVjaC96b2x1dGlvbnRlY2gvYWkvZnJhaWEtZW1iZWQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3pvbHV0aW9udGVjaC96b2x1dGlvbnRlY2gvYWkvZnJhaWEtZW1iZWQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgVXNlckNvbmZpZywgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCBzb2xpZCBmcm9tICd2aXRlLXBsdWdpbi1zb2xpZCdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICBsZXQgZGVmaW5lQ29uZmlnOiBVc2VyQ29uZmlnWydkZWZpbmUnXSA9IHtcbiAgICAvLyBGaXhlcyBhIHNjcmlwdCBydW50aW1lIGVycm9yIHRoYXQgXCJwcm9jZXNzIGlzIG5vdCBkZWZpbmVkXCJcbiAgICAncHJvY2Vzcy5lbnYuTk9ERV9FTlYnOiBKU09OLnN0cmluZ2lmeSgncHJvZHVjdGlvbicpLFxuICB9XG5cbiAgaWYgKG1vZGUgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICBkZWZpbmVDb25maWcgPSB7XG4gICAgICAuLi5kZWZpbmVDb25maWcsXG4gICAgICAvLyBEZWZpbml0aW9ucyBzcGVjaWZpYyB0byBkZXZlbG9wbWVudCBtb2RlXG4gICAgICBnbG9iYWw6IHt9LFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW3NvbGlkKCldLFxuICAgIGJ1aWxkOiB7XG4gICAgICBsaWI6IHtcbiAgICAgICAgbmFtZTogJ0NoYXRib3QnLFxuICAgICAgICBlbnRyeTogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy93ZWIudHMnKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBkZWZpbmU6IGRlZmluZUNvbmZpZyxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgICAgICAnLi9ydW50aW1lQ29uZmlnJzogJy4vcnVudGltZUNvbmZpZy5icm93c2VyJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1QsT0FBTyxVQUFVO0FBQ2hWLFNBQXFCLG9CQUFvQjtBQUN6QyxPQUFPLFdBQVc7QUFGbEIsSUFBTSxtQ0FBbUM7QUFJekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsTUFBSUEsZ0JBQXFDO0FBQUE7QUFBQSxJQUV2Qyx3QkFBd0IsS0FBSyxVQUFVLFlBQVk7QUFBQSxFQUNyRDtBQUVBLE1BQUksU0FBUyxlQUFlO0FBQzFCLElBQUFBLGdCQUFlO0FBQUEsTUFDYixHQUFHQTtBQUFBO0FBQUEsTUFFSCxRQUFRLENBQUM7QUFBQSxJQUNYO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFBQSxJQUNMLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxJQUNqQixPQUFPO0FBQUEsTUFDTCxLQUFLO0FBQUEsUUFDSCxNQUFNO0FBQUEsUUFDTixPQUFPLEtBQUssUUFBUSxrQ0FBVyxZQUFZO0FBQUEsTUFDN0M7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRQTtBQUFBLElBQ1IsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLFFBQ3BDLG1CQUFtQjtBQUFBLE1BQ3JCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJkZWZpbmVDb25maWciXQp9Cg==
