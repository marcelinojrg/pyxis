'use client';

import { useMemo } from 'react';
import DOMPurify from 'dompurify';

interface SanitizedHtmlProps {
  content: string;
  className?: string;
}

export function SanitizedHtml({ content, className }: SanitizedHtmlProps) {
  const sanitizedContent = useMemo(
    () => DOMPurify.sanitize(content, { USE_PROFILES: { html: true } }),
    [content]
  );

  return <div className={className} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
}
