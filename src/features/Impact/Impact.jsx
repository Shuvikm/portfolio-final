// Impact.jsx — 06 / IMPACT
//
// Achievements as proof-of-impact, horizontal scroll (pinned).
// Blood donation: description shown WITHOUT blood group (privacy).
// Proof images open in MediaLightbox rendered outside the transformed track hierarchy.

import { achievements } from '../../data/portfolioData';
import AchievementCard         from './AchievementCard';
import HorizontalScrollSection from '../../components/HorizontalScrollSection';

export default function Impact() {
  return (
    <HorizontalScrollSection
      id="impact"
      ariaLabel="Achievements and proof of impact"
      label="— 06 / IMPACT"
      heading={['PROOF OF', 'IMPACT.']}
    >
      {achievements.map((ach) => (
        <AchievementCard key={ach.id} achievement={ach} />
      ))}
    </HorizontalScrollSection>
  );
}
