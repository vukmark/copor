import type {
	KnowledgeBaseFeatureConfig,
	KnowledgeBaseUserRole
} from './KnowledgeBaseFeatureRegistry';
import {
	knowledgeBaseFeatureRegistry
} from './KnowledgeBaseFeatureRegistry';

const normalizeFeatureKey = (feature: string): string => feature.trim().toLowerCase();

const isFeatureAllowedForRole = (
	feature: KnowledgeBaseFeatureConfig,
	role?: KnowledgeBaseUserRole
): boolean => !role || !feature.allowedRoles || feature.allowedRoles.includes(role);

const isFeatureIncludedByDefaultForRole = (
	feature: KnowledgeBaseFeatureConfig,
	role?: KnowledgeBaseUserRole
): boolean => !!role && !!feature.includedByDefaultForRoles?.includes(role);

const getAvailableKnowledgeBaseFeatures = (
	featureList?: string[],
	role?: KnowledgeBaseUserRole
): KnowledgeBaseFeatureConfig[] => {
	const availableFeatureKeys = new Set((featureList ?? []).map(normalizeFeatureKey));

	return knowledgeBaseFeatureRegistry.filter((feature) => {
		if (!isFeatureAllowedForRole(feature, role)) {
			return false;
		}

		return availableFeatureKeys.has(feature.path) || isFeatureIncludedByDefaultForRole(feature, role);
	});
};

export const getKnowledgeBaseDocumentationForFeatures = (
	featureList?: string[],
	role?: KnowledgeBaseUserRole
): string => {
	const documentation = new Set<string>();

	getAvailableKnowledgeBaseFeatures(featureList, role).forEach((feature) => {
		documentation.add(feature.documentation);
	});

	return Array.from(documentation).join('\n');
};

export const getKnowledgeBaseFeatureNamesForFeatures = (
	featureList?: string[],
	role?: KnowledgeBaseUserRole
): string => {
	const featureNames = new Set<string>();

	getAvailableKnowledgeBaseFeatures(featureList, role).forEach((feature) => {
		featureNames.add(feature.name);
	});

	return Array.from(featureNames).join('\n');
};

export const getUnavailableKnowledgeBaseFeatureNamesForFeatures = (
	featureList?: string[],
	role?: KnowledgeBaseUserRole
): string => {
	const availableFeatures = new Set(getAvailableKnowledgeBaseFeatures(featureList, role).map((feature) => feature.path));
	const unavailableFeatureNames = new Set<string>();

	knowledgeBaseFeatureRegistry.forEach((feature) => {
		if (!availableFeatures.has(feature.path)) {
			unavailableFeatureNames.add(feature.recognitionNames.join(', '));
		}
	});

	return Array.from(unavailableFeatureNames).join('\n');
};
