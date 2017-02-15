ios_path='ios/main.jsbundle'
react-native bundle --dev false --entry-file index.ios.js --bundle-output $ios_path --platform ios

android_path='android/main.jsbundle'
react-native bundle --dev false --entry-file index.android.js --bundle-output $android_path --platform android

if [ ! -z $CI ]; then
  echo 'Now delete those bundles'
  rm -rf $ios_path
  rm -rf $android_path
fi
