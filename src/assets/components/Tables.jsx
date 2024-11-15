import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/assets/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/src/assets/components/ui/card';
import { motion } from "framer-motion";

function Tables({ data }) {
  return (
    <Card className="rounded-xl mb-8 p-2 overflow-hidden z-10">
      <div className='absolute top-0 left-0 h-1/3 w-1/3 blur-[150px] rounded-full bg-bubble-3 z-0'></div>
      <CardHeader>
        <CardTitle>Recent Readings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Methane (ppm)</TableHead>
              <TableHead>Temperature (°C)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((reading, index) => (
              <motion.tr
                key={reading.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TableCell>{reading.date}</TableCell>
                <TableCell>{reading.time}</TableCell>
                <TableCell>{reading.methane.toFixed(2)}</TableCell>
                <TableCell>{reading.temperature.toFixed(1)}</TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default Tables;
