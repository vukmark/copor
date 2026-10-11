import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:equatable/equatable.dart';

sealed class TagListEvent extends Equatable {
  const TagListEvent();

  @override
  List<Object?> get props => [];
}

class GetPublicTagList extends TagListEvent {
  final FilterListDTO filterList;
  const GetPublicTagList(this.filterList);
}

class DeleteTag extends TagListEvent {
  final String tagId;
  const DeleteTag(this.tagId);
}
