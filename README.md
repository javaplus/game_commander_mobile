# game_commander_mobile
Mobile/Web app for controlling timer boxes


## Building APK:

### Install (setup)

Need Gradle, Java, the Android SDK and all of them setup on the PATH. 
Obviously need Cordova installed and cordova plugins via npm or ionic cordova commands


For prod release (but this will fail if not signed)
```
ionic cordova build android --prod --release
```

For debug (test) version.  Creates a app-debug.apk in the \platforms\android\app\build\outputs\apk\debug folder
```
ionic cordova build android 
```


adb devices:

avdmanager list

emulator -avd Barry_Lollipop



keytool -genkey -v -keystore my-release-key.keystore -alias game_cmdr -keyalg RSA -keysize 2048 -validity 10000


