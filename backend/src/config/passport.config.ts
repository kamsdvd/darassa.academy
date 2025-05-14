import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import { User } from '../models/user.model';
import { config } from './config';

// Configuration de la stratégie Google
passport.use(new GoogleStrategy({
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: '/api/auth/google/callback',
    scope: ['profile', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Vérifier si l'utilisateur existe déjà
      let user = await User.findOne({ email: profile.emails?.[0].value });

      if (!user) {
        // Créer un nouvel utilisateur
        user = await User.create({
          email: profile.emails?.[0].value,
          password: Math.random().toString(36).slice(-8), // Mot de passe aléatoire
          firstName: profile.name?.givenName || '',
          lastName: profile.name?.familyName || '',
          userType: 'etudiant', // Type par défaut
          isEmailVerified: true, // Email déjà vérifié par Google
          profilePicture: profile.photos?.[0].value
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error as Error);
    }
  }
));

// Configuration de la stratégie Facebook
passport.use(new FacebookStrategy({
    clientID: config.facebook.appId,
    clientSecret: config.facebook.appSecret,
    callbackURL: '/api/auth/facebook/callback',
    profileFields: ['id', 'emails', 'name', 'picture.type(large)']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Vérifier si l'utilisateur existe déjà
      let user = await User.findOne({ email: profile.emails?.[0].value });

      if (!user) {
        // Créer un nouvel utilisateur
        user = await User.create({
          email: profile.emails?.[0].value,
          password: Math.random().toString(36).slice(-8), // Mot de passe aléatoire
          firstName: profile.name?.givenName || '',
          lastName: profile.name?.familyName || '',
          userType: 'etudiant', // Type par défaut
          isEmailVerified: true, // Email déjà vérifié par Facebook
          profilePicture: profile.photos?.[0].value
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error as Error);
    }
  }
));

// Configuration de la stratégie LinkedIn
passport.use(new LinkedInStrategy({
    clientID: config.linkedin.clientId,
    clientSecret: config.linkedin.clientSecret,
    callbackURL: '/api/auth/linkedin/callback',
    scope: ['r_emailaddress', 'r_liteprofile'],
    state: true
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Vérifier si l'utilisateur existe déjà
      let user = await User.findOne({ email: profile.emails?.[0].value });

      if (!user) {
        // Créer un nouvel utilisateur
        user = await User.create({
          email: profile.emails?.[0].value,
          password: Math.random().toString(36).slice(-8), // Mot de passe aléatoire
          firstName: profile.name?.givenName || '',
          lastName: profile.name?.familyName || '',
          userType: 'etudiant', // Type par défaut
          isEmailVerified: true, // Email déjà vérifié par LinkedIn
          profilePicture: profile.photos?.[0].value
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error as Error);
    }
  }
));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport; 