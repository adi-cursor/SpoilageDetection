import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/assets/components/ui/card';

function StatusCard({ isSpoiled, lastReading }) {
  return (
    <Card className="rounded-xl relative mb-8 overflow-hidden z-10">
      <div className='absolute top-0 left-0 h-40 w-40 blur-[150px]  rounded-full bg-bubble-1 z-0'></div>
      <CardHeader>
        <CardTitle className="text-3xl font-bold mb-2">Food Status</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`text-2xl font-bold p-2 ${isSpoiled ? 'text-red-600' : 'text-primary'}`}
        >
          {isSpoiled ? 'Spoiled' : 'Not Spoiled'}
        </motion.div>
        <div className="mt-4 grid grid-rows-2 sm:grid-cols-2 sm:grid-rows-none  gap-4">
          <div className='bg-card p-4 rounded-xl'>
            <p className="text-xl font-medium">Last Methane Reading</p>
            <p className="text-md">{lastReading.methane.toFixed(2)} ppm</p>
          </div>
          <div className='bg-card p-4 rounded-xl'>
            <p className="text-xl font-medium">Last Temperature Reading</p>
            <p className="text-md">{lastReading.temperature.toFixed(1)} °C</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export default StatusCard;