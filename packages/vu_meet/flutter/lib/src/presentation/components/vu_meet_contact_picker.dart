import 'package:flutter/material.dart';
import 'package:copor_core/src/components/user_picker/user_picker_list.dart';
import 'package:copor_core/src/data/model/user_picker/user_picker_item_model.dart';
import 'package:copor_vu_meet/src/data/model/translation/vu_meet_translation.dart';
import 'package:copor_vu_meet/src/presentation/pages/create_chat/user_list_item.dart';

const String _vuMeetContactsPath = '/vu-meet/contacts';
const double _kItemExtent = 70.0;

/// Core's [UserPickerList] on VuMeet's contact list (`POST /vu-meet/contacts`)
/// with VuMeet's tile. Without [isSelected] the tiles are plain (tap starts a
/// chat); with it they are selectable (group members).
class VuMeetContactPicker extends StatelessWidget {
  final VuMeetPageTranslation translation;
  final ValueChanged<UserPickerItemModel> onTap;
  final bool Function(UserPickerItemModel user)? isSelected;
  final List<UserPickerItemModel>? selectedUsers;
  final Widget? selectedUsersLeading;

  const VuMeetContactPicker({
    super.key,
    required this.translation,
    required this.onTap,
    this.isSelected,
    this.selectedUsers,
    this.selectedUsersLeading,
  });

  @override
  Widget build(BuildContext context) {
    final isSelected = this.isSelected;

    return UserPickerList(
      path: _vuMeetContactsPath,
      isSelected: isSelected ?? (_) => false,
      onTap: onTap,
      searchLabel: translation.SEARCH,
      noUsersLabel: translation.NO_CONTACT_FOUND,
      selectedUsers: selectedUsers,
      selectedUsersLeading: selectedUsersLeading,
      itemExtent: _kItemExtent,
      tileBuilder: (context, user, selected, onTileTap) => isSelected == null
          ? UserListItem(
              fullName: user.fullName,
              picture: user.picture,
              userId: user.id,
              isActive: user.isActive,
              onTap: onTileTap,
            )
          : UserListItem.selectable(
              fullName: user.fullName,
              picture: user.picture,
              userId: user.id,
              isActive: user.isActive,
              isSelected: selected,
              onTap: onTileTap,
            ),
    );
  }
}
