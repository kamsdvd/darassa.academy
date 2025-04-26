import mongoose from 'mongoose';
import { User, Admin, CentreManager, Formateur, Etudiant, DemandeurEmploi, Entreprise } from '../models/user.model';
import { CentreFormation } from '../models/centreFormation.model';
import { Formation } from '../models/formation.model';
import bcrypt from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => {
  console.log('🔐 Hachage du mot de passe:', password);
  const salt = await bcrypt.genSalt(10);
  console.log('🧂 Salt généré:', salt);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log('✅ Mot de passe haché:', hashedPassword);
  return hashedPassword;
};

const seedDatabase = async () => {
  try {
    console.log('🗑️ Nettoyage de la base de données...');
    await mongoose.connection.dropDatabase();
    console.log('✅ Base de données nettoyée');

    console.log('👤 Création de l\'administrateur...');
    const admin = new Admin({
      email: 'admin@darassa.academy',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'System',
      userType: 'admin',
      permissions: ['all'],
      accessLevel: 1
    });
    await admin.save();
    console.log('✅ Administrateur créé:', admin._id);

    console.log('🏫 Création du centre de formation...');
    const centre1 = await CentreFormation.create({
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
    const manager = new CentreManager({
      email: 'manager@cfdd.sn',
      password: 'manager123',
      firstName: 'Mamadou',
      lastName: 'Diallo',
      userType: 'centre_manager',
      centres: [centre1._id],
      permissions: {
        canManageFormateurs: true,
        canManageFormations: true,
        canValidateCertifications: true,
        canViewReports: true
      }
    });
    await manager.save();
    console.log('✅ Gestionnaire créé:', manager._id);

    console.log('👨‍🏫 Création du formateur...');
    const formateur1 = new Formateur({
      email: 'formateur1@cfdd.sn',
      password: 'formateur123',
      firstName: 'Fatou',
      lastName: 'Sow',
      userType: 'formateur',
      centreId: centre1._id,
      specialites: ['Développement Web', 'Design UI/UX'],
      formations: [],
      evaluations: 4.5,
      disponibilite: true
    });
    await formateur1.save();
    console.log('✅ Formateur créé:', formateur1._id);

    console.log('📚 Création de la formation...');
    const formation1 = await Formation.create({
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
      formateurs: [formateur1._id],
      centreFormation: centre1._id,
      dateDebut: new Date('2024-05-01'),
      dateFin: new Date('2024-10-31'),
      placesDisponibles: 20
    });
    console.log('✅ Formation créée:', formation1._id);

    console.log('👨‍🎓 Création de l\'étudiant...');
    const etudiant1 = new Etudiant({
      email: 'etudiant1@example.com',
      password: 'etudiant123',
      firstName: 'Amadou',
      lastName: 'Diop',
      userType: 'etudiant',
      centreId: centre1._id,
      formationsInscrites: [{
        formationId: formation1._id,
        centreId: centre1._id,
        dateInscription: new Date(),
        progression: 0,
        certificatObtenu: false
      }],
      competencesAcquises: []
    });
    await etudiant1.save();
    console.log('✅ Étudiant créé:', etudiant1._id);

    console.log('🔍 Création du demandeur d\'emploi...');
    const demandeur1 = new DemandeurEmploi({
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
      formationsInscrites: [formation1._id]
    });
    await demandeur1.save();
    console.log('✅ Demandeur d\'emploi créé:', demandeur1._id);

    console.log('🏢 Création de l\'entreprise...');
    const entreprise1 = new Entreprise({
      email: 'contact@techsolutions.sn',
      password: 'entreprise123',
      firstName: 'Tech',
      lastName: 'Solutions',
      userType: 'entreprise',
      nomEntreprise: 'Tech Solutions Sénégal',
      secteur: 'Technologies de l\'Information',
      taille: 'pme',
      adresse: '456 Avenue Cheikh Anta Diop, Dakar',
      siteWeb: 'www.techsolutions.sn',
      description: 'Entreprise spécialisée dans le développement de solutions numériques',
      offresEmploi: [],
      formationsProposees: []
    });
    await entreprise1.save();
    console.log('✅ Entreprise créée:', entreprise1._id);

    console.log('✅ Données de test créées avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de la création des données de test:', error);
    throw error;
  }
};

export default seedDatabase; 