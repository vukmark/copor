import 'package:copor_core/src/modules/my_account/data/model/account_info_model.dart';
import 'package:copor_core/src/modules/my_account/data/model/update_account_info_dto.dart';
import 'package:copor_core/src/modules/my_account/data/repository/account_info_repository.dart';
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

part 'account_info_remote_source.g.dart';

@RestApi()
abstract class AccountInfoRemoteDataSourceImpl implements AccountInfoRemoteDataSource {
  factory AccountInfoRemoteDataSourceImpl(Dio dio, {String baseUrl}) =
      _AccountInfoRemoteDataSourceImpl;

  @override
  @GET("/user/account-full-info")
  Future<AccountInfoModel> getMyAccountInfo();

  @override
  @GET("/user/account-full-info/{id}")
  Future<AccountInfoModel> getAccountInfo(@Path('id') String userId);

  @override
  @PATCH('/user/account-information')
  Future<void> updateAccountInfo(@Body() UpdateAccountInfoDTO updateData);

  @override
  @POST('/user/personal-image')
  @MultiPart()
  Future<void> uploadPersonalImage(@Part(name: 'image') MultipartFile image);

  @override
  @POST('/user/image')
  @MultiPart()
  Future<void> uploadUserImage(
    @Part(name: 'image') MultipartFile image,
    @Part(name: 'userId') String userId,
  );
}
