import 'package:dartz/dartz.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/components/user_picker/selected_users_row.dart';
import 'package:copor_core/src/components/user_picker/user_picker_list.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/data/model/user_picker/user_picker_item_model.dart';
import 'package:copor_core/src/data/repository_impl/user_picker/user_picker_repository.dart';
import 'package:copor_core/src/data/repository_impl/user_picker/user_picker_repository_impl.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_theme/copor_theme.dart';

// Serves `total` users named "User <n>", filtered by the query, a page at a time.
class _FakeUserPickerRepository implements UserPickerRepository {
  final int total;
  final List<({String path, String query, int offset})> calls = [];

  _FakeUserPickerRepository(this.total);

  @override
  Future<Either<Failure, Result<List<UserPickerItemModel>>>> searchUsers(
    String path,
    String query, {
    int offset = 0,
  }) async {
    calls.add((path: path, query: query, offset: offset));
    final matching = [
      for (var i = 0; i < total; i++)
        if ('User $i'.contains(query)) UserPickerItemModel(id: 'u$i', fullName: 'User $i', picture: ''),
    ];
    return Right(Result(data: matching.skip(offset).take(UserPickerRepositoryImpl.pageSize).toList()));
  }
}

void main() {
  late _FakeUserPickerRepository repository;

  Future<void> pumpPicker(WidgetTester tester, {List<UserPickerItemModel>? selectedUsers}) async {
    await tester.pumpWidget(
      MaterialApp(
        theme: lightTheme,
        home: Scaffold(
          body: SizedBox(
            height: 600,
            child: UserPickerList(
              path: '/sample/recipients',
              isSelected: (user) => selectedUsers?.any((u) => u.id == user.id) ?? false,
              onTap: (_) {},
              searchLabel: 'Search',
              noUsersLabel: 'Nobody',
              selectedUsers: selectedUsers,
              itemExtent: 50,
              tileBuilder: (_, user, isSelected, onTap) =>
                  ListTile(title: Text(user.fullName), selected: isSelected, onTap: onTap),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();
  }

  setUp(() {
    repository = _FakeUserPickerRepository(45);
    getIt.registerSingleton<UserPickerRepository>(repository);
  });

  tearDown(() => getIt.unregister<UserPickerRepository>());

  testWidgets('loads the first page from the module\'s path', (tester) async {
    await pumpPicker(tester);

    expect(repository.calls, [(path: '/sample/recipients', query: '', offset: 0)]);
    expect(find.text('User 0'), findsOneWidget);
  });

  testWidgets('loads the next page when scrolled to the end, and stops after the last one', (tester) async {
    await pumpPicker(tester);

    await tester.drag(find.byType(ListView), const Offset(0, -2000));
    await tester.pumpAndSettle();
    await tester.drag(find.byType(ListView), const Offset(0, -2000));
    await tester.pumpAndSettle();
    await tester.drag(find.byType(ListView), const Offset(0, -2000));
    await tester.pumpAndSettle();

    expect(repository.calls.map((call) => call.offset), [0, 20, 40]);
    expect(find.text('User 44'), findsOneWidget);
  });

  testWidgets('a search restarts from the first page', (tester) async {
    await pumpPicker(tester);

    await tester.enterText(find.byType(TextField), 'User 3');
    await tester.pump(const Duration(milliseconds: 300));
    await tester.pumpAndSettle();

    expect(repository.calls.last, (path: '/sample/recipients', query: 'User 3', offset: 0));
    expect(find.widgetWithText(ListTile, 'User 3'), findsOneWidget);
    expect(find.widgetWithText(ListTile, 'User 30'), findsOneWidget);
    expect(find.widgetWithText(ListTile, 'User 0'), findsNothing);
  });

  testWidgets('shows the empty label when nobody matches', (tester) async {
    repository = _FakeUserPickerRepository(0);
    getIt.unregister<UserPickerRepository>();
    getIt.registerSingleton<UserPickerRepository>(repository);

    await pumpPicker(tester);

    expect(find.text('Nobody'), findsOneWidget);
  });

  testWidgets('shows the selected users row only when selectedUsers is given', (tester) async {
    await pumpPicker(tester);
    expect(find.byType(SelectedUsersRow), findsNothing);

    await pumpPicker(
      tester,
      selectedUsers: const [UserPickerItemModel(id: 'u1', fullName: 'User 1', picture: '')],
    );
    expect(find.byType(SelectedUsersRow), findsOneWidget);
  });
}
