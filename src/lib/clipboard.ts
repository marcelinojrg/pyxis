import { toast } from 'sonner';

export const copyToClipboard = async (txt: string) => {
  try {
    await navigator.clipboard.writeText(txt);
    toast.success('Copied to clipboard.');
  } catch (err) {
    toast.error('Failed to copy to clipboard.');
  }
};
