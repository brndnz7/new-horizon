import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import Card, { CardContent } from '@/components/Card';
import Button from '@/components/Button';
// TEMPORAIREMENT DÉSACTIVÉ POUR VERCEL: import { prisma } from '@/lib/prisma';
import projectsData from '@/data/projets.json';

interface PageProps {
  params: {
    slug: string;
  };
}

// Fonction pour convertir le markdown basique en HTML
function renderMarkdown(content: string) {
  return content
    .split('\n')
    .map((line, index) => {
      // Titres
      if (line.startsWith('# ')) {
        return `<h1 class="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">${line.slice(2)}</h1>`;
      }
      if (line.startsWith('## ')) {
        return `<h2 class="text-2xl font-bold text-gray-900 mb-4 mt-6">${line.slice(3)}</h2>`;
      }
      if (line.startsWith('### ')) {
        return `<h3 class="text-xl font-semibold text-gray-900 mb-3 mt-4">${line.slice(4)}</h3>`;
      }
      
      // Listes
      if (line.startsWith('- ')) {
        return `<li class="text-gray-600 mb-1">${line.slice(2)}</li>`;
      }
      
      // Texte gras
      if (line.includes('**')) {
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');
      }
      
      // Paragraphes
      if (line.trim() === '') {
        return '<br>';
      }
      
      if (!line.startsWith('<') && line.trim() !== '') {
        return `<p class="text-gray-600 mb-4 leading-relaxed">${line}</p>`;
      }
      
      return line;
    })
    .join('\n');
}

export default async function ProjectPage({ params }: PageProps) {
  // TEMPORAIREMENT UTILISER LES DONNÉES JSON POUR VERCEL
  const project = projectsData.find(proj => proj.slug === params.slug);

  if (!project) {
    notFound();
  }

  const otherProjects = projectsData
    .filter(proj => proj.slug !== params.slug)
    .slice(0, 2);

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-blue-50 to-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {project.category}
              </span>
              <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                {project.status === 'active' ? 'Projet actif' : 'En pause'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {project.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" href="/contact">
                Rejoindre ce projet
              </Button>
              <Button variant="outline" size="lg" href="/contact">
                En savoir plus
              </Button>
            </div>
          </div>
          <div className="relative">
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
              priority
            />
          </div>
        </div>
      </Section>

      {/* Informations du projet */}
      <Section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-2xl font-bold text-blue-600 mb-2">{project.volunteers}</div>
              <div className="text-gray-600">Bénévoles mobilisés</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-2xl font-bold text-green-600 mb-2">{project.beneficiaries}</div>
              <div className="text-gray-600">Bénéficiaires</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {new Date(project.startDate).getFullYear()}
              </div>
              <div className="text-gray-600">Année de création</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-2xl font-bold text-orange-600 mb-2">
                {Math.ceil((new Date().getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))}
              </div>
              <div className="text-gray-600">Mois d'activité</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: renderMarkdown(project.content) 
              }}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations pratiques</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Lieu</div>
                      <div className="text-sm text-gray-600">{project.location}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 12L10 14L16 8"/>
                      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"/>
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Début du projet</div>
                      <div className="text-sm text-gray-600">
                        {new Date(project.startDate).toLocaleDateString('fr-FR', { 
                          year: 'numeric', 
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/>
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Statut</div>
                      <div className="text-sm text-gray-600">
                        {project.status === 'active' ? 'Projet actif' : 'En pause'}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Comment participer ?</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Vous souhaitez vous engager dans ce projet ? Contactez-nous pour connaître 
                  les modalités de participation et les prochaines dates d'action.
                </p>
                <Button className="w-full" href="/contact">
                  Je veux participer
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Autres projets */}
      {otherProjects.length > 0 && (
        <Section className="bg-gray-50">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Découvrez nos autres projets
            </h2>
            <p className="text-xl text-gray-600">
              D'autres initiatives qui pourraient vous intéresser
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherProjects.map((otherProject) => (
              <Card key={otherProject.id} className="h-full flex flex-col group hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={otherProject.image}
                    alt={otherProject.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {otherProject.category}
                    </span>
                  </div>
                </div>
                <CardContent className="flex-1 flex flex-col p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {otherProject.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-1">
                    {otherProject.description}
                  </p>
                  <Button variant="outline" className="w-full" href={`/projets/${otherProject.slug}`}>
                    En savoir plus
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button href="/projets">
              Voir tous nos projets
            </Button>
          </div>
        </Section>
      )}
    </>
  );
}

export async function generateStaticParams() {
  // TEMPORAIREMENT UTILISER LES DONNÉES JSON POUR VERCEL
  return projectsData.map(project => ({ slug: project.slug }));
}