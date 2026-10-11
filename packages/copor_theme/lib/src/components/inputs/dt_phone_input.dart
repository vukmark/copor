import 'package:copor_theme/copor_theme.dart';
import 'package:copor_theme/src/components/buttons/dt_button.dart';
import 'package:copor_theme/src/components/inputs/dt_dropdown.dart';
import 'package:copor_theme/src/components/inputs/dt_input_field.dart';
import 'package:copor_theme/src/models/dt_option.dart';
import 'package:copor_theme/src/models/dt_phone_entry.dart';
import 'package:copor_theme/src/utils/dt_icons.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

final _kPhoneFormatter = FilteringTextInputFormatter.allow(
  RegExp(r'[0-9+\s-]'),
);

final _kPhoneTypeItems = [
  DTOption(value: DTPhoneType.mobile, label: 'Mobile'),
  DTOption(value: DTPhoneType.home, label: 'Home'),
  DTOption(value: DTPhoneType.work, label: 'Work'),
];

class DTPhoneInput extends StatelessWidget {
  final TextEditingController controller;
  final DTPhoneType type;
  final ValueChanged<DTPhoneType?> onTypeChanged;
  final void Function(String)? onChanged;
  final String? required;
  final VoidCallback? onRemove;

  const DTPhoneInput({
    super.key,
    required this.controller,
    required this.type,
    required this.onTypeChanged,
    this.onChanged,
    this.required,
    this.onRemove,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Expanded(
          flex: 3,
          child: DTInputField(
            controller: controller,
            label: 'Phone',
            required: required,
            keyboardType: TextInputType.phone,
            autofillHints: const [AutofillHints.telephoneNumber],
            inputFormatters: [_kPhoneFormatter],
            suffixIcon: const Icon(DTIcons.phone, size: 16),
            onChanged: onChanged,
            invalidMessage: 'Invalid phone number',
          ),
        ),
        const SizedBox(width: 10),
        Expanded(
          flex: 2,
          child: DTDropdown<DTPhoneType>.single(
            value: type,
            label: 'Type',
            items: _kPhoneTypeItems,
            onChanged: onTypeChanged,
          ),
        ),
        if (onRemove != null) ...[
          const SizedBox(width: 10),
          Padding(
            padding: const EdgeInsets.only(
              top: kInputLabelTopPadding,
              bottom: kInputBottomPadding,
            ),
            child: DTButton.surface(
              border: false,
              icon: DTIcons.close,
              label: '',
              semanticLabel: 'Remove',
              onPressed: onRemove!,
            ),
          ),
        ],
      ],
    );
  }
}
