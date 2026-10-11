import 'package:copor_core/src/components/buttons/copor_button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  Widget wrap(Widget child) => MaterialApp(home: Scaffold(body: child));

  testWidgets('keeps the spinner visible for the minimum duration even if isLoading clears early', (
    tester,
  ) async {
    var isLoading = false;
    late StateSetter setState;

    await tester.pumpWidget(
      wrap(
        StatefulBuilder(
          builder: (context, setter) {
            setState = setter;
            return CoporButton(label: 'Save', isLoading: isLoading, onPressed: () {});
          },
        ),
      ),
    );

    setState(() => isLoading = true);
    await tester.pump();

    expect(find.byType(CircularProgressIndicator), findsOneWidget);

    // The underlying isLoading flips back to false almost immediately,
    // well before the 500ms floor.
    await tester.pump(const Duration(milliseconds: 50));
    setState(() => isLoading = false);
    await tester.pump();

    expect(
      find.byType(CircularProgressIndicator),
      findsOneWidget,
      reason: 'spinner should still be held',
    );

    await tester.pump(const Duration(milliseconds: 460));
    expect(find.byType(CircularProgressIndicator), findsNothing);
  });

  testWidgets('hides the spinner immediately once isLoading clears after the minimum duration', (
    tester,
  ) async {
    var isLoading = true;

    await tester.pumpWidget(
      wrap(
        StatefulBuilder(
          builder: (context, setState) {
            return CoporButton(label: 'Save', isLoading: isLoading, onPressed: () {});
          },
        ),
      ),
    );
    await tester.pump();

    expect(find.byType(CircularProgressIndicator), findsOneWidget);

    await tester.pump(const Duration(milliseconds: 600));

    await tester.pumpWidget(
      wrap(const CoporButton(label: 'Save', isLoading: false, onPressed: null)),
    );
    await tester.pump();

    expect(find.byType(CircularProgressIndicator), findsNothing);
  });
}
