## Setup

### Top priority

- routes
  - [i18n nesting](https://github.com/atellmer/dark/pull/55)
  - matching
  - language matching
- styled components
  - renderToString
  - global styles
- ~~i18n solution~~
- sitemaps
- linked data

### Optimizations

- gzip
  - serve gzipped files when available
  - compress `build` and `public` files when requested if not gzipped already
  - disable this feature during development
- more tests

### Will figure it out

- test deploy with bun + systemd

## Problems

- `bun build` produces bad import statements unless `--entry-naming [name].[ext]` is set. https://github.com/oven-sh/bun/issues/9896
- Bun doesn't seem to be able to handle linked packages. https://github.com/oven-sh/bun/issues/10223