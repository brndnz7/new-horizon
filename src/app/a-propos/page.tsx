'use client'

import Image from 'next/image';
import Section, { SectionHeader } from '@/components/Section';
import Card, { CardContent } from '@/components/Card';
import Button from '@/components/Button';
import { useLanguage } from '@/hooks/useLanguage';

export default function AboutPage() {
  const { t } = useLanguage();
  const leadershipTeam = [
    {
      id: 1,
      name: t('about.team.lea.name'),
      role: t('about.team.lea.role'),
      bio: t('about.team.lea.bio'),
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b890?q=80&w=200&h=200&fit=crop&crop=face"
    },
    {
      id: 2,
      name: t('about.team.karim.name'),
      role: t('about.team.karim.role'),
      bio: t('about.team.karim.bio'),
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop&crop=face"
    },
    {
      id: 3,
      name: t('about.team.elena.name'),
      role: t('about.team.elena.role'),
      bio: t('about.team.elena.bio'),
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&fit=crop&crop=face"
    }
  ];

  const coreValues = [
    {
      icon: "🏛️",
      title: t('about.values.dignity.title'),
      description: t('about.values.dignity.desc')
    },
    {
      icon: "⚖️", 
      title: t('about.values.equality.title'),
      description: t('about.values.equality.desc')
    },
    {
      icon: "🤝",
      title: t('about.values.solidarity.title'),
      description: t('about.values.solidarity.desc')
    },
    {
      icon: "🌍",
      title: t('about.values.diversity.title'), 
      description: t('about.values.diversity.desc')
    },
    {
      icon: "🗳️",
      title: t('about.values.citizenship.title'),
      description: t('about.values.citizenship.desc')
    },
    {
      icon: "🌳",
      title: t('about.values.environment.title'),
      description: t('about.values.environment.desc')
    },
    {
      icon: "🔦",
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.desc')
    },
    {
      icon: "📚",
      title: t('about.values.education.title'),
      description: t('about.values.education.desc')
    },
    {
      icon: "🚀",
      title: t('about.values.empowerment.title'),
      description: t('about.values.empowerment.desc')
    },
    {
      icon: "💜",
      title: t('about.values.accessibility.title'),
      description: t('about.values.accessibility.desc')
    },
    {
      icon: "🌐",
      title: t('about.values.european.title'),
      description: t('about.values.european.desc')
    },
    {
      icon: "♻️",
      title: t('about.values.transmission.title'),
      description: t('about.values.transmission.desc')
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 transition-colors duration-200">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>
      </Section>

      {/* Notre Mission */}
      <Section className="bg-white dark:bg-neutral-900 transition-colors duration-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6">
              {t('about.mission.title')}
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
              {t('about.mission.description1')}
            </p>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
              {t('about.mission.description2')}
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">6</div>
                <div className="text-neutral-600 dark:text-neutral-400">{t('about.stats.years')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">650+</div>
                <div className="text-neutral-600 dark:text-neutral-400">{t('home.stats.beneficiaries')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">85+</div>
                <div className="text-neutral-600 dark:text-neutral-400">{t('home.stats.youth')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">15</div>
                <div className="text-neutral-600 dark:text-neutral-400">{t('about.stats.countries')}</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=600"
              alt="Jeunes européens en échange interculturel"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </Section>

      {/* Notre Vision */}
      <Section className="bg-gradient-to-br from-primary-500 to-secondary-400 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{t('about.vision.title')}</h2>
          <p className="text-xl leading-relaxed mb-8">
            {t('about.vision.description')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-lg font-semibold mb-2">{t('about.vision.inclusive_society')}</h3>
              <p className="text-blue-100 text-sm">
                {t('about.vision.inclusive_society_desc')}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔑</div>
              <h3 className="text-lg font-semibold mb-2">{t('about.vision.accessible_europe')}</h3>
              <p className="text-blue-100 text-sm">
                {t('about.vision.accessible_europe_desc')}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🛠</div>
              <h3 className="text-lg font-semibold mb-2">{t('about.vision.autonomy')}</h3>
              <p className="text-blue-100 text-sm">
                {t('about.vision.autonomy_desc')}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-lg font-semibold mb-2">{t('about.vision.solidarity_youth')}</h3>
              <p className="text-blue-100 text-sm">
                {t('about.vision.solidarity_youth_desc')}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Notre Histoire */}
      <Section className="bg-neutral-50 dark:bg-neutral-800 transition-colors duration-200">
        <SectionHeader 
          title={t('about.history.title')} 
          subtitle={t('about.history.subtitle')}
          centered
        />
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-4 h-4 bg-primary-600 dark:bg-primary-400 rounded-full mt-2"></div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">{t('about.history.2018')}</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  {t('about.history.2018_desc')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-4 h-4 bg-primary-600 dark:bg-primary-400 rounded-full mt-2"></div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">{t('about.history.2019')}</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  {t('about.history.2019_desc')}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-4 h-4 bg-primary-600 dark:bg-primary-400 rounded-full mt-2"></div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">{t('about.history.2020')}</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  {t('about.history.2020_desc')}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-4 h-4 bg-primary-600 dark:bg-primary-400 rounded-full mt-2"></div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">{t('about.history.2021')}</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  {t('about.history.2021_desc')}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-4 h-4 bg-primary-600 dark:bg-primary-400 rounded-full mt-2"></div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">{t('about.history.2022')}</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  {t('about.history.2022_desc')}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-4 h-4 bg-success-600 dark:bg-success-400 rounded-full mt-2"></div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">{t('about.history.2024')}</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  {t('about.history.2024_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Équipe dirigeante */}
      <Section className="bg-white dark:bg-neutral-900 transition-colors duration-200">
        <SectionHeader 
          title={t('about.team.title')} 
          subtitle={t('about.team.subtitle')}
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadershipTeam.map((member) => (
            <Card key={member.id} className="text-center hover-card">
              <CardContent className="pt-8">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={member.avatar}
                    alt={`Portrait de ${member.name}`}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <div className="text-primary-600 dark:text-primary-400 font-medium mb-4">
                  {member.role}
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Nos 12 Valeurs */}
      <Section className="bg-neutral-50 dark:bg-neutral-800 transition-colors duration-200">
        <SectionHeader 
          title={t('about.values.title')} 
          subtitle={t('about.values.subtitle')}
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreValues.map((value, index) => (
            <Card key={index} className="text-center hover-card">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Call to Action */}
      <Section className="bg-gradient-to-br from-primary-500 to-secondary-400 text-white">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('about.cta.title')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t('about.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" href="/contact" variant="secondary">
              {t('nav.contact')}
            </Button>
            <Button variant="outline" size="lg" href="/projets" className="border-white text-white hover:bg-white hover:text-primary-600">
              {t('home.cta.discover')}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
} 