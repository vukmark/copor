import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'todo_attachment_model.g.dart';

@JsonSerializable()
class TodoAttachmentModel extends Equatable {
  final String id;
  final String name;
  final int size;

  const TodoAttachmentModel({required this.id, required this.name, required this.size});

  factory TodoAttachmentModel.fromJson(Map<String, dynamic> json) =>
      _$TodoAttachmentModelFromJson(json);

  Map<String, dynamic> toJson() => _$TodoAttachmentModelToJson(this);

  @override
  List<Object?> get props => [id, name, size];
}
