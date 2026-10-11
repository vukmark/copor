import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_contacts/src/data/model/contact_list_item_model.dart';
import 'package:copor_contacts/src/data/model/contact_model.dart';
import 'package:copor_contacts/src/data/model/contact_search_response.dart';

abstract class ContactRepository {
  Future<Either<Failure, Result<List<ContactListItemModel>>>> searchContacts(
    String query, {
    int offset = 0,
  });

  Future<Either<Failure, Result<ContactModel>>> getContactDetails(String contactId);
}

abstract class ContactRemoteDataSource {
  Future<ContactSearchResponse> searchContacts(FilterListDTO request);

  Future<ContactModel> getContactDetails(String contactId);
}
