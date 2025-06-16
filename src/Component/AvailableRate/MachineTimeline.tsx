import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import moment from 'moment';
import { generateMockTimelineData } from '../../utils/mockDataGenerator';

interface MachineTimelineProps {
  deviceId: string;
  selectedDate: moment.Moment;
  machineName: string;
  machineType: string;
}

interface DeviceData {
  [key: string]: TimelineInterval[];
}

export interface TimelineInterval {
  startTime: string;
  endTime: string;
  status: 'Chạy' | 'Dừng' | 'Chờ' | 'Offline';
}

interface Dimensions {
  width: number;
  height: number;
}

interface LegendItem {
  status: string;
  time: string;
  color: string;
}

const MachineTimeline: React.FC<MachineTimelineProps> = ({ deviceId, selectedDate, machineName, machineType }) => {
  const fixedHeight = 130;
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [deviceData, setDeviceData] = useState<DeviceData>({});
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 800, height: fixedHeight });
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addOfflineIntervals = (data: TimelineInterval[]): TimelineInterval[] => {
    const newData: TimelineInterval[] = [];
    const startOfDay = moment('00:00', 'HH:mm');
  
    if (data.length === 0) {
      newData.push({
        startTime: startOfDay.format('HH:mm'),
        endTime: '23:59',
        status: 'Offline',
      });
      return newData;
    }
  
    const firstIntervalStart = moment(data[0].startTime, 'HH:mm');
    if (firstIntervalStart.isAfter(startOfDay)) {
      newData.push({
        startTime: startOfDay.format('HH:mm'),
        endTime: firstIntervalStart.format('HH:mm'),
        status: 'Offline',
      });
    }
  
    newData.push(...data);
  
    return newData;
  };

  const calculateTotalTimes = (data: TimelineInterval[]): { [key: string]: string } => {
    const totalTime: { [key: string]: number } = { 'Chạy': 0, 'Dừng': 0, 'Chờ': 0, 'Offline': 0 };

    data.forEach((interval) => {
      const start = moment(interval.startTime, 'HH:mm');
      const end = moment(interval.endTime, 'HH:mm');
      const duration = moment.duration(end.diff(start));
      const minutes = duration.asMinutes();

      totalTime[interval.status] += minutes;
    });

    return Object.fromEntries(Object.entries(totalTime).map(([status, minutes]) => [
      status,
      `${Math.floor(minutes / 60)} giờ ${minutes % 60} phút`
    ]));
  };

  useEffect(() => {
    if (deviceId && selectedDate) {
      fetchTelemetryData(deviceId);
    }
  }, [deviceId, selectedDate]);

  const fetchTelemetryData = async (deviceId: string) => {
    setLoading(true);
    try {
      // Use mock data generator
      const mockData = generateMockTimelineData();
      setDeviceData((prevData) => ({ ...prevData, [deviceId]: addOfflineIntervals(mockData) }));

      // Commented out API call
      /*
      const startTime = selectedDate.clone().startOf('day').toISOString();
      const endTime = selectedDate.clone().endOf('day').toISOString();
      const apiEndpoint = `${apiUrl}/machine-operations/${deviceId}/timeline?startTime=${startTime}&endTime=${endTime}`;
      const response = await axios.get(apiEndpoint);

      if (response.data?.data?.length > 0) {
        const intervals = response.data.data[0].intervals;
        const flatData: TimelineInterval[] = intervals.map((interval: any) => ({
          startTime: moment(interval.startTime).format('HH:mm'),
          endTime: moment(interval.endTime).format('HH:mm'),
          status: interval.status === 'Run' ? 'Chạy' : interval.status === 'Stop' ? 'Dừng' : 'Chờ'
        }));
        setDeviceData((prevData) => ({ ...prevData, [deviceId]: addOfflineIntervals(flatData) }));
      } else {
        console.warn(`No intervals found for deviceId ${deviceId}`);
        setDeviceData((prevData) => ({ ...prevData, [deviceId]: [] }));
      }
      */
    } catch (error) {
      console.error(`Error fetching telemetry data for deviceId ${deviceId}:`, error);
      setDeviceData((prevData) => ({ ...prevData, [deviceId]: [] }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    setIsDarkMode(theme === 'dark');
  }, []);

  useEffect(() => {
    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background-color', 'white')
      .style('border', '1px solid #ccc')
      .style('padding', '5px')
      .style('border-radius', '4px')
      .style('display', 'none')
      .style('pointer-events', 'none');

    const drawChart = () => {
      if (!svgRef.current) return;
      
      const svg = d3.select(svgRef.current);
      const { width, height } = dimensions;
      const margin = { top: 0, right: 10, bottom: 40, left: 20 };

      svg.selectAll('*').remove();

      if (loading) {
        svg.append('text')
          .attr('x', width / 2)
          .attr('y', height / 2)
          .attr('text-anchor', 'middle')
          .style('font-size', '16px')
          .style('fill', '#888')
          .text('Đang tải...');
        return;
      }

      if (!deviceData[deviceId] || deviceData[deviceId].length === 0) {
        svg.append('text')
          .attr('x', width / 2)
          .attr('y', height / 2)
          .attr('text-anchor', 'middle')
          .style('font-size', '16px')
          .style('fill', '#888')
          .text('Không có dữ liệu để hiển thị');
        return;
      }

      const data = deviceData[deviceId];
      const totalTimes = calculateTotalTimes(data);

      const timeParse = d3.timeParse('%H:%M');
      const xScale = d3.scaleTime()
        .domain([timeParse('00:00')!, timeParse('23:59')!])
        .range([margin.left, width - margin.right]);

      const colorScale = d3.scaleOrdinal<string>()
        .domain(['Chạy', 'Dừng', 'Chờ', 'Offline'])
        .range(['#00C8D7', '#f10401', '#FFC107', '#d3d3d3']);

      const legendData: LegendItem[] = [
        { status: 'Chạy', time: totalTimes['Chạy'], color: '#00C8D7' },
        { status: 'Dừng', time: totalTimes['Dừng'], color: '#f10401' },
        { status: 'Chờ', time: totalTimes['Chờ'], color: '#FFC107' },
        { status: 'Offline', time: totalTimes['Offline'], color: '#d3d3d3' }
      ];

      const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([1, 24])
        .translateExtent([[margin.left, 0], [width - margin.right, 0]])
        .extent([[margin.left, 0], [width - margin.right, 0]])
        .on('zoom', (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
          const newXScale = event.transform.rescaleX(xScale);
          updateChart(newXScale);
        });

      svg.call(zoom);

      const updateChart = (newXScale: d3.ScaleTime<number, number>) => {
        svg.selectAll('.status-rect')
          .data(data)
          .attr('x', (d: TimelineInterval) => newXScale(timeParse(d.startTime)!) + 1)
          .attr('width', (d: TimelineInterval) => Math.max(newXScale(timeParse(d.endTime)!) - newXScale(timeParse(d.startTime)!), 1));

        svg.selectAll('.x-axis')
          .call(d3.axisBottom(newXScale)
            .ticks(d3.timeHour.every(2))
            .tickFormat((d: Date | d3.NumberValue, i: number) => {
              if (d instanceof Date) {
                return d3.timeFormat('%H:%M')(d);
              }
              return '';
            }) as any);
      };

      const legend = svg.selectAll('.legend')
        .data(legendData)
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', (d: LegendItem, i: number) => `translate(${margin.left + i * 150},${height - margin.bottom + 20})`);

      legend.append('rect')
        .attr('x', 70)
        .attr('y', -10)
        .attr('width', 20)
        .attr('height', 10)
        .style('fill', (d: LegendItem) => d.color);

      legend.append('text')
        .attr('x', 95)
        .attr('y', 0)
        .text((d: LegendItem) => `${d.status}: ${d.time}`)
        .style('font-size', '12px')
        .style('text-anchor', 'start')
        .style('fill', isDarkMode ? '#fff' : '#222');

      svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height - margin.bottom - 30})`)
        .call(d3.axisBottom(xScale)
          .ticks(d3.timeHour.every(2))
          .tickFormat((d: Date | d3.NumberValue, i: number) => {
            if (d instanceof Date) {
              return d3.timeFormat('%H:%M')(d);
            }
            return '';
          }) as any)
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .style("fill", isDarkMode ? '#fff' : '#222');

      // Đổi màu các đường kẻ của trục Ox cho dark mode
      svg.selectAll('.x-axis .domain')
        .style('stroke', isDarkMode ? '#aaa' : '#222');
      svg.selectAll('.x-axis .tick line')
        .style('stroke', isDarkMode ? '#555' : '#888');

      svg.selectAll('.status-rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'status-rect')
        .attr('x', (d: TimelineInterval) => xScale(timeParse(d.startTime)!) + 1)
        .attr('y', height - margin.bottom - 60)
        .attr('width', (d: TimelineInterval) => Math.max(xScale(timeParse(d.endTime)!) - xScale(timeParse(d.startTime)!), 1))
        .attr('height', 30)
        .attr('fill', (d: TimelineInterval) => colorScale(d.status) || '#d3d3d3')
        .on('mouseover', (event: MouseEvent, d: TimelineInterval) => {
          tooltip
            .style('display', 'block')
            .html(`Trạng thái: <b>${d.status}</b><br>Thời gian: ${d.startTime} - ${d.endTime}`);
        })
        .on('mousemove', (event: MouseEvent) => {
          tooltip
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 20}px`);
        })
        .on('mouseout', () => {
          tooltip.style('display', 'none');
        });
    };

    drawChart();
    
    return () => {
      tooltip.remove();
    };
  }, [deviceData, dimensions, deviceId, loading, isDarkMode]);

  useEffect(() => {
    const handleResize = () => {
      if (!wrapperRef.current) return;
      const clientWidth = wrapperRef.current.clientWidth;
      setDimensions({ width: clientWidth, height: fixedHeight });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
       <h2 className="text-xs font-semibold dark:text-white">{machineName}</h2>
       <div ref={wrapperRef} className="flex justify-center -mt-2">  
        <svg ref={svgRef} width="100%" height={fixedHeight} />
       </div>
    </div>
  );
};

export default MachineTimeline;
