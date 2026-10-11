import 'package:copor_core/src/modules/administration/log/data/model/log_info_model.dart';
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

part 'log_info_remote_data_source.g.dart';

abstract class LogInfoRemoteDataSource {
  Future<LogInfoModel> getLogInfo(String path);
}

@RestApi()
abstract class LogInfoRemoteDataSourceImpl implements LogInfoRemoteDataSource {
  factory LogInfoRemoteDataSourceImpl(Dio dio, {String baseUrl}) = _LogInfoRemoteDataSourceImpl;

  @override
  @GET('/{path}')
  Future<LogInfoModel> getLogInfo(@Path('path') String path);
}
