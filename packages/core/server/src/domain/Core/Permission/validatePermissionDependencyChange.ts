import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {getPermissionDefinitions} from '@copor/core/domain/Core/Permission/PermissionRegistry';
import {getTransitiveDependencies, getTransitiveDependents} from '@copor/core/domain/Core/Permission/PermissionDependencyGraph';

export interface MissingDependencyIssue {
	type: 'missing_dependency';
	permission: PermissionType;
	missing: PermissionType[];
}

export interface OrphanedDependentIssue {
	type: 'orphaned_dependent';
	permission: PermissionType;
	stillEnabledDependents: PermissionType[];
}

export type PermissionDependencyIssue = MissingDependencyIssue | OrphanedDependentIssue;

export interface PermissionDependencyValidationResult {
	valid: boolean;
	issues: PermissionDependencyIssue[];
	suggestedResolution: PermissionType[];
}

export function validatePermissionDependencyChange(
	currentEnabled: Set<PermissionType>,
	desiredEnabled: Set<PermissionType>
): PermissionDependencyValidationResult {
	const issues = findIssues(currentEnabled, desiredEnabled);

	return {
		valid: issues.length === 0,
		issues,
		suggestedResolution: resolve(currentEnabled, desiredEnabled)
	};
}

function findIssues(currentEnabled: Set<PermissionType>, desiredEnabled: Set<PermissionType>): PermissionDependencyIssue[] {
	const issues: PermissionDependencyIssue[] = [];

	for (const permission of desiredEnabled) {
		const missing = getTransitiveDependencies(permission).filter((dependency) => !desiredEnabled.has(dependency));

		if (missing.length > 0)
			issues.push({type: 'missing_dependency', permission, missing});
	}

	for (const permission of currentEnabled) {
		if (desiredEnabled.has(permission))
			continue;

		const stillEnabledDependents = getTransitiveDependents(permission).filter((dependent) => desiredEnabled.has(dependent));

		if (stillEnabledDependents.length > 0)
			issues.push({type: 'orphaned_dependent', permission, stillEnabledDependents});
	}

	return issues;
}

// Adding a missing dependency or cascading an orphan-disable can itself introduce a new
// issue (e.g. the added dependency has its own missing dependency), so this resolves to a
// fixed point instead of a single pass. Bounded by the number of permission definitions as a safety
// net against a malformed graph; a valid (acyclic) graph converges in a couple of iterations.
function resolve(currentEnabled: Set<PermissionType>, desiredEnabled: Set<PermissionType>): PermissionType[] {
	let resolved = new Set(desiredEnabled);

	for (let iteration = 0; iteration < getPermissionDefinitions().length + 1; iteration++) {
		const issues = findIssues(currentEnabled, resolved);

		if (issues.length === 0)
			break;

		const next = new Set(resolved);

		for (const issue of issues) {
			if (issue.type === 'missing_dependency')
				issue.missing.forEach((dependency) => next.add(dependency));
			else
				issue.stillEnabledDependents.forEach((dependent) => next.delete(dependent));
		}

		resolved = next;
	}

	return [... resolved];
}
