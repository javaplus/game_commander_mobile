# game_commander_mobile
Mobile/Web app for controlling timer boxes


## Building APK:


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


