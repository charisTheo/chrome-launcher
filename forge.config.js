require('dotenv').config()

module.exports = {
  packagerConfig: {
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
        name: "chrome_launcher",
        productName: "chrome_launcher"
      }
    }
  ]
}