
ionic cordova build android --prod --release


keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000


jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore "C:\Users\rigorio\Projects\transient-renter-app\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk" alias_name

key: transient




zipalign -v 4 "C:\Users\rigorio\Projects\transient-renter-app\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk" "C:\Users\rigorio\Desktop\iRent.apk"


