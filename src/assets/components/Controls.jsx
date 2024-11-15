import { Button } from '@/src/assets/components/ui/button';
import { Progress } from '@/src/assets/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/assets/components/ui/select';
import { RefreshCw, Loader } from 'lucide-react';

function Controls({ refreshRate, setRefreshRate, lastRefresh, refreshData, isRefreshing, timeUntilRefresh }) {
  const formatDateTime = (date) => `${date.toLocaleDateString('en-GB')} ${date.toLocaleTimeString('en-GB', { hour12: false })}`;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Select value={refreshRate} onValueChange={setRefreshRate}>
          <SelectTrigger className="w-[200px] border-none p-2 rounded-t-lg ">
            <SelectValue placeholder="Select refresh rate" />
          </SelectTrigger>
          <SelectContent className='bg-card w-[200px] border-none rounded-b-lg'>
            <SelectItem value="5000" >Every 5 seconds  </SelectItem>
            <SelectItem value="60000">Every 1 minute  </SelectItem>
            <SelectItem value="300000">Every 5 minutes  </SelectItem>
          </SelectContent>
        </Select>
        <span>Last refreshed: {formatDateTime(lastRefresh)}</span>
      </div>
      <div className="flex items-center gap-4">
        <Progress value={(timeUntilRefresh / parseInt(refreshRate)) * 100} className="w-[100px]" />
        <Button onClick={refreshData} disabled={isRefreshing}>
          {isRefreshing ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Refresh Data
        </Button>
      </div>
    </div>
  );
}


export default Controls;