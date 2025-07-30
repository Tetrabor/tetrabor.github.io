import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: (
      <a href="/docs/resume" style={{ textDecoration: 'none', color: 'inherit' }}>
        Resume
      </a>
    ),
    link: '/docs/resume',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        <p>View my full professional resume, including work history, tools, and certifications.</p>
        <a className="button button--primary" href="/docs/resume">
          View Resume
        </a>
      </>
    ),
  },
  {
    title: 'Portfolio',
    link: '/docs/portfolio',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        <p>Discover my previous works.</p>
        <a className="button button--primary" href="/docs/resume">
          View Portfolio
        </a>
      </>
    ),
  },
  {
    title: 'Contact',
    link: '/docs/contact',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        <p>Find the best way to connect with me!</p>
          <a className="button button--primary" href="/docs/resume">
          View Contact Page
        </a>
      </>
    ),
  },
];

function Feature({title, link, Svg, description, }: FeatureItem & { link?: string }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {link ? (
          <a href={link}>
            <Svg className={styles.featureSvg} role="img" />
          </a>
        ) : (
          <Svg className={styles.featureSvg} role="img" />
        )}
      </div>
      <div className="text--center padding-horiz--md">
        <h3>
          {link ? (
            <a href={link} style={{ textDecoration: 'none', color: 'inherit' }}>
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        <p>{description}</p>
      </div>
    </div>
  );
}


export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
