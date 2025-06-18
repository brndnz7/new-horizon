import Section, { SectionHeader } from '@/components/Section';
import Card, { CardContent } from '@/components/Card';

export default function LegalPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 transition-colors duration-200">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
            Mentions{' '}
            <span className="text-primary-600 dark:text-primary-400">légales</span>
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            Informations légales obligatoires et politique de confidentialité de notre association.
          </p>
        </div>
      </Section>

      {/* Informations légales */}
      <Section className="bg-white dark:bg-neutral-900 transition-colors duration-200">
        <SectionHeader 
          title="Informations légales" 
          subtitle="Identification de l'association"
        />
        
        <Card>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Identification</h3>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Dénomination :</strong> Mon Association</p>
                  <p><strong>Forme juridique :</strong> Association loi 1901</p>
                  <p><strong>RNA :</strong> W751234567</p>
                  <p><strong>SIRET :</strong> 123 456 789 00012</p>
                  <p><strong>Date de création :</strong> 15 mars 2020</p>
                  <p><strong>Publication JO :</strong> 28 mars 2020</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Siège social</h3>
                <div className="space-y-2 text-gray-600">
                  <p>123 Rue de la Solidarité</p>
                  <p>75001 Paris</p>
                  <p>France</p>
                  <p><strong>Téléphone :</strong> 01 23 45 67 89</p>
                  <p><strong>Email :</strong> contact@monassociation.fr</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Direction de la publication</h3>
            <div className="text-gray-600">
              <p><strong>Directrice de publication :</strong> Marie Dubois, Présidente</p>
              <p><strong>Responsable de la rédaction :</strong> Pierre Martin, Vice-Président</p>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-8">Hébergement</h3>
            <div className="text-gray-600">
              <p><strong>Hébergeur :</strong> Vercel Inc.</p>
              <p>340 S Lemon Ave #4133</p>
              <p>Walnut, CA 91789, États-Unis</p>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Politique de confidentialité */}
      <Section className="bg-neutral-50 dark:bg-neutral-800 transition-colors duration-200">
        <SectionHeader 
          title="Politique de confidentialité" 
          subtitle="Protection de vos données personnelles"
        />

        <div className="space-y-8">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Collecte des données</h3>
              <p className="text-gray-600 mb-4">
                Nous collectons les données personnelles que vous nous fournissez volontairement :
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Lors de l'envoi du formulaire de contact (nom, email, message)</li>
                <li>Lors de candidatures aux programmes européens</li>
                <li>Lors de votre inscription comme bénévole</li>
                <li>Navigation sur le site (cookies techniques)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Utilisation des données</h3>
              <p className="text-gray-600 mb-4">
                Vos données personnelles sont utilisées exclusivement pour :
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Répondre à vos demandes d'information</li>
                <li>Traiter les candidatures aux programmes européens</li>
                <li>Vous informer de nos activités (avec votre consentement)</li>
                <li>Gérer votre participation à nos projets</li>
                <li>Améliorer nos services et notre site web</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Base légale du traitement</h3>
              <div className="text-gray-600 space-y-3">
                <p>
                  <strong>Exécution d'un contrat :</strong> Traitement des candidatures, gestion des bénévoles
                </p>
                <p>
                  <strong>Intérêt légitime :</strong> Amélioration de nos services, communication institutionnelle
                </p>
                <p>
                  <strong>Consentement :</strong> Newsletter, communications marketing
                </p>
                <p>
                  <strong>Obligation légale :</strong> Conservation des données comptables, rapports européens
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">4. Conservation des données</h3>
              <div className="text-gray-600 space-y-2">
                <p><strong>Données de contact :</strong> 3 ans après le dernier contact</p>
                <p><strong>Données de programme :</strong> 10 ans (obligation européenne)</p>
                <p><strong>Données de bénévolat :</strong> 5 ans après la fin de l'engagement</p>
                <p><strong>Cookies techniques :</strong> 13 mois maximum</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">5. Vos droits</h3>
              <p className="text-gray-600 mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Droit d'accès :</strong> Connaître les données que nous détenons sur vous</li>
                <li><strong>Droit de rectification :</strong> Corriger vos données inexactes</li>
                <li><strong>Droit à l'effacement :</strong> Demander la suppression de vos données</li>
                <li><strong>Droit à la limitation :</strong> Limiter le traitement de vos données</li>
                <li><strong>Droit à la portabilité :</strong> Récupérer vos données dans un format standard</li>
                <li><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données</li>
              </ul>
              <p className="text-gray-600 mt-4">
                Pour exercer ces droits, contactez-nous à : <strong>dpo@monassociation.fr</strong>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">6. Sécurité</h3>
              <p className="text-gray-600 mb-4">
                Nous mettons en œuvre les mesures techniques et organisationnelles appropriées pour :
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Protéger vos données contre la perte, l'altération ou l'accès non autorisé</li>
                <li>Chiffrer les communications (HTTPS)</li>
                <li>Limiter l'accès aux données aux seules personnes habilitées</li>
                <li>Effectuer des sauvegardes régulières</li>
                <li>Former notre équipe à la protection des données</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">7. Cookies</h3>
              <p className="text-gray-600 mb-4">
                Notre site utilise uniquement des cookies techniques nécessaires au fonctionnement :
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Cookies de session pour la navigation</li>
                <li>Préférences utilisateur (langue, accessibilité)</li>
                <li>Mesures d'audience anonymisées</li>
              </ul>
              <p className="text-gray-600 mt-4">
                Aucun cookie publicitaire ou de tracking n'est utilisé.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Propriété intellectuelle */}
      <Section className="bg-white">
        <SectionHeader 
          title="Propriété intellectuelle" 
          subtitle="Droits d'auteur et utilisation du contenu"
        />

        <Card>
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Droits d'auteur</h3>
            <p className="text-gray-600 mb-4">
              L'ensemble du contenu de ce site (textes, images, logos, graphismes) est protégé par le droit d'auteur 
              et appartient à Mon Association ou à ses partenaires.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Utilisation autorisée</h3>
            <p className="text-gray-600 mb-4">
              Vous pouvez consulter et imprimer les pages de ce site pour votre usage personnel et non commercial. 
              Toute autre utilisation nécessite notre autorisation écrite préalable.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Images</h3>
            <p className="text-gray-600">
              Les images utilisées sur ce site proviennent d'Unsplash et sont libres de droits. 
              Les photos de nos équipes et activités appartiennent à Mon Association.
            </p>
          </CardContent>
        </Card>
      </Section>

      {/* Contact et réclamations */}
      <Section className="bg-blue-600 text-white">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Questions ou réclamations ?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, 
            n'hésitez pas à nous contacter.
          </p>
          <div className="space-y-2 text-blue-100">
            <p><strong>Délégué à la protection des données :</strong></p>
            <p>Sophie Leroy - dpo@monassociation.fr</p>
            <p>123 Rue de la Solidarité, 75001 Paris</p>
          </div>
          <p className="text-sm text-blue-200 mt-8">
            En cas de litige, vous pouvez saisir la CNIL : www.cnil.fr
          </p>
        </div>
      </Section>

      {/* Dernière mise à jour */}
      <Section className="bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">
            <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Nous nous réservons le droit de modifier cette politique de confidentialité. 
            Les modifications seront publiées sur cette page.
          </p>
        </div>
      </Section>
    </>
  );
} 