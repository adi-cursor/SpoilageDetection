import { motion } from 'framer-motion';
import { Card, CardContent } from '@/src/assets/components/ui/card';
import { AlertTriangle } from 'lucide-react';

function Alert() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50}}
      animate={{ opacity: 1, y: 0}}
      exit={{ opacity: 0, y: 50}}
      transition={{ duration: 0.5 }}
      className=' fixed w-full bottom-2 flex items-center justify-center p-10 z-50 left-0' 
    >
      <Card className="bg-destructive text-destructive-foreground w-full rounded-xl">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <AlertTriangle className="mr-2 h-6 w-6" />
            <span className="text-xl font-bold">Food Spoilage Alert!</span>
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <div className="h-4 w-4 rounded-full bg-destructive-foreground" />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default Alert;