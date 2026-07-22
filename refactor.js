import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');

// 1. Delete unused files
const unusedFiles = [
  'components/CursorEffect.jsx',
  'components/ValorantAbout.jsx',
  'components/ValorantAbout.module.css',
  'components/LocalTime.jsx',
  'components/PictureViewport3D.jsx'
];

for (const file of unusedFiles) {
  const p = path.join(srcDir, file);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    console.log(`Deleted ${file}`);
  }
}

// 2. Map old paths to new paths
const moves = {
  'sections/Contact.jsx': 'features/Contact/Contact.jsx',
  'sections/Contact.module.css': 'features/Contact/Contact.module.css',
  'sections/Credentials.jsx': 'features/Credentials/Credentials.jsx',
  'sections/GithubActivity.jsx': 'features/GithubActivity/GithubActivity.jsx',
  'sections/Hero.jsx': 'features/Hero/Hero.jsx',
  'components/HeroWord.jsx': 'features/Hero/HeroWord.jsx',
  'sections/Identity.jsx': 'features/Identity/Identity.jsx',
  'sections/Impact.jsx': 'features/Impact/Impact.jsx',
  'components/AchievementCard.jsx': 'features/Impact/AchievementCard.jsx',
  'sections/System.jsx': 'features/System/System.jsx',
  'sections/Work.jsx': 'features/Work/Work.jsx',
  'components/ProjectCard.jsx': 'features/Work/ProjectCard.jsx',
};

// Ensure feature directories exist
const featuresDir = path.join(srcDir, 'features');
if (!fs.existsSync(featuresDir)) fs.mkdirSync(featuresDir);

for (const [oldPath, newPath] of Object.entries(moves)) {
  const oldFull = path.join(srcDir, oldPath);
  const newFull = path.join(srcDir, newPath);
  const newDir = path.dirname(newFull);
  if (!fs.existsSync(newDir)) {
    fs.mkdirSync(newDir, { recursive: true });
  }
  if (fs.existsSync(oldFull)) {
    fs.renameSync(oldFull, newFull);
    console.log(`Moved ${oldPath} to ${newPath}`);
  }
}

// Ensure old sections dir is deleted if empty
const sectionsDir = path.join(srcDir, 'sections');
if (fs.existsSync(sectionsDir) && fs.readdirSync(sectionsDir).length === 0) {
  fs.rmdirSync(sectionsDir);
}

// 3. Update imports across all .jsx and .js files in src recursively
function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(full));
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      results.push(full);
    }
  });
  return results;
}

const allFiles = getFiles(srcDir);

// Re-write import paths
// We know all moves. For simplicity in regex, since we are dealing with standard imports:
// We just need to fix imports pointing to the moved files.
allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let changed = false;

  // Generic replace logic:
  // Find strings matching relative paths to components or sections and fix them based on `moves`.
  
  // Actually, Vite handles imports relative to the current file.
  // This can be tricky. It's safer to use absolute paths or calculate relative.
  // Instead, let's just do a naive replace:
  // e.g. from App.jsx (root): './sections/Hero' -> './features/Hero/Hero'
  
  const rules = [
    { from: /'\.\/sections\/Contact'/g, to: "'./features/Contact/Contact'" },
    { from: /'\.\.\/components\/SectionLabel'/g, to: "'../../components/SectionLabel'" },
    { from: /'\.\.\/components\/MagneticElement'/g, to: "'../../components/MagneticElement'" },
    { from: /'\.\.\/components\/HeroWord'/g, to: "'./HeroWord'" },
    { from: /'\.\.\/components\/AchievementCard'/g, to: "'./AchievementCard'" },
    { from: /'\.\.\/components\/ProjectCard'/g, to: "'./ProjectCard'" },
    { from: /'\.\.\/components\/HorizontalScrollSection'/g, to: "'../../components/HorizontalScrollSection'" },
    { from: /'\.\/Contact\.module\.css'/g, to: "'./Contact.module.css'" }, // unchanged internally
    { from: /'\.\/sections\/Credentials'/g, to: "'./features/Credentials/Credentials'" },
    { from: /'\.\/sections\/GithubActivity'/g, to: "'./features/GithubActivity/GithubActivity'" },
    { from: /'\.\/sections\/Hero'/g, to: "'./features/Hero/Hero'" },
    { from: /'\.\/sections\/Identity'/g, to: "'./features/Identity/Identity'" },
    { from: /'\.\/sections\/Impact'/g, to: "'./features/Impact/Impact'" },
    { from: /'\.\/sections\/System'/g, to: "'./features/System/System'" },
    { from: /'\.\/sections\/Work'/g, to: "'./features/Work/Work'" },
    { from: /'\.\.\/data\/portfolioData'/g, to: "'../../data/portfolioData'" },
  ];

  // For App.jsx which is in src/:
  if (file.endsWith('App.jsx')) {
    content = content.replace(/\.\/sections\//g, './features/');
    content = content.replace(/\.\/features\/([A-Za-z0-9_]+)'/g, "./features/$1/$1'");
    changed = true;
  }
  
  // For files inside features:
  if (file.includes(path.join('src', 'features'))) {
    // any `../components` becomes `../../components`
    content = content.replace(/\.\.\/components\//g, '../../components/');
    // any `../data` becomes `../../data`
    content = content.replace(/\.\.\/data\//g, '../../data/');
    
    // Fix HeroWord import inside Hero.jsx
    if (file.endsWith('Hero.jsx')) {
      content = content.replace(/\.\.\/\.\.\/components\/HeroWord/g, './HeroWord');
    }
    // Fix AchievementCard inside Impact.jsx
    if (file.endsWith('Impact.jsx')) {
      content = content.replace(/\.\.\/\.\.\/components\/AchievementCard/g, './AchievementCard');
    }
    // Fix ProjectCard inside Work.jsx
    if (file.endsWith('Work.jsx')) {
      content = content.replace(/\.\.\/\.\.\/components\/ProjectCard/g, './ProjectCard');
    }
    changed = true;
  }

  // Ensure AchievementCard imports components correctly since it moved from components to features/Impact
  if (file.endsWith('AchievementCard.jsx')) {
    content = content.replace(/\.\/MediaLightbox/g, '../../components/MediaLightbox');
    content = content.replace(/\.\/MagneticElement/g, '../../components/MagneticElement');
    changed = true;
  }
  
  if (file.endsWith('ProjectCard.jsx')) {
    content = content.replace(/\.\/MagneticElement/g, '../../components/MagneticElement');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content);
  }
});

console.log("Refactoring complete.");
