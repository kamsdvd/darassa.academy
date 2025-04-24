/**
 * Ce fichier est un point de redirection pour le composant Input.
 * Il réexporte le composant Input depuis le dossier shared pour maintenir
 * la compatibilité avec les imports existants.
 */

import { Input as SharedInput, InputProps } from '../shared/Input';

export { InputProps };
export const Input = SharedInput;
export default SharedInput; 