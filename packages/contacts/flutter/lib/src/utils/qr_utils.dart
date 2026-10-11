import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';

Widget buildQrWidget(String data, {double size = 200, double borderRadius = 6}) {
  return ClipRRect(
    borderRadius: BorderRadius.circular(borderRadius),
    child: Container(
      color: Colors.white,
      child: QrImageView(data: data, size: size),
    ),
  );
}
