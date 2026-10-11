import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/tag/data/model/tag_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

final class AllTagsForUserState extends BaseState<List<TagModel>> {
  const AllTagsForUserState._({super.result, super.isLoading, super.isUpdated, super.failure});

  const AllTagsForUserState.initial() : this._(result: null);
  const AllTagsForUserState.loading({required Result<List<TagModel>>? result})
    : this._(result: result, isLoading: true);
  const AllTagsForUserState.fetched({required Result<List<TagModel>>? result})
    : this._(result: result);
  const AllTagsForUserState.failure({
    required Failure failure,
    required Result<List<TagModel>>? result,
  }) : this._(result: result, failure: failure);

  @override
  AllTagsForUserState copyWith({
    Result<List<TagModel>>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
  }) {
    return AllTagsForUserState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
    );
  }

  @override
  List<Object?> get props => [result, isLoading, isUpdated, failure];
}

/*
class CategoryTagResult extends Equatable {
  final List<TagModel> publicCategoryTagList;
  final List<TagModel> privateCategoryTagList;

  const CategoryTagResult({required this.publicCategoryTagList, required this.privateCategoryTagList});

  @override
  List<Object?> get props => [publicCategoryTagList, privateCategoryTagList];

  CategoryTagResult copyWith({
    List<TagModel>? publicCategoryTagList,
    List<TagModel>? privateCategoryTagList,
  }) {
    return CategoryTagResult(
      publicCategoryTagList: publicCategoryTagList ?? this.publicCategoryTagList,
      privateCategoryTagList: privateCategoryTagList ?? this.privateCategoryTagList,
    );
  }
}

 */
