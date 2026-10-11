import 'package:copor_theme/src/components/buttons/dt_button.dart';
import 'package:copor_theme/src/components/inputs/dt_switch_input.dart';
import 'package:copor_theme/src/utils/dt_icons.dart';
import 'package:flutter/material.dart';

class DTContractSwitch extends StatelessWidget {
  final bool value;
  final ValueChanged<bool> onChanged;
  final String label;
  final String? errorText;
  final VoidCallback onDownload;
  final String? downloadTooltip;

  const DTContractSwitch({
    super.key,
    required this.value,
    required this.onChanged,
    required this.label,
    required this.onDownload,
    this.errorText,
    this.downloadTooltip,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          child: DTSwitchInput(
            value: value,
            onChanged: onChanged,
            label: label,
            errorText: errorText,
          ),
        ),
        DTButton.surface(
          border: false,
          icon: DTIcons.fileDownload,
          label: '',
          semanticLabel: downloadTooltip ?? '',
          onPressed: onDownload,
        ),
      ],
    );
  }
}
