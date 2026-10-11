import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_core/src/modules/administration/language/data/repository/language_repository_impl.dart';
import 'package:retrofit/retrofit.dart';
import 'package:dio/dio.dart';

part 'language_remote_data_source.g.dart';

@RestApi()
abstract class LanguageRemoteDataSourceImpl implements LanguageRemoteDataSource {
  factory LanguageRemoteDataSourceImpl(Dio dio, {String baseUrl}) = _LanguageRemoteDataSourceImpl;

  @override
  @GET("/language/list")
  Future<List<LanguageModel>> getLanguageList({
    @Extras() Map<String, dynamic> extras = const {'doesNotRequireAuth': true},
  });
}
