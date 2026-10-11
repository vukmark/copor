import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/config/router/utils/scope_builder.dart';
import 'package:copor_core/src/modules/media_picker/presentation/cubit/media_picker_cubit.dart';
import 'package:copor_vu_meet/src/logic/vu_meet_ui/vu_meet_ui_bloc.dart';
import 'package:copor_vu_meet/src/logic/call/call_bloc.dart';
import 'package:copor_vu_meet/src/logic/chat/add_members/edit_group_cubit.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_info/chat_info_bloc.dart';
import 'package:copor_vu_meet/src/logic/chat/selected_chat/selected_chat_cubit.dart';
import 'package:copor_vu_meet/src/logic/message/vu_meet_media_message/vu_meet_media_message_bloc.dart';
import 'package:copor_vu_meet/src/logic/message/vu_meet_message/vu_meet_message_bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class VuMeetPageScope extends ScopeBuilder {
  const VuMeetPageScope({super.key, required super.id, required super.child});

  static const String vuMeetPageScopeString = 'vu_meet_page_scope';

  @override
  Widget buildScope(BuildContext context, Widget child) {
    return MultiBlocProvider(
      providers: [
        BlocScopeRegistry.provider<CallBloc>(id),
        BlocScopeRegistry.provider<ChatInfoBloc>(id),
        BlocScopeRegistry.provider<VuMeetMessageBloc>(id),
        BlocScopeRegistry.provider<MediaPickerCubit>(id),
        BlocScopeRegistry.provider<VuMeetMediaMessageBloc>(id),
        BlocScopeRegistry.provider<EditGroupCubit>(id),
        BlocProvider.value(value: getIt<VuMeetUiBloc>()),
        BlocProvider.value(value: getIt<SelectedChatCubit>()),
      ],
      child: child,
    );
  }
}
