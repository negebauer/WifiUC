sudo killall node
react init project
git revert
rm -rf node_modules/react-native/packager/packager.sh --reset-cache
rm -rf node_modules
rm -rf $TMPDIR/react-* --reset-cache
npm cache clean
rm -rf android/build
rm -rf ios/build/
rm -rf android/app/build
watchman watch-del-all
yarn
npm install react --save
npm uninstall --save node-uuid
npm install --save uuid
npm install
