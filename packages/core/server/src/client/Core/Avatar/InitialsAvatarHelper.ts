// Mirrors CoporAvatar's initials + CoporColors' primary/secondary/tertiary/success/error
// color rotation (packages/copor_theme), and the same simple portable hash used by
// InitialsAvatarGenerator on the client — kept intentionally simple (character-code
// sum, no multiplication/overflow concerns) so it's trivial to keep byte-for-byte
// identical between Dart and TypeScript.
const COLORS = ['#C2410C', '#475569', '#F2713C', '#A7C82F', '#DF0100'];

export function getInitialsFor(fullName: string): string {
	const parts = fullName.split(' ').filter((part) => part.length > 0);

	if (parts.length > 1)
		return (parts[0][0] + parts[1][0]).toUpperCase();
	if (parts.length === 1)
		return parts[0][0].toUpperCase();

	return '?';
}

export function getColorForInitials(initials: string): string {
	let sum = 0;

	for (let i = 0; i < initials.length; i++)
		sum += initials.charCodeAt(i);

	return COLORS[sum % COLORS.length];
}
