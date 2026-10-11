import 'dart:typed_data';
import 'package:json_annotation/json_annotation.dart';
import 'mime_type.dart';

class Uint8ListConverter implements JsonConverter<Uint8List, List<int>> {
  const Uint8ListConverter();

  @override
  Uint8List fromJson(List<int> json) => Uint8List.fromList(json);

  @override
  List<int> toJson(Uint8List object) => object.toList();
}

class MimeTypeConverter implements JsonConverter<MimeType, String> {
  const MimeTypeConverter();

  @override
  MimeType fromJson(String json) => MimeType.fromValue(json);

  @override
  String toJson(MimeType object) => object.value;
}
