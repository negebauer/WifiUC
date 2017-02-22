mv -f android/app/build/outputs/apk/app-release.apk $CIRCLE_ARTIFACTS
mv -f ios/WifiUC.app.dSYM.zip $CIRCLE_ARTIFACTS
mv -f ios/WifiUC.ipa $CIRCLE_ARTIFACTS

ios_ipa='ios/WifiUC.ipa'
if [ -f $ios_ipa ]; then mv -f $ios_ipa $CIRCLE_ARTIFACTS; fi

ios_dsym='ios/WifiUC.app.dSYM.zip'
if [ -f $ios_dsym ]; then mv -f $ios_dsym $CIRCLE_ARTIFACTS; fi

android_apk='android/app/build/outputs/apk/app-release.apk'
if [ -f $android_apk ]; then mv -f $android_apk $CIRCLE_ARTIFACTS; fi
