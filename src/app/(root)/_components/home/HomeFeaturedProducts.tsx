// import Link from 'next/link';
// import { Container } from '@/components/ui/container';
// import { Section } from '@/components/ui/section';
// import { Heading } from '@/components/ui/heading';
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { buttonVariants } from '@/components/ui/button';
// import { ArrowRight, CheckCircle2, Hotel, Utensils } from 'lucide-react';
// import { cn } from '@/lib/utils';

// interface ProductItem {
//   id: number;
//   name: string;
//   slug: string;
//   shortDesc: string;
//   features: string[];
//   imageUrl?: string | null;
//   isFeatured: boolean;
// }

// interface HomeFeaturedProductsProps {
//   products: ProductItem[];
// }

// export default function HomeFeaturedProducts({ products }: HomeFeaturedProductsProps) {
//   if (!products || products.length === 0) return null;

//   return (
//     <Section variant="default" className="border-t border-neutral-200/80">
//       <Container>
//         <Heading
//           eyebrow="Solusi Utama"
//           title="Produk Unggulan Kami"
//           description="Sistem software yang dirancang spesifik untuk kebutuhan industri perhotelan dan F&B dengan keandalan tinggi."
//           align="center"
//           className="mb-14"
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
//           {products.map((product) => {
//             const isHotel =
//               product.slug.includes('pms') || product.name.toLowerCase().includes('hotel');
//             const Icon = isHotel ? Hotel : Utensils;
//             const categoryBadge = isHotel ? 'Hotel Management' : 'Restaurant & POS';

//             return (
//               <Card
//                 key={product.id}
//                 hoverEffect
//                 className="flex flex-col justify-between h-full bg-white"
//               >
//                 <div>
//                   <CardHeader className="pb-4">
//                     <div className="flex items-center justify-between gap-2 mb-3">
//                       <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
//                         <Icon className="w-6 h-6" />
//                       </div>
//                       <Badge variant={isHotel ? 'default' : 'secondary'}>{categoryBadge}</Badge>
//                     </div>
//                     <CardTitle className="text-2xl">{product.name}</CardTitle>
//                     <CardDescription className="text-sm mt-1">{product.shortDesc}</CardDescription>
//                   </CardHeader>

//                   <CardContent className="pt-2">
//                     <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
//                       Fitur Utama:
//                     </h4>
//                     <ul className="space-y-2.5">
//                       {product.features.slice(0, 5).map((feature, idx) => (
//                         <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-700">
//                           <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
//                           <span>{feature}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </CardContent>
//                 </div>

//                 <CardFooter className="pt-6 border-t border-neutral-100">
//                   <Link
//                     href={`/products/${product.slug}`}
//                     className={cn(
//                       buttonVariants({ variant: 'outline', fullWidth: true }),
//                       'gap-2 justify-center'
//                     )}
//                   >
//                     <span>Pelajari Selengkapnya</span>
//                     <ArrowRight className="w-4 h-4" />
//                   </Link>
//                 </CardFooter>
//               </Card>
//             );
//           })}
//         </div>

//         <div className="mt-12 text-center">
//           <Link
//             href="/products"
//             className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-light transition-colors"
//           >
//             <span>Lihat seluruh daftar produk & layanan Pyxis</span>
//             <ArrowRight className="w-4 h-4" />
//           </Link>
//         </div>
//       </Container>
//     </Section>
//   );
// }
