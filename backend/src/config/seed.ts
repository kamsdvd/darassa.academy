import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const hashPassword = async (password: string): Promise<string> => {
  console.log(' Hachage du mot de passe:', password);
  const salt = await bcrypt.genSalt(10);
  console.log(' Salt généré:', salt);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log('✅ Mot de passe haché:', hashedPassword);
  return hashedPassword;
};

const seedDatabase = async () => {
  try {
    console.log('🗑️ Nettoyage de la base de données...');
    await prisma.$transaction([
      prisma.entreprise.deleteMany({}),
      prisma.demandeurEmploi.deleteMany({}),
      prisma.etudiant.deleteMany({}),
      prisma.formateur.deleteMany({}),
      prisma.centreManager.deleteMany({}),
      prisma.formation.deleteMany({}),
      prisma.centreFormation.deleteMany({}),
      prisma.user.deleteMany({})
    ]);
    console.log('✅ Base de données nettoyée');

    console.log('👤 Création de l\'administrateur...');
    const admin = await prisma.user.create({
      data: {
        email: 'admin@darassa.academy',
        password: await hashPassword('admin123'),
        firstName: 'Admin',
        lastName: 'System',
        userType: 'admin',
        permissions: ['all'],
        accessLevel: 1
      }
    });
    console.log('✅ Administrateur créé:', admin.id);

    console.log('🏫 Création du centre de formation...');
    const centre1 = await prisma.centreFormation.create({
      nom: 'Centre de Formation Digital Dakar',
      code: 'CFDD001',
      adresse: {
        rue: '123 Avenue de la République',
        ville: 'Dakar',
        codePostal: '10000',
        pays: 'Sénégal'
      },
      contact: {
        email: 'contact@cfdd.sn',
        telephone: '+221 123456789',
        siteWeb: 'www.cfdd.sn'
      },
      directeur: admin._id,
      dateCreation: new Date('2020-01-01'),
      agrements: [{
        numero: 'AGR001',
        date: new Date('2020-01-01'),
        validite: new Date('2025-01-01'),
        type: 'Formation Professionnelle'
      }],
      capaciteAccueil: 200,
      equipements: [{
        nom: 'Ordinateurs Portables',
        quantite: 50,
        description: 'Laptops Dell XPS 13'
      }],
      salles: [{
        nom: 'Salle 101',
        capacite: 30,
        equipements: ['Projecteur', 'Tableaux blancs'],
        description: 'Salle principale'
      }]
    });
    console.log('✅ Centre de formation créé:', centre1._id);

    console.log('👨‍💼 Création du gestionnaire de centre...');
    const manager = await prisma.centreManager.create({
      data: {
        email: 'manager@cfdd.sn',
        password: await hashPassword('manager123'),
        firstName: 'Mamadou',
        lastName: 'Diallo',
        userType: 'centre_manager',
        centres: { connect: [{ id: centre1.id }] },
        permissions: {
          canManageFormateurs: true,
          canManageFormations: true,
          canValidateCertifications: true,
          canViewReports: true
        }
      }
    });
    console.log('✅ Gestionnaire créé:', manager.id);

    console.log('👨‍🏫 Création du formateur...');
    const formateur1 = await prisma.formateur.create({
      data: {
        email: 'formateur1@cfdd.sn',
        password: await hashPassword('formateur123'),
        firstName: 'Fatou',
        lastName: 'Sow',
        userType: 'formateur',
        centreId: centre1.id,
        specialites: ['Développement Web', 'Design UI/UX'],
        evaluations: 4.5,
        disponibilite: true
      }
    });
    console.log('✅ Formateur créé:', formateur1.id);

    console.log('📚 Création de la formation...');
    const formation1 = await prisma.formation.create({
      titre: 'Développement Web Full Stack',
      description: 'Formation complète en développement web front-end et back-end',
      code: 'WEB001',
      duree: 6,
      niveau: 'intermediaire',
      prix: 1500000,
      prerequis: ['Bases de HTML/CSS', 'JavaScript'],
      objectifs: [
        'Maîtriser le développement front-end',
        'Comprendre le développement back-end',
        'Créer des applications web complètes'
      ],
      competences: [
        'React.js',
        'Node.js',
        'MongoDB',
        'Express.js'
      ],
      modules: [{
        titre: 'Introduction au Développement Web',
        description: 'Les bases du développement web moderne',
        duree: 2,
        contenu: [
          'HTML5 et CSS3 avancé',
          'JavaScript ES6+',
          'Git et GitHub'
        ],
        evaluation: [{
          type: 'Projet',
          description: 'Création d\'un site web responsive',
          coefficient: 0.4
        }]
      }],
      formateurs: { connect: [{ id: formateur1.id }] },
      centreFormationId: centre1.id,
      dateDebut: new Date('2024-05-01'),
      dateFin: new Date('2024-10-31'),
      placesDisponibles: 20
    });
    console.log('✅ Formation créée:', formation1._id);

    console.log('👨‍🎓 Création de l\'étudiant...');
    const etudiant1 = await prisma.etudiant.create({
      data: {
        email: 'etudiant1@example.com',
        password: await hashPassword('etudiant123'),
        firstName: 'Amadou',
        lastName: 'Diop',
        userType: 'etudiant',
        centreId: centre1.id,
        competencesAcquises: [],
        formationsInscrites: {
          create: [{
            formationId: formation1.id,
            centreId: centre1.id,
            dateInscription: new Date(),
            progression: 0,
            certificatObtenu: false
          }]
        }
      }
    });
    console.log('✅ Étudiant créé:', etudiant1.id);

    console.log('🔍 Création du demandeur d\'emploi...');
    const demandeur1 = await prisma.demandeurEmploi.create({
      email: 'demandeur1@example.com',
      password: 'demandeur123',
      firstName: 'Aïda',
      lastName: 'Mbaye',
      userType: 'demandeur',
      competences: ['HTML', 'CSS', 'JavaScript'],
      experience: [{
        entreprise: 'Tech Solutions',
        poste: 'Développeur Front-end Junior',
        periode: '2022-2023',
        description: 'Développement d\'interfaces utilisateur'
      }],
      education: [{
        institution: 'Université de Dakar',
        diplome: 'Licence en Informatique',
        annee: '2022'
      }],
      cv: 'https://example.com/cv.pdf',
      disponibilite: 'immediate',
      rechercheEmploi: true,
      formationsInscrites: { connect: [{ id: formation1.id }] }
    });
    await demandeur1.save();
    console.log('✅ Demandeur d\'emploi créé:', demandeur1._id);

    console.log('🏢 Création de l\'entreprise...');
    const entreprise1 = await prisma.entreprise.create({
      email: 'contact@techsolutions.sn',
      password: 'entreprise123',
      firstName: 'Tech',
      lastName: 'Solutions',
      userType: 'entreprise',
      nomEntreprise: 'Tech Solutions Sénégal',
      secteur: 'Technologies de l\'Information',
      taille: 'pme',
      adresse: '456 Avenue Cheikh Anta Diop, Dakar',
    });
    console.log('✅ Entreprise créée');

    console.log('✅ Données de test créées avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de la création des données de test:', error);
    throw error;
  }
}
};

export default seedDatabase;