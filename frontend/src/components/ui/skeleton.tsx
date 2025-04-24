/**
 * Ce fichier est un point de redirection pour le composant Skeleton.
 * Il réexporte le composant Skeleton depuis le dossier shared pour maintenir
 * la compatibilité avec les imports existants.
 */

import { Skeleton as SharedSkeleton, SkeletonProps } from '../shared/Skeleton';

export { SkeletonProps };
export const Skeleton = SharedSkeleton;
export default SharedSkeleton; 