# Hetzblocker Browser Extension

This is the source code repository for the Hetzblocker browser extension,
currently available for Firefox and Chrome. If you want to develop the
extensions, this repository is the place to start.

If you would simply like to use and install the extension, the latest stable
version can be found at one of the following links:

  - [Hetzblocker for Firefox](https://addons.mozilla.org/en-US/firefox/addon/hetzblocker/)
  - [Hetzblocker for Chrome](https://chrome.google.com/webstore/detail/hetzblocker/mhmohgpdkkegialpboobiebjjhgjabii)

## System Requirements

  - **[Node.js](https://nodejs.org/)**, version 8 or higher.
  - **NPM**, version 5 or higher. NPM is usually included with Node.js.

## Development

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

This will place the built, unpacked extensions into: `./build/VERSION/extension/BROWSER/`

You can then load these folders’ `manifest.json` files into your browser to test them.

### Create a Distributable package

This task will create a versioned, zipped version of the browser extension, run:

```bash
npx gulp dist
```

The ZIP files will be placed in the folder `./dist/VERSION/BROWSER/hetzblocker-VERSION.zip`

# Troubleshooting

### VIPS compilation errors on Ubuntu during `npm install`

It can happen that on `npm install` an incorrect version of `libvips` is being
installed. This dependency comes from the `gulp-responsive` package, and can
cause `libvips` compilation errors.

The solution is to manually install `libvips` as follows: `sudo apt install libvips42`,
and then running `npm install` again. This should fix the issue.
