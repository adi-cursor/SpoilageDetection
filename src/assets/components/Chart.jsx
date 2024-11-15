import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/assets/components/ui/card';

function Chart({ data, dataKey, title, color }) {
  return (
    <Card className='rounded-xl relative mb-8 overflow-hidden z-10'>
      <div className='absolute top-0 left-0 h-1/3 w-1/3 blur-[150px] rounded-full bg-bubble-2'></div>
      <CardHeader>
        <CardTitle className='text-2xl font-bold mb-4'>{title}</CardTitle>
      </CardHeader>
      <CardContent className='p-2'>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="time" stroke="hsl(var(--foreground))" />
            <YAxis stroke="hsl(var(--foreground))" />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              itemStyle={{ color: "hsl(var(--foreground))" }}
              labelFormatter={(value) => `Time: ${value}`}
              formatter={(value, name) => [value, name]}
            />
            <Line type="monotone" dataKey={dataKey} stroke={`hsl(var(--${color}))`} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default Chart;