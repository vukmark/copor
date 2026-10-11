import 'package:copor_core/src/components/user_picker/selected_users_row.dart';
import 'package:copor_core/src/data/model/user_picker/user_picker_item_model.dart';
import 'package:copor_vu_meet/src/logic/utils/vu_meet_bloc_event_dispatcher.dart';
import 'package:copor_vu_meet/src/data/model/translation/vu_meet_translation.dart';
import 'package:copor_vu_meet/src/presentation/components/vu_meet_contact_picker.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class CreateChatScreen extends HookWidget {
  final VoidCallback onBackPressed;
  final VuMeetPageTranslation translation;

  const CreateChatScreen({super.key, required this.translation, required this.onBackPressed});

  @override
  Widget build(BuildContext context) {
    final isGroupMode = useState(false);
    final groupName = useTextEditingController();
    final selectedUsers = useState(<UserPickerItemModel>[]);
    final groupFormKey = useMemoized(() => GlobalKey<FormState>());
    final dt = CoporTheme.of(context);

    bool isSelected(UserPickerItemModel user) => selectedUsers.value.any((u) => u.id == user.id);

    void toggleUser(UserPickerItemModel user) {
      selectedUsers.value = isSelected(user)
          ? selectedUsers.value.where((u) => u.id != user.id).toList()
          : [...selectedUsers.value, user];
    }

    void onBack() {
      if (isGroupMode.value) {
        isGroupMode.value = false;
        selectedUsers.value = [];
        groupName.clear();
      } else {
        onBackPressed();
      }
    }

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 1),
          child: Row(
            children: [
              DTButton.surface(
                icon: DTIcons.back,
                label: '',
                semanticLabel: '',
                border: false,
                onPressed: onBack,
              ),
              const SizedBox(width: 4),
              Expanded(
                child: Text(
                  isGroupMode.value ? translation.NEW_GROUP : translation.NEW_CHAT,
                  style: dt.text.sectionTitle,
                ),
              ),
            ],
          ),
        ),
        const DTDivider(height: 15, alignment: DTDividerAlignment.asymmetricTop),
        AnimatedSize(
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeInOut,
          alignment: Alignment.topCenter,
          child: AnimatedSwitcher(
            duration: const Duration(milliseconds: 220),
            switchInCurve: Curves.easeOut,
            switchOutCurve: Curves.easeIn,
            transitionBuilder: (child, animation) =>
                FadeTransition(opacity: animation, child: child),
            child: isGroupMode.value
                ? Column(
                    key: const ValueKey('group_mode'),
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Form(
                        key: groupFormKey,
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Expanded(
                              child: DTInputField(
                                controller: groupName,
                                label: translation.GROUP_NAME,
                                required: translation.PLEASE_ENTER_GROUP_NAME,
                              ),
                            ),
                            DTDivider.vertical(padding: 8),
                            Padding(
                              padding: DTPadding.input,
                              child: DTButton.primary(
                                icon: DTIcons.confirm,
                                label: '',
                                semanticLabel: translation.CREATE_GROUP,
                                inputSize: DTInputSize.compact,
                                enabled: selectedUsers.value.isNotEmpty,
                                onPressed: () {
                                  if (!groupFormKey.currentState!.validate()) return;
                                  VuMeetDispatcher.chatList.createChat(
                                    selectedUsers.value.map((u) => u.id).toList(),
                                    groupName.text,
                                  );
                                },
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 8),
                      SelectedUsersRow(users: selectedUsers.value, onRemove: toggleUser),
                    ],
                  )
                : _CreateGroupTile(
                    key: const ValueKey('tile_mode'),
                    label: translation.CREATE_NEW_GROUP,
                    onTap: () => isGroupMode.value = true,
                  ),
          ),
        ),
        const DTDivider.subtle(height: 15, alignment: DTDividerAlignment.center),
        Expanded(
          child: VuMeetContactPicker(
            translation: translation,
            isSelected: isGroupMode.value ? isSelected : null,
            onTap: isGroupMode.value
                ? toggleUser
                : (user) => VuMeetDispatcher.chatList.createChat([user.id]),
          ),
        ),
      ],
    );
  }
}

// ── Create group tile ─────────────────────────────────────────────────────────

class _CreateGroupTile extends HookWidget {
  final String label;
  final VoidCallback onTap;

  const _CreateGroupTile({super.key, required this.label, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return DTButton.primary(
      label: label,
      onPressed: onTap,
      icon: DTIcons.userGroup,
      fullWidth: true,
    );
  }
}
