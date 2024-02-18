import React, { useEffect, useState } from 'react';

interface TextCutterProps {
  text: string;
  maxWords: number;
}

export const TextCutter = ({ text, maxWords } : TextCutterProps) => {
  const [truncatedText, setTruncatedText] = useState<string>('');

  useEffect(() => {
    const truncateWords = (text: string, maxWords: number): string => {
        const withoutFirstHtmlTag = text.replace(/<[^>]+>/, '');
  
        const words = withoutFirstHtmlTag.split(' ');
        const truncated = words.slice(0, maxWords).join(' ');
        return words.length > maxWords ? truncated + '...' : truncated;
      };

    setTruncatedText(truncateWords(text, maxWords));
  }, [text, maxWords]);

  return <p dangerouslySetInnerHTML={{__html : truncatedText}}/>;
};