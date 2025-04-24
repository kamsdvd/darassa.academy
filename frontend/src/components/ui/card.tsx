/**
 * Ce fichier est un point de redirection pour le composant Card.
 * Il réexporte le composant Card depuis le dossier shared pour maintenir
 * la compatibilité avec les imports existants.
 */

import { Card as SharedCard, CardProps } from '../shared/Card';

export { CardProps };
export const Card = SharedCard;
export default SharedCard; 