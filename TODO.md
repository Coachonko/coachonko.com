## Setup

### Top priority

- ~~routes~~
  - ~~route matching~~
  - ~~language matching~~
- ~~styled~~
- ~~i18n solution~~
- sitemaps
- linked data

#### Bugs
- Changing language weird behavior

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

## Dark notes

- Clicking a `<Link to='/it/'>` redirects to `/it`. To prevent unnecessary rerenders, provide links 
  without trailing slashes.