import 'package:flutter_test/flutter_test.dart';
import 'package:copor_core/src/core/module/module_preference_section.dart';
import 'package:copor_core/src/core/module/copor_module.dart';
import 'package:copor_core/src/modules/preferences/data/model/preferences_model.dart';

// The JSON of a default model without the module fields, plus [extra].
Map<String, dynamic> _json({Map<String, dynamic> extra = const {}}) => {
  ...PreferencesModel.defaultPreferences().toJson()
    ..remove('maxImageSize')
    ..remove('modulePreferences')
    ..remove('moduleConfig'),
  ...extra,
};

class _SampleModule extends CoporModule {
  final List<ModulePreferenceSection> sections;

  const _SampleModule(this.sections);

  @override
  String get name => 'sample';

  @override
  Future<void> registerDependencies() async {}

  @override
  List<ModulePreferenceSection> get preferenceSections => sections;
}

ModulePreferenceSection _section(String title, int order) => ModulePreferenceSection(
  titleKey: title,
  helpOnKey: '${title}_ON',
  helpOffKey: '${title}_OFF',
  toggles: const [],
  order: order,
);

void main() {
  test('reads module preferences, module config and the image limit', () {
    final model = PreferencesModel.fromJson(
      _json(
        extra: {
          'maxImageSize': 32,
          'modulePreferences': {'vu_meet.messagePushNotifications': false},
          'moduleConfig': {
            'cloud': {'maxFileSize': 64},
          },
        },
      ),
    );

    expect(model.maxImageSize, 32);
    expect(model.modulePreference('vu_meet.messagePushNotifications'), isFalse);
    expect(model.moduleMaxFileSize('cloud'), 64);
  });

  test('a cached model from before module preferences still loads, with defaults', () {
    final model = PreferencesModel.fromJson(
      _json(
        extra: {
          'pushNotifications': {'vuMeet': true},
          'cloudMaxFileSize': 64,
        },
      ),
    );

    expect(model.maxImageSize, 1);
    expect(model.modulePreferences, isEmpty);
    expect(model.modulePreference('cloud.groupFolderNotifications'), isTrue);
    expect(model.moduleMaxFileSize('cloud'), 1);
  });

  test('round-trips through JSON', () {
    final model = PreferencesModel.defaultPreferences().copyWith(
      modulePreferences: {'cloud.userFolderNotifications': false},
      moduleConfig: {
        'vu_meet': {'maxFileSize': 10},
      },
    );

    expect(PreferencesModel.fromJson(model.toJson()), model);
  });

  test('collects every module\'s preference sections in order', () {
    final sections = modulePreferenceSections([
      _SampleModule([_section('B', 20)]),
      _SampleModule([_section('A', 10), _section('C', 30)]),
    ]);

    expect(sections.map((section) => section.titleKey), ['A', 'B', 'C']);
  });
}
