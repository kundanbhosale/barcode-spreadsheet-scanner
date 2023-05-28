# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Add ProGuard rules for react-native-vision-camera
-keep class com.google.android.gms.vision.** { *; }
-keep class com.wix.RNCameraKit.** { *; }
-keep class androidx.camera.** { *; }
-keep class androidx.lifecycle.** { *; }
-keep class androidx.lifecycle.** { *; }
-keep class androidx.core.content.** { *; }
-keep class androidx.core.util.** { *; }
-keep class androidx.camera.core.** { *; }
-keep class androidx.camera.core.impl.utils.executor.** { *; }
-keep class androidx.camera.core.impl.utils.futures.** { *; }
-keep class androidx.camera.camera2.** { *; }
-keep class androidx.camera.camera2.internal.** { *; }
-keep class androidx.camera.extensions.** { *; }
-keep class androidx.camera.view.** { *; }
-keep class androidx.camera.core.** { *; }
-keep class androidx.camera.core.internal.** { *; }
-keep class androidx.camera.lifecycle.** { *; }
-keep class androidx.camera.lifecycle.ProcessCameraProvider.** { *; }
-keep class androidx.camera.lifecycle.ProcessCameraProvider$** { *; }
-keep class androidx.camera.lifecycle.LiveDataObservable$** { *; }
-keep class androidx.camera.lifecycle.ProcessCameraProvider$Initializer$** { *; }
-keep class androidx.camera.lifecycle.ProcessCameraProvider$InitializerImpl$** { *; }
