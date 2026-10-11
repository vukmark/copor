import 'package:equatable/equatable.dart';
import 'package:copor_core/src/utils/typedef.dart';

abstract class BaseModel extends Equatable {
  const BaseModel();

  String get namespace;

  JSON toJson();

  @override
  List<Object?> get props => [];
}
