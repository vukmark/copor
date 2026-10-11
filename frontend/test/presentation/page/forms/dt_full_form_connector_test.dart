// Regression test for a bug where an unrelated ancestor rebuild (in production,
// triggered by MediaQuery churn from the soft keyboard opening/closing while
// typing on Android/iOS) reset already-selected MULTISELECT values back to
// their original server payload, and silently blocked form submission even
// though the user had filled in every required field.
//
// `DTFullFormConnector` used to call `FormHelper.getFormContent(fields)` fresh
// on every rebuild, which built brand new `ValueNotifier` controllers seeded
// from the bloc's original DTO snapshot - discarding whatever the user had
// already selected. The fix memoizes the field controllers so they only get
// rebuilt when the bloc actually emits new form data.
import 'package:dartz/dartz.dart' hide State;
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/bloc/utils/form_save_trigger_cubit.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/data/model/key_value_pair/key_value_model.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/data/model/named_id/named_id_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_bloc.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_event.dart';
import 'package:copor_core/src/modules/forms/data/model/copor_form_dto.dart';
import 'package:copor_core/src/modules/forms/data/model/copor_form_submit_result.dart';
import 'package:copor_core/src/modules/forms/data/model/input_field_model.dart';
import 'package:copor_core/src/modules/forms/data/repository/copor_form_repository.dart';
import 'package:copor_core/src/modules/forms/presentation/utils/dt_full_form_connector.dart';
import 'package:copor_scaffold/copor_scaffold.dart' show DSBreakpointsScope;
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_test/flutter_test.dart';

class _FakeCoporFormRepository implements CoporFormRepository {
  _FakeCoporFormRepository(this.formToReturn);

  final CoporFormDTO formToReturn;
  Map<String, dynamic>? lastSubmittedData;

  @override
  Future<Either<Failure, Result<CoporFormDTO>>> getCoporForm(String name) async {
    return Right(Result(data: formToReturn));
  }

  @override
  Future<Either<Failure, Result<CoporFormDTO>>> getPublicCoporForm(String name) async {
    return Right(Result(data: formToReturn));
  }

  @override
  Future<Either<Failure, Result<CoporFormSubmitResult>>> updateFromCoporForm(
    String endpoint,
    Map<String, dynamic> formData,
  ) async {
    lastSubmittedData = formData;
    return Right(Result(data: const CoporFormCompleted('ok ')));
  }

  @override
  Future<Either<Failure, Result<void>>> createFromCoporForm(
    String endpoint,
    Map<String, dynamic> formData,
  ) async {
    lastSubmittedData = formData;
    return Right(Result<void>(data: null));
  }

  @override
  Future<Either<Failure, Result<void>>> updateSystemSettings(
    List<KeyValueModel<dynamic>> formData,
  ) async {
    throw UnimplementedError();
  }

  @override
  Future<Either<Failure, Result<void>>> submitFromCoporForm(
    String endpoint,
    Map<String, dynamic> formData,
  ) {
    // TODO: implement submitFromCoporForm
    throw UnimplementedError();
  }

  @override
  Future<Either<Failure, Result<void>>> uploadFormImage(String endpoint, MediaFileModel image) {
    // TODO: implement uploadFormImage
    throw UnimplementedError();
  }

  @override
  Future<Either<Failure, Result<void>>> deleteFormImage(String endpoint) {
    // TODO: implement deleteFormImage
    throw UnimplementedError();
  }
}

CoporFormDTO _buildFixtureForm() {
  return CoporFormDTO(
    endpoint: '/content-item',
    fields: [
      CoporFormFieldDTO(
        type: FieldType.TEXTBOX,
        label: 'Description',
        name: 'description',
        requiredMessage: 'Description is required',
        currentValue: FieldValue(text: ''),
      ),
      CoporFormFieldDTO(
        type: FieldType.MULTISELECT,
        label: 'Accessible to',
        name: 'accessibleToList',
        requiredMessage: 'Accessible to is required',
        currentValue: FieldValue(dropdown: []),
        values: const [
          NamedIdModel(id: 'ALL_USERS', name: 'All users'),
          NamedIdModel(id: 'ADMIN', name: 'Admin'),
          NamedIdModel(id: 'INSTRUCTOR', name: 'Instructor'),
        ],
      ),
    ],
  );
}

/// Mimics a real edit page: on every rebuild it constructs a *brand new*
/// `DTFullFormConnector` widget instance (no key), the same way the real page
/// does when its ancestor rebuilds because of an unrelated `MediaQuery` change.
/// Calling [rebuild] reproduces that incidental rebuild without needing a real
/// soft keyboard or an emulator.
class _RebuildHarness extends StatefulWidget {
  const _RebuildHarness({super.key, required this.formKey});

  final GlobalKey<FormState> formKey;

  @override
  State<_RebuildHarness> createState() => _RebuildHarnessState();
}

class _RebuildHarnessState extends State<_RebuildHarness> {
  void rebuild() => setState(() {});

  @override
  Widget build(BuildContext context) {
    return DTFullFormConnector(
      formKey: widget.formKey,
      id: null,
      editTitle: 'Edit',
      createTitle: 'Create',
      onCancel: () {},
    );
  }
}

Finder _multiselectFinder() => find.byWidgetPredicate((w) => w is DTMultiselectInput).first;

Finder _descriptionTextFieldFinder() => find.descendant(
  of: find.byWidgetPredicate((w) => w is DTTextBoxInput),
  matching: find.byType(TextField),
);

Finder _saveButtonFinder() =>
    find.byWidgetPredicate((w) => w is DTButton && w.label == 'Save').first;

void main() {
  testWidgets('a MULTISELECT selection survives an unrelated ancestor rebuild triggered '
      'while editing another field, and Save submits both values', (tester) async {
    final repository = _FakeCoporFormRepository(_buildFixtureForm());
    final bloc = CoporFormBloc(coporFormRepository: repository);
    final formKey = GlobalKey<FormState>();
    final harnessKey = GlobalKey<_RebuildHarnessState>();
    addTearDown(bloc.close);

    bloc.add(const GetCoporForm('/content-item'));
    await tester.pumpWidget(
      MaterialApp(
        theme: lightTheme,
        builder: (context, child) => DSBreakpointsScope(breakpoints: appBreakpoints, child: child!),
        home: Scaffold(
          body: MultiBlocProvider(
            providers: [
              BlocProvider<CoporFormBloc>.value(value: bloc),
              BlocProvider<FormSaveTriggerCubit>(create: (_) => FormSaveTriggerCubit()),
            ],
            child: _RebuildHarness(key: harnessKey, formKey: formKey),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    // user picks "All users" in the required "Accessible to" multiselect
    final multiselectInput = tester.widget<DTMultiselectInput>(_multiselectFinder());
    multiselectInput.controller.value = [const NamedIdModel(id: 'ALL_USERS', name: 'All users')];
    await tester.pump();

    // user types into Description - on Android/iOS this resizes the soft
    // keyboard and rebuilds the whole page via MediaQuery; reproduce that
    // incidental rebuild directly instead of relying on a real keyboard.
    await tester.enterText(_descriptionTextFieldFinder(), 'Quarterly report');
    harnessKey.currentState!.rebuild();
    await tester.pump();

    final afterRebuild = tester.widget<DTMultiselectInput>(_multiselectFinder());
    expect(
      afterRebuild.controller.value.map((n) => n.id),
      contains('ALL_USERS'),
      reason: 'the multiselect selection must not be wiped out by the unrelated rebuild',
    );

    await tester.tap(_saveButtonFinder());
    await tester.pumpAndSettle();

    expect(repository.lastSubmittedData, isNotNull, reason: 'Save must actually submit');
    expect(repository.lastSubmittedData!['description'], 'Quarterly report');
    expect(repository.lastSubmittedData!['accessibleToList'], contains('ALL_USERS'));
  });

  testWidgets('Save does not submit while the required MULTISELECT is empty, even if '
      'every other field is filled in', (tester) async {
    final repository = _FakeCoporFormRepository(_buildFixtureForm());
    final bloc = CoporFormBloc(coporFormRepository: repository);
    final formKey = GlobalKey<FormState>();
    final harnessKey = GlobalKey<_RebuildHarnessState>();
    addTearDown(bloc.close);

    bloc.add(const GetCoporForm('/content-item'));
    await tester.pumpWidget(
      MaterialApp(
        theme: lightTheme,
        builder: (context, child) => DSBreakpointsScope(breakpoints: appBreakpoints, child: child!),
        home: Scaffold(
          body: MultiBlocProvider(
            providers: [
              BlocProvider<CoporFormBloc>.value(value: bloc),
              BlocProvider<FormSaveTriggerCubit>(create: (_) => FormSaveTriggerCubit()),
            ],
            child: _RebuildHarness(key: harnessKey, formKey: formKey),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    await tester.enterText(_descriptionTextFieldFinder(), 'Quarterly report');
    harnessKey.currentState!.rebuild();
    await tester.pump();

    await tester.tap(_saveButtonFinder());
    await tester.pumpAndSettle();

    expect(repository.lastSubmittedData, isNull);
  });
}
