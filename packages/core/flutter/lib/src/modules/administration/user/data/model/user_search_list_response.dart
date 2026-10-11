import 'package:copor_core/src/modules/administration/user/data/model/user_model.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';
part 'user_search_list_response.g.dart';

@JsonSerializable()
class UserSearchListResponse {
  @JsonKey(name: 'items')
  final List<UserModel> items;
  final String? limit;
  final String? offset;
  const UserSearchListResponse({required this.items, this.limit, this.offset});
  factory UserSearchListResponse.fromJson(JSON json) => _$UserSearchListResponseFromJson(json);
  JSON toJson() => _$UserSearchListResponseToJson(this);
}
