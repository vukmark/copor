import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/components/password_validation/bloc/password_validation_bloc.dart';
import 'package:copor_core/src/components/password_validation/bloc/password_validation_state.dart';
import 'package:copor_core/src/components/password_validation/data/model/password_policy_model.dart';
import 'package:copor_core/src/components/password_validation/presentation/password_requirement.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class PasswordRequirementsChecklist extends StatelessWidget {
  const PasswordRequirementsChecklist({super.key});

  @override
  Widget build(BuildContext context) {
    final translation = context.getState.commonTranslation.ensuredData;
    final errorColor = CoporTheme.of(context).colors.onErrorContainer;

    return BlocBuilder<PasswordValidationBloc, PasswordValidationState>(
      builder: (context, state) {
        if (state.failure != null) {
          return _message(state.failure!.message, errorColor);
        }

        final PasswordPolicyModel? policy = state.policy;
        if (policy == null) {
          return const SizedBox.shrink();
        }

        final violatedRequirements = buildActivePasswordRequirements(policy, translation)
            .where((requirement) => state.violations.contains(requirement.exceptionName))
            .toList();

        if (violatedRequirements.isEmpty) {
          return const SizedBox.shrink();
        }

        return SizedBox(
          width: double.infinity,
          child: Padding(
            padding: const EdgeInsets.only(bottom: 10),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: violatedRequirements.map((requirement) {
                return Padding(
                  padding: const EdgeInsets.symmetric(vertical: 2),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(Icons.cancel, size: 14, color: errorColor),
                      const SizedBox(width: 6),
                      Flexible(
                        child: Text(
                          requirement.label,
                          style: TextStyle(color: errorColor, fontSize: 12),
                        ),
                      ),
                    ],
                  ),
                );
              }).toList(),
            ),
          ),
        );
      },
    );
  }

  Widget _message(String text, Color color) {
    return SizedBox(
      width: double.infinity,
      child: Padding(
        padding: const EdgeInsets.only(bottom: 10),
        child: Text(text, style: TextStyle(color: color)),
      ),
    );
  }
}
