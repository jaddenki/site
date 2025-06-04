import { useState, createContext, useContext } from 'react';
import { Fragment } from 'react';
const REDACTION_WEIGHTS = [10, 20, 35, 50, 70, 100];

// Map of original words to their alternates
const WORD_ALTERNATES: { [key: string]: string[] } = {
  "studying": ["suffering through", "conquering", "surviving", "speedrunning", "frolicking through"],
  "computer engineering": ["minecraft redstone", "cornfields"],
  "creative tech, motion, and the spaces in between" : ["not blowing up my computer", "pretty math and spicy metal","googling until it works"],

};

// Create a context for resetting all words
const ResetContext = createContext(() => {});

interface WordGroupProps {
  text: string;
  onReset: () => void;
}

function WordGroup({ text, onReset }: WordGroupProps) {
  const [weightIndex, setWeightIndex] = useState(0);
  const [isChanged, setIsChanged] = useState(false);
  const [currentText, setCurrentText] = useState(text);
  const [lastUsedIndex, setLastUsedIndex] = useState(-1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const lowerText = text.toLowerCase();
  const hasAlternates = lowerText in WORD_ALTERNATES;

  const getNextAlternate = () => {
    if (!hasAlternates) return text;
    
    const alternates = WORD_ALTERNATES[lowerText];
    let newIndex;
    
    do {
      newIndex = Math.floor(Math.random() * alternates.length);
    } while (alternates.length > 1 && newIndex === lastUsedIndex);
    
    setLastUsedIndex(newIndex);
    return alternates[newIndex];
  };

  const handleTextChange = () => {
    if (hasAlternates && !isChanged) {
      setIsTransitioning(true);
      setTimeout(() => {
        const newText = getNextAlternate();
        setIsChanged(true);
        setCurrentText(newText);
        setWeightIndex(Math.floor(Math.random() * REDACTION_WEIGHTS.length));
        setTimeout(() => {
          setIsTransitioning(false);
        }, 10);
      }, 150);
    }
  };

  const resetWord = () => {
    if (isChanged) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentText(text);
        setIsChanged(false);
        setWeightIndex(0);
        setLastUsedIndex(-1);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 10);
      }, 150);
    }
  };

  // Subscribe to reset context
  const contextReset = useContext(ResetContext);
  const handleReset = () => {
    resetWord();
    onReset();
  };

  return (
    <span
      className={`inline-block transition-all duration-150 ${
        isChanged ? 'text-accent bg-accent/10 rounded' : ''
      } ${isTransitioning ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}
      style={{
        fontFamily: `PolySans-Neutral, sans-serif`,
        transitionDuration: '150ms',
        transitionProperty: 'all'
      }}
      onMouseEnter={handleTextChange}
    >
      {currentText}
    </span>
  );
}

interface AnimatedTextProps {
  text: string;
  onReset?: () => void;
}

// Add this function before the AnimatedText component
function parseText(text: string) {
  const segments: { 
    text: string; 
    isPhrase: boolean;
    href?: string;
  }[] = [];
  
  let remainingText = text;
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      const beforeText = text.slice(lastIndex, match.index);
      processTextSegment(beforeText, segments);
    }

    // Add the link text as a segment with href
    const linkText = match[1];
    const href = match[2];
    segments.push({
      text: linkText,
      isPhrase: false,
      href: href
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text after last link
  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);
    processTextSegment(remainingText, segments);
  }

  return segments;
}

// Helper function to process non-link text
function processTextSegment(text: string, segments: any[]) {
  let remaining = text;
  const phrases = Object.keys(WORD_ALTERNATES).sort((a, b) => b.length - a.length);

  while (remaining.length > 0) {
    let found = false;
    for (const phrase of phrases) {
      const lowerRemaining = remaining.toLowerCase();
      if (lowerRemaining.startsWith(phrase)) {
        segments.push({
          text: remaining.slice(0, phrase.length),
          isPhrase: true
        });
        remaining = remaining.slice(phrase.length);
        found = true;
        break;
      }
    }
    if (!found) {
      const nextSpace = remaining.indexOf(' ');
      const wordEnd = nextSpace === -1 ? remaining.length : nextSpace;
      segments.push({
        text: remaining.slice(0, wordEnd),
        isPhrase: false
      });
      remaining = remaining.slice(wordEnd);
    }
    remaining = remaining.replace(/^\s+/, '');
  }
}

export default function AnimatedText({ text, onReset = () => {} }: AnimatedTextProps) {
  const segments = parseText(text);

  return (
    <ResetContext.Provider value={onReset}>
      <span className="font-display">
        {segments.map((segment, index) => (
          <Fragment key={index}>
            {segment.href ? (
              <a 
                href={segment.href}
                className="text-accent no-underline hover:underline"
                target={segment.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
              >
                {segment.text}
              </a>
            ) : segment.isPhrase ? (
              <WordGroup text={segment.text} onReset={onReset} />
            ) : (
              <span style={{ fontFamily: 'PolySans-Neutral' }}>
                {segment.text}
              </span>
            )}
            {index < segments.length - 1 && !segment.text.endsWith(' ') && !segments[index + 1].text.startsWith(' ') && ' '}
          </Fragment>
        ))}
      </span>
    </ResetContext.Provider>
  );
}