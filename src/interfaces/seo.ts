export interface PageSEOProps {
  title: string;
  description?: string;
  image?: string;
  path?: string;

  [key: string]: string | number | boolean | undefined;
}
