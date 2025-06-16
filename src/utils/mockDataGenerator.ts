import { TimelineInterval } from '../Component/AvailableRate/MachineTimeline';

// Helper function to format time as HH:mm
const formatTime = (hours: number, minutes: number): string => {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

// Generate a random time between start and end hours
const generateRandomTime = (startHour: number, endHour: number): string => {
  const hours = Math.floor(Math.random() * (endHour - startHour)) + startHour;
  const minutes = Math.floor(Math.random() * 60);
  return formatTime(hours, minutes);
};

// Generate a random duration in minutes (between min and max)
const generateRandomDuration = (minMinutes: number, maxMinutes: number): number => {
  return Math.floor(Math.random() * (maxMinutes - minMinutes + 1)) + minMinutes;
};

// Add minutes to a time string
const addMinutesToTime = (time: string, minutes: number): string => {
  const [hours, mins] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + mins + minutes;
  const newHours = Math.floor(totalMinutes / 60);
  const newMins = totalMinutes % 60;
  return formatTime(newHours, newMins);
};

// Generate random status with weighted probabilities
const generateRandomStatus = (): 'Chạy' | 'Dừng' | 'Chờ' | 'Offline' => {
  const random = Math.random();
  if (random < 0.6) return 'Chạy';      // 60% chance
  if (random < 0.8) return 'Dừng';      // 20% chance
  if (random < 0.9) return 'Chờ';       // 10% chance
  return 'Offline';                      // 10% chance
};

// Generate mock data for a single day
export const generateMockTimelineData = (): TimelineInterval[] => {
  const data: TimelineInterval[] = [];
  let currentTime = '08:00';  // Start at 8 AM
  const endTime = '17:00';    // End at 5 PM

  while (currentTime < endTime) {
    // Generate random duration between 15 minutes and 2 hours
    const duration = generateRandomDuration(15, 120);
    const nextTime = addMinutesToTime(currentTime, duration);

    // Don't create intervals that go beyond end time
    if (nextTime > endTime) break;

    data.push({
      startTime: currentTime,
      endTime: nextTime,
      status: generateRandomStatus()
    });

    currentTime = nextTime;
  }

  return data;
};

// Generate mock data for multiple days
export const generateMockTimelineDataForDays = (days: number): { [key: string]: TimelineInterval[] } => {
  const result: { [key: string]: TimelineInterval[] } = {};
  
  for (let i = 0; i < days; i++) {
    const deviceId = `device_${i + 1}`;
    result[deviceId] = generateMockTimelineData();
  }

  return result;
};

// Example usage:
// const singleDayData = generateMockTimelineData();
// const multipleDaysData = generateMockTimelineDataForDays(5); 