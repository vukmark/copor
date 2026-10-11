import 'package:copor_todo/src/config/to_do_module.dart';
import 'package:copor_todo/src/presentation/search/to_do_search_section.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  test('ToDo adds its results to Search', () {
    expect(const ToDoModule().searchSections.whereType<ToDoSearchSection>(), hasLength(1));
  });
}
