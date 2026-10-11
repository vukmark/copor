import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_contacts/src/data/model/contact_model.dart';
import 'package:copor_contacts/src/data/model/contact_search_response.dart';
import 'package:copor_contacts/src/data/repository/contact_repository.dart';
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

part 'contact_remote_source.g.dart';

@RestApi()
abstract class ContactRemoteDataSourceImpl implements ContactRemoteDataSource {
  factory ContactRemoteDataSourceImpl(Dio dio, {String? baseUrl}) = _ContactRemoteDataSourceImpl;

  @override
  @POST('/contacts/list')
  Future<ContactSearchResponse> searchContacts(@Body() FilterListDTO request);

  @override
  @GET('/contacts/{contactId}')
  Future<ContactModel> getContactDetails(@Path('contactId') String contactId);
}
