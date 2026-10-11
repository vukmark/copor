import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_scaffold/copor_scaffold.dart' show DSBanner;
import 'package:copor_vu_meet/src/data/model/translation/vu_meet_translation.dart';
import 'package:copor_vu_meet/src/data/model/chat_info/chat_info_member_model.dart';
import 'package:copor_core/src/data/model/user_picker/user_picker_item_model.dart';
import 'package:copor_vu_meet/src/logic/chat/add_members/edit_group_cubit.dart';
import 'package:copor_vu_meet/src/logic/chat/add_members/edit_group_state.dart';
import 'package:copor_vu_meet/src/presentation/components/vu_meet_contact_picker.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class EditGroupModal extends HookWidget {
  final List<ChatInfoMemberModel> existingMembers;
  final String chatId;
  final String groupName;
  final VuMeetPageTranslation translations;

  const EditGroupModal({
    super.key,
    required this.existingMembers,
    required this.chatId,
    required this.groupName,
    required this.translations,
  });

  @override
  Widget build(BuildContext context) {
    final currentUserId = context.getState.accountInfo.ensuredData.id;
    final cubit = context.read<EditGroupCubit>();

    useEffect(() {
      cubit.initialize(
        existingMembers: existingMembers
            .where((m) => m.id != currentUserId)
            .map((m) => UserPickerItemModel(id: m.id, fullName: m.name, picture: m.picture))
            .toList(),
        chatId: chatId,
        groupName: groupName,
      );
      return null;
    }, const []);

    return _EditGroupContent(translations: translations);
  }
}

class _EditGroupContent extends StatelessWidget {
  final VuMeetPageTranslation translations;

  const _EditGroupContent({required this.translations});

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<EditGroupCubit, EditGroupState>(
      listenWhen: (prev, curr) => prev.status != curr.status,
      listener: (context, state) {
        if (state.isSuccess) {
          Navigator.of(context).pop();
          context.getBloc.appScaffold.addBanner(
            DSBanner.success(translations.GROUP_EDIT_TOAST_SUCCESS, source: 'edit_group_success'),
          );
        }
      },
      builder: (context, state) {
        if (state.isSuccess) return const SizedBox.shrink();

        final commonTranslation = context.getState.commonTranslation.ensuredData;
        final accountInfo = context.getState.accountInfo.ensuredData;

        return DTFloatingLayout(
          title: translations.EDIT_GROUP,
          isLoading: state.isLoading,
          actionPosition: FloatingContainerActionPosition.bottom,
          leading: DTButton.surface(
            label: commonTranslation.CANCEL,
            onPressed: () => Navigator.of(context).pop(),
          ),
          trailing: DTButton.positive(
            label: commonTranslation.SAVE,
            enabled: state.hasSelection && !state.isLoading,
            onPressed: () => context.read<EditGroupCubit>().addMembers(),
          ),
          expandedChild: VuMeetContactPicker(
            translation: translations,
            isSelected: (user) => state.selectedContacts.any((c) => c.id == user.id),
            onTap: context.read<EditGroupCubit>().toggleContact,
            selectedUsers: state.selectedContacts,
            selectedUsersLeading: DTAvatar(
              userFullName: '${accountInfo.firstName} ${accountInfo.lastName}',
              picture: accountInfo.picture ?? '',
              radius: 22,
            ),
          ),
          children: const [],
        );
      },
    );
  }
}
