## Setup

### Top priority

- ~~routes~~
  - ~~route matching~~
  - ~~language matching~~
- ~~styled~~
- ~~i18n solution~~
- ~~sitemaps~~
- ~~linked data~~
- ~~SSR~~
  - ~~server-generated import paths differ from those in browser bundle: build server~~

#### Bugs

### High priority

- services
  - ~~nested routes~~
  - ~~linked data~~

### Medium priority

- No page transition on language change

### Low priority

- newsletter

### Optimizations

- more tests

## Problems

- `bun build` produces bad import statements unless `--entry-naming [name].[ext]` is set. https://github.com/oven-sh/bun/issues/9896
- Bun doesn't seem to be able to handle linked packages. https://github.com/oven-sh/bun/issues/10223

## Dark notes

- Clicking a `<Link to='/it/'>` redirects to `/it`. To prevent unnecessary rerenders, provide links 
  without trailing slashes.