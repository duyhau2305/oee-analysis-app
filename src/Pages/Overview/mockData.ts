interface Machine {
    id: string;
    deviceId: string;
    currentStatus: string;
    timelineStartTime: string;
    timelineEndTime: string;
    productionTasks: Array<{
      shifts: Array<{
        status: string;
        employeeName: string[];
        shiftDetails: {
          startTime: string;
          endTime: string;
        };
      }>;
    }>;
    summaryStatus: number;
    totalTimeRun: number;
    summaryStatusIdle: number;
    summaryStatusStop: number;
    totalTimeIdle: number;
    totalTimeStop: number;
    totalBreakTimeInMinutes: number;
    machinePercent: number;
    percentDiff: string;
    status: string;
    timeRange: string;
  }
export const mockMachines: Machine[] = [
    {  
      id:'P001',
      deviceId: 'P001',
      currentStatus: 'Run',
      timelineStartTime: '2025-02-28T08:00:00Z',
      timelineEndTime: '2025-02-28T16:00:00Z',
      productionTasks: [
        {
          shifts: [
            {
              status: 'Chạy',
              employeeName: ['John Doe'],
              shiftDetails: {
                startTime: '08:00',
                endTime: '16:00',
              },
            },
          ],
        },
      ],
      summaryStatus: 500,
      totalTimeRun: 400,
      summaryStatusIdle: 50,
      summaryStatusStop: 30,
      totalTimeIdle: 40,
      totalTimeStop: 10,
      totalBreakTimeInMinutes: 20,
      machinePercent: 85.5,
      percentDiff: '10%',
      status: 'Run',
      timeRange: '08:00 - 16:00',
    },
    {
      id:'T002',
      deviceId: 'T002',
      currentStatus: 'Idle',
      timelineStartTime: '2025-02-28T09:00:00Z',
      timelineEndTime: '2025-02-28T17:00:00Z',
      productionTasks: [
        {
          shifts: [
            {
              status: 'Chờ',
              employeeName: ['Jane Smith'],
              shiftDetails: {
                startTime: '09:00',
                endTime: '17:00',
              },
            },
          ],
        },
      ],
      summaryStatus: 350,
      totalTimeRun: 250,
      summaryStatusIdle: 80,
      summaryStatusStop: 20,
      totalTimeIdle: 60,
      totalTimeStop: 10,
      totalBreakTimeInMinutes: 15,
      machinePercent: 75.2,
      percentDiff: '-5%',
      status: 'Idle',
      timeRange: '09:00 - 17:00',
    },
    {
        id:'P002',
      deviceId: 'P003',
      currentStatus: 'Stop',
      timelineStartTime: '2025-02-28T10:00:00Z',
      timelineEndTime: '2025-02-28T18:00:00Z',
      productionTasks: [
        {
          shifts: [
            {
              status: 'Dừng',
              employeeName: ['Alice Brown'],
              shiftDetails: {
                startTime: '10:00',
                endTime: '18:00',
              },
            },
          ],
        },
      ],
      summaryStatus: 200,
      totalTimeRun: 100,
      summaryStatusIdle: 70,
      summaryStatusStop: 50,
      totalTimeIdle: 40,
      totalTimeStop: 30,
      totalBreakTimeInMinutes: 10,
      machinePercent: 50.0,
      percentDiff: '-20%',
      status: 'Stop',
      timeRange: '10:00 - 18:00',
    },
    {
        id:'T002',
      deviceId: 'T004',
      currentStatus: 'Off',
      timelineStartTime: '2025-02-28T08:30:00Z',
      timelineEndTime: '2025-02-28T16:30:00Z',
      productionTasks: [
        {
          shifts: [
            {
              status: 'Off',
              employeeName: ['Michael Green'],
              shiftDetails: {
                startTime: '08:30',
                endTime: '16:30',
              },
            },
          ],
        },
      ],
      summaryStatus: 0,
      totalTimeRun: 0,
      summaryStatusIdle: 0,
      summaryStatusStop: 0,
      totalTimeIdle: 0,
      totalTimeStop: 0,
      totalBreakTimeInMinutes: 0,
      machinePercent: 0.0,
      percentDiff: '0%',
      status: 'Off',
      timeRange: '08:30 - 16:30',
    },
    {
        id:'T004',
      deviceId: 'T004',
      currentStatus: 'Off',
      timelineStartTime: '2025-02-28T08:30:00Z',
      timelineEndTime: '2025-02-28T16:30:00Z',
      productionTasks: [
        {
          shifts: [
            {
              status: 'Off',
              employeeName: ['Michael Green'],
              shiftDetails: {
                startTime: '08:30',
                endTime: '16:30',
              },
            },
          ],
        },
      ],
      summaryStatus: 0,
      totalTimeRun: 0,
      summaryStatusIdle: 0,
      summaryStatusStop: 0,
      totalTimeIdle: 0,
      totalTimeStop: 0,
      totalBreakTimeInMinutes: 0,
      machinePercent: 0.0,
      percentDiff: '0%',
      status: 'Off',
      timeRange: '08:30 - 16:30',
    },
    {
        id:'T005',
      deviceId: 'T005',
      currentStatus: 'Off',
      timelineStartTime: '2025-02-28T08:30:00Z',
      timelineEndTime: '2025-02-28T16:30:00Z',
      productionTasks: [
        {
          shifts: [
            {
              status: 'Off',
              employeeName: ['Michael Green'],
              shiftDetails: {
                startTime: '08:30',
                endTime: '16:30',
              },
            },
          ],
        },
      ],
      summaryStatus: 0,
      totalTimeRun: 0,
      summaryStatusIdle: 0,
      summaryStatusStop: 0,
      totalTimeIdle: 0,
      totalTimeStop: 0,
      totalBreakTimeInMinutes: 0,
      machinePercent: 0.0,
      percentDiff: '0%',
      status: 'Off',
      timeRange: '08:30 - 16:30',
    },
    {
        id:'T006',
      deviceId: 'T006',
      currentStatus: 'Off',
      timelineStartTime: '2025-02-28T08:30:00Z',
      timelineEndTime: '2025-02-28T16:30:00Z',
      productionTasks: [
        {
          shifts: [
            {
              status: 'Off',
              employeeName: ['Michael Green'],
              shiftDetails: {
                startTime: '08:30',
                endTime: '16:30',
              },
            },
          ],
        },
      ],
      summaryStatus: 0,
      totalTimeRun: 0,
      summaryStatusIdle: 0,
      summaryStatusStop: 0,
      totalTimeIdle: 0,
      totalTimeStop: 0,
      totalBreakTimeInMinutes: 0,
      machinePercent: 0.0,
      percentDiff: '0%',
      status: 'Off',
      timeRange: '08:30 - 16:30',
    },
    {
        id:'T007',
      deviceId: 'T007',
      currentStatus: 'Off',
      timelineStartTime: '2025-02-28T08:30:00Z',
      timelineEndTime: '2025-02-28T16:30:00Z',
      productionTasks: [
        {
          shifts: [
            {
              status: 'Off',
              employeeName: ['Michael Green'],
              shiftDetails: {
                startTime: '08:30',
                endTime: '16:30',
              },
            },
          ],
        },
      ],
      summaryStatus: 0,
      totalTimeRun: 0,
      summaryStatusIdle: 0,
      summaryStatusStop: 0,
      totalTimeIdle: 0,
      totalTimeStop: 0,
      totalBreakTimeInMinutes: 0,
      machinePercent: 0.0,
      percentDiff: '0%',
      status: 'Off',
      timeRange: '08:30 - 16:30',
    },
    {
        id:'T008',
      deviceId: 'T008',
      currentStatus: 'Idle',
      timelineStartTime: '2025-02-28T08:30:00Z',
      timelineEndTime: '2025-02-28T16:30:00Z',
      productionTasks: [
        {
          shifts: [
            {
              status: 'Off',
              employeeName: ['Michael Green'],
              shiftDetails: {
                startTime: '08:30',
                endTime: '16:30',
              },
            },
          ],
        },
      ],
      summaryStatus: 0,
      totalTimeRun: 0,
      summaryStatusIdle: 0,
      summaryStatusStop: 0,
      totalTimeIdle: 0,
      totalTimeStop: 0,
      totalBreakTimeInMinutes: 0,
      machinePercent: 0.0,
      percentDiff: '0%',
      status: 'Off',
      timeRange: '08:30 - 16:30',
    },
    {
     id:'P003',
      deviceId: 'P004',
      currentStatus: 'Run',
      timelineStartTime: '2025-02-28T08:30:00Z',
      timelineEndTime: '2025-02-28T16:30:00Z',
      productionTasks: [
        {
          shifts: [
            {
              status: 'Off',
              employeeName: ['Michael Green'],
              shiftDetails: {
                startTime: '08:30',
                endTime: '16:30',
              },
            },
          ],
        },
      ],
      summaryStatus: 0,
      totalTimeRun: 0,
      summaryStatusIdle: 0,
      summaryStatusStop: 0,
      totalTimeIdle: 0,
      totalTimeStop: 0,
      totalBreakTimeInMinutes: 0,
      machinePercent: 0.0,
      percentDiff: '0%',
      status: 'Off',
      timeRange: '08:30 - 16:30',
    },
    {  
        id:'P001',
        deviceId: 'P001',
        currentStatus: 'Run',
        timelineStartTime: '2025-02-28T08:00:00Z',
        timelineEndTime: '2025-02-28T16:00:00Z',
        productionTasks: [
          {
            shifts: [
              {
                status: 'Chạy',
                employeeName: ['John Doe'],
                shiftDetails: {
                  startTime: '08:00',
                  endTime: '16:00',
                },
              },
            ],
          },
        ],
        summaryStatus: 500,
        totalTimeRun: 400,
        summaryStatusIdle: 50,
        summaryStatusStop: 30,
        totalTimeIdle: 40,
        totalTimeStop: 10,
        totalBreakTimeInMinutes: 20,
        machinePercent: 85.5,
        percentDiff: '10%',
        status: 'Run',
        timeRange: '08:00 - 16:00',
      },
      {
        id:'T002',
        deviceId: 'T002',
        currentStatus: 'Idle',
        timelineStartTime: '2025-02-28T09:00:00Z',
        timelineEndTime: '2025-02-28T17:00:00Z',
        productionTasks: [
          {
            shifts: [
              {
                status: 'Chờ',
                employeeName: ['Jane Smith'],
                shiftDetails: {
                  startTime: '09:00',
                  endTime: '17:00',
                },
              },
            ],
          },
        ],
        summaryStatus: 350,
        totalTimeRun: 250,
        summaryStatusIdle: 80,
        summaryStatusStop: 20,
        totalTimeIdle: 60,
        totalTimeStop: 10,
        totalBreakTimeInMinutes: 15,
        machinePercent: 75.2,
        percentDiff: '-5%',
        status: 'Idle',
        timeRange: '09:00 - 17:00',
      },
      {
          id:'P002',
        deviceId: 'P003',
        currentStatus: 'Stop',
        timelineStartTime: '2025-02-28T10:00:00Z',
        timelineEndTime: '2025-02-28T18:00:00Z',
        productionTasks: [
          {
            shifts: [
              {
                status: 'Dừng',
                employeeName: ['Alice Brown'],
                shiftDetails: {
                  startTime: '10:00',
                  endTime: '18:00',
                },
              },
            ],
          },
        ],
        summaryStatus: 200,
        totalTimeRun: 100,
        summaryStatusIdle: 70,
        summaryStatusStop: 50,
        totalTimeIdle: 40,
        totalTimeStop: 30,
        totalBreakTimeInMinutes: 10,
        machinePercent: 50.0,
        percentDiff: '-20%',
        status: 'Stop',
        timeRange: '10:00 - 18:00',
      },
      {
          id:'T002',
        deviceId: 'T004',
        currentStatus: 'Off',
        timelineStartTime: '2025-02-28T08:30:00Z',
        timelineEndTime: '2025-02-28T16:30:00Z',
        productionTasks: [
          {
            shifts: [
              {
                status: 'Off',
                employeeName: ['Michael Green'],
                shiftDetails: {
                  startTime: '08:30',
                  endTime: '16:30',
                },
              },
            ],
          },
        ],
        summaryStatus: 0,
        totalTimeRun: 0,
        summaryStatusIdle: 0,
        summaryStatusStop: 0,
        totalTimeIdle: 0,
        totalTimeStop: 0,
        totalBreakTimeInMinutes: 0,
        machinePercent: 0.0,
        percentDiff: '0%',
        status: 'Off',
        timeRange: '08:30 - 16:30',
      },
      {
          id:'T004',
        deviceId: 'T004',
        currentStatus: 'Off',
        timelineStartTime: '2025-02-28T08:30:00Z',
        timelineEndTime: '2025-02-28T16:30:00Z',
        productionTasks: [
          {
            shifts: [
              {
                status: 'Off',
                employeeName: ['Michael Green'],
                shiftDetails: {
                  startTime: '08:30',
                  endTime: '16:30',
                },
              },
            ],
          },
        ],
        summaryStatus: 0,
        totalTimeRun: 0,
        summaryStatusIdle: 0,
        summaryStatusStop: 0,
        totalTimeIdle: 0,
        totalTimeStop: 0,
        totalBreakTimeInMinutes: 0,
        machinePercent: 0.0,
        percentDiff: '0%',
        status: 'Off',
        timeRange: '08:30 - 16:30',
      },
      {
          id:'T005',
        deviceId: 'T005',
        currentStatus: 'Off',
        timelineStartTime: '2025-02-28T08:30:00Z',
        timelineEndTime: '2025-02-28T16:30:00Z',
        productionTasks: [
          {
            shifts: [
              {
                status: 'Off',
                employeeName: ['Michael Green'],
                shiftDetails: {
                  startTime: '08:30',
                  endTime: '16:30',
                },
              },
            ],
          },
        ],
        summaryStatus: 0,
        totalTimeRun: 0,
        summaryStatusIdle: 0,
        summaryStatusStop: 0,
        totalTimeIdle: 0,
        totalTimeStop: 0,
        totalBreakTimeInMinutes: 0,
        machinePercent: 0.0,
        percentDiff: '0%',
        status: 'Off',
        timeRange: '08:30 - 16:30',
      },
      {
          id:'T006',
        deviceId: 'T006',
        currentStatus: 'Off',
        timelineStartTime: '2025-02-28T08:30:00Z',
        timelineEndTime: '2025-02-28T16:30:00Z',
        productionTasks: [
          {
            shifts: [
              {
                status: 'Off',
                employeeName: ['Michael Green'],
                shiftDetails: {
                  startTime: '08:30',
                  endTime: '16:30',
                },
              },
            ],
          },
        ],
        summaryStatus: 0,
        totalTimeRun: 0,
        summaryStatusIdle: 0,
        summaryStatusStop: 0,
        totalTimeIdle: 0,
        totalTimeStop: 0,
        totalBreakTimeInMinutes: 0,
        machinePercent: 0.0,
        percentDiff: '0%',
        status: 'Off',
        timeRange: '08:30 - 16:30',
      },
      {
          id:'T007',
        deviceId: 'T007',
        currentStatus: 'Off',
        timelineStartTime: '2025-02-28T08:30:00Z',
        timelineEndTime: '2025-02-28T16:30:00Z',
        productionTasks: [
          {
            shifts: [
              {
                status: 'Off',
                employeeName: ['Michael Green'],
                shiftDetails: {
                  startTime: '08:30',
                  endTime: '16:30',
                },
              },
            ],
          },
        ],
        summaryStatus: 0,
        totalTimeRun: 0,
        summaryStatusIdle: 0,
        summaryStatusStop: 0,
        totalTimeIdle: 0,
        totalTimeStop: 0,
        totalBreakTimeInMinutes: 0,
        machinePercent: 0.0,
        percentDiff: '0%',
        status: 'Off',
        timeRange: '08:30 - 16:30',
      },
      {
          id:'T008',
        deviceId: 'T008',
        currentStatus: 'Idle',
        timelineStartTime: '2025-02-28T08:30:00Z',
        timelineEndTime: '2025-02-28T16:30:00Z',
        productionTasks: [
          {
            shifts: [
              {
                status: 'Off',
                employeeName: ['Michael Green'],
                shiftDetails: {
                  startTime: '08:30',
                  endTime: '16:30',
                },
              },
            ],
          },
        ],
        summaryStatus: 0,
        totalTimeRun: 0,
        summaryStatusIdle: 0,
        summaryStatusStop: 0,
        totalTimeIdle: 0,
        totalTimeStop: 0,
        totalBreakTimeInMinutes: 0,
        machinePercent: 0.0,
        percentDiff: '0%',
        status: 'Off',
        timeRange: '08:30 - 16:30',
      },
      {
       id:'P003',
        deviceId: 'P004',
        currentStatus: 'Run',
        timelineStartTime: '2025-02-28T08:30:00Z',
        timelineEndTime: '2025-02-28T16:30:00Z',
        productionTasks: [
          {
            shifts: [
              {
                status: 'Off',
                employeeName: ['Michael Green'],
                shiftDetails: {
                  startTime: '08:30',
                  endTime: '16:30',
                },
              },
            ],
          },
        ],
        summaryStatus: 0,
        totalTimeRun: 0,
        summaryStatusIdle: 0,
        summaryStatusStop: 0,
        totalTimeIdle: 0,
        totalTimeStop: 0,
        totalBreakTimeInMinutes: 0,
        machinePercent: 0.0,
        percentDiff: '0%',
        status: 'Off',
        timeRange: '08:30 - 16:30',
      },
      {  
        id:'P001',
        deviceId: 'P001',
        currentStatus: 'Run',
        timelineStartTime: '2025-02-28T08:00:00Z',
        timelineEndTime: '2025-02-28T16:00:00Z',
        productionTasks: [
          {
            shifts: [
              {
                status: 'Chạy',
                employeeName: ['John Doe'],
                shiftDetails: {
                  startTime: '08:00',
                  endTime: '16:00',
                },
              },
            ],
          },
        ],
        summaryStatus: 500,
        totalTimeRun: 400,
        summaryStatusIdle: 50,
        summaryStatusStop: 30,
        totalTimeIdle: 40,
        totalTimeStop: 10,
        totalBreakTimeInMinutes: 20,
        machinePercent: 85.5,
        percentDiff: '10%',
        status: 'Run',
        timeRange: '08:00 - 16:00',
      },
      {
        id:'T002',
        deviceId: 'T002',
        currentStatus: 'Idle',
        timelineStartTime: '2025-02-28T09:00:00Z',
        timelineEndTime: '2025-02-28T17:00:00Z',
        productionTasks: [
          {
            shifts: [
              {
                status: 'Chờ',
                employeeName: ['Jane Smith'],
                shiftDetails: {
                  startTime: '09:00',
                  endTime: '17:00',
                },
              },
            ],
          },
        ],
        summaryStatus: 350,
        totalTimeRun: 250,
        summaryStatusIdle: 80,
        summaryStatusStop: 20,
        totalTimeIdle: 60,
        totalTimeStop: 10,
        totalBreakTimeInMinutes: 15,
        machinePercent: 75.2,
        percentDiff: '-5%',
        status: 'Idle',
        timeRange: '09:00 - 17:00',
      },
      {
          id:'P002',
        deviceId: 'P003',
        currentStatus: 'Stop',
        timelineStartTime: '2025-02-28T10:00:00Z',
        timelineEndTime: '2025-02-28T18:00:00Z',
        productionTasks: [
          {
            shifts: [
              {
                status: 'Dừng',
                employeeName: ['Alice Brown'],
                shiftDetails: {
                  startTime: '10:00',
                  endTime: '18:00',
                },
              },
            ],
          },
        ],
        summaryStatus: 200,
        totalTimeRun: 100,
        summaryStatusIdle: 70,
        summaryStatusStop: 50,
        totalTimeIdle: 40,
        totalTimeStop: 30,
        totalBreakTimeInMinutes: 10,
        machinePercent: 50.0,
        percentDiff: '-20%',
        status: 'Stop',
        timeRange: '10:00 - 18:00',
      },
      {
          id:'T002',
        deviceId: 'T004',
        currentStatus: 'Off',
        timelineStartTime: '2025-02-28T08:30:00Z',
        timelineEndTime: '2025-02-28T16:30:00Z',
        productionTasks: [
          {
            shifts: [
              {
                status: 'Off',
                employeeName: ['Michael Green'],
                shiftDetails: {
                  startTime: '08:30',
                  endTime: '16:30',
                },
              },
            ],
          },
        ],
        summaryStatus: 0,
        totalTimeRun: 0,
        summaryStatusIdle: 0,
        summaryStatusStop: 0,
        totalTimeIdle: 0,
        totalTimeStop: 0,
        totalBreakTimeInMinutes: 0,
        machinePercent: 0.0,
        percentDiff: '0%',
        status: 'Off',
        timeRange: '08:30 - 16:30',
      },
      {
          id:'T004',
        deviceId: 'T004',
        currentStatus: 'Off',
        timelineStartTime: '2025-02-28T08:30:00Z',
        timelineEndTime: '2025-02-28T16:30:00Z',
        productionTasks: [
          {
            shifts: [
              {
                status: 'Off',
                employeeName: ['Michael Green'],
                shiftDetails: {
                  startTime: '08:30',
                  endTime: '16:30',
                },
              },
            ],
          },
        ],
        summaryStatus: 0,
        totalTimeRun: 0,
        summaryStatusIdle: 0,
        summaryStatusStop: 0,
        totalTimeIdle: 0,
        totalTimeStop: 0,
        totalBreakTimeInMinutes: 0,
        machinePercent: 0.0,
        percentDiff: '0%',
        status: 'Off',
        timeRange: '08:30 - 16:30',
      },
      {
          id:'T005',
        deviceId: 'T005',
        currentStatus: 'Off',
        timelineStartTime: '2025-02-28T08:30:00Z',
        timelineEndTime: '2025-02-28T16:30:00Z',
        productionTasks: [
          {
            shifts: [
              {
                status: 'Off',
                employeeName: ['Michael Green'],
                shiftDetails: {
                  startTime: '08:30',
                  endTime: '16:30',
                },
              },
            ],
          },
        ],
        summaryStatus: 0,
        totalTimeRun: 0,
        summaryStatusIdle: 0,
        summaryStatusStop: 0,
        totalTimeIdle: 0,
        totalTimeStop: 0,
        totalBreakTimeInMinutes: 0,
        machinePercent: 0.0,
        percentDiff: '0%',
        status: 'Off',
        timeRange: '08:30 - 16:30',
      },
      {
          id:'T006',
        deviceId: 'T006',
        currentStatus: 'Off',
        timelineStartTime: '2025-02-28T08:30:00Z',
        timelineEndTime: '2025-02-28T16:30:00Z',
        productionTasks: [
          {
            shifts: [
              {
                status: 'Off',
                employeeName: ['Michael Green'],
                shiftDetails: {
                  startTime: '08:30',
                  endTime: '16:30',
                },
              },
            ],
          },
        ],
        summaryStatus: 0,
        totalTimeRun: 0,
        summaryStatusIdle: 0,
        summaryStatusStop: 0,
        totalTimeIdle: 0,
        totalTimeStop: 0,
        totalBreakTimeInMinutes: 0,
        machinePercent: 0.0,
        percentDiff: '0%',
        status: 'Off',
        timeRange: '08:30 - 16:30',
      },
      {
          id:'T007',
        deviceId: 'T007',
        currentStatus: 'Off',
        timelineStartTime: '2025-02-28T08:30:00Z',
        timelineEndTime: '2025-02-28T16:30:00Z',
        productionTasks: [
          {
            shifts: [
              {
                status: 'Off',
                employeeName: ['Michael Green'],
                shiftDetails: {
                  startTime: '08:30',
                  endTime: '16:30',
                },
              },
            ],
          },
        ],
        summaryStatus: 0,
        totalTimeRun: 0,
        summaryStatusIdle: 0,
        summaryStatusStop: 0,
        totalTimeIdle: 0,
        totalTimeStop: 0,
        totalBreakTimeInMinutes: 0,
        machinePercent: 0.0,
        percentDiff: '0%',
        status: 'Off',
        timeRange: '08:30 - 16:30',
      },
      {
          id:'T008',
        deviceId: 'T008',
        currentStatus: 'Idle',
        timelineStartTime: '2025-02-28T08:30:00Z',
        timelineEndTime: '2025-02-28T16:30:00Z',
        productionTasks: [
          {
            shifts: [
              {
                status: 'Off',
                employeeName: ['Michael Green'],
                shiftDetails: {
                  startTime: '08:30',
                  endTime: '16:30',
                },
              },
            ],
          },
        ],
        summaryStatus: 0,
        totalTimeRun: 0,
        summaryStatusIdle: 0,
        summaryStatusStop: 0,
        totalTimeIdle: 0,
        totalTimeStop: 0,
        totalBreakTimeInMinutes: 0,
        machinePercent: 0.0,
        percentDiff: '0%',
        status: 'Off',
        timeRange: '08:30 - 16:30',
      },
      {
       id:'P003',
        deviceId: 'P004',
        currentStatus: 'Run',
        timelineStartTime: '2025-02-28T08:30:00Z',
        timelineEndTime: '2025-02-28T16:30:00Z',
        productionTasks: [
          {
            shifts: [
              {
                status: 'Off',
                employeeName: ['Michael Green'],
                shiftDetails: {
                  startTime: '08:30',
                  endTime: '16:30',
                },
              },
            ],
          },
        ],
        summaryStatus: 0,
        totalTimeRun: 0,
        summaryStatusIdle: 0,
        summaryStatusStop: 0,
        totalTimeIdle: 0,
        totalTimeStop: 0,
        totalBreakTimeInMinutes: 0,
        machinePercent: 0.0,
        percentDiff: '0%',
        status: 'Off',
        timeRange: '08:30 - 16:30',
      },

      {
        id:'T002',
      deviceId: 'T004',
      currentStatus: 'Off',
      timelineStartTime: '2025-02-28T08:30:00Z',
      timelineEndTime: '2025-02-28T16:30:00Z',
      productionTasks: [
        {
          shifts: [
            {
              status: 'Off',
              employeeName: ['Michael Green'],
              shiftDetails: {
                startTime: '08:30',
                endTime: '16:30',
              },
            },
          ],
        },
      ],
      summaryStatus: 0,
      totalTimeRun: 0,
      summaryStatusIdle: 0,
      summaryStatusStop: 0,
      totalTimeIdle: 0,
      totalTimeStop: 0,
      totalBreakTimeInMinutes: 0,
      machinePercent: 0.0,
      percentDiff: '0%',
      status: 'Off',
      timeRange: '08:30 - 16:30',
    },
    {
        id:'T004',
      deviceId: 'T004',
      currentStatus: 'Off',
      timelineStartTime: '2025-02-28T08:30:00Z',
      timelineEndTime: '2025-02-28T16:30:00Z',
      productionTasks: [
        {
          shifts: [
            {
              status: 'Off',
              employeeName: ['Michael Green'],
              shiftDetails: {
                startTime: '08:30',
                endTime: '16:30',
              },
            },
          ],
        },
      ],
      summaryStatus: 0,
      totalTimeRun: 0,
      summaryStatusIdle: 0,
      summaryStatusStop: 0,
      totalTimeIdle: 0,
      totalTimeStop: 0,
      totalBreakTimeInMinutes: 0,
      machinePercent: 0.0,
      percentDiff: '0%',
      status: 'Off',
      timeRange: '08:30 - 16:30',
    },
    {
        id:'T005',
      deviceId: 'T005',
      currentStatus: 'Off',
      timelineStartTime: '2025-02-28T08:30:00Z',
      timelineEndTime: '2025-02-28T16:30:00Z',
      productionTasks: [
        {
          shifts: [
            {
              status: 'Off',
              employeeName: ['Michael Green'],
              shiftDetails: {
                startTime: '08:30',
                endTime: '16:30',
              },
            },
          ],
        },
      ],
      summaryStatus: 0,
      totalTimeRun: 0,
      summaryStatusIdle: 0,
      summaryStatusStop: 0,
      totalTimeIdle: 0,
      totalTimeStop: 0,
      totalBreakTimeInMinutes: 0,
      machinePercent: 0.0,
      percentDiff: '0%',
      status: 'Off',
      timeRange: '08:30 - 16:30',
    },
    {
        id:'T006',
      deviceId: 'T006',
      currentStatus: 'Off',
      timelineStartTime: '2025-02-28T08:30:00Z',
      timelineEndTime: '2025-02-28T16:30:00Z',
      productionTasks: [
        {
          shifts: [
            {
              status: 'Off',
              employeeName: ['Michael Green'],
              shiftDetails: {
                startTime: '08:30',
                endTime: '16:30',
              },
            },
          ],
        },
      ],
      summaryStatus: 0,
      totalTimeRun: 0,
      summaryStatusIdle: 0,
      summaryStatusStop: 0,
      totalTimeIdle: 0,
      totalTimeStop: 0,
      totalBreakTimeInMinutes: 0,
      machinePercent: 0.0,
      percentDiff: '0%',
      status: 'Off',
      timeRange: '08:30 - 16:30',
    },
    {
        id:'T007',
      deviceId: 'T007',
      currentStatus: 'Off',
      timelineStartTime: '2025-02-28T08:30:00Z',
      timelineEndTime: '2025-02-28T16:30:00Z',
      productionTasks: [
        {
          shifts: [
            {
              status: 'Off',
              employeeName: ['Michael Green'],
              shiftDetails: {
                startTime: '08:30',
                endTime: '16:30',
              },
            },
          ],
        },
      ],
      summaryStatus: 0,
      totalTimeRun: 0,
      summaryStatusIdle: 0,
      summaryStatusStop: 0,
      totalTimeIdle: 0,
      totalTimeStop: 0,
      totalBreakTimeInMinutes: 0,
      machinePercent: 0.0,
      percentDiff: '0%',
      status: 'Off',
      timeRange: '08:30 - 16:30',
    },
    {
        id:'T008',
      deviceId: 'T008',
      currentStatus: 'Idle',
      timelineStartTime: '2025-02-28T08:30:00Z',
      timelineEndTime: '2025-02-28T16:30:00Z',
      productionTasks: [
        {
          shifts: [
            {
              status: 'Off',
              employeeName: ['Michael Green'],
              shiftDetails: {
                startTime: '08:30',
                endTime: '16:30',
              },
            },
          ],
        },
      ],
      summaryStatus: 0,
      totalTimeRun: 0,
      summaryStatusIdle: 0,
      summaryStatusStop: 0,
      totalTimeIdle: 0,
      totalTimeStop: 0,
      totalBreakTimeInMinutes: 0,
      machinePercent: 0.0,
      percentDiff: '0%',
      status: 'Off',
      timeRange: '08:30 - 16:30',
    },
    {
     id:'P003',
      deviceId: 'P004',
      currentStatus: 'Run',
      timelineStartTime: '2025-02-28T08:30:00Z',
      timelineEndTime: '2025-02-28T16:30:00Z',
      productionTasks: [
        {
          shifts: [
            {
              status: 'Off',
              employeeName: ['Michael Green'],
              shiftDetails: {
                startTime: '08:30',
                endTime: '16:30',
              },
            },
          ],
        },
      ],
      summaryStatus: 0,
      totalTimeRun: 0,
      summaryStatusIdle: 0,
      summaryStatusStop: 0,
      totalTimeIdle: 0,
      totalTimeStop: 0,
      totalBreakTimeInMinutes: 0,
      machinePercent: 0.0,
      percentDiff: '0%',
      status: 'Off',
      timeRange: '08:30 - 16:30',
    },
    

  ];