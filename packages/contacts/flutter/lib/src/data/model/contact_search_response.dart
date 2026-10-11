import 'package:copor_contacts/src/data/model/contact_list_item_model.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'contact_search_response.g.dart';

@JsonSerializable()
class ContactSearchResponse {
  @JsonKey(name: 'items')
  final List<ContactListItemModel> contactList;
  @JsonKey(fromJson: _stringToInt)
  final int limit;
  @JsonKey(fromJson: _stringToInt)
  final int offset;

  const ContactSearchResponse({
    required this.contactList,
    required this.limit,
    required this.offset,
  });

  factory ContactSearchResponse.fromJson(JSON json) => _$ContactSearchResponseFromJson(json);
}

int _stringToInt(dynamic value) => int.parse(value.toString());
