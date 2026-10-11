import 'package:copor_vu_meet/src/logic/utils/vu_meet_context_extensions.dart';
import 'package:copor_vu_meet/src/logic/utils/vu_meet_bloc_event_dispatcher.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:flutter/material.dart';

class VuMeetBlocReactions {
  static VuMeet vuMeet = VuMeet();
}

class VuMeet {
  void getVuMeetPageTranslation(BuildContext context) {
    VuMeetDispatcher.translation.getVuMeetTranslation(
      context.getBloc.vuMeetTranslation,
      context.config.currentLanguage,
    );
  }
}
