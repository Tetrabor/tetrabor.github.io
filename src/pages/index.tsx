import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  const services = [
    {
      num: '01',
      title: 'Technical Writing for SaaS',
      desc: 'Professional creation of clean and practical documentation for complex SaaS systems, including feature guides and user manuals.',
    },
    {
      num: '02',
      title: 'Developer & API Documentation',
      desc: 'Specialized creation of technical guides, API documentation, and developer portals tailored for engineering audiences.',
    },
    {
      num: '03',
      title: 'Docs-as-Code Implementation',
      desc: 'Modernizing documentation workflows by moving from traditional CMS tools to modern setups using GitHub and version control.',
    },
    {
      num: '04',
      title: 'Documentation Accessibility',
      desc: 'Redesigning and overhauling documentation architecture to meet modern accessibility standards such as WCAG.',
    },
    {
      num: '05',
      title: 'Tooling & Custom Components',
      desc: 'Development of custom web components, UI features, and scripts to optimize documentation site performance and user experience.',
    },
    {
      num: '06',
      title: 'AI Implementation',
      desc: 'Designing AI Markdown templates for creating and managing platform documentation.',
    },
  ];

  return (
    <Layout
      title={`Michael Sheleman's Portfolio & Resume`}
      description="Discover Michael Sheleman's resume and previous works.">

      <main className={styles.mainContainer}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroGrid}>
              <div className={styles.heroContent}>
                <span className={`${styles.monoText} ${styles.heroEyebrow}`}>
                  Information Architecture & Docs-as-Code
                </span>
                <Heading as="h1" className={styles.heroTitle}>
                  Bridging the gap between engineering and users.
                </Heading>
                <p className={styles.heroDesc}>
                  Senior Technical Writer transforming complex SaaS systems and APIs into clean, accessible documentation using modern AI-enhanced workflows.
                </p>
              </div>
              <div className={styles.heroImageWrapper}>
                <img
                  src="/img/hero_labs.jpg"
                  alt="Michael Sheleman"
                  className={styles.heroImage}
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className={styles.aboutSection}>
          <div className={styles.container}>
            <div className={styles.aboutGrid}>
              <div className={styles.aboutImageWrapper}>
                <img
                  src="/img/about_keyboard.jpg"
                  alt="Mechanical Keyboard Detail"
                  className={styles.aboutImage}
                />
              </div>
              <div className={styles.aboutContent}>
                <span className={`${styles.monoText} ${styles.accentColor}`}>
                  Systematic Approach
                </span>
                <Heading as="h2" className={styles.aboutTitle}>
                  Functional utilitarian design meets evidence-based writing.
                </Heading>
                <p className={styles.aboutDesc}>
                  Michael Sheleman positions himself as a high-level technical communications expert who bridges the gap between complex engineering and user accessibility through AI-integrated documentation and modern development workflows.
                </p>

                <Heading as="h3" className={styles.valuesTitle}>
                  Core Values
                </Heading>
                <ul className={styles.valuesList}>
                  <li>Technical Accuracy</li>
                  <li>Accessibility</li>
                  <li>Standardization</li>
                  <li>Innovation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities/Services Section */}
        <section className={styles.servicesSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={`${styles.monoText} ${styles.accentColor}`}>
                Capabilities
              </span>
              <Heading as="h2" className={styles.servicesTitle}>
                Technical Communication Solutions
              </Heading>
              <p className={styles.servicesDesc}>
                Providing premium utility through differentiated innovation and modern, trend-led workflows.
              </p>
            </div>

            <div className={styles.servicesGrid}>
              {services.map((service, index) => (
                <article key={index} className={styles.serviceCard}>
                  <div className={`${styles.serviceNumber} ${styles.monoText}`}>
                    {service.num}
                  </div>
                  <Heading as="h3" className={styles.cardTitle}>
                    {service.title}
                  </Heading>
                  <p className={styles.cardDesc}>
                    {service.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className={styles.philosophySection}>
          <div className={styles.philosophyBgOverlay}></div>
          <div className={`${styles.container} ${styles.philosophyContainer}`}>
            <span className={`${styles.monoText} ${styles.philosophyEyebrow}`}>
              AI-Ready Documentation
            </span>
            <Heading as="h2" className={styles.philosophyTitle}>
              Structured Clarity for the Modern Web
            </Heading>
            <p className={styles.philosophyDesc}>
              Transitioning from fragmented information to standardized, docs-as-code environments. By leveraging AI-enhanced tooling and strict version control, technical accuracy and scalable infrastructure become the baseline, not the goal.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}