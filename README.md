# Hetzblocker Browser Extension

## System Requirements

 - NodeJS, version 8 or higher.
 - NPM, version 5 or higher.

## Setting up

```bash
npm install
```

## Develop the extension

When developing the extension, you can run:

```bash
npx gulp
```
This builds the entire extension, after which it starts file watchers for each sub-task.

## Build the extension

To create an unpacked extension for all browser templates, you can run:

```bash
npx gulp buildall
```

**Note:** The unpacked extensions live at: `./build/[VERSION]/extension/[BROWSER]/`
