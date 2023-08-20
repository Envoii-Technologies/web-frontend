import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  build: {
    target: 'esnext'
  },
  plugins: [
    react(),
    // federation({
    //   name: 'web',
    //   remotes: {
    //     sharedApp: 'http://localhost:5000/assets/remoteEntry.js',
    //     dashboardApp: 'http://localhost:5001/assets/remoteEntry.js',
    //   },
    //   shared: {
    //     react: { singleton: true },
    //     "react-dom": { singleton: true },
    //     "react-router-dom": { singleton: true }
    //     },
    // })
  ],
  server: {
    watch: {
      usePolling: true,
    },
    cors: {
      origin: false
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 5500, // you can replace this port with any port
  },
  resolve: {
    mainFields: []
  }
});
