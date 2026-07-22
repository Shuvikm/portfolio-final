import { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import SectionLabel from '../components/SectionLabel';

export default function GithubActivity() {
  const [repos, setRepos] = useState([]);
  const username = 'Shuvikm';

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`)
      .then((res) => res.json())
      .then((data) => setRepos(data))
      .catch((err) => console.error('Error fetching repos:', err));
  }, []);

  const theme = {
    light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  return (
    <section
      id="github-activity"
      className="section"
      aria-label="GitHub Activity"
      style={{ zIndex: 'var(--z-content)', position: 'relative', paddingBottom: '4rem' }}
    >
      <div style={{ padding: '0 var(--page-padding-x)' }}>
        <SectionLabel>— 08 / GITHUB ACTIVITY</SectionLabel>

        {/* Contribution Graph */}
        <div style={{ marginTop: 'clamp(1.5rem, 3vw, 2.5rem)', marginBottom: '3rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            letterSpacing: '0.05em',
            color: 'var(--color-fg)',
            marginBottom: '1.5rem',
            textTransform: 'uppercase'
          }}>
            Contribution Graph
          </h3>
          <div style={{
            backgroundColor: '#0d1117',
            padding: '2rem',
            borderRadius: '4px',
            border: '1px solid var(--color-border)',
            overflowX: 'auto'
          }}>
            <GitHubCalendar 
              username={username} 
              theme={theme}
              colorScheme="dark"
              hideTotalCount
              hideColorLegend
            />
          </div>
        </div>

        {/* Recent Projects */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            letterSpacing: '0.05em',
            color: 'var(--color-fg)',
            marginBottom: '1.5rem',
            textTransform: 'uppercase'
          }}>
            Recent Projects
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '1.5rem',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#0a0a0a',
                  textDecoration: 'none',
                  color: 'inherit',
                  minHeight: '180px',
                  transition: 'border-color 200ms'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-accent)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
              >
                <h4 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  color: 'var(--color-fg)',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em'
                }}>
                  {repo.name}
                </h4>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--color-muted)',
                  lineHeight: 1.5,
                  marginBottom: 'auto'
                }}>
                  {repo.description || 'No description available'}
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginTop: '1.5rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: 'var(--color-muted)'
                }}>
                  {repo.language && (
                    <span style={{
                      color: 'var(--color-accent)',
                      border: '1px solid var(--color-accent)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '2px',
                      textTransform: 'uppercase'
                    }}>
                      {repo.language}
                    </span>
                  )}
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
                      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path>
                    </svg>
                    {repo.stargazers_count}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
                      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                    </svg>
                    {repo.forks_count}
                  </span>
                </div>
              </a>
            ))}
          </div>

          <a 
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'block',
              width: '100%',
              padding: '1rem',
              textAlign: 'center',
              border: '1px solid var(--color-border)',
              backgroundColor: 'transparent',
              color: 'var(--color-accent)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'background-color 200ms, color 200ms'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-accent)';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-accent)';
            }}
          >
            VIEW ALL REPOSITORIES →
          </a>
        </div>
      </div>
    </section>
  );
}
