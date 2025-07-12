import React from 'react';

const LoginForm: React.FC = () => (
  <form>
    <input type="email" placeholder="Email" />
    <input type="password" placeholder="Mot de passe" />
    <button type="submit">Se connecter</button>
  </form>
);

export default LoginForm; 