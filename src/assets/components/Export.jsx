import { Button } from '@/src/assets/components/ui/button';
import { Download, Loader } from 'lucide-react';

function Export({ onExport, isExporting }) {
  return (
    <div className="flex justify-end">
      <Button onClick={onExport} disabled={isExporting}>
        {isExporting ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Download className="mr-2 h-4 w-4" />
        )}
        Export Data
      </Button>
    </div>
  );
}

export default Export;