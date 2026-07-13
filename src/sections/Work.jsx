// Work.jsx — 04 / WORK (id="projects")
//
// Projects as the primary portfolio experience.
// Pinned horizontal scroll. Data from portfolioData.js only.

import { projects } from '../data/portfolioData';
import ProjectCard             from '../components/ProjectCard';
import HorizontalScrollSection from '../components/HorizontalScrollSection';

export default function Work() {
  return (
    <HorizontalScrollSection
      id="projects"
      ariaLabel="Selected projects"
      label="— 04 / WORK"
      heading={['SELECTED', 'WORK.']}
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </HorizontalScrollSection>
  );
}
