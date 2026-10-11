import 'package:copor_theme/src/components/buttons/dt_button.dart';
import 'package:copor_theme/src/components/inputs/dt_phone_input.dart';
import 'package:copor_theme/src/models/dt_phone_entry.dart';
import 'package:copor_theme/src/utils/dt_icons.dart';
import 'package:flutter/material.dart';

class _PhoneEntryState {
  final String? id;
  final TextEditingController controller;
  DTPhoneType type;

  _PhoneEntryState({this.id, required this.controller, required this.type});
}

class DTDynamicPhoneList extends StatefulWidget {
  final List<DTPhoneEntry> initialItems;
  final ValueChanged<List<DTPhoneEntry>> onChanged;

  const DTDynamicPhoneList({
    super.key,
    required this.initialItems,
    required this.onChanged,
  });

  @override
  State<DTDynamicPhoneList> createState() => _DTDynamicPhoneListState();
}

class _DTDynamicPhoneListState extends State<DTDynamicPhoneList> {
  late List<_PhoneEntryState> _entries;

  @override
  void initState() {
    super.initState();
    _entries = widget.initialItems.map((e) => _PhoneEntryState(
      id: e.id,
      controller: TextEditingController(text: e.phoneNumber),
      type: e.type,
    )).toList();

    if (_entries.isEmpty) _addEntry();
  }

  @override
  void dispose() {
    for (final entry in _entries) {
      entry.controller.dispose();
    }
    super.dispose();
  }

  void _notify() {
    widget.onChanged(_entries.map((e) => DTPhoneEntry(
      id: e.id,
      phoneNumber: e.controller.text,
      type: e.type,
    )).toList());
  }

  void _addEntry() {
    setState(() => _entries.add(_PhoneEntryState(
      id: '',
      controller: TextEditingController(),
      type: DTPhoneType.mobile,
    )));
    _notify();
  }

  void _removeEntry(int index) {
    setState(() => _entries.removeAt(index).controller.dispose());
    _notify();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        ..._entries.asMap().entries.map((e) => Padding(
          padding: const EdgeInsets.only(bottom: 12),
          child: DTPhoneInput(
            key: ValueKey(e.key),
            controller: e.value.controller,
            type: e.value.type,
            onTypeChanged: (value) {
              if (value != null) setState(() => e.value.type = value);
              _notify();
            },
            onChanged: (_) => _notify(),
            onRemove: _entries.length > 1 ? () => _removeEntry(e.key) : null,
          ),
        )),
        DTButton.surface(
          icon: DTIcons.add,
          label: 'Add phone',
          semanticLabel: 'Add phone',
          onPressed: _addEntry,
        ),
        const SizedBox(height: 30),
      ],
    );
  }
}
