'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToolbar } from '@/components/ui/toolbars/toolbar-provider';

const fonts = [
  { label: 'Default', value: 'default' },
  { label: 'Inter', value: 'var(--font-inter)' },
];

export const FontFamilyToolbar = () => {
  const { editor } = useToolbar();

  const getCurrentValue = () => {
    const currentFont = fonts.find(f => editor?.isActive('textStyle', { fontFamily: f.value }));
    return currentFont?.value || 'default';
  };

  const onValueChange = (value: string) => {
    if (value === 'default') {
      editor?.chain().focus().unsetFontFamily().run();
    } else {
      editor?.chain().focus().setFontFamily(value).run();
    }
  };

  return (
    <Select value={getCurrentValue()} onValueChange={onValueChange}>
      <SelectTrigger className="h-8 w-[140px] text-xs">
        <SelectValue placeholder="Font Family" />
      </SelectTrigger>
      <SelectContent>
        {fonts.map(font => (
          <SelectItem 
            key={font.label} 
            value={font.value}
            style={{ fontFamily: font.value !== 'default' ? font.value : undefined }}
          >
            {font.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
