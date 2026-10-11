import 'dart:typed_data';
import 'dart:ui' as ui;

import 'package:flutter/painting.dart';

class InitialsAvatarGenerator {
  static const _colors = [
    Color(0xFFC2410C),
    Color(0xFF475569),
    Color(0xFFF2713C),
    Color(0xFFA7C82F),
    Color(0xFFDF0100),
  ];

  static Future<Uint8List> generate(String fullName, {int size = 256}) async {
    final initials = _initialsFor(fullName);
    final color = _colors[_colorIndexFor(initials)];

    final recorder = ui.PictureRecorder();
    final canvas = Canvas(recorder);
    final radius = size / 2;

    canvas.drawCircle(Offset(radius, radius), radius, Paint()..color = color);

    final textPainter = TextPainter(
      text: TextSpan(
        text: initials,
        style: TextStyle(
          color: const Color(0xFFFFFFFF),
          fontWeight: FontWeight.bold,
          fontSize: size * 0.4,
        ),
      ),
      textDirection: TextDirection.ltr,
    )..layout();
    textPainter.paint(
      canvas,
      Offset((size - textPainter.width) / 2, (size - textPainter.height) / 2),
    );

    final picture = recorder.endRecording();
    final image = await picture.toImage(size, size);
    final byteData = await image.toByteData(format: ui.ImageByteFormat.png);

    return byteData!.buffer.asUint8List();
  }

  static String _initialsFor(String name) {
    final parts = name.split(' ').where((part) => part.isNotEmpty).toList();
    if (parts.length > 1) {
      return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
    } else if (parts.isNotEmpty) {
      return parts[0][0].toUpperCase();
    }
    return '?';
  }

  static int _colorIndexFor(String text) {
    var sum = 0;
    for (final unit in text.codeUnits) {
      sum += unit;
    }
    return sum % _colors.length;
  }
}
