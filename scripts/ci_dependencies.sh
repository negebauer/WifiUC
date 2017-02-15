# React native stuff
brew reinstall node
npm install
npm install -g react-native-cli
npm run postinstall
npm run generate_env $WIFIUC_USER $WIFIUC_PASS

# Android
brew install android-sdk
$ANDROID_HOME/tools/android update sdk --no-ui

# Deploy
sudo gem update fastlane
