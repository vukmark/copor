import 'package:copor_core/src/data/model/base_model.dart';

class KeyValueModel<T> extends BaseModel {
  final String key;
  final T value;

  const KeyValueModel({required this.key, required this.value});

  T getValue() => value;

  factory KeyValueModel.fromJson(Map<String, T> json) {
    return KeyValueModel(key: json['key'] as String, value: json['value'] as T);
  }

  @override
  Map<String, dynamic> toJson() {
    return {'key': key, 'value': value};
  }

  KeyValueModel<T> copyWith({String? key, T? value}) {
    return KeyValueModel(key: key ?? this.key, value: value ?? this.value);
  }

  @override
  String get namespace => 'key_value_model';
}
