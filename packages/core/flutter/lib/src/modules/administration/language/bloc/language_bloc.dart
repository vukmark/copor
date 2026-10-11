import 'package:bloc/bloc.dart';
import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_core/src/modules/administration/language/bloc/language_state.dart';
import 'package:copor_core/src/modules/administration/language/bloc/language_event.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

class LanguageBloc extends Bloc<LanguageListEvent, LanguageListState> {
  static final List<LanguageModel> _supportedLanguages = [
    LanguageModel.defaultEnglish(),
    LanguageModel.defaultGerman(),
  ];

  LanguageBloc() : super(LanguageListState.initial()) {
    on<GetLanguage>(_onGetLanguageList);
  }

  void _onGetLanguageList(GetLanguage event, Emitter<LanguageListState> emit) {
    emit(LanguageListState.fetched(result: Result(data: _supportedLanguages)));
  }
}
