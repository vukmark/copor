import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/modules/administration/tag/data/model/tag_model.dart';
import 'package:copor_core/src/modules/administration/tag/data/model/create_tag_dto.dart';
import 'package:copor_core/src/modules/administration/tag/data/repository/tag_repository.dart';
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

part 'tag_remote_source.g.dart';

@RestApi()
abstract class TagRemoteDataSourceImpl implements TagRemoteDataSource {
  factory TagRemoteDataSourceImpl(Dio dio, {String baseUrl}) = _TagRemoteDataSourceImpl;

  @override
  @POST('/tag/public-tags')
  Future<List<TagModel>> getPublicTagList(@Body() FilterListDTO filterList);

  @override
  @GET('/tag/private-tags')
  Future<List<TagModel>> getPrivateTagList();

  @override
  @GET('/tag/all-tags-for-user')
  Future<List<TagModel>> getAllTagsForUser();

  @override
  @GET('/tag/{id}')
  Future<TagModel> getTag(@Path('id') String tagId);

  @override
  @DELETE('/tag/{id}')
  Future<void> deleteTag(@Path('id') String tagId);

  @override
  @PATCH('/tag')
  Future<void> updateTag(@Body() CreateTagDTO tagToUpdate);

  @override
  @POST('/tag')
  Future<void> createTag(@Body() CreateTagDTO tagToCreate);
}
