import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/tag/data/model/create_tag_dto.dart';
import '../../../../../bloc/utils/bloc_state.dart';
import '../model/tag_model.dart';

abstract class TagRepository {
  Future<Either<Failure, Result<List<TagModel>>>> getPublicTagList(FilterListDTO filterList);
  Future<Either<Failure, Result<List<TagModel>>>> getPrivateTagList();
  Future<Either<Failure, Result<List<TagModel>>>> getAllTagsForUser();
  Future<Either<Failure, Result<void>>> deleteTag(String tagId);
  Future<Either<Failure, Result<TagModel>>> getTag(String tagId);
  Future<Either<Failure, Result<void>>> createTag(CreateTagDTO tagToCreate);
  Future<Either<Failure, Result<void>>> updateTag(CreateTagDTO tagToUpdate);
}

abstract class TagLocalDataSource {
  Future<List<TagModel>> getPublicTagList();
  Future<void> setPublicTagList(List<TagModel> tagList);
}

abstract class TagRemoteDataSource {
  Future<List<TagModel>> getPublicTagList(FilterListDTO filterList);
  Future<List<TagModel>> getPrivateTagList();
  Future<List<TagModel>> getAllTagsForUser();
  Future<TagModel> getTag(String tagId);
  Future<void> deleteTag(String tagId);
  Future<void> createTag(CreateTagDTO tagToCreate);
  Future<void> updateTag(CreateTagDTO tagToUpdate);
}
