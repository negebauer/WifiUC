git clone https://github.com/negebauer/certificates.git temp_certificates
mv -f temp_certificates/android/wifiuc/release.keystore android/app
mv -f temp_certificates/android/wifiuc/google_credentials.json android/fastlane

rm -rf temp_certificates
