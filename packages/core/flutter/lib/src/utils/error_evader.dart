import 'dart:ui';
import 'package:flutter/material.dart';

/// Made for evading harmless and persistent rendering bug

class ErrorEvader {
  static void evade(String errorKey) {
    FlutterError.onError = (FlutterErrorDetails details) {
      if (details.exceptionAsString().contains(errorKey)) {
        return;
      }
      FlutterError.presentError(details);
    };

    PlatformDispatcher.instance.onError = (Object error, StackTrace stack) {
      if (error.toString().contains(errorKey)) {
        return true;
      }
      return false;
    };
  }
}
