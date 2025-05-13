import { useState, createContext, useContext } from 'react';

const REDACTION_WEIGHTS = [10, 20, 35, 50, 70, 100];

// Map of original words to their alternates
const WORD_ALTERNATES: { [key: string]: string[] } = {
  "studying": ["suffering through", "conquering", "surviving", "speedrunning"],
  "computer engineering": ["machine magic", "minecraft redstone"],
  "engineering": ["magic", "shenanigans"],
  "hardware": ["circuit whispering", "metal bending", "electricity taming", "wire spaghetti"],
  "web dev": ["ctrl+c ctrl+v", "bug creating", "internet magic", "keyboard mashing"],
  "visual computing": ["pretty pixels", "shiny things", "computer whispering"],
  "artistic expression": ["chaos creation", "vibes", "galaxy brain"],
  "learn": ["stumble through", "galaxy brain", "level up"],
  "play": ["vibe", "transcend", "ascend"],
  "connect": ["vibe together", "merge minds", "share braincells"]
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
        isChanged ? 'text-accent bg-accent/10 px-1 rounded' : ''
      } ${isTransitioning ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}
      style={{
        fontFamily: `Redaction-${REDACTION_WEIGHTS[weightIndex]}`,
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

export default function AnimatedText({ text, onReset = () => {} }: AnimatedTextProps) {
  // Find all possible phrases from WORD_ALTERNATES in the text
  const phrases = Object.keys(WORD_ALTERNATES).sort((a, b) => b.length - a.length);
  let segments: { text: string; isPhrase: boolean }[] = [];
  let remainingText = text;

  while (remainingText.length > 0) {
    let found = false;
    for (const phrase of phrases) {
      const lowerRemaining = remainingText.toLowerCase();
      if (lowerRemaining.startsWith(phrase)) {
        // Add the phrase
        segments.push({
          text: remainingText.slice(0, phrase.length),
          isPhrase: true
        });
        remainingText = remainingText.slice(phrase.length);
        found = true;
        break;
      }
    }
    if (!found) {
      // Find the next space or end of string
      const nextSpace = remainingText.indexOf(' ');
      const wordEnd = nextSpace === -1 ? remainingText.length : nextSpace;
      segments.push({
        text: remainingText.slice(0, wordEnd),
        isPhrase: false
      });
      remainingText = remainingText.slice(wordEnd);
    }
    // Skip spaces
    remainingText = remainingText.replace(/^\s+/, '');
  }

  return (
    <ResetContext.Provider value={onReset}>
      <span className="font-display">
        {segments.map((segment, index) => (
          <>
            {segment.isPhrase ? (
              <WordGroup key={index} text={segment.text} onReset={onReset} />
            ) : (
              <span 
                key={index}
                style={{
                  fontFamily: 'Redaction-10'
                }}
              >
                {segment.text}
              </span>
            )}
            {index < segments.length - 1 && (
              <span className="inline-block" style={{ width: '0.25em' }}>&nbsp;</span>
            )}
          </>
        ))}
      </span>
    </ResetContext.Provider>
  );
} 