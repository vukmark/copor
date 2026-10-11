import 'package:flutter/foundation.dart';
import 'package:image/image.dart' as img;

Uint8List compressImageIsolate(Map<String, dynamic> message) {
  final bytes = message['bytes'] as Uint8List;
  final maxBytes = message['maxBytes'] as int;
  var image = img.decodeImage(bytes);
  if (image == null) return bytes;

  for (int quality = 85; quality >= 20; quality -= 15) {
    final maxDimension = quality >= 70
        ? 1920
        : quality >= 40
        ? 1280
        : 800;
    var resized = image;
    if (resized.width > maxDimension || resized.height > maxDimension) {
      resized = img.copyResize(
        resized,
        width: resized.width > resized.height ? maxDimension : null,
        height: resized.height >= resized.width ? maxDimension : null,
        interpolation: img.Interpolation.linear,
      );
    }

    final result = Uint8List.fromList(img.encodeJpg(resized, quality: quality));
    if (result.length <= maxBytes) return result;
  }

  final small = img.copyResize(
    image,
    width: image.width > image.height ? 800 : null,
    height: image.height >= image.width ? 800 : null,
  );
  return Uint8List.fromList(img.encodeJpg(small, quality: 20));
}
