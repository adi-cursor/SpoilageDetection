import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader, Sun, Moon } from 'lucide-react';
import StatusCard from './StatusCard';
import Alert from './Alert';
import Chart from './Chart';
import Tables from './Tables';
import Controls from './Controls';
import Export from './Export';

const generateRandomData = (count) => {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const time = new Date(now.getTime() - (count - 1 - i) * 60000);
    return {
      id: i + 1,
      time: time.toLocaleTimeString('en-GB', { hour12: false }),
      date: time.toLocaleDateString('en-GB'),
      methane: +(Math.random() * 300).toFixed(2),
      temperature: +(Math.random() * 10 + 20).toFixed(1),
    };
  });
};

function Main() {
  const [theme, setTheme] = useState('dark');
  const [isSpoiled, setIsSpoiled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [refreshRate, setRefreshRate] = useState('60000');
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [data, setData] = useState(generateRandomData(10  ));
  const [timeUntilRefresh, setTimeUntilRefresh] = useState(parseInt(refreshRate));

  const refreshData = useCallback(() => {
    setIsRefreshing(true);
    const newData = generateRandomData(10);
    setData(newData);
    setIsSpoiled(newData[newData.length - 1].methane > 250);
    setLastRefresh(new Date());
    setTimeUntilRefresh(parseInt(refreshRate));
    setTimeout(() => setIsRefreshing(false), 500);
  }, [refreshRate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeUntilRefresh((prevTime) => {
        if (prevTime <= 1000) {
          refreshData();
          return parseInt(refreshRate);
        }
        return prevTime - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [refreshRate, refreshData]);

  useEffect(() => {
    setTimeUntilRefresh(parseInt(refreshRate));
  }, [refreshRate]);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 2000);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen p-8 ${theme === 'light' ? 'bg-background text-foreground' : 'dark bg-background text-foreground'}`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Food Spoilage Monitoring Dashboard</h1>
        <button onClick={toggleTheme} className="outline-button">
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>
      </div>
      
      <Controls
        refreshRate={refreshRate}
        setRefreshRate={setRefreshRate}
        lastRefresh={lastRefresh}
        refreshData={refreshData}
        isRefreshing={isRefreshing}
        timeUntilRefresh={timeUntilRefresh}
      />

      <StatusCard isSpoiled={isSpoiled} lastReading={data[data.length - 1]} />

      <AnimatePresence>
        {isSpoiled && <Alert />}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Chart data={data} dataKey="methane" title="Methane Gas Levels" color="primary" />
        <Chart data={data} dataKey="temperature" title="Temperature" color="primary" />
      </div>

      <Tables data={data} />

      <Export onExport={handleExport} isExporting={isExporting} />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
              <Loader className="h-12 w-12 text-primary" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Main;