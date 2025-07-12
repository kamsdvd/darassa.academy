import React, { useState } from 'react';
import Link from 'next/link';
import { useFormations, FrontendPaginatedFormations, useDeleteFormation } from '../../../hooks/useFormations.ts'; // Ajuster le chemin, importer useDeleteFormation
import { Formation } from '../../../types/formation.ts'; // Ajuster le chemin
import Layout from '../../../components/layout/Layout.tsx'; // Utilisation du Layout général pour l'instant
import { PlusCircle, Edit3, Trash2, AlertTriangle, Loader2 } from 'lucide-react'; // Importer Loader2 pour le spinner

const AdminFormationsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Nombre d'items par page pour l'admin
  const [deletingId, setDeletingId] = useState<string | null>(null); // Pour suivre l'ID de la formation en cours de suppression

  const {
    data: paginatedFormations,
    isLoading: isLoadingFormations, // Renommer pour clarté
    isError,
    error
  } = useFormations({
    page: currentPage,
    limit: itemsPerPage,
  });

  const deleteFormationMutation = useDeleteFormation();

  const handleDelete = async (formationId: string, formationTitle: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la formation "${formationTitle}" ?`)) {
      setDeletingId(formationId);
      deleteFormationMutation.mutate(formationId, {
        onSuccess: () => {
          console.log(`Formation "${formationTitle}" supprimée avec succès.`);
          // La liste sera rafraîchie automatiquement grâce à l'invalidation des requêtes dans le hook
          // On pourrait ajouter une notification Toast ici.
          setDeletingId(null);
        },
        onError: (err) => {
          console.error(`Erreur lors de la suppression de la formation "${formationTitle}":`, err);
          alert(`Erreur lors de la suppression : ${err.message}`);
          setDeletingId(null);
        },
      });
    }
  };

  const formations = paginatedFormations?.data || [];
  const meta = paginatedFormations?.meta;

  // TODO: Implémenter une vraie pagination pour l'admin
  const renderPaginationControls = () => {
    if (!meta || meta.totalPages <= 1) return null;
    return (
      <div className="mt-6 flex justify-center items-center space-x-2">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1 || isLoadingFormations || deleteFormationMutation.isLoading}
          className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50 hover:bg-gray-100"
        >
          Précédent
        </button>
        <span className="text-sm">
          Page {meta.currentPage} sur {meta.totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(meta.totalPages, p + 1))}
          disabled={currentPage === meta.totalPages || isLoadingFormations || deleteFormationMutation.isLoading}
          className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50 hover:bg-gray-100"
        >
          Suivant
        </button>
      </div>
    );
  };

  if (isLoadingFormations) { // Utilise le nom de variable renommé
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestion des Formations</h1>
          <p className="text-center text-gray-500">Chargement des formations...</p> {/* TODO: Add a spinner component */}
        </div>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestion des Formations</h1>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold"><AlertTriangle className="inline h-5 w-5 mr-2"/>Erreur : </strong>
            <span className="block sm:inline">{error?.message || "Impossible de charger les formations."}</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Gestion des Formations</h1>
          <Link href="/admin/formations/creer" passHref>
            <a className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg inline-flex items-center">
              <PlusCircle size={20} className="mr-2" />
              Créer une Formation
            </a>
          </Link>
        </div>

        {formations.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p>Aucune formation trouvée.</p>
            <p className="mt-2">Commencez par <Link href="/admin/formations/creer"><a className="text-blue-600 hover:underline">créer une nouvelle formation</a></Link>.</p>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                  <th className="px-5 py-3 border-b-2 border-gray-200">Titre</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200">Catégorie</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200">Niveau</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200">Prix</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200">Statut</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {formations.map((formation: Formation) => (
                  <tr key={formation.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{formation.title}</p>
                    </td>
                    <td className="px-5 py-4 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{formation.category}</p>
                    </td>
                    <td className="px-5 py-4 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap capitalize">{formation.level}</p>
                    </td>
                    <td className="px-5 py-4 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{formation.price} €</p>
                    </td>
                    <td className="px-5 py-4 border-b border-gray-200 text-sm">
                      <span className={`px-2 py-1 font-semibold leading-tight rounded-full text-xs ${
                        formation.status === 'Planifiée' ? 'bg-yellow-200 text-yellow-900' :
                        formation.status === 'En cours' ? 'bg-green-200 text-green-900' :
                        formation.status === 'Terminée' ? 'bg-blue-200 text-blue-900' :
                        formation.status === 'Annulée' ? 'bg-red-200 text-red-900' :
                        'bg-gray-200 text-gray-900'
                      }`}>
                        {formation.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 border-b border-gray-200 text-sm">
                      <div className="flex items-center space-x-2">
                        <Link href={`/admin/formations/modifier/${formation.id}`} passHref>
                          <a className="text-blue-600 hover:text-blue-800" title="Modifier">
                            <Edit3 size={18} />
                          </a>
                        </Link>
                        <button
                          onClick={() => handleDelete(formation.id, formation.title)}
                          disabled={deleteFormationMutation.isLoading && deletingId === formation.id}
                          className="text-red-600 hover:text-red-800 disabled:opacity-50"
                          title="Supprimer"
                        >
                          {(deleteFormationMutation.isLoading && deletingId === formation.id) ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {renderPaginationControls()}
      </div>
    </Layout>
  );
};

export default AdminFormationsPage;
```
