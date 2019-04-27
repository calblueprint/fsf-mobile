## FSF mobile's React Native frontend

React Native without Expo repository; only Android support is complete.

### How to build this repo

#### Prerequisites:

1. Make sure you have `react-native-cli`, or install it using npm:

```
sudo npm install -g react-native-cli
```

On a Debian-based environment, you can install nodejs and npm via:

```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install nodejs
```

2. Install Android SDK tools that react native depends on.

Currently, the version of react native that we are using requires Android SDK version 28. The instructions on how to install the proprietary binary of Android SDK can be found on react native's website. Since the source code of the tools that we depend on is open source, we recommend using the Android Rebuilds. The following instructions document how to get the non-EULA bounded binaries and use it for react native.

First download the Android SDK rebuilds and extract it to a certain location. Here we will use `/opt/android`.

```
wget https://android-rebuilds.beuc.net/dl/android-sdk_user.9.0.0_r21_linux-x86.zip
unzip android-sdk_user.9.0.0_r21_linux-x86.zip
cp -r android-sdk_user.9.0.0_r21_linux-x86 /opt/android
```

Then we set `ANDROID_HOME` env variable so that react-native uses the SDK we downloaded.

```
export ANDROID_HOME=/opt/android
```

3. Install all the Javascript dependencies in `package.json`. We recommend using `yarn` instead of `npm` in this project.

You should follow the instructions from the `yarn` [website](https://yarnpkg.com/lang/en/docs/install/) for installation.

```
yarn
```

#### Build a debug build:

First bundle the jacascript code:

```
react-native bundle --platform android --dev false --minify false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

You can then build the debug apk and test it on an Android device or an Android emulator:

```
react-native assembleDebug
```

#### Build a release build:

Ensure that you have added `signingConfig` in `android/app/build.gradle` which should include configurations about signing the release APK. Instructions can be found on the React Native website.

You may need to clean up temporary files in `android/app/src/main/res` for the release build to work.

To build the release APK:

```
cd android/

./gradlew assembleReleae
```

#### Use docker environment for building

In `docker/build_dockerfile`, there is a docker image script that allows you to create an image in which all the dependencies have been set up and a debug build APK has already been built. You can modify the script to create the docker environment you need.

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
