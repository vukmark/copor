import 'package:copor_core/src/modules/administration/user_groups/data/model/user_group_user_model.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'user_group_users_response.g.dart';

@JsonSerializable()
class UserGroupUsersResponse {
  final List<UserGroupUserModel> items;
  final int limit;
  final int offset;

  const UserGroupUsersResponse({required this.items, required this.limit, required this.offset});

  factory UserGroupUsersResponse.fromJson(JSON json) => _$UserGroupUsersResponseFromJson(json);

  JSON toJson() => _$UserGroupUsersResponseToJson(this);
}
