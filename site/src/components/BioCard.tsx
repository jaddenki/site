import { useState } from 'react';
import AnimatedText from './AnimatedText';

export default function BioCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
         <div className="bio-card bg-muted/30 rounded-xl transition-all duration-300 ease-out">
      {/* Main Bio Content - Always Visible */}
      <div className="text-lg leading-relaxed text-secondary space-y-4 font-['Syne']">
        <p>
          <AnimatedText text="Hi! I'm a third year undergrad studying CompE at [Purdue](https://www.purdue.edu)" />
        </p>

        <p className="text-lg leading-relaxed">
          I'm passionate about creative tech, motion, and the spaces in between, and I care deeply about accessibility in design and public media
        </p>
        
        {/* <p>
          <AnimatedText text="Right now, I help grow a culture of joyful, chaotic tinkering as the Communications Lead for [Purdue Hackers](https://www.purduehackers.com) and support civic-minded tech projects as a Student Lab Manager at [C3](https://honors.purdue.edu/research/generators/c3.php)" />
        </p> */}
        
        <p className="text-lg leading-relaxed">Talk to me about games, media trends, and editing</p>
      </div>

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-6 flex items-center gap-2 text-secondary hover:text-accent transition-colors font-['Syne'] text-sm group"
      >
        <span>{isExpanded ? 'show less' : 'read more'}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M7 10l5 5 5-5z"/>
        </svg>
      </button>

      {/* Extended Bio Content - Collapsible */}
      <div className={`extended-bio overflow-hidden transition-all duration-500 ease-out ${isExpanded ? 'max-h-[2000px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
        <div className="space-y-6">
                     {/* Extended Text Content */}
                       <div className="space-y-4 text-secondary font-['Syne']">

              <p className="text-lg leading-relaxed">
               Oh wow... you pressed <span className="text-accent font-semibold">read more</span>... Hi, I'm Jadden! I like <span className="text-accent font-semibold">making games</span> and <span className="text-accent font-semibold">editing videos</span>. I'll use this as an opportunity to tell you more about what I'm up to:
              </p>


              <p className="text-lg leading-relaxed">
                I'm concentrating in <span className="text-accent font-semibold">computer systems and software engineering</span> as a computer engineering major at Purdue, where I'm especially fascinated by embedded systems and signal processing architectures
              </p>
              
              <p className="text-lg leading-relaxed">
                During Summer 2025, I worked as a <span className="text-accent font-semibold">software programmer</span> on a Purdue-affiliated research grant (<span className="text-accent font-semibold">SBIR Phase I</span>), helping prototype a platform for improving Air Force operations and decision workflows. It involved full-stack development, frontend UX design, and backend tooling focused on performance and usability
              </p>

              <p className="text-lg leading-relaxed">
                I'm also a <span className="text-accent font-semibold">student software developer</span> at the <a href="https://www.rcac.purdue.edu/envision" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">Envision Center</a>, where I work on scientific visualization projects, virtual reality applications, and multimedia production. I help researchers communicate complex concepts through interactive visualizations
              </p>
              
              <p className="text-lg leading-relaxed">
                At <a href="https://honors.purdue.edu/research/generators/c3.php" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">C3 (Computing for Community Collaboratory)</a>, I work as a <span className="text-accent font-semibold">Student Lab Manager</span> supporting projects that leverage computing for social good. That means organizing student research and fostering inclusive collaboration. <a href="/projects/game-jam" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">We held a 48 hour research-oriented game jam!</a>
              </p>
              
              <p className="text-lg leading-relaxed">
                As the <span className="text-accent font-semibold">Communications Division Lead</span> at <a href="https://www.purduehackers.com" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">Purdue Hackers</a>, I help run events and celebrate scrappy experimentation. Whether it's a game jam, <a href="https://burst.purduehackers.com/" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">art show</a>, or hardware hack, I believe in making room for beginner joy and low-stakes failure
              </p>
              
              <p className="text-lg leading-relaxed">
                I also do work as a <span className="text-accent font-semibold">freelance video editor</span>; I love the challenge of taking ideas and turning them into something that tells <span className="text-accent font-semibold">more</span>. It's taught me a lot about pacing, visual storytelling, and how to work with clients to bring their vision to life
              </p>

              <p className="text-lg leading-relaxed">
                Outside of all of that, you'll find me watching deep dive analyses of Reddit threads 
                and horror games, developing <a href="https://fruitjamms.github.io/" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">games</a> with friends, <a href= "https://www.instagram.com/igarakii/" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">editing a video</a> that strains my own eyes, or logging my thoughts on <a href="https://letterboxd.com/jaddenki/" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">movies</a>
              </p>
              
              <p className="text-lg leading-relaxed font-semibold bg-accent/10 rounded-lg inline-block">
                  Currently, I'm playing <a href="https://store.steampowered.com/app/1610440/Minds_Beneath_Us/" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">Minds Beneath Us</a> and making a <a href="https://store.steampowered.com/app/3852520/Spread_The_Love/" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">silly dating game about fruit jams</a>
              </p>


            </div> 
           <div className="w-full">
             <img 
               src="https://i.imgur.com/EZV3Boq.jpeg" 
               alt="im sitting on rocks at a beach. i look so tiny here." 
               className="aspect-video w-full object-cover rounded-lg"
             />
           </div>
        </div>
      </div>
    </div>
  );
}