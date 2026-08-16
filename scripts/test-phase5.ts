import React from 'react';
import { Button } from '../src/components/ui/button';
import { Container } from '../src/components/ui/container';
import { Section } from '../src/components/ui/section';
import { Heading } from '../src/components/ui/heading';
import { Card } from '../src/components/ui/card';
import { Badge } from '../src/components/ui/badge';
import { Input } from '../src/components/ui/input';
import { Textarea } from '../src/components/ui/textarea';
import { Select } from '../src/components/ui/select';
import { Dialog } from '../src/components/ui/dialog';
import { Table } from '../src/components/ui/table';
import { EmptyState } from '../src/components/ui/empty-state';
import { ErrorState } from '../src/components/ui/error-state';
import { Skeleton } from '../src/components/ui/skeleton';

async function testPhase5() {
  console.log('🧪 Testing Phase 5 Design System components export & types...\n');

  const components = [
    { name: 'Button', comp: Button },
    { name: 'Container', comp: Container },
    { name: 'Section', comp: Section },
    { name: 'Heading', comp: Heading },
    { name: 'Card', comp: Card },
    { name: 'Badge', comp: Badge },
    { name: 'Input', comp: Input },
    { name: 'Textarea', comp: Textarea },
    { name: 'Select', comp: Select },
    { name: 'Dialog', comp: Dialog },
    { name: 'Table', comp: Table },
    { name: 'EmptyState', comp: EmptyState },
    { name: 'ErrorState', comp: ErrorState },
    { name: 'Skeleton', comp: Skeleton },
  ];

  for (const { name, comp } of components) {
    if (!comp) {
      throw new Error(`Component ${name} is not exported properly`);
    }
    console.log(`✅ ${name} primitive verified`);
  }

  console.log('\n🎉 ALL PHASE 5 DESIGN SYSTEM PRIMITIVES VERIFIED!');
}

testPhase5().catch((err) => {
  console.error('❌ Phase 5 test failed:', err);
  process.exit(1);
});
