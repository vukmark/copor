import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'user_group_users_request.g.dart';

@JsonSerializable()
class UserGroupUsersRequest {
  final String userGroupId;
  final int limit;
  final int offset;

  const UserGroupUsersRequest({
    required this.userGroupId,
    required this.limit,
    required this.offset,
  });

  factory UserGroupUsersRequest.fromJson(JSON json) => _$UserGroupUsersRequestFromJson(json);

  JSON toJson() => _$UserGroupUsersRequestToJson(this);
}
