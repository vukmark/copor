import 'package:copor_core/src/components/presence_avatar.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/administration/user_groups/bloc/user_groups_cubit.dart';
import 'package:copor_core/src/modules/administration/user_groups/bloc/user_groups_state.dart';
import 'package:copor_core/src/modules/administration/user_groups/data/model/user_group_user_model.dart';
import 'package:copor_core/src/modules/administration/user_groups/data/model/user_group_model.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

const _kUserListItemExtent = 64.0;

class UserGroupUserListModal extends StatefulWidget {
  final UserGroupModel userGroup;
  final CommonTranslation translation;
  final UserGroupsCubit userGroupsCubit;

  const UserGroupUserListModal({
    super.key,
    required this.userGroup,
    required this.translation,
    required this.userGroupsCubit,
  });

  @override
  State<UserGroupUserListModal> createState() => _UserGroupUserListModalState();
}

class _UserGroupUserListModalState extends State<UserGroupUserListModal> {
  @override
  void initState() {
    super.initState();
    widget.userGroupsCubit.getUserGroupUsers(widget.userGroup.id);
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider.value(
      value: widget.userGroupsCubit,
      child: LayoutBuilder(
        builder: (context, constraints) => DTModalShell(
          isMobile: constraints.maxWidth < kMobileBreakpoint,
          desktopHeight: 520,
          builder: (context) => DTFloatingLayout(
            actionPosition: FloatingContainerActionPosition.top,
            title: widget.userGroup.name,
            icon: PhosphorIconsThin.users,
            expandedChild: BlocBuilder<UserGroupsCubit, UserGroupsState>(
              builder: (context, state) {
                if (state.isLoadingUserList) {
                  return const Center(child: DTRingLoader());
                }

                if (state.failure != null && state.userList.isEmpty) {
                  return Center(child: Text(state.failure.toString()));
                }

                return state.userList.isEmpty ? _buildEmptyState(context) : _buildUserList(state);
              },
            ),
            children: const [],
          ),
        ),
      ),
    );
  }

  Widget _buildEmptyState(BuildContext context) {
    return Center(
      child: DTEmptyState(icon: DTIcons.noResults, title: widget.translation.NO_RESULTS_FOUND),
    );
  }

  Widget _buildUserList(UserGroupsState state) {
    final users = state.userList;

    return NotificationListener<ScrollNotification>(
      onNotification: (notification) {
        if (notification is! ScrollUpdateNotification) return false;

        final metrics = notification.metrics;
        if (metrics.pixels >= metrics.maxScrollExtent - 10) {
          widget.userGroupsCubit.loadMoreUserGroupUsers();
        }

        return false;
      },
      child: ListView.separated(
        itemCount: users.length + (state.isPaginatingUserList ? 1 : 0),
        separatorBuilder: (_, index) =>
            index >= users.length - 1 ? const SizedBox.shrink() : const _UserListDivider(),
        itemBuilder: (context, index) {
          if (index >= users.length) {
            return const SizedBox(
              height: _kUserListItemExtent,
              child: Center(child: DTRingLoader.inline()),
            );
          }

          final user = users[index];
          return _UserGroupUserListTile(user: user);
        },
      ),
    );
  }
}

class _UserListDivider extends StatelessWidget {
  const _UserListDivider();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Divider(
        height: 1,
        thickness: 0.5,
        color: Theme.of(context).colorScheme.outlineVariant,
      ),
    );
  }
}

class _UserGroupUserListTile extends StatelessWidget {
  final UserGroupUserModel user;

  const _UserGroupUserListTile({required this.user});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: PresenceAvatar(
        userId: user.id,
        userFullName: user.fullName,
        picture: user.picturePath ?? '',
        radius: 20,
      ),
      title: Text(user.fullName, style: Theme.of(context).textTheme.bodyLarge),
    );
  }
}
