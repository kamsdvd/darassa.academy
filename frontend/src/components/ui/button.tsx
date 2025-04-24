/**
 * Ce fichier est un point de redirection pour le composant Button.
 * Il réexporte le composant Button depuis le dossier shared pour maintenir
 * la compatibilité avec les imports existants.
 */

import { Button as SharedButton, ButtonProps } from '../shared/Button';

export { ButtonProps };
export const Button = SharedButton;
export default SharedButton; 