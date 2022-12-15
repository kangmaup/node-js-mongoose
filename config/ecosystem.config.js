module.exports = {
    apps: [{
      name: "app",
      script: "D:\\xampp\\htdocs\\app\\bin\\www",
      env: {
        NODE_ENV: "development",
        JWT_SECRET:"tokencok",
        JWT_EXPIRES: "10m",
        JWT_ALGORITHM: "HS256",
        PORT: 5000
      },
      env_test: {
        NODE_ENV: "test",
      },
      env_staging: {
        NODE_ENV: "staging",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  }