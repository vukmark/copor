import 'package:collection/collection.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_state.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/bloc/utils/bloc_state_conditions.dart';
import 'package:copor_core/src/bloc/utils/guarded_bloc_builder.dart';
import 'package:copor_core/src/components/presence_avatar.dart';
import 'package:copor_vu_meet/src/logic/utils/vu_meet_bloc_event_dispatcher.dart';
import 'package:copor_vu_meet/src/logic/utils/vu_meet_bloc_reactions.dart';
import 'package:copor_vu_meet/src/data/model/chat_info/chat_info_member_model.dart';
import 'package:copor_vu_meet/src/data/model/translation/vu_meet_translation.dart';
import 'package:copor_vu_meet/src/helpers/chat_display_name.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:copor_vu_meet/src/logic/chat/add_members/edit_group_cubit.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:go_router/go_router.dart';
import 'package:copor_vu_meet/src/presentation/modals/edit_group_modal.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_info/chat_info_bloc.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_info/chat_info_state.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

MultiBlocListener _multiBlocListener(BuildContext context, {required Widget child, chatId}) {
  return MultiBlocListener(listeners: [_getConfigListener()], child: child);
}

class ChatInfo extends HookWidget {
  final String? chatId;

  const ChatInfo({super.key, this.chatId});

  @override
  Widget build(BuildContext context) {
    useEffect(() {
      if (chatId != null) VuMeetDispatcher.chatInfo.getChatInfo(chatId!);
      return null;
    }, [chatId]);

    return _multiBlocListener(
      context,
      chatId: chatId,
      child: Builder(
        builder: (context) {
          final translationState = context.watch<TranslationBloc<VuMeetPageTranslation>>().state;
          final isInitial = BlocStateConditions.hasInitialStates([translationState]);

          return isInitial
              ? const SizedBox.expand()
              : ChatInfoView(translation: translationState.ensuredData, chatId: chatId);
        },
      ),
    );
  }
}

class ChatInfoView extends StatelessWidget {
  final String? chatId;
  final VuMeetPageTranslation translation;

  const ChatInfoView({super.key, required this.translation, this.chatId});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        GuardedBlocBuilder<ChatInfoBloc, ChatInfoState>(
          initialPlaceholder: const _ChatInfoSkeleton(),
          loadingPlaceholder: const _ChatInfoSkeleton(),
          builder: (context, chatInfoState) {
            final chatInfo = chatInfoState.ensuredData;

            if (chatId != null && chatInfo.id != chatId) {
              return const _ChatInfoSkeleton();
            }

            final dt = CoporTheme.of(context);
            final displayName = chatDisplayName(
              name: chatInfo.name,
              isPrivate: chatInfo.isPrivate,
              translation: translation,
              isActive: true,
            );

            final resolvedName = chatInfo.isPrivate || chatInfo.name.trim().isNotEmpty
                ? chatInfo.name
                : translation.UNNAMED_GROUP_CHAT;

            final currentUserId = context.getState.accountInfo.ensuredData.id;
            final otherMember = chatInfo.isPrivate
                ? chatInfo.members.where((m) => m.id != currentUserId).firstOrNull
                : null;

            return ListView(
              children: [
                const SizedBox(height: 8),
                DTEntityHeader.large(
                  avatar: chatInfo.isPrivate
                      ? PresenceAvatar(
                          userId: otherMember?.id,
                          userFullName: resolvedName,
                          picture: chatInfo.chatPicture,
                          radius: 44,
                        )
                      : DTAvatar(
                          userFullName: resolvedName,
                          picture: chatInfo.chatPicture,
                          radius: 44,
                        ),
                  title: displayName,
                  chips: [
                    if (!chatInfo.isPrivate)
                      Text('${chatInfo.members.length} members', style: dt.text.bodySecondary),
                  ],
                ),

                const SizedBox(height: 20),
                // ── Action buttons ────────────────────────────────────────────
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    _ActionButton(icon: PhosphorIconsThin.user, label: 'Profile', onTap: null),
                    _ActionButton(icon: PhosphorIconsThin.bellSlash, label: 'Mute', onTap: null),
                    _ActionButton(
                      icon: PhosphorIconsThin.magnifyingGlass,
                      label: 'Search',
                      onTap: null,
                    ),
                    if (!chatInfo.isPrivate)
                      _ActionButton(
                        icon: PhosphorIconsThin.userGear,
                        label: 'Edit',
                        onTap: () => _openEditGroupModal(
                          context,
                          chatInfo.members,
                          chatInfo.id,
                          chatInfo.name,
                        ),
                      ),
                  ],
                ),
                const SizedBox(height: 30),

                // ── Chat info section ─────────────────────────────────────────
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8),
                  child: DTExpandableSection.slim(
                    title: 'Chat info',
                    initiallyExpanded: true,
                    child: Column(
                      children: [
                        DTListTile.surface(
                          icon: PhosphorIconsThin.chatCentered,
                          label: 'View pinned messages',
                          onPressed: () {},
                          border: false,
                          enabled: true,
                        ),
                        if (!chatInfo.isPrivate) ...[
                          const DTDivider.subtle(height: 20),
                          ...chatInfo.members.indexed.map(
                            (e) => Padding(
                              key: ValueKey(e.$2.id),
                              padding: EdgeInsets.only(top: e.$1 == 0 ? 0 : 4),
                              child: DTListTile.surface(
                                leading: PresenceAvatar(
                                  userId: e.$2.id,
                                  userFullName: e.$2.name,
                                  picture: e.$2.picture,
                                  radius: 18,
                                ),
                                border: false,
                                label: e.$2.name,

                                /// THIS CANT WORK LIKE THIS BECAUSE NOT ALL USERS HAVE THAT PROFILE PAGE
                                onPressed: () {},
                                //onPressed: () => goToPage('/profile/${e.$2.id}'),
                              ),
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 8),

                // ── Customize chat ────────────────────────────────────────────
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8),
                  child: DTExpandableSection.slim(
                    title: 'Customize chat',
                    enabled: false,
                    child: const SizedBox.shrink(),
                  ),
                ),
                const SizedBox(height: 8),

                // ── Media & files ─────────────────────────────────────────────
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8),
                  child: DTExpandableSection.slim(
                    title: 'Media & files',
                    initiallyExpanded: true,
                    child: Column(
                      children: [
                        DTListTile.surface(
                          icon: PhosphorIconsThin.image,
                          label: 'Media',
                          onPressed: () {},
                          enabled: false,
                          border: false,
                        ),
                        const SizedBox(height: 4),
                        DTListTile.surface(
                          icon: PhosphorIconsThin.file,
                          label: 'Files',
                          onPressed: () {},
                          enabled: false,
                          border: false,
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 8),

                // ── Privacy & support ─────────────────────────────────────────
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8),
                  child: DTExpandableSection.slim(
                    title: 'Privacy & support',
                    enabled: false,
                    child: const SizedBox.shrink(),
                  ),
                ),

                const SizedBox(height: 24),
              ],
            );
          },
        ),
        Positioned(
          top: 4,
          left: 4,
          child: DTButton.floating(
            icon: DTIcons.back,
            label: '',
            semanticLabel: '',
            border: false,
            onPressed: () => context.pop(),
          ),
        ),
      ],
    );
  }

  void _openEditGroupModal(
    BuildContext context,
    List<ChatInfoMemberModel> members,
    String chatId,
    String groupName,
  ) {
    final editGroupCubit = context.read<EditGroupCubit>();
    final isMobile = context.isMobile;

    showGeneralDialog(
      context: context,
      useRootNavigator: true,
      barrierDismissible: true,
      barrierColor: Colors.transparent,
      barrierLabel: '',
      transitionDuration: const Duration(milliseconds: 200),
      transitionBuilder: (_, animation, _, child) =>
          FadeTransition(opacity: animation, child: child),
      pageBuilder: (_, _, _) => Material(
        type: MaterialType.transparency,
        child: BlocProvider.value(
          value: editGroupCubit,
          child: DTModalShell(
            isMobile: isMobile,
            builder: (_) => EditGroupModal(
              chatId: chatId,
              groupName: groupName,
              existingMembers: members,
              translations: translation,
            ),
          ),
        ),
      ),
    );
  }
}

// ── Action button ─────────────────────────────────────────────────────────────

class _ActionButton extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback? onTap;

  const _ActionButton({required this.icon, required this.label, this.onTap});

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        DTButton.primary(
          label: '',
          icon: icon,
          circular: true,
          enabled: onTap != null,
          onPressed: onTap ?? () {},
        ),
        const SizedBox(height: 6),
        Text(label, style: dt.text.bodySecondary),
      ],
    );
  }
}

BlocListener _getConfigListener() {
  return BlocListener<ConfigBloc, ConfigState>(
    listenWhen: (previous, current) =>
        previous.result?.data.language != current.result?.data.language,
    listener: (context, configState) {
      VuMeetBlocReactions.vuMeet.getVuMeetPageTranslation(context);
    },
  );
}

// ── Chat info skeleton ────────────────────────────────────────────────────────

class _ChatInfoSkeleton extends StatelessWidget {
  const _ChatInfoSkeleton();

  @override
  Widget build(BuildContext context) {
    final placeholder = CoporTheme.of(context).colors.onSurfaceDisabled.withValues(alpha: 0.4);

    pill(double w, double h) => Container(
      width: w,
      height: h,
      decoration: BoxDecoration(color: placeholder, borderRadius: BorderRadius.circular(h / 2)),
    );

    circle(double size) => Container(
      width: size,
      height: size,
      decoration: BoxDecoration(color: placeholder, shape: BoxShape.circle),
    );

    return Stack(
      children: [
        ListView(
          children: [
            Center(child: circle(88)),
            const SizedBox(height: 12),
            Center(child: pill(140, 14)),
            const SizedBox(height: 6),
            Center(child: pill(80, 11)),
            const SizedBox(height: 16),

            // ── Encrypted badge ───────────────────────────────────────────────
            Center(child: pill(160, 28)),
            const SizedBox(height: 24),

            // ── Action buttons ────────────────────────────────────────────────
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: List.generate(
                4,
                (_) => Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [circle(48), const SizedBox(height: 6), pill(36, 10)],
                ),
              ),
            ),
            const SizedBox(height: 30),

            // ── Section rows ──────────────────────────────────────────────────
            ...List.generate(
              4,
              (_) => Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                child: Container(
                  height: 44,
                  decoration: BoxDecoration(
                    color: placeholder.withValues(alpha: 0.5),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: Row(children: [pill(110, 12), const Spacer(), circle(16)]),
                ),
              ),
            ),

            const SizedBox(height: 24),
            const Center(child: DTRingLoader()),
            const SizedBox(height: 24),
          ],
        ),

        // ── Back button placeholder ───────────────────────────────────────────
        Positioned(top: 4, left: 4, child: circle(40)),
      ],
    );
  }
}
