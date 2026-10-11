// A feature is the frontend route it unlocks (e.g. `/vu-meet`). Core's are in
// CoreFeature, each module's in its own `<Feature>Feature` enum; FeatureRegistry
// holds the definitions of the modules the app includes.
export type Feature = `/${string}`;
