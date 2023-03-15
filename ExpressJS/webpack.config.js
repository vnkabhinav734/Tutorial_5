module.exports = {
    // ...
    resolve: {
      fallback: {
         "crypto": require.resolve("crypto-browserify"),
         "stream": require.resolve("stream-browserify"),
         "buffer": require.resolve("buffer/"),
         "https": require.resolve("https-browserify"),
         "zlib": require.resolve("browserify-zlib"),
         "url": require.resolve("url/"),
         "util": require.resolve("util/"),
         "path": require.resolve("path-browserify"),
         "http": require.resolve("stream-http"),
         "assert": require.resolve("assert/"),
        // "path": require.resolve("path-browserify"),
        // "http": false,
        // "path":false
        // "crypto":false,
       // "stream":false,
      //  "url": false,
      //  "http":false,
      //  "buffer":false,
      //  "util":false,
       // "path":false,
        // "string_decoder":false,
        // "constants": false,
        // "assert": false,
        // "querystring": false,
       // "zlib": false,
        "fs":false,
        "net":false
      }
    }
  };