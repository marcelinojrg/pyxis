// import { Container } from '@/components/ui/container';
// import { Section } from '@/components/ui/section';
// import { Heading } from '@/components/ui/heading';
// import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Settings, Users, Headphones, Shield, Zap, Sparkles, Layers } from 'lucide-react';

// interface HighlightItem {
//   id: number;
//   title: string;
//   description?: string | null;
//   iconKey?: string | null;
//   order: number;
// }

// interface HomeHighlightsProps {
//   highlights: HighlightItem[];
// }

// const ICON_MAP: Record<string, React.ElementType> = {
//   settings: Settings,
//   users: Users,
//   'help-circle': Headphones,
//   support: Headphones,
//   shield: Shield,
//   zap: Zap,
//   layers: Layers,
// };

// export default function HomeHighlights({ highlights }: HomeHighlightsProps) {
//   if (!highlights || highlights.length === 0) return null;

//   return (
//     <Section variant="muted">
//       <Container>
//         <Heading
//           eyebrow="Keunggulan Kami"
//           title="Mengapa Memilih Solusi Pyxis?"
//           description="Kombinasi pengalaman industri mendalam, teknologi terpercaya, dan dukungan purna jual berkelanjutan."
//           align="center"
//           className="mb-14"
//         />

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {highlights.map((item) => {
//             const IconComponent = (item.iconKey && ICON_MAP[item.iconKey]) || Sparkles;

//             return (
//               <Card key={item.id} hoverEffect className="bg-white border-neutral-200">
//                 <CardHeader className="space-y-4">
//                   <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-sm">
//                     <IconComponent className="w-6 h-6" />
//                   </div>
//                   <CardTitle className="text-xl">{item.title}</CardTitle>
//                   {item.description && (
//                     <CardDescription className="text-sm text-neutral-600 leading-relaxed">
//                       {item.description}
//                     </CardDescription>
//                   )}
//                 </CardHeader>
//               </Card>
//             );
//           })}
//         </div>
//       </Container>
//     </Section>
//   );
// }
