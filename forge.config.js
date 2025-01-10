require('dotenv').config()
const path = require('path')

const APP_ICON_PATH = path.join(process.cwd(), "images", "icon")

module.exports = {
  packagerConfig: {
    icon: APP_ICON_PATH,
    extraResource: [APP_ICON_PATH + '.icns'],
    executableName: "chrome_launcher",
    appBundleId: "com.charistheo.chromelauncher",
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
          owner: "charisTheo",
          name: "chrome-launcher"
        }
      }
    }
  ],
  makers: [
    {
      name: "@electron-forge/maker-dmg",
      config: {
        icon: APP_ICON_PATH + '.icns',
        name: "chrome_launcher",
        productName: "Chrome Launcher",
        title: "Chrome Launcher",
      }
    }
  ]
}