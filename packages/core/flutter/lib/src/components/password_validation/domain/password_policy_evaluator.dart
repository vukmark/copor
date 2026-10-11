import 'package:copor_core/src/components/password_validation/data/model/password_policy_model.dart';
import 'package:copor_core/src/components/password_validation/data/model/password_validation_model.dart';

class PasswordPolicyEvaluator {
  const PasswordPolicyEvaluator();

  Set<String> evaluate(PasswordPolicyModel policy, PasswordValidationModel input) {
    final password = input.password ?? '';
    if (password.isEmpty) return const {};

    final violations = <String>{};

    if (password.length < policy.minPasswordLength) {
      violations.add('PasswordTooShortException');
    }
    if (policy.maxPasswordLength > 0 && password.length > policy.maxPasswordLength) {
      violations.add('PasswordTooLongException');
    }
    if (_count(password, RegExp(r'[a-z]')) < policy.minLowercaseLetters) {
      violations.add('PasswordMissingLowercaseException');
    }
    if (_count(password, RegExp(r'[A-Z]')) < policy.minUppercaseLetters) {
      violations.add('PasswordMissingUppercaseException');
    }
    if (_count(password, RegExp(r'[0-9]')) < policy.minDigits) {
      violations.add('PasswordMissingDigitException');
    }
    if (_count(password, RegExp(r'[^a-zA-Z0-9\s]')) < policy.minSpecialCharacters) {
      violations.add('PasswordMissingSpecialCharacterException');
    }
    if (!policy.allowSpaces && RegExp(r'\s').hasMatch(password)) {
      violations.add('PasswordContainsSpaceException');
    }
    if (_containsUsername(policy, input, password)) {
      violations.add('PasswordContainsUsernameException');
    }
    if (_containsEmailOrName(policy, input, password)) {
      violations.add('PasswordContainsEmailOrNameException');
    }
    if (_isCommon(policy, password)) {
      violations.add('PasswordIsCommonException');
    }
    if (_hasTooManyRepeats(policy, password)) {
      violations.add('PasswordTooManyRepeatedCharactersException');
    }

    return violations;
  }

  int _count(String value, RegExp pattern) => pattern.allMatches(value).length;

  bool _containsUsername(
    PasswordPolicyModel policy,
    PasswordValidationModel input,
    String password,
  ) {
    final userName = input.userName;
    if (!policy.disallowUsernameInPassword) return false;
    if (userName == null || userName.length < 3) return false;
    return password.toLowerCase().contains(userName.toLowerCase());
  }

  bool _containsEmailOrName(
    PasswordPolicyModel policy,
    PasswordValidationModel input,
    String password,
  ) {
    if (!policy.disallowEmailOrNameInPassword) return false;

    final candidates = [
      input.email?.split('@').first,
      input.firstName,
      input.lastName,
    ].whereType<String>().where((candidate) => candidate.length >= 3);

    final passwordLower = password.toLowerCase();
    return candidates.any((candidate) => passwordLower.contains(candidate.toLowerCase()));
  }

  bool _isCommon(PasswordPolicyModel policy, String password) {
    if (!policy.blockCommonPasswords) return false;
    final passwordLower = password.toLowerCase();
    return policy.commonPasswords.any((common) => common.toLowerCase() == passwordLower);
  }

  bool _hasTooManyRepeats(PasswordPolicyModel policy, String password) {
    final limit = policy.maxRepeatedCharacters;
    if (limit <= 0) return false;

    var run = 1;
    for (var i = 1; i < password.length; i++) {
      run = password[i] == password[i - 1] ? run + 1 : 1;
      if (run > limit) return true;
    }
    return false;
  }
}
