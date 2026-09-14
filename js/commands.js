window.COMMANDS={
 status:[
  ['STATUS','プラント全体の概要'],['STATUS REACTOR','原子炉／崩壊熱の状態'],['STATUS PRIMARY','RCSおよび3系統の一次ループ'],['STATUS STEAM','SG／主蒸気系の概要'],['STATUS FEEDWATER','主給水／補助給水の状態'],['STATUS TURBINE','タービン／発電機の状態'],['STATUS CONDENSER','復水器／ヒートシンクの状態'],['STATUS ELECTRICAL','外部電源・母線・EDGの状態'],['STATUS SAFETY','保護系／AFW／ECCSの状態'],['STATUS INSTRUMENTATION','計装チャンネルの健全性／不一致概要'],['STATUS SUPPORT','補機冷却水系など補助系統の状態']
 ],
 read:[
  ...['RCP-A','RCP-B','RCP-C','SG-A','SG-B','SG-C','FRV-A','FRV-B','FRV-C','AFW-A','AFW-B','AFW-C','AFW-VALVE-A','AFW-VALVE-B','AFW-VALVE-C','REACTOR','RCS','PZR','RPS','TURBINE','GENERATOR','CONDENSER','STEAM-DUMP','ATM-DUMP','OFFSITE','BUS-A','BUS-B','EDG-A','EDG-B','EDG-A-BREAKER','EDG-B-BREAKER','SG-B-LVL-CH1','SG-B-LVL-CH2','SG-B-LVL-CH3','RCS-LETDOWN','RCS-LETDOWN-ISO','SI','CCW-A','CCW-B','CCW-HEADER'].map(x=>[`READ ${x}`,`詳細表示：${x}`])
 ],
 history:[
  ['HISTORY RCP-A FLOW','RCP-A 流量トレンド'],['HISTORY RCP-A VIBRATION','RCP-A 振動トレンド'],['HISTORY RCP-A SPEED','RCP-A 回転数トレンド'],['HISTORY SG-B LEVEL','SG-B 水位トレンド'],['HISTORY FRV-B POSITION','FRV-B 実開度トレンド'],['HISTORY CONDENSER PRESSURE','復水器圧力トレンド'],['HISTORY BUS-B VOLTAGE','BUS-B 電圧トレンド'],['HISTORY AFW-B FLOW','AFW-B 供給流量トレンド'],['HISTORY SG-B-LVL-CH1 LEVEL','SG-B チャンネル1トレンド'],['HISTORY SG-B-LVL-CH2 LEVEL','SG-B チャンネル2トレンド'],['HISTORY RCS PRESSURE','RCS圧力トレンド'],['HISTORY PZR LEVEL','PZR水位トレンド'],['HISTORY CCW FLOW','CCWヘッダ流量トレンド']
 ],
 alarm:[['ALARM','発生中アラーム'],['ALARM DETAIL','発生中アラームの詳細']],
 control:[
  ['CONTROL REACTOR TRIP','手動原子炉トリップ'],['CONTROL RCP-A STOP','RCP-A停止'],['CONTROL RCP-A START','RCP-A起動'],
  ['CONTROL FRV-B OPEN','FRV-B開'],['CONTROL FRV-B CLOSE','FRV-B閉'],
  ['CONTROL AFW-A START','AFW-A起動'],['CONTROL AFW-A STOP','AFW-A停止'],['CONTROL AFW-B START','AFW-B起動'],['CONTROL AFW-B STOP','AFW-B停止'],['CONTROL AFW-C START','AFW-C起動'],['CONTROL AFW-C STOP','AFW-C停止'],
  ['CONTROL AFW-VALVE-B OPEN','AFW-B供給弁を開く'],['CONTROL AFW-VALVE-B CLOSE','AFW-B供給弁を閉じる'],
  ['CONTROL STEAM-DUMP OPEN','復水器向け蒸気ダンプ経路を開く'],['CONTROL STEAM-DUMP CLOSE','復水器向け蒸気ダンプ経路を閉じる'],['CONTROL ATM-DUMP OPEN','大気放出経路を開く'],['CONTROL ATM-DUMP CLOSE','大気放出経路を閉じる'],
  ['CONTROL EDG-A START','EDG-A起動'],['CONTROL EDG-B START','EDG-B起動'],['CONTROL EDG-A-BREAKER OPEN','EDG-A遮断器を開く'],['CONTROL EDG-A-BREAKER CLOSE','EDG-A遮断器を閉じる'],['CONTROL EDG-B-BREAKER OPEN','EDG-B遮断器を開く'],['CONTROL EDG-B-BREAKER CLOSE','EDG-B遮断器を閉じる'],
  ['CONTROL SG-B-LVL DIAG','SG-B水位計装チャンネルの再診断'],
  ['CONTROL RCS-LETDOWN-ISO CLOSE','RCS letdown隔離弁を閉じる'],['CONTROL RCS-LETDOWN-ISO OPEN','RCS letdown隔離弁を開く'],
  ['CONTROL CCW-B START','待機CCW-Bを起動'],['CONTROL CCW-B STOP','CCW-Bを停止']
 ],
 utility:[['HELP','ターミナルコマンド一覧'],['CLEAR','ターミナル表示を消去'],['RESET','SIMULATIONを正常初期状態へ戻す'],['DEBUG LOG ON','5プラント分間隔／イベントのデバッグログ記録開始'],['DEBUG LOG SHOW','記録済みデバッグログを表示'],['DEBUG LOG OFF','デバッグログ記録停止'],['DEBUG LOG CLEAR','デバッグログを消去']]
};
