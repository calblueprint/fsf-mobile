## FSF mobile's React Native frontend

React Native without Expo repository; only Android support is complete.

### How to build this repo

#### Prerequisites:

1. Make sure you have `react-native-cli`, which is available via `npm install -g react-native-cli`.

2. Install all the Javascript dependencies in `package.json`. You can do so via:

```
yarn
```

or

```
npm install
```

#### Build a debug build:

First bundle the jacascript code:

```
react-native bundle --platform android --dev false --minify false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

You can then build the debug apk and test it on an Android device or an Android emulator:

```
react-native run-android
```

#### Build a release build:

Ensure that you have added `signingConfig` in `android/app/build.gradle` which should include configurations about signing the release APK. Instructions can be found on the React Native website.

You may need to clean up temporary files in `android/app/src/main/res` for the release build to work.

To build the release APK:

```
cd android/

./gradlew assembleReleae
```

### Folder structure

`app/`: The React Native frontend.

`android/`: Android-native code. It includes the FSF Android widget and implementation for Android system notifications.

### Config files:

`.babelrc`: Contains compilation configuraitons for Babel; used in development  
`eslintrc.js`: Contains linting configurations for ESLint; used in development  
`.watchmanconfig`: Contains configurations for Watchman; used in development  
`app.json`: Contains React Native configurations for the app  
`prettier.config.js`: Contains formatting configurations for Prettier; used in development  
`yarn.lock`: Contains dependency management configurations for Yarn; used in development

### Files:

`app.js`: The base file to run; the top of the React Native stack.
