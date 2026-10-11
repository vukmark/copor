import {Validator} from './Validator';
import {GetPasswordPolicyRepo} from '@copor/core/domain/Core/Repository/GetPasswordPolicyRepo';
import {PasswordPolicyContextDTO} from './dto/PasswordPolicyContextDTO';
import {ValidateMinPasswordLength} from './ValidateMinPasswordLength';
import {ValidateMaxPasswordLength} from './ValidateMaxPasswordLength';
import {ValidateMinLowercaseLetters} from './ValidateMinLowercaseLetters';
import {ValidateMinUppercaseLetters} from './ValidateMinUppercaseLetters';
import {ValidateMinDigitsInPassword} from './ValidateMinDigitsInPassword';
import {ValidateMinSpecialCharactersInPassword} from './ValidateMinSpecialCharactersInPassword';
import {ValidateNoSpacesInPassword} from './ValidateNoSpacesInPassword';
import {ValidateUsernameNotInPassword} from './ValidateUsernameNotInPassword';
import {ValidateEmailOrNameNotInPassword} from './ValidateEmailOrNameNotInPassword';
import {ValidateNotCommonPassword} from './ValidateNotCommonPassword';
import {ValidateMaxRepeatedCharactersInPassword} from './ValidateMaxRepeatedCharactersInPassword';

export function getPasswordPolicyValidators(
	repo: GetPasswordPolicyRepo,
	context: PasswordPolicyContextDTO
): Validator[] {
	return [
		new ValidateMinPasswordLength(repo, context),
		new ValidateMaxPasswordLength(repo, context),
		new ValidateMinLowercaseLetters(repo, context),
		new ValidateMinUppercaseLetters(repo, context),
		new ValidateMinDigitsInPassword(repo, context),
		new ValidateMinSpecialCharactersInPassword(repo, context),
		new ValidateNoSpacesInPassword(repo, context),
		new ValidateUsernameNotInPassword(repo, context),
		new ValidateEmailOrNameNotInPassword(repo, context),
		new ValidateNotCommonPassword(repo, context),
		new ValidateMaxRepeatedCharactersInPassword(repo, context)
	];
}
