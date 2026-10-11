import 'package:copor_core/src/modules/administration/user_groups/data/model/user_group_model.dart';

// Depth-first flattening of a user group tree into a single list, each group
// appearing once regardless of nesting depth.
List<UserGroupModel> flattenUserGroups(List<UserGroupModel> groups) {
  return [
    for (final group in groups) ...[group, ...flattenUserGroups(group.children)],
  ];
}
