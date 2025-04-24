/**
 * Ce fichier est un point de redirection pour le composant Alert.
 * Il réexporte le composant Alert depuis le dossier shared pour maintenir
 * la compatibilité avec les imports existants.
 */

import { Alert as SharedAlert, AlertProps } from '../shared/Alert';

export { AlertProps };
export const Alert = SharedAlert;
export default SharedAlert; 