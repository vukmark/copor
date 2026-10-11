import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/modules/simple_list/data/model/simple_list_model.dart';
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

part 'simple_list_remote_data_source.g.dart';

abstract class SimpleListRemoteDataSource {
  Future<SimpleListModel> getSimpleList(String path, FilterListDTO filterListDTO);

  Future<SimpleListModel> getStateSimpleList(String id, FilterListDTO filterListDTO);
}

@RestApi()
abstract class SimpleListRemoteDataSourceImpl implements SimpleListRemoteDataSource {
  factory SimpleListRemoteDataSourceImpl(Dio dio, {String baseUrl}) =
      _SimpleListRemoteDataSourceImpl;

  @override
  @POST('/{path}/simple-list')
  Future<SimpleListModel> getSimpleList(
    @Path('path') String path,
    @Body() FilterListDTO filterList,
  );

  @override
  @GET('/state/simple-list/{id}')
  Future<SimpleListModel> getStateSimpleList(
    @Path('id') String id,
    @Body() FilterListDTO filterList,
  );
}
