import 'package:copor_core/src/data/model/base_model.dart';

class NamedIdModel<T> extends BaseModel {
  static const String namespaceStatic = 'named_id';
  final T id;
  final String name;
  final String? type;
  final String? userId;

  const NamedIdModel({required this.id, required this.name, this.type, this.userId});

  factory NamedIdModel.fromJson(Map<String, dynamic> json) {
    return NamedIdModel(
      id: json['id'] as T,
      name: (json['name'] ?? json['fullName']) as String,
      type: json['type'] as String?,
      userId: json['userId'] as String?,
    );
  }

  factory NamedIdModel.empty() => NamedIdModel(id: getDefaultValue<T>(), name: '', userId: '');

  bool get isEmpty {
    if (id is String) {
      return (id as String).isEmpty;
    }
    return id == getDefaultValue<T>();
  }

  bool get isNotEmpty => !isEmpty;

  static T getDefaultValue<T>() {
    if (T == bool) return false as T;
    if (T == double) return 0.0 as T;
    if (T == int) return 0 as T;

    return "" as T;
  }

  @override
  Map<String, dynamic> toJson() {
    return {'id': id, 'name': name, 'parentId': userId};
  }

  NamedIdModel<T> copyWith({T? id, String? name, String? parentId}) {
    return NamedIdModel<T>(id: id ?? this.id, name: name ?? this.name, userId: parentId ?? userId);
  }

  @override
  List<Object?> get props => [id, name, userId];

  @override
  String get namespace => namespaceStatic;
}
