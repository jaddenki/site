import { useState } from 'react';
import AnimatedText from './AnimatedText';

export default function BioCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
         <div className="bio-card bg-muted/30 rounded-xl transition-all duration-300 ease-out">
      {/* Main Bio Content - Always Visible */}
  <div className="text-lg leading-relaxed text-secondary space-y-4 font-['Opening Hours Sans']">
        <p>
          <AnimatedText text="Hi! I'm a third year undergrad student and motion artist studying CompE at [Purdue](https://www.purdue.edu/)" />
        </p>

        <p className="text-lg leading-relaxed">
          I create interfaces that move with purpose, spanning code, motion, and tangible design
        </p>
        
        <p className="text-lg leading-relaxed">Talk to me about games, video editing, and keyboards</p>
      </div>

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
  className="mt-6 flex items-center gap-2 text-secondary hover:text-accent transition-colors font-['Opening Hours Sans'] text-sm group"
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
                       <div className="space-y-4 text-secondary font-['Opening Hours Sans']">

              <p className="text-lg leading-relaxed">
                At the <a href="https://www.rcac.purdue.edu/envision" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">Envision Center</a>, I work across the stack: designing an ESP32-powered photometric stereo rig for 3D artists and contributing to a <a href="https://envision.center/" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">cross-platform MR classroom</a> for Meta Quest 3 and Vision Pro (used by 20+ departments).
              </p>
              
              <p className="text-lg leading-relaxed">
                Last summer, I prototyped a data platform for the U.S. Air Force, working in tight sprint cycles to ship production-quality software fast. <a href="https://www.purdue.edu/newsroom/2025/Q3/quantum-research-sciences-developing-ai-platform-to-help-air-force-more-efficiently-connect-with-industry/" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">Read more here</a>
              </p>

              <p className="text-lg leading-relaxed">
                As Communications Lead at <a href="https://www.purduehackers.com" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">Purdue Hackers</a> (3K+ members), I help run creative tech events and celebrate scrappy experimentation. I thrive in environments full of curiosity, late-night debugging, and low-stakes failure. We're currently working on a showcase of student-made creative technical projects, <a href="https://spill.purduehackers.com" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">spill ≋</a>
              </p>
              
              <p className="text-lg leading-relaxed">
                Outside of that: making<a href="https://jam.ms" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline"> games</a>, editing<a href="https://www.instagram.com/igarakii/" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline"> videos</a>, taking <a href="https://garden.jadden.xyz" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">photos</a>, and logging thoughts on <a href="https://letterboxd.com/jaddenki/" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">movies</a>
              </p>
              
              <p className="text-lg leading-relaxed font-semibold bg-accent/10 rounded-lg inline-block">
                  Currently playing <a href="https://store.steampowered.com/app/1610440/Minds_Beneath_Us/" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">Minds Beneath Us</a> and maintaining a <a href="https://store.steampowered.com/app/3852520/Spread_The_Love/" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">silly dating game about fruit jams</a>
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