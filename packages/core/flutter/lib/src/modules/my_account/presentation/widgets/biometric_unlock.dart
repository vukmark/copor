import 'package:copor_core/src/modules/my_account/bloc/biometric_unlock/biometric_unlock_cubit.dart';
import 'package:copor_core/src/modules/my_account/data/model/translation/my_account_translation.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class BiometricUnlock extends StatelessWidget {
  final MyAccountPageTranslation translation;

  const BiometricUnlock({super.key, required this.translation});

  @override
  Widget build(BuildContext context) {
    final dt = CoporTextStyles.of(context);

    return DTInputDecorator(
      label: translation.BIOMETRIC_UNLOCK,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 10),
          BlocBuilder<BiometricUnlockCubit, bool>(
            builder: (context, isEnabled) {
              return DTSwitchInput(
                label: translation.ENABLE_BIOMETRIC_UNLOCK,
                value: isEnabled,
                onChanged: context.read<BiometricUnlockCubit>().setEnabled,
                helpContent: Text(
                  translation.BIOMETRIC_UNLOCK_EXPLANATION,
                  style: dt.bodySecondary,
                ),
              );
            },
          ),
          const SizedBox(height: 10),
        ],
      ),
    );
  }
}
