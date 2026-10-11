import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/tag/data/model/tag_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

final class TagListState extends BaseState<List<TagModel>> {
  final bool isDeleted;
  final FilterListDTO filterList;

  const TagListState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    this.isDeleted = false,
    required this.filterList,
  });

  const TagListState.initial()
    : this._(
        result: null,
        filterList: const FilterListDTO(filterList: [], offset: "", limit: ""),
      );

  @override
  TagListState copyWith({
    Result<List<TagModel>>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    TagModel? selectedTag,
    bool? isDeleted,
    FilterListDTO? filterList,
  }) {
    return TagListState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
      isDeleted: isDeleted ?? this.isDeleted,
      filterList: filterList ?? this.filterList,
    );
  }

  @override
  List<Object?> get props => [result, isLoading, isUpdated, failure, isDeleted];
}
