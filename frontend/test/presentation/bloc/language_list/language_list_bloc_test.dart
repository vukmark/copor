import 'package:bloc_test/bloc_test.dart';
import 'package:copor_core/src/modules/administration/language/bloc/language_bloc.dart';
import 'package:copor_core/src/modules/administration/language/bloc/language_event.dart';
import 'package:copor_core/src/modules/administration/language/bloc/language_state.dart';
import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('LanguageBloc', () {
    test('starts in the initial state', () {
      expect(LanguageBloc().state, LanguageListState.initial());
    });

    blocTest<LanguageBloc, LanguageListState>(
      'emits the supported languages (English, German) when GetLanguage is added',
      build: LanguageBloc.new,
      act: (bloc) => bloc.add(GetLanguage()),
      expect: () => [
        LanguageListState.fetched(
          result: Result(data: [LanguageModel.defaultEnglish(), LanguageModel.defaultGerman()]),
        ),
      ],
    );
  });
}
