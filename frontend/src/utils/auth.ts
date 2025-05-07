export const getUserDashboardPath = (role: string): string => {
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'centre_manager':
      return '/centre/dashboard';
    case 'formateur':
      return '/formateur/dashboard';
    case 'etudiant':
    case 'apprenant':
      return '/apprenant/dashboard';
    case 'demandeur':
      return '/demandeur/dashboard';
    case 'entreprise':
      return '/entreprise/dashboard';
    default:
      return '/';
  }
};

// Nouvelle fonction pour obtenir le chemin de redirection en fonction des rôles de l'utilisateur
export const getRedirectPath = (roles: string[]): string => {
  // Priorité des rôles pour la redirection
  const rolePriority = ['admin', 'centre_manager', 'formateur', 'etudiant', 'apprenant', 'demandeur', 'entreprise'];
  
  // Trouver le premier rôle de l'utilisateur qui correspond à la priorité
  const highestPriorityRole = rolePriority.find(role => roles.includes(role));
  
  return getUserDashboardPath(highestPriorityRole || '');
}; 