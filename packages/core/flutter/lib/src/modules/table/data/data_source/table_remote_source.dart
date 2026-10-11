import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/modules/table/data/model/copor_table_model.dart';
import 'package:copor_core/src/modules/table/data/repository/table_repository.dart';
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

part 'table_remote_source.g.dart';

@RestApi()
abstract class TableRemoteDataSourceImpl implements TableRemoteDataSource {
  factory TableRemoteDataSourceImpl(Dio dio, {String baseUrl}) = _TableRemoteDataSourceImpl;

  @override
  @POST('/{listType}/table')
  Future<CoporTableModel> getTable(@Path('listType') String listType, @Body() FilterListDTO filter);

  @override
  @DELETE('/{serverPath}')
  Future<void> deleteRow(@Path('serverPath') String serverPath);

  @override
  @PATCH('/{serverPath}')
  Future<void> toggleRow(@Path('serverPath') String serverPath, @Body() Map<String, bool> body);
}
