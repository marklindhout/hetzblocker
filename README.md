# Hetzblocker Browser Extension

## Usage in the Browser

This is the source code repository for the Hetzblocker browser extension,
currently available for Firefox and Chrome. If you want to develop the
extensions, this repository is the place to start.

If you would simply like to use and install the extension, the latest stable
version can be found at one of the following links:

  - [Hetzblocker for Firefox](https://addons.mozilla.org/en-US/firefox/addon/hetzblocker/)
  - [Hetzblocker for Chrome](https://chrome.google.com/webstore/detail/hetzblocker/mhmohgpdkkegialpboobiebjjhgjabii)

## Blocked Sites and URLs

Hetzblocker uses two dedicated lists for blocking: a domain list, and a URL list.

The domain list can be found at [src/js/common/domainlist.js](https://github.com/marklindhout/hetzblocker/blob/master/src/js/common/domainlist.js).
This list is used to block entire domains.
The entry `'bild.de'` will block for `www.bild.de`, `media.bild.de`, and `bild.de`.
This means that all subdomains are automatically globbed as well.

Since it’s unpractical to block an entire blogging platform like Medium or WordPress if just one author is misbehaving, Hetzblocker also contains a URL block list.
This second one is a list with full URLs to block. Blocking only works if the match is exact.
This list can block YouTube channels, Twitter accounts, Medium authors, etc.
List entries are matched on the URL’s domain name and path.
The URL block list can be found at [src/js/common/pagelist.js](https://github.com/marklindhout/hetzblocker/blob/master/src/js/common/pagelist.js)

# Developing Hetzblocker

## Coding Standards

This is an extension that is planned for all platforms supporting the Webextension standard.
The JavaScript has (for now) been written in ES5, and uses Gulp.js for building and resources manipulation.
There is no transpilation taking place: It’s ES5 all the way down.

## System Requirements

  - **[Node.js](https://nodejs.org/)**, version 13 was tested, others might work.
  - **NPM**, version 6 or higher. (NPM is usually included with Node.js)

### Setup
First, you need to install NPM modules using:
```bash
npm install
```

### Developing the extension
Then, to run the build task, and watch for file changes, you can run:
```bash
npx gulp
```
This builds the entire extension, after which it starts file watchers for each
sub-task.

### Build the extension
To create an unpacked extension for all browser templates, you can run:

```bash
npx gulp buildall
```

This will place the built, unpacked extensions into: `build/extension/BROWSER/`

You can then load these folders’ `manifest.json` files into your browser to test them.

### Create a Distributable package

This task will create a versioned, zipped version of the browser extension, run:

```bash
npx gulp dist
```

The ZIP files will be placed in the folder `dist/BROWSER/hetzblocker-VERSION.zip`

# Troubleshooting

### VIPS compilation errors on Ubuntu during `npm install`

It can happen that on `npm install` an incorrect version of `libvips` is being
installed. This dependency comes from the `gulp-responsive` package, and can
cause `libvips` compilation errors.

The solution is to manually install `libvips` as follows: `sudo apt install libvips42`,
and then running `npm install` again. This should fix the issue.

### Sharp throws “Module did not self-register.” error

This has to do with a different version of Node being used for `npm install` as is used to execute `gulp` tasks.

Usually this is because there’s an old version of Node on you system, and your IDE is not set up to handle the correct on e for the project.

Make sure both installation and execution of the Node modules is done with the same Node version, and you should be fine.

For more info, check out: https://github.com/lovell/sharp/issues/952 
