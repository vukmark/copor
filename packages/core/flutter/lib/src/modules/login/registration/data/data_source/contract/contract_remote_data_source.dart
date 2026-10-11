import 'dart:typed_data';
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

part 'contract_remote_data_source.g.dart';

abstract class ContractRemoteDataSource {
  Future<Uint8List> getContract(String path);
}

@RestApi()
abstract class ContractRemoteDataSourceImpl implements ContractRemoteDataSource {
  factory ContractRemoteDataSourceImpl(Dio dio, {String baseUrl}) = _ContractRemoteDataSourceImpl;

  @override
  @GET('{contractRoute}')
  @DioResponseType(ResponseType.bytes)
  Future<Uint8List> getContract(@Path('contractRoute') String contractRoute);
}
