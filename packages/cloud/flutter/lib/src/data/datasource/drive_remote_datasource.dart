import 'dart:typed_data';
import 'package:dio/dio.dart';
import 'package:copor_cloud/src/data/model/cloud_folder.dart';
import 'package:retrofit/dio.dart';

abstract class DriveRemoteDataSource {
  Future<List<CloudFolder>> getAllMyDriveFolders();

  Future<void> uploadFile(
    String uploadEndpoint,
    MultipartFile file,
    String content,
    String type,
    bool overwrite,
    String description,
    bool notifyReceivers,
  );

  Future<HttpResponse<Uint8List>> downloadFile(String downloadUrl);

  Future<void> deleteCloudGroup(String id);

  Future<void> deleteCloudFile(String downloadUrl);

  Future<void> bulkDeleteCloudFiles(Map<String, dynamic> body);
}
