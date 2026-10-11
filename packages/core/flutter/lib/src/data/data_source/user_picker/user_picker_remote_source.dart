import 'package:dio/dio.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/data/repository_impl/user_picker/user_picker_repository_impl.dart';

/// Plain Dio instead of retrofit: the path belongs to the module whose picker
/// route is called (`/cloud/recipients`, …), so it is a parameter.
class UserPickerRemoteDataSourceImpl implements UserPickerRemoteDataSource {
  final Dio dio;

  const UserPickerRemoteDataSourceImpl(this.dio);

  @override
  Future<dynamic> searchUsers(String path, FilterListDTO request) async {
    final response = await dio.post<dynamic>(path, data: request.toJson());
    return response.data;
  }
}
