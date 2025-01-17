## Chrome Launcher App

> This app allows launching a number of Chrome instances simultaneously. Each instance can be launched with various options like Third-party cookies enabled/disabled or with the [PSAT extension](https://github.com/GoogleChromeLabs/ps-analysis-tool/wiki) installed.

<img src='./screenshot.png' alt='application window screenshot with 4 options to launch Chrome with or without third-party cookies, and with or without the PSAT extension'/>

## Download

<div>
  <img style="vertical-align: middle;" width="35" height="35" src="https://github.com/user-attachments/assets/31a5c75b-335c-488d-98d8-9cde52c3ca44" />
  <a href="https://github.com/charisTheo/chrome-launcher/releases/latest">Download the latest version for your chip architecture (ARM or Intel x64)</a>
</div>

----

## Contribute

### Install & run locally

```sh
npm i && npm start
```

### Develop locally

```sh
npm run dev
```

> This command launches the app and registers a file watcher that will reload the app on each change saved.

## Release

New releases will only be executed by Github Actions after pushing a commit and a tag on the `main` branch:

Example:
```sh
git checkout main
git merge develop
npm version minor
git push --follow-tags
```
