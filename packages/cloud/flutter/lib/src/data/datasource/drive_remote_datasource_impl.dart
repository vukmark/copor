import 'dart:typed_data';
import 'package:copor_cloud/src/data/datasource/drive_remote_datasource.dart';
import 'package:copor_cloud/src/data/model/cloud_folder.dart';
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

part 'drive_remote_datasource_impl.g.dart';

@RestApi()
abstract class DriveRemoteDataSourceImpl implements DriveRemoteDataSource {
  factory DriveRemoteDataSourceImpl(Dio dio, {String? baseUrl}) = _DriveRemoteDataSourceImpl;

  @override
  @GET('/cloud/')
  Future<List<CloudFolder>> getAllMyDriveFolders();

  @override
  @POST('{uploadEndpoint}')
  @MultiPart()
  Future<dynamic> uploadFile(
    @Path('uploadEndpoint') String uploadEndpoint,
    @Part(name: 'file') MultipartFile file,
    @Part(name: "content") String content,
    @Part(name: "type") String type,
    @Part(name: 'overwrite') bool overwrite,
    @Part(name: 'description') String description,
    @Part(name: 'notifyReceivers') bool notifyReceivers,
  );

  @override
  @GET('{downloadUrl}')
  @DioResponseType(ResponseType.bytes)
  Future<HttpResponse<Uint8List>> downloadFile(@Path("downloadUrl") String downloadUrl);

  @override
  @DELETE('/cloud-group/{id}')
  Future<void> deleteCloudGroup(@Path('id') String id);

  @override
  @DELETE('{downloadUrl}')
  Future<void> deleteCloudFile(@Path('downloadUrl') String downloadUrl);

  @override
  @DELETE('/cloud/bulk')
  Future<void> bulkDeleteCloudFiles(@Body() Map<String, dynamic> body);
}
