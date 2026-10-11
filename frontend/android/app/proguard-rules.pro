# Flutter-specific rules.
-keep class io.flutter.app.** { *; }
-keep class io.flutter.plugin.**  { *; }
-keep class io.flutter.util.**  { *; }
-keep class io.flutter.view.**  { *; }
-keep class io.flutter.plugins.**  { *; }
-keep class io.flutter.embedding.**  { *; }

# Jitsi Meet SDK / React Native
-keep class com.facebook.react.** { *; }
-keep class com.facebook.react.ReactApplication
-keep class com.facebook.react.ReactInstanceManager
-keep class com.facebook.react.common.LifecycleState
-keep public class com.horcrux.svg.** { *; }
-keep class org.webrtc.** { *; }
-keep class com.rnimmersive.** { *; }
-keep class com.calendarevents.** { *; }

# Fresco (Facebook Image Library) - THIS IS THE KEY PART FOR YOUR ERROR
-keep class com.facebook.imagepipeline.nativecode.** { *; }
-keep class com.facebook.imagepipeline.producers.** { *; }
-keep class com.facebook.imagepipeline.animated.factory.AnimatedFactoryImpl { *; }
-keep public class com.facebook.imageutils.** { public *; }

# OkHttp (used by React Native)
-keepattributes Signature
-keepattributes *Annotation*
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }
-dontwarn okio.**

# Google Play Core
-keep class com.google.android.play.core.** { *; }
-dontwarn com.google.android.play.core.**