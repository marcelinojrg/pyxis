'use client';

import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

interface SanitizedHtmlProps {
  content: string;
  className?: string;
}

export function SanitizedHtml({ content, className }: SanitizedHtmlProps) {
  const [sanitizedContent, setSanitizedContent] = useState('');

  useEffect(() => {
    const purifier = DOMPurify(window);
    setSanitizedContent(purifier.sanitize(content, { USE_PROFILES: { html: true } }));
  }, [content]);

  return <div className={className} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
}
