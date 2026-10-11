import 'package:flutter/foundation.dart';

class ConsoleLogFilter {
  static void init() {
    debugPrint = (String? message, {int? wrapWidth}) {
      if (message != null && message.contains('DataTable2 built')) {
        return;
      }
      debugPrintSynchronously(message, wrapWidth: wrapWidth);
    };
  }
}
