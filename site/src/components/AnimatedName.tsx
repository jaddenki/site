import { useState } from 'react';

const REDACTION_WEIGHTS = [10, 20, 35, 50, 70, 100];
const CYCLE_INTERVAL = 100; // faster cycling for title

const TEXT_SIZE_CLASSES = {
  'lg': 'text-lg',
  'xl': 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
  '7xl': 'text-7xl'
} as const;

interface AnimatedNameProps {
  text: string;
  size?: keyof typeof TEXT_SIZE_CLASSES;
  showAsterisk?: boolean;
}

export default function AnimatedName({ text, size = '7xl', showAsterisk = false }: AnimatedNameProps) {
  return (
    <h1 className={TEXT_SIZE_CLASSES[size]}>
      {showAsterisk && (
        <>
          <TitleLetter letter="*" isAccent={true} />
          <span>&nbsp;</span>
        </>
      )}
      {text.split('').map((letter, index) => (
        <TitleLetter key={index} letter={letter} />
      ))}
    </h1>
  );
}

interface TitleLetterProps {
  letter: string;
  isAccent?: boolean;
}

function TitleLetter({ letter, isAccent = false }: TitleLetterProps) {
  const [weightIndex, setWeightIndex] = useState(
    Math.floor(Math.random() * REDACTION_WEIGHTS.length)
  );

  // Only render a span if it's not a space
  if (letter === ' ') {
    return <span>&nbsp;</span>;
  }

  return (
    <span
      className={`inline-block transition-all ${isAccent ? 'text-accent' : ''}`}
      style={{
        fontFamily: `Redaction-${REDACTION_WEIGHTS[weightIndex]}`,
        transitionDuration: '100ms'
      }}
      onMouseEnter={() => {
        // On hover, just pick a random new weight
        const newIndex = Math.floor(Math.random() * REDACTION_WEIGHTS.length);
        setWeightIndex(newIndex);
      }}
    >
      {letter}
    </span>
  );
} 