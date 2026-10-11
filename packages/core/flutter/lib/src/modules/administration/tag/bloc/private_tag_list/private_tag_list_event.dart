import 'package:equatable/equatable.dart';

sealed class PrivateTagListEvent extends Equatable {
  const PrivateTagListEvent();

  @override
  List<Object?> get props => [];
}

class GetPrivateTagList extends PrivateTagListEvent {
  const GetPrivateTagList();
}

class DeletePrivateTag extends PrivateTagListEvent {
  final String tagId;
  const DeletePrivateTag(this.tagId);
}
