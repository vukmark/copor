import 'package:copor_core/src/components/password_validation/data/model/password_policy_model.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';

class PasswordRequirement {
  final String exceptionName;
  final String label;

  const PasswordRequirement({required this.exceptionName, required this.label});
}

List<PasswordRequirement> buildActivePasswordRequirements(
  PasswordPolicyModel policy,
  CommonTranslation t,
) {
  String withCount(String template, int count) => template.replaceAll('{count}', '$count');

  final requirements = <PasswordRequirement>[
    PasswordRequirement(
      exceptionName: 'PasswordTooShortException',
      label: withCount(t.PASSWORD_REQUIREMENT_MIN_LENGTH, policy.minPasswordLength),
    ),
  ];

  if (policy.maxPasswordLength > 0) {
    requirements.add(
      PasswordRequirement(
        exceptionName: 'PasswordTooLongException',
        label: withCount(t.PASSWORD_REQUIREMENT_MAX_LENGTH, policy.maxPasswordLength),
      ),
    );
  }
  if (policy.minLowercaseLetters > 0) {
    requirements.add(
      PasswordRequirement(
        exceptionName: 'PasswordMissingLowercaseException',
        label: withCount(t.PASSWORD_REQUIREMENT_MIN_LOWERCASE, policy.minLowercaseLetters),
      ),
    );
  }
  if (policy.minUppercaseLetters > 0) {
    requirements.add(
      PasswordRequirement(
        exceptionName: 'PasswordMissingUppercaseException',
        label: withCount(t.PASSWORD_REQUIREMENT_MIN_UPPERCASE, policy.minUppercaseLetters),
      ),
    );
  }
  if (policy.minDigits > 0) {
    requirements.add(
      PasswordRequirement(
        exceptionName: 'PasswordMissingDigitException',
        label: withCount(t.PASSWORD_REQUIREMENT_MIN_DIGITS, policy.minDigits),
      ),
    );
  }
  if (policy.minSpecialCharacters > 0) {
    requirements.add(
      PasswordRequirement(
        exceptionName: 'PasswordMissingSpecialCharacterException',
        label: withCount(t.PASSWORD_REQUIREMENT_MIN_SPECIAL, policy.minSpecialCharacters),
      ),
    );
  }
  if (!policy.allowSpaces) {
    requirements.add(
      PasswordRequirement(
        exceptionName: 'PasswordContainsSpaceException',
        label: t.PASSWORD_REQUIREMENT_NO_SPACES,
      ),
    );
  }
  if (policy.disallowUsernameInPassword) {
    requirements.add(
      PasswordRequirement(
        exceptionName: 'PasswordContainsUsernameException',
        label: t.PASSWORD_REQUIREMENT_NO_USERNAME,
      ),
    );
  }
  if (policy.disallowEmailOrNameInPassword) {
    requirements.add(
      PasswordRequirement(
        exceptionName: 'PasswordContainsEmailOrNameException',
        label: t.PASSWORD_REQUIREMENT_NO_EMAIL_OR_NAME,
      ),
    );
  }
  if (policy.blockCommonPasswords) {
    requirements.add(
      PasswordRequirement(
        exceptionName: 'PasswordIsCommonException',
        label: t.PASSWORD_REQUIREMENT_NOT_COMMON,
      ),
    );
  }
  if (policy.maxRepeatedCharacters > 0) {
    requirements.add(
      PasswordRequirement(
        exceptionName: 'PasswordTooManyRepeatedCharactersException',
        label: withCount(t.PASSWORD_REQUIREMENT_MAX_REPEATED, policy.maxRepeatedCharacters),
      ),
    );
  }

  return requirements;
}
