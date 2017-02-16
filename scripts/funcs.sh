deploy_fastlane() {
  (
    echo "iOS deploy: Running fastlane $1"
    cd ios
    fastlane $1
  )

  (
    echo "Android deploy: Running fastlane $1"
    cd ../android
    fastlane $1
  )
}
