import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import { config } from './config';
import { User, IUser } from '../models/user.model';
import { Profile } from 'passport';

interface OAuthProfile extends Profile {
  emails?: { value: string }[];
  name?: {
    givenName: string;
    familyName: string;
  };
}

// Configuration de la stratégie Google
passport.use(new GoogleStrategy(
  {
    clientID: config.oauth.google.clientId || '',
    clientSecret: config.oauth.google.clientSecret || '',
    callbackURL: config.oauth.google.callbackURL || ''
  },
  async (accessToken: string, refreshToken: string, profile: OAuthProfile, done: (error: any, user?: IUser | false) => void) => {
    try {
      const email = profile.emails?.[0]?.value;
      if (!email) {
        return done(new Error('No email found in profile'), false);
      }

      const user = await User.findOne({ email });
      if (user) {
        return done(null, user);
      }

      const newUser = await User.create({
        email,
        firstName: profile.name?.givenName || '',
        lastName: profile.name?.familyName || '',
        googleId: profile.id,
        userType: 'etudiant',
        isEmailVerified: true
      });

      return done(null, newUser);
    } catch (error) {
      return done(error, false);
    }
  }
));

// Configuration de la stratégie Facebook
passport.use(new FacebookStrategy(
  {
    clientID: config.oauth.facebook.clientId || '',
    clientSecret: config.oauth.facebook.clientSecret || '',
    callbackURL: config.oauth.facebook.callbackURL || '',
    profileFields: ['id', 'emails', 'name']
  },
  async (accessToken: string, refreshToken: string, profile: OAuthProfile, done: (error: any, user?: IUser | false) => void) => {
    try {
      const email = profile.emails?.[0]?.value;
      if (!email) {
        return done(new Error('No email found in profile'), false);
      }

      const user = await User.findOne({ email });
      if (user) {
        return done(null, user);
      }

      const newUser = await User.create({
        email,
        firstName: profile.name?.givenName || '',
        lastName: profile.name?.familyName || '',
        facebookId: profile.id,
        userType: 'etudiant',
        isEmailVerified: true
      });

      return done(null, newUser);
    } catch (error) {
      return done(error, false);
    }
  }
));

// Configuration de la stratégie LinkedIn
passport.use(new LinkedInStrategy(
  {
    clientID: config.oauth.linkedin.clientId || '',
    clientSecret: config.oauth.linkedin.clientSecret || '',
    callbackURL: config.oauth.linkedin.callbackURL || '',
    scope: ['r_emailaddress', 'r_liteprofile']
  },
  async (accessToken: string, refreshToken: string, profile: OAuthProfile, done: (error: any, user?: IUser | false) => void) => {
    try {
      const email = profile.emails?.[0]?.value;
      if (!email) {
        return done(new Error('No email found in profile'), false);
      }

      const user = await User.findOne({ email });
      if (user) {
        return done(null, user);
      }

      const newUser = await User.create({
        email,
        firstName: profile.name?.givenName || '',
        lastName: profile.name?.familyName || '',
        linkedinId: profile.id,
        userType: 'etudiant',
        isEmailVerified: true
      });

      return done(null, newUser);
    } catch (error) {
      return done(error, false);
    }
  }
));

passport.serializeUser((user: IUser, done: (error: any, id?: string) => void) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done: (error: any, user?: IUser | false) => void) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;