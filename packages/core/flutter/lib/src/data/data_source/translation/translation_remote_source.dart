import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_core/src/data/repository_impl/translation/translation_repository_impl.dart';
import 'package:retrofit/retrofit.dart';
import 'package:dio/dio.dart';

part 'translation_remote_source.g.dart';

@RestApi()
abstract class TranslationRemoteDataSourceImpl implements TranslationRemoteDataSource {
  factory TranslationRemoteDataSourceImpl(Dio dio, {String baseUrl}) =
      _TranslationRemoteDataSourceImpl;

  @override
  @GET("/locale/{namespace}")
  Future<TranslationModel?> getTranslation(
    @Path("namespace") String namespace,
    @Header('Accept-Language') String languageCode, {
    @Extras() Map<String, dynamic> extras = const {'doesNotRequireAuth': true},
  });

  @override
  @PATCH("/locale/{namespace}")
  Future<void> updateTranslation(
    @Path("namespace") TranslationModel translationModel,
    @Header('Accept-Language') String languageCode,
  );
}
