window.TIME_CONFIG={
  realSecondsPerPlantMinute:1,
  timeLimitMinutes:480
};

window.STAGES=[
{id:1,difficulty:'EASY',devTitle:'RCP-A 劣化',brief:'PRIMARY SYSTEM WARNING',stable:15,minClear:0},
{id:2,difficulty:'EASY',devTitle:'SG-B 給水異常',brief:'FEEDWATER-B FLOW DEVIATION',stable:15,minClear:0},
{id:3,difficulty:'NORMAL',devTitle:'保護動作後の除熱不足',brief:'TURBINE / REACTOR TRIP',stable:20,minClear:0},
{id:4,difficulty:'NORMAL',devTitle:'復水器真空喪失',brief:'CONDENSER VACUUM DEGRADING',stable:20,minClear:0},
{id:5,difficulty:'HARD',devTitle:'外部電源喪失 + EDG',brief:'OFFSITE POWER LOST',stable:10,minClear:0},
{id:6,difficulty:'HARD',devTitle:'AFW 劣化',brief:'MAIN FEEDWATER LOST',stable:15,minClear:0},
{id:7,difficulty:'SPECIAL',devTitle:'計器故障',brief:'SG-B LEVEL CHANNEL DISAGREEMENT',stable:10,minClear:0},
{id:8,difficulty:'SPECIAL',devTitle:'待機判断',brief:'AUTOMATIC PROTECTION ACTIVE',stable:20,minClear:0},
{id:9,difficulty:'HARD',devTitle:'RCS在庫喪失',brief:'RCS INVENTORY / PRESSURE DECREASING',stable:20,minClear:0},
{id:10,difficulty:'HARD',devTitle:'補機冷却喪失',brief:'COMPONENT COOLING WATER DEGRADED',stable:20,minClear:0}
];
