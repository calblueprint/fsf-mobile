#!/bin/bash
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
cd android
./gradlew assembleDebug
cd app/build/outputs/apk/debug
adb install -r app-debug.apk
echo "cd app/build/outputs/apk/debug"
