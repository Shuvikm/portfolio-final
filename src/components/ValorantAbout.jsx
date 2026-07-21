import { useState } from 'react';
import styles from './ValorantAbout.module.css';
import SectionLabel from './SectionLabel';

const agents = [
  {
    id: 'agent1',
    role: 'Developer',
    name: 'SHUVIK M',
    description: 'Specializing in the MERN stack. I build practical, scalable web applications with a focus on robust architecture and clean code.',
    image: '/assets/images/agent1.jpg',
    gradient: 'linear-gradient(to bottom right, #171d3b, #a67963)'
  },
  {
    id: 'agent2',
    role: 'Data Specialist',
    name: 'SHUVIK M',
    description: 'Experienced in Machine Learning using Python, Scikit-learn, and XGBoost. I love finding patterns in data and building predictive models.',
    image: '/assets/images/agent2.jpg',
    gradient: 'linear-gradient(to bottom right, #142852, #0a8f91)'
  },
  {
    id: 'agent3',
    role: 'Leader',
    name: 'SHUVIK M',
    description: 'Proven leadership as a Hackathon Team Lead and Agile practitioner. I thrive in collaborative environments and driving teams to success.',
    image: '/assets/images/agent3.jpg',
    gradient: 'linear-gradient(to bottom right, #641b6b, #e6d591)'
  },
  {
    id: 'agent4',
    role: 'Creator',
    name: 'SHUVIK M',
    description: 'Passionate about digital design. Leveraging tools like Figma and Canva to create stunning, interactive user experiences.',
    image: '/assets/images/agent4.jpg',
    gradient: 'linear-gradient(to bottom right, #5e3839, #7a943e)'
  }
];

export default function ValorantAbout() {
  const [currentAgentIndex, setCurrentAgentIndex] = useState(0);
  const currentAgent = agents[currentAgentIndex];

  return (
    <section id="about" className={styles.section} aria-label="About Shuvik M">
      {/* Background Gradient */}
      <div 
        className={styles.gradient} 
        style={{ background: currentAgent.gradient }}
      ></div>

      {/* Repeated Background Names */}
      <div className={styles.namesBg}>
        <p className={`${styles.hero} ${styles.bgText}`}>SHUVIK M</p>
        <p className={`${styles.hero} ${styles.bgText}`}>SHUVIK M</p>
        <p className={`${styles.hero} ${styles.bgText}`}>SHUVIK M</p>
        <p className={`${styles.hero} ${styles.bgText}`}>SHUVIK M</p>
      </div>

      {/* Agent Layers (key forces re-animation on state change) */}
      <div className={styles.agentContainer} key={currentAgent.id}>
        <img 
          src={currentAgent.image} 
          alt="" 
          className={`${styles.agentImage} ${styles.agentLayerB}`} 
        />
        <img 
          src={currentAgent.image} 
          alt="" 
          className={`${styles.agentImage} ${styles.agentLayerS}`} 
        />
        <img 
          src={currentAgent.image} 
          alt={currentAgent.role} 
          className={`${styles.agentImage} ${styles.agentMain}`} 
        />
      </div>

      {/* Foreground Text Grid */}
      <div className={styles.textMaster}>
        <div></div>
        <div className={styles.textWrap}>
          {/* Key forces re-animation of text */}
          <div key={`text-${currentAgent.id}`} className={styles.animatedText}>
            <p className={`${styles.hero} ${styles.heroRole}`}>{currentAgent.role}</p>
            <h1 className={`${styles.hero} ${styles.heroName}`}>{currentAgent.name}</h1>
            <p className={`${styles.hero} ${styles.heroDesc}`}>
              {currentAgent.description}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Portraits */}
      <div className={styles.nav} style={{ zIndex: 'var(--z-nav)' }}>
        {agents.map((agent, index) => (
          <img 
            key={agent.id}
            src={agent.image} 
            alt={`Select ${agent.role}`} 
            className={`${styles.portrait} ${index === currentAgentIndex ? styles.active : ''}`}
            onClick={() => setCurrentAgentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}
