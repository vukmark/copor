import 'package:copor_vu_meet/src/data/model/translation/vu_meet_translation.dart';
import 'package:copor_core/src/utils/helper_functions.dart';

/// A group chat's own `name` can be blank if it reached storage without
/// going through the app's validated "New Group" form (e.g. a different
/// client, a raw API call). Falls back to a translated placeholder in that
/// case; private (1:1) chats always have a resolved other-member name and
/// are returned as-is.
String chatDisplayName({
  required String name,
  required bool isPrivate,
  required VuMeetPageTranslation translation,
  required bool isActive,
}) {
  if (!isPrivate && name.trim().isEmpty) {
    return translation.UNNAMED_GROUP_CHAT;
  }
  return getFullNameWithStatus(name, isActive);
}
