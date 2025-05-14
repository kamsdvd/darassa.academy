export const mockCourse = {
  id: '1',
  title: 'Introduction au Développement Web',
  description: 'Apprenez les bases du développement web avec HTML, CSS et JavaScript. Ce cours vous donnera les fondations nécessaires pour créer des sites web modernes et interactifs.',
  thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80',
  level: 'Débutant',
  category: 'Développement Web',
  duration: 12,
  price: 49.99,
  rating: 4.5,
  reviewCount: 128,
  lessonCount: 24,
  enrolledStudents: 1024,
  instructor: {
    name: 'Jean Dupont',
    title: 'Développeur Web Senior',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
  },
  learningObjectives: [
    'Comprendre les bases du HTML et créer votre première page web',
    'Maîtriser le CSS pour styliser vos pages',
    'Apprendre les fondamentaux de JavaScript',
    'Créer des sites web responsifs',
    'Déployer votre premier site web'
  ],
  prerequisites: [
    'Aucune expérience en programmation requise',
    'Un ordinateur avec un navigateur web moderne',
    'Une connexion internet stable'
  ],
  sections: [
    {
      id: '1',
      title: 'Introduction au HTML',
      lessons: [
        {
          id: '1-1',
          title: 'Structure de base d\'une page HTML',
          duration: 15,
          preview: true
        },
        {
          id: '1-2',
          title: 'Les balises HTML essentielles',
          duration: 20,
          preview: false
        }
      ]
    },
    {
      id: '2',
      title: 'Les bases du CSS',
      lessons: [
        {
          id: '2-1',
          title: 'Introduction au CSS',
          duration: 15,
          preview: true
        },
        {
          id: '2-2',
          title: 'Sélecteurs et propriétés',
          duration: 25,
          preview: false
        }
      ]
    }
  ],
  reviews: [
    {
      id: '1',
      user: {
        name: 'Marie Martin',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80'
      },
      rating: 5,
      comment: 'Excellent cours pour débutants ! Les explications sont claires et les exercices pratiques sont très utiles.',
      date: '2024-03-15'
    },
    {
      id: '2',
      user: {
        name: 'Pierre Dubois',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80'
      },
      rating: 4,
      comment: 'Très bon contenu, j\'ai appris beaucoup de choses. Le seul point négatif est que certains exercices pourraient être plus détaillés.',
      date: '2024-03-10'
    }
  ]
}; 