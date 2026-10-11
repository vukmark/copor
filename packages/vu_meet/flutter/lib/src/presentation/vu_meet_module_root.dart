import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/config/router/utils/scope_builder.dart';
import 'package:copor_vu_meet/src/logic/utils/vu_meet_bloc_event_dispatcher.dart';
import 'package:copor_vu_meet/src/config/scopes/vu_meet_page_scope.dart';
import 'package:copor_vu_meet/src/data/model/translation/vu_meet_translation.dart';
import 'package:copor_vu_meet/src/presentation/vu_meet_layout_builder.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class VuMeetModuleRoot extends HookWidget {
  final Widget chatContent;

  const VuMeetModuleRoot({super.key, required this.chatContent});

  @override
  Widget build(BuildContext context) {
    useEffect(() {
      VuMeetDispatcher.chatList.getVuMeetChatList('');
      return () => BlocScopeRegistry.dispose(VuMeetPageScope.vuMeetPageScopeString);
    }, []);

    return BlocBuilder<
      TranslationBloc<VuMeetPageTranslation>,
      TranslationState<VuMeetPageTranslation>
    >(
      builder: (context, translationState) {
        if (translationState.result == null) return const SizedBox.shrink();
        return VuMeetLayoutBuilder(
          translation: translationState.ensuredData,
          chatContent: chatContent,
        );
      },
    );
  }
}
