import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_vu_meet/src/data/model/translation/vu_meet_translation.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

// VuMeet's shortcuts on the core context accessors (`context.getBloc.vuMeetTranslation`),
// kept in the module so core doesn't import VuMeet.
extension VuMeetGetBloc on GetBloc {
  TranslationBloc<VuMeetPageTranslation> get vuMeetTranslation =>
      context.read<TranslationBloc<VuMeetPageTranslation>>();
}
