import 'package:copor_core/src/modules/administration/log/data/model/log_model.dart';
import 'package:copor_core/src/modules/administration/log/data/repository/log_repository.dart';
import 'package:retrofit/retrofit.dart';
import 'package:dio/dio.dart';

part 'log_remote_source.g.dart';

@RestApi()
abstract class LogRemoteDataSourceImpl implements LogRemoteDataSource {
  factory LogRemoteDataSourceImpl(Dio dio, {String baseUrl}) = _LogRemoteDataSourceImpl;

  @override
  @GET('/log')
  Future<List<LogModel>> getLogList();
}
