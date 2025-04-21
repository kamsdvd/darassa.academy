# Guide de Contribution

Merci de votre intérêt pour contribuer à Darassa Academy ! Ce document fournit les lignes directrices pour contribuer au projet.

## 🌟 Comment Contribuer

1. **Fork** le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Convention de Commits

Nous suivons la [convention de commits conventionnels](https://www.conventionalcommits.org/). Chaque message de commit doit être structuré comme suit :

```
<type>(<scope>): <description>

[corps optionnel]

[pied de page optionnel]
```

### Types de Commits

- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Modification de la documentation
- `style`: Formatage, point-virgules manquants, etc.
- `refactor`: Refactorisation du code
- `test`: Ajout ou modification de tests
- `chore`: Tâches de maintenance

### Exemples

```
feat(auth): Add OAuth2 authentication
fix(api): Handle null response in user service
docs(readme): Update installation instructions
```

## 🧪 Tests

- Assurez-vous que tous les tests passent avant de soumettre une PR
- Ajoutez des tests pour les nouvelles fonctionnalités
- Maintenez une couverture de test élevée

## 📚 Documentation

- Mettez à jour la documentation pour refléter vos changements
- Commentez le code complexe
- Utilisez des noms de variables et de fonctions descriptifs

## 🎨 Style de Code

### Frontend

- Utilisez TypeScript
- Suivez les règles ESLint
- Utilisez des composants fonctionnels React
- Appliquez les principes de design atomique

### Backend

- Utilisez TypeScript
- Suivez les principes SOLID
- Documentez les endpoints API
- Gérez correctement les erreurs

## 🚀 Process de Review

1. Les PR doivent être liées à une issue
2. Les PR doivent passer tous les checks CI
3. Les PR nécessitent au moins une review approuvée
4. Le code doit suivre les standards du projet

## ⚠️ À Éviter

- Breaking changes sans discussion préalable
- Code non testé
- Commits directs sur master
- Large PR (préférez des PR plus petites et focalisées)

## 🤝 Code de Conduite

- Soyez respectueux et inclusif
- Acceptez les critiques constructives
- Concentrez-vous sur ce qui est le mieux pour la communauté
- Montrez de l'empathie envers les autres membres

## 🔄 Workflow Git

1. Synchronisez votre fork
```bash
git remote add upstream https://github.com/original/repository.git
git fetch upstream
git checkout master
git merge upstream/master
```

2. Créez une branche pour votre travail
```bash
git checkout -b type/description
```

3. Faites vos modifications et committez
```bash
git add .
git commit -m "type(scope): description"
```

4. Poussez et créez une PR
```bash
git push origin type/description
```

## 📝 Checklist PR

- [ ] Tests ajoutés/mis à jour
- [ ] Documentation mise à jour
- [ ] Code formaté et lint passé
- [ ] Commits suivant la convention
- [ ] Branch à jour avec master

## 🆘 Besoin d'Aide ?

- Consultez les issues existantes
- Rejoignez notre canal de discussion
- Contactez l'équipe à support@darassa.academy

Merci de contribuer à Darassa Academy ! 🎉 