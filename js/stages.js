window.TIME_CONFIG={
  realSecondsPerPlantMinute:1,
  timeLimitMinutes:480
};

// STAGES contains only scenario-specific conditions/objectives.
// Equipment behavior, AUTO logic, interlocks and causal propagation live in game.js.
window.STAGES=[
  {id:1,difficulty:'EASY',devTitle:'RCP-A 劣化',brief:'PRIMARY SYSTEM WARNING',stable:15,
    conditions:{rcpADegrade:true},objective:'RCP_A_SECURED'},
  {id:2,difficulty:'EASY',devTitle:'SG-B 給水異常',brief:'FEEDWATER-B FLOW DEVIATION',stable:15,
    conditions:{frvBDrift:true},objective:'FRV_B_RECOVERED'},
  {id:3,difficulty:'NORMAL',devTitle:'保護動作後の除熱不足',brief:'TURBINE TRIP / HEAT REMOVAL DEVIATION',stable:20,
    conditions:{initialTurbineTrip:true,steamDumpAutoLimit:30},objective:'STEAM_DUMP_ESTABLISHED'},
  {id:4,difficulty:'NORMAL',devTitle:'復水器真空喪失',brief:'CONDENSER VACUUM DEGRADING',stable:20,
    conditions:{condenserDegrade:true},objective:'ATM_DUMP_ESTABLISHED'},
  {id:5,difficulty:'HARD',devTitle:'外部電源喪失 + EDG',brief:'OFFSITE POWER LOST',stable:10,
    conditions:{offsiteLost:true,edgBAutoBreakerFail:true},objective:'SAFETY_BUSES_RESTORED'},
  {id:6,difficulty:'HARD',devTitle:'AFW 劣化',brief:'MAIN FEEDWATER LOST',stable:15,
    conditions:{mainFeedwaterLost:true,afwBValveClosed:true},objective:'AFW_B_DELIVERY_RESTORED'},
  {id:7,difficulty:'SPECIAL',devTitle:'計器故障',brief:'SG-B LEVEL CHANNEL DISAGREEMENT',stable:10,
    conditions:{sgBLevelCh1StuckLow:true},objective:'INSTRUMENT_FAULT_REPORTED'},
  {id:8,difficulty:'SPECIAL',devTitle:'待機判断',brief:'AUTOMATIC PROTECTION COMPLETE',stable:20,
    conditions:{initialPostTrip:true},objective:'POST_TRIP_CONVERGENCE'},
  {id:9,difficulty:'HARD',devTitle:'RCS在庫喪失',brief:'RCS INVENTORY / PRESSURE DECREASING',stable:20,
    conditions:{letdownLeak:true},objective:'RCS_LEAK_ISOLATED'},
  {id:10,difficulty:'HARD',devTitle:'補機冷却喪失',brief:'COMPONENT COOLING WATER DEGRADED',stable:20,
    conditions:{ccwAFailed:true},objective:'CCW_RESTORED'}
];
