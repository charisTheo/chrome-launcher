require('dotenv').config()
const path = require('path')

const APP_ICON_PATH = path.join(process.cwd(), "images", "icon")
const APP_NAME = "Chrome Launcher"
const APPLE_APP_BUNDLE_ID = "com.charistheo.chromelauncher"
const GITHUB_REPO_OWNER = "charisTheo"
const GITHUB_REPO_NAME = "chrome-launcher"
const EXECUTABLE_NAME = "chrome_launcher"

module.exports = {
  packagerConfig: {
    icon: APP_ICON_PATH,
    extraResource: [APP_ICON_PATH + '.icns'],
    executableName: EXECUTABLE_NAME,
    appBundleId: APPLE_APP_BUNDLE_ID,
    osxSign: {},
    osxNotarize: {
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APP_SPECIFIC_PASSWORD,
      teamId: process.env.APPLE_TEAM_ID
    }
  },
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: GITHUB_REPO_OWNER,
          name: GITHUB_REPO_NAME
        }
      }
    }
  ],
  makers: [
    {
      name: "@electron-forge/maker-dmg",
      config: {
        icon: APP_ICON_PATH + '.icns',
        name: APP_NAME,
        productName: APP_NAME
      }
    }
  ]
}