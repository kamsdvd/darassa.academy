# Module `common`

Ce module regroupe les composants et utilitaires partagés, réutilisables dans toute l'application frontend.

## Structure du module

```
common/
└── components/
    ├── ConfirmDialog.tsx      # Boîte de dialogue de confirmation
    ├── DataTable.tsx          # Table de données réutilisable
    ├── ErrorBoundary.tsx      # Gestion globale des erreurs de rendu
    ├── FileUpload.tsx         # Upload de fichiers avancé
    ├── LoadingSpinner.tsx     # Indicateur de chargement
    ├── PageHeader.tsx         # En-tête de page
    └── SearchBar.tsx          # Barre de recherche interactive
```

## Utilisation des composants

### 1. ErrorBoundary
Permet de capturer les erreurs de rendu React et d'afficher un fallback UI.
```tsx
import ErrorBoundary from './components/ErrorBoundary';

<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### 2. LoadingSpinner
Affiche un indicateur de chargement.
```tsx
import LoadingSpinner from './components/LoadingSpinner';

<LoadingSpinner size="large" />
```

### 3. ConfirmDialog
Boîte de dialogue de confirmation.
```tsx
import ConfirmDialog from './components/ConfirmDialog';

<ConfirmDialog
  open={open}
  title="Supprimer l'élément ?"
  message="Cette action est irréversible."
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>
```

### 4. DataTable
Table de données avec tri, pagination, recherche.
```tsx
import DataTable from './components/DataTable';

<DataTable
  columns={columns}
  data={data}
  onRowClick={handleRowClick}
/>
```

### 5. FileUpload
Composant d'upload de fichiers avec drag & drop.
```tsx
import FileUpload from './components/FileUpload';

<FileUpload
  onUpload={handleUpload}
  accept=".pdf,.jpg"
/>
```

### 6. PageHeader
En-tête de page avec titre et actions.
```tsx
import PageHeader from './components/PageHeader';

<PageHeader
  title="Liste des utilisateurs"
  description="Gérez les utilisateurs de la plateforme."
  actions={<Button>Ajouter</Button>}
/>
```

### 7. SearchBar
Barre de recherche interactive.
```tsx
import SearchBar from './components/SearchBar';

<SearchBar
  placeholder="Rechercher..."
  onSearch={handleSearch}
  results={results}
  onResultSelect={handleSelect}
/>
```

## Bonnes pratiques
- Utilisez ces composants pour garantir la cohérence de l'UI.
- Consultez ce README pour les props et exemples d'utilisation.
- Ajoutez vos propres composants partagés ici si besoin.

## Mise à jour de la documentation globale
- Ce module est référencé dans le README global du projet.
- Pour toute contribution, documentez les nouveaux composants ici. 