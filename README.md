# Coachonko.com

## Assets

All files in the `public` directory will be copied to the `build` directory at build time.

Files in the `public` directory will be served from the root of the application. For example: `public/favicon.ico` 
will be served from `/favicon.ico`

For deployment: 
- Files that are expected to be served by the root of the application should be placed in the root of 
  the `public` directory, such as `favicon.ico` and `sitemap.xml`
- All other files should be given a prefix. To give them a prefix, put them in a nested directory in 
  the `public` directory. For example: `public/static/candy.zip` will be served as `/static/candy.zip`
- When configuring the reverse proxy, which is typically a web server daemon capable of serving static 
  files more efficiently than node.js or bun, configure it accordingly:
  1. register all known conventionally located public file locations
  2. register the `static` directory to serve all requests containing the `static` prefix in the path
  3. register the `_dark` directory to serve all requests containing the `_dark` prefix in the path
  
  This will efficiently serve static files without the need to use less efficient techniques such as 
  the nginx's `try_files` directive on every request.

## Scripts

- `test`: run tests
- `build`: builds the production browser bundle
- `start`: start production server
- `dev:browser` watches for changes using the `./src/index.js` entry point
- `dev:server` starts `./server/index.js` and watches for changes