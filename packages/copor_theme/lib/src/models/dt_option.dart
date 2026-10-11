import 'package:flutter/widgets.dart';

class DTOption<T> {
  final T value;
  final String label;
  final Widget? leading;
  const DTOption({required this.value, required this.label, this.leading});
}
