import 'package:copor_core/src/data/model/filter/data/model/filter_model/filter_model.dart';
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

part 'filter_remote_data_source.g.dart';

abstract class FilterRemoteDataSource {
  Future<List<FilterModel>> getFilters(String path);
}

@RestApi()
abstract class FilterRemoteDataSourceImpl implements FilterRemoteDataSource {
  factory FilterRemoteDataSourceImpl(Dio dio, {String baseUrl}) = _FilterRemoteDataSourceImpl;

  @override
  @GET('{path}')
  @Extra({'doesNotRequireAuth': true})
  Future<List<FilterModel>> getFilters(@Path('path') String path);
}
