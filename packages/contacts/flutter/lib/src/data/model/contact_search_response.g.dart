// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'contact_search_response.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ContactSearchResponse _$ContactSearchResponseFromJson(
  Map<String, dynamic> json,
) => ContactSearchResponse(
  contactList: (json['items'] as List<dynamic>)
      .map((e) => ContactListItemModel.fromJson(e as Map<String, dynamic>))
      .toList(),
  limit: _stringToInt(json['limit']),
  offset: _stringToInt(json['offset']),
);

Map<String, dynamic> _$ContactSearchResponseToJson(
  ContactSearchResponse instance,
) => <String, dynamic>{
  'items': instance.contactList,
  'limit': instance.limit,
  'offset': instance.offset,
};
