import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import { AvatarLightbox } from '@/components/avatar-lightbox';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Muyang Guo — Georgia Tech, ML/HPC/simulation, Uber ATG, side projects.',
  alternates: { canonical: '/about/' },
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl">
      <header className="mb-8 flex items-center gap-5">
        <AvatarLightbox size="sm" />

        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">{site.name}</h1>
          <p className="mt-1 text-sm text-muted">
            <a href={`https://www.linkedin.com/in/${site.social.linkedin}/`} className="hover:text-accent">
              LinkedIn
            </a>{' '}
            ·{' '}
            <a href={`https://github.com/${site.social.github}`} className="hover:text-accent">
              GitHub
            </a>
          </p>
        </div>
      </header>

      <div className="prose-content space-y-4">
        <h2>Education</h2>
        <ul>
          <li>
            <strong>M.S. Computational Science &amp; Engineering</strong>, Georgia Institute of Technology — 2018–2020
          </li>
          <li>
            <strong>M.S. Mechanical Engineering</strong>, Georgia Institute of Technology — 2016–2018
          </li>
          <li>
            <strong>B.S. Mechanical Engineering</strong>, minor in Japanese, Georgia Institute of Technology — 2012–2015
          </li>
        </ul>

        <h2>Industry</h2>
        <h3>Uber ATG — Autonomous Driving</h3>
        <ul>
          <li>
            <strong>Software Simulation Intern</strong> (May–Aug 2019, SF Bay Area) — built an in-house next-gen lidar
            simulation package for ray-casting based design changes &amp; spec tuning. Sim-Realism team.
          </li>
          <li>
            <strong>Hardware Simulation Intern</strong> (Jan–May 2019, SF Bay Area) — physics-based radar modeling and a
            reduced-order radar simulation using ANSYS HFSS SBR+ &amp; MATLAB. CAE team.
          </li>
        </ul>
        <h3>Siemens Healthineers</h3>
        <ul>
          <li>
            <strong>Mechanical Engineering Intern</strong>, R&amp;D ITT Lab (May–Aug 2016, Shanghai) — CT factory RFID,
            C-arm collision avoidance prototype, patient-table safety design.
          </li>
        </ul>

        <h2>Graduate research</h2>
        <ul>
          <li>
            <strong>DMDII</strong> — reconfigurable retrofit sensor packages for legacy CNC/lathe/mill machines (IIoT,
            edge compute, MQTT). Sponsors: Caterpillar, Mazak, Cisco.
          </li>
          <li>
            <strong>Delta</strong> — aircraft CFRP composite joining &amp; repair: lab fab, FEA tensile/bending/peeling,
            defect modeling.
          </li>
          <li>
            <strong>Standing Breast CT</strong> — innovative medical device design research.
          </li>
        </ul>

        <h2>Teaching</h2>
        <ul>
          <li>
            <strong>Head TA, ME 2110</strong> — led the TA team for course design, teaching, and competition hosting
            across four semesters.
          </li>
        </ul>

        <h2>Awards</h2>
        <ul>
          <li>
            <strong>1st place</strong>, <a href="https://asmehackathon2020.github.io/archive/IDETC2020/">2020 ASME Hackathon</a>{' '}
            ($2,000) — data-driven surrogate model for machine damage accumulation; highest R² (0.92) and highest
            innovation score for a hybrid LSTM + KNN + XGBoost stacker. Featured in the{' '}
            <a href="https://www.me.gatech.edu/Georgia-Tech-Students-Win-ASME-Hackathon">GT Daily Digest</a>.
          </li>
          <li>
            <strong>Honorable mention</strong>,{' '}
            <a href="https://globalhealth.emory.edu/students/hackathon/index.html">2021 EGHI&rsquo;s Global Health Hackathon</a>{' '}
            ($1,500) — WHYbrary, an automated knowledge-extraction platform for organizational comms.
          </li>
        </ul>

        <h2>Projects</h2>
        <p>
          Browse the <Link href="/projects/">projects archive</Link>. More experimental WebGL / 3D things live under the{' '}
          <a href="https://gamer-ai.github.io/">gamer-ai</a> GitHub org.
        </p>
      </div>
    </article>
  );
}
