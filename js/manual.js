window.Manual=(()=>{
  const PAGES=[
    {id:'cover',title:'表紙',type:'cover'},
    {id:'index',title:'索引',type:'index'},
    {id:'pwr-overview',title:'PWR概要',type:'content',body:()=>`
      <div class="manual-kicker">プラント基礎</div><h1>加圧水型原子炉（PWR）— 概要</h1>
      <p>PLANT-01は3ループ加圧水型原子炉（PWR）です。原子炉で発生した熱は、高圧の一次冷却材によって3基の蒸気発生器へ運ばれます。</p>
      <pre class="diagram">一次系                               二次系

REACTOR → RCP / PRIMARY LOOP → SG ║ SG → MAIN STEAM → TURBINE → CONDENSER
                ↑                  ║                       ↓
                └──────────────────║──────── FEEDWATER ←──┘

║ = 蒸気発生器伝熱管を介した熱伝達（一次系と二次系の水は混合しない）</pre>
      <h2>運転原理</h2><p>一次系は冷却材を沸騰させずに原子炉の熱を運びます。蒸気発生器でその熱を二次系へ伝え、発生した蒸気をタービンへ送ります。排気蒸気は復水器で水に戻され、給水として循環します。</p>
      <div class="caution"><strong>注意 — トリップ後の残留熱</strong><p>原子炉トリップ（原子炉の保護停止）によって核分裂出力は停止しますが、崩壊熱は残ります。トリップ後も有効な除熱経路が必要です。</p></div>`},
    {id:'plant-diagram',title:'PLANT-01 系統図',type:'content',body:()=>`
      <div class="manual-kicker">プラント基礎</div><h1>PLANT-01 系統図</h1>
      <pre class="diagram">                         ┌──────────── LOOP-A ────────────┐
                         │   RCP-A ─────── SG-A           │
                         │                                │
[ REACTOR ] ─────────────┼── RCP-B ─────── SG-B ─────────┼─→ MAIN STEAM
                         │                                │       │
                         │   RCP-C ─────── SG-C           │       ▼
                         └──────────── LOOP-C ────────────┘   [ TURBINE ]
                                                                │
                                                                ▼
                                                           [ CONDENSER ]
                                                                │
                                                           CONDENSATE
                                                                │
                                                                ▼
                        [ MAIN FEEDWATER / AFW ] ────────────────┘
                                      │
                                      └────→ SG-A / SG-B / SG-C

電気系統: OFFSITE → BUS-A / BUS-B ← EDG-A / EDG-B
保護系: RPS／自動動作が原子炉および安全機能を監視します。</pre>
      <p>この図は主要設備・系統の機能上の関係を示します。各表示値・操作は対応する設備ページを参照してください。</p>`},
    {id:'reactor-rcs',title:'原子炉 / RCS',type:'equipment',equipment:{
      description:'原子炉は熱出力を発生します。原子炉冷却材系（RCS）は高圧を維持しながら、3系統の一次ループを通じて熱を運びます。',
      diagram:`REACTOR → PRIMARY LOOPS → STEAM GENERATORS → REACTOR\n                │\n                └── PZR：一次系圧力／保有量の制御・表示`,
      indications:[['REACTOR STATE','RUNNING / TRIPPED'],['POWER','原子炉出力表示'],['DECAY HEAT','トリップ後の残留熱'],['RCS PRESSURE','一次系圧力'],['HOT / COLD LEG','一次冷却材温度'],['PZR LEVEL / PRESSURE','加圧器保有量および圧力']],
      normal:[['原子炉状態','出力運転時は RUNNING'],['RCS圧力','約15.5 MPa'],['PZR','自動圧力制御が利用可能']],
      notes:['原子炉トリップは核分裂出力を停止しますが、蓄積熱・崩壊熱が即座になくなるわけではありません。','RCS温度・圧力は、除熱経路の利用可否と合わせて判断してください。'],
      cautions:['原子炉がトリップしただけでは安全状態の完了ではありません。除熱能力が維持されている必要があります。'],
      related:[['rcp','RCP'],['steam-generator','STEAM GENERATOR'],['protection','PROTECTION SYSTEM']],
      commands:['READ REACTOR','READ RCS','READ PZR','STATUS REACTOR','STATUS PRIMARY']
    }},
    {id:'rcp',title:'RCP（原子炉冷却材ポンプ）',type:'equipment',equipment:{
      description:'原子炉冷却材ポンプ（RCP）は、原子炉と蒸気発生器の間で一次冷却材を循環させます。PLANT-01には3系統の一次ループに対応するRCP-A/B/Cがあります。',
      diagram:`                  ┌── RCP-A ── SG-A ──┐\n                  │                    │\nREACTOR ──────────┼── RCP-B ── SG-B ──┼── REACTOR\n                  │                    │\n                  └── RCP-C ── SG-C ──┘`,
      indications:[['STATE','RUNNING / STOPPED'],['SPEED','ポンプ回転数'],['FLOW','一次ループ冷却材流量'],['VIBRATION','機械振動指標'],['BEARING','軸受温度']],
      normal:[['STATE','RUNNING'],['SPEED','約100 %'],['FLOW','約100 %'],['VIBRATION','約1.0 index'],['同等系統','定常状態では大きな差が継続しない']],
      notes:['FLOWは水力性能を示し、ポンプSTATEとは独立して変化する場合があります。','VIBRATIONは機械状態の指標です。トレンドや同等ポンプとの比較が重要です。','単一時点の値だけでは、一時的な変動と進行性の劣化を区別できない場合があります。'],
      cautions:['RCP STATE = RUNNINGでも、水力・機械性能が正常とは限りません。STATE、SPEED、FLOW、VIBRATION、BEARING温度は別々の表示値です。'],
      related:[['reactor-rcs','REACTOR / RCS'],['steam-generator','STEAM GENERATOR'],['electrical','ELECTRICAL SYSTEM']],
      commands:['READ RCP-A','READ RCP-B','READ RCP-C','STATUS PRIMARY']
    }},
    {id:'steam-generator',title:'蒸気発生器（SG）',type:'equipment',equipment:{
      description:'蒸気発生器（SG）は一次系の熱を二次系へ伝えます。一次冷却材は伝熱管内を流れ、二次側の水が蒸気になります。',
      diagram:`PRIMARY LOOP → [ SG-A / SG-B / SG-C ] → PRIMARY RETURN\n                     │\n              二次側蒸気\n                     ▼\n                MAIN STEAM\n                     ▲\n                FEEDWATER`,
      indications:[['LEVEL','二次側保有水量'],['PRESSURE','蒸気発生器圧力'],['STEAM FLOW','SGから流出する蒸気流量'],['FEEDWATER','SGへの給水流量']],
      normal:[['LEVEL','中間域、約55–56 %'],['PRESSURE','通常時 約6.9 MPa'],['系統間比較','同等負荷ではA/B/Cが概ね一致']],
      notes:['SG水位は給水流入量と蒸気流出量の両方に影響されます。','低水位表示は実際の保有水量低下だけでなく計装異常の可能性もあります。他の表示値と比較してください。'],
      cautions:['原子炉トリップ後は、SG保有水量と利用可能な蒸気／除熱経路の両方が重要です。'],
      related:[['rcp','RCP'],['main-feedwater','MAIN FEEDWATER'],['afw','AUXILIARY FEEDWATER'],['main-steam','MAIN STEAM / TURBINE']],
      commands:['READ SG-A','READ SG-B','READ SG-C','STATUS STEAM']
    }},
    {id:'main-feedwater',title:'主給水系',type:'equipment',equipment:{
      description:'主給水系は通常運転時に蒸気発生器へ水を戻します。給水調整弁（FRV-A/B/C）が各SGへの流量を調整します。',
      diagram:`MAIN FEEDWATER → FRV-A → SG-A\n               ├→ FRV-B → SG-B\n               └→ FRV-C → SG-C`,
      indications:[['COMMAND','要求弁開度'],['ACTUAL','実弁開度'],['FLOW','実給水流量'],['SG LEVEL','蒸気発生器保有水量']],
      normal:[['FRV COMMAND / ACTUAL','通常は互いに追従'],['給水流量','プラント負荷およびSG要求と整合']],
      notes:['弁COMMAND、実際の弁開度、供給流量はそれぞれ別の表示値です。','COMMANDとACTUALの不一致は弁応答の劣化を示す場合があります。'],
      cautions:['COMMANDが正常でも、弁が実際に要求位置へ到達したことや正常流量があることは保証されません。'],
      related:[['steam-generator','STEAM GENERATOR'],['afw','AUXILIARY FEEDWATER']],
      commands:['STATUS FEEDWATER','READ FRV-A','READ FRV-B','READ FRV-C']
    }},
    {id:'afw',title:'補助給水系（AFW）',type:'equipment',equipment:{
      description:'補助給水系（AFW）は、主給水が使用できない場合や保護ロジックが代替給水を要求した場合に蒸気発生器へ水を供給します。',
      diagram:`AFW PUMP-A ─→ 供給経路 ─→ SG-A\nAFW PUMP-B ─→ 供給弁 ─→ SG-B\nAFW PUMP-C ─→ 供給経路 ─→ SG-C`,
      indications:[['DEMAND','自動／保護系からの起動要求'],['PUMP','RUNNING / STANDBY'],['VALVE POSITION','供給経路弁の状態'],['FLOW','実AFW供給流量']],
      normal:[['待機状態','ポンプ待機、不要な流量なし'],['起動要求時','要求系統からSGへの実給水が成立']],
      notes:['ポンプ状態と実際の給水成立は別々の表示値です。','ポンプがRUNNINGでも供給経路が成立していなければ有効流量がほとんどない場合があります。'],
      cautions:['PUMP = RUNNING は給水成立を意味しません。実流量と下流経路を個別に確認してください。'],
      related:[['steam-generator','STEAM GENERATOR'],['main-feedwater','MAIN FEEDWATER'],['protection','PROTECTION SYSTEM']],
      commands:['STATUS FEEDWATER','READ AFW-A','READ AFW-B','READ AFW-C','READ AFW-VALVE-B']
    }},
    {id:'main-steam',title:'主蒸気 / タービン',type:'equipment',equipment:{
      description:'3基の蒸気発生器からの蒸気はタービンへ送られます。タービンが蒸気エネルギーを軸動力へ変換し、発電機が電力へ変換します。',
      diagram:`SG-A/B/C → MAIN STEAM → TURBINE → GENERATOR\n                          │\n                          └→ 代替蒸気／ダンプ経路`,
      indications:[['TURBINE STATE','RUNNING / TRIPPED'],['GENERATOR STATE','ONLINE / OFFLINE'],['SG PRESSURE','二次系圧力応答'],['STEAM PATH','利用可能な蒸気放出先']],
      normal:[['タービン','出力運転時は RUNNING'],['発電機','出力運転時は ONLINE']],
      notes:['タービントリップは蒸気需要を急変させ、原子炉保護動作を起動する場合があります。','タービン喪失後の二次系除熱は、別の蒸気経路に依存する場合があります。'],
      cautions:['自動保護動作は条件を検出したことを示しますが、長期的な除熱成立を保証しません。'],
      related:[['steam-generator','STEAM GENERATOR'],['condenser','CONDENSER / HEAT SINK'],['protection','PROTECTION SYSTEM']],
      commands:['STATUS TURBINE','STATUS STEAM','READ TURBINE','READ GENERATOR']
    }},
    {id:'condenser',title:'復水器 / ヒートシンク',type:'equipment',equipment:{
      description:'復水器はタービン排気や蒸気ダンプ流を受け、蒸気を水へ戻します。十分な真空がある場合、二次系の主要なヒートシンクとして機能します。',
      diagram:`TURBINE EXHAUST / STEAM DUMP → CONDENSER → CONDENSATE\n\n復水器ヒートシンクが利用できない場合:\nSTEAM GENERATOR → ATM-DUMP → 大気`,
      indications:[['CONDENSER PRESSURE','絶対圧。低いほど真空度が高い'],['AVAILABLE','復水器が除熱先として利用可能か'],['STEAM-DUMP STATE','復水器向け蒸気ダンプ経路'],['ATM-DUMP STATE','大気放出による除熱経路']],
      normal:[['復水器圧力','約7 kPa(abs)'],['利用可否','AVAILABLE']],
      notes:['復水器絶対圧の上昇は真空悪化を示します。','蒸気経路は下流のヒートシンクが利用可能な場合にのみ有効です。'],
      cautions:['利用不能なヒートシンクへの経路を開いても、有効な除熱は成立しません。'],
      related:[['main-steam','MAIN STEAM / TURBINE'],['steam-generator','STEAM GENERATOR']],
      commands:['STATUS CONDENSER','READ CONDENSER','READ STEAM-DUMP','READ ATM-DUMP']
    }},
    {id:'electrical',title:'電気系統',type:'equipment',equipment:{
      description:'通常運転時の所内負荷は外部電源から給電されます。必要時には非常用ディーゼル発電機（EDG）が安全系母線へ給電できます。',
      diagram:`OFFSITE ───────→ BUS-A ←────── EDG-A\n    │\n    └──────────→ BUS-B ← BREAKER ← EDG-B`,
      indications:[['OFFSITE','AVAILABLE / LOST'],['BUS VOLTAGE','母線が受電しているか'],['EDG ENGINE','RUNNING / STANDBY'],['EDG SPEED','機関／発電機回転数'],['BREAKER','電源と母線の接続状態']],
      normal:[['外部電源','AVAILABLE'],['BUS-A / BUS-B','ENERGIZED'],['EDG','STANDBY']],
      notes:['EDGは機械的にRUNNINGでも母線から電気的に切り離されている場合があります。','電源状態、遮断器位置、母線電圧は別々の表示値として確認してください。'],
      cautions:['ENGINE = RUNNING は BUS = ENERGIZED を意味しません。電気的な接続経路も成立している必要があります。'],
      related:[['protection','PROTECTION SYSTEM'],['afw','AUXILIARY FEEDWATER']],
      commands:['STATUS ELECTRICAL','READ OFFSITE','READ BUS-A','READ BUS-B','READ EDG-A','READ EDG-B','READ EDG-B-BREAKER']
    }},
    {id:'protection',title:'保護系',type:'equipment',equipment:{
      description:'保護系は設定されたプラント条件を検出し、悪化防止または安全側への移行を目的とした動作を自動で開始します。',
      diagram:`プラント表示値 → 保護ロジック → AUTO動作\n                                      │\n                                      ├→ REACTOR TRIP\n                                      ├→ AFW DEMAND\n                                      └→ INTERLOCKS`,
      indications:[['RPS','原子炉保護系状態'],['AFW DEMAND','補助給水の自動起動要求'],['INTERLOCKS','操作許可ロジック'],['TRIP STATE','保護動作の完了状態']],
      normal:[['通常出力時','保護機能利用可能／待機'],['有効な起動条件成立時','所定の自動動作を開始']],
      notes:['AUTOは設定された起動条件成立後にシステムが自動介入することを意味します。','INTERLOCKは必要な許可条件が満たされない場合に操作を禁止するロジックです。','自動動作の発動と復旧成功は同じではありません。'],
      cautions:['AUTO ACTUATEDを「問題解決」と解釈しないでください。実際の設備状態とプラント応答を確認する必要があります。'],
      related:[['reactor-rcs','REACTOR / RCS'],['afw','AUXILIARY FEEDWATER'],['instrumentation','INSTRUMENTATION']],
      commands:['STATUS SAFETY','READ RPS']
    }},
    {id:'instrumentation',title:'計装系',type:'equipment',equipment:{
      description:'計装系はプラントの物理状態を運転員が確認できる表示値へ変換します。重要な測定には複数の独立チャンネルを用い、不一致を検出できるものがあります。',
      diagram:`実プロセス値\n        ├→ CHANNEL 1\n        ├→ CHANNEL 2\n        └→ CHANNEL 3\n             ↓\n        チャンネル比較`,
      indications:[['VALUE','表示プロセス値'],['QUALITY','チャンネル有効性表示'],['CHANNEL AGREEMENT','冗長チャンネル間の比較'],['HISTORY','プロセス変化への追従状況']],
      normal:[['冗長チャンネル','通常許容範囲内で概ね一致'],['トレンド','実プロセス変化に追従']],
      notes:['チャンネル値がもっともらしい範囲に留まっていても、実プロセスを追従していない場合があります。','冗長チャンネルや他の物理表示値との比較により、実プロセス変化とセンサー故障を切り分けられます。'],
      cautions:['独立した表示値と矛盾する単一チャンネルだけから、実際の保有量変化を断定しないでください。'],
      related:[['steam-generator','STEAM GENERATOR'],['protection','PROTECTION SYSTEM']],
      commands:['STATUS INSTRUMENTATION','READ SG-B-LVL-CH1','READ SG-B-LVL-CH2','READ SG-B-LVL-CH3']
    }},
    {id:'operating-reference',title:'運転基準値',type:'content',body:()=>`
      <div class="manual-kicker">基準データ</div><h1>運転基準</h1>
      <p>本施設における主要設備・系統の標準的な運転値および監視基準を以下に示す。</p>
      <table class="manual-table"><tr><th>パラメータ</th><th>通常基準</th></tr><tr><td>RCS圧力</td><td>15.5 MPa</td></tr><tr><td>RCP回転数</td><td>~100 %</td></tr><tr><td>RCP流量</td><td>~100 %</td></tr><tr><td>RCP振動</td><td>~1.0 index</td></tr><tr><td>SG水位</td><td>~55–56 %</td></tr><tr><td>SG圧力</td><td>~6.9 MPa</td></tr><tr><td>復水器圧力</td><td>~7 kPa(abs)</td></tr><tr><td>BUS電圧</td><td>100 % 受電時</td></tr></table>
      <div class="note"><strong>注記</strong><p>単一の数値だけでなく、トレンド、同等系統間の比較、関連表示値どうしの整合性も重要です。</p></div>`},
    {id:'glossary-am',title:'用語集 A–M',type:'glossary',terms:[
      ['AFW','Auxiliary Feedwater / 補助給水','主給水が利用できない場合や安全系要求がある場合、AFWが代替系統から蒸気発生器へ給水します。'],
      ['AUTO','Automatic action / 自動動作','あらかじめ設定された起動条件成立後に自動で開始される系統動作です。自動動作は復旧成功を保証しません。'],
      ['BUS','Electrical Bus / 母線','接続された所内負荷へ電力を分配する共通の電気母線です。'],
      ['Decay Heat','崩壊熱','原子炉停止後も核分裂生成物の放射性崩壊によって発生し続ける熱です。'],
      ['EDG','Emergency Diesel Generator / 非常用ディーゼル発電機','通常電源が利用できない場合に使用する非常用電源です。'],
      ['FRV','Feedwater Regulating Valve / 給水調整弁','蒸気発生器への給水流量を調整する弁です。'],
      ['Heat Sink','ヒートシンク / 熱の逃がし先','プラントの熱を受け取り、外部へ逃がすことができる系統・設備・経路です。'],
      ['INTERLOCK','インターロック','必要条件・許可条件に応じて操作を許可または禁止するロジックです。'],
      ['Main Feedwater','主給水','通常時に蒸気発生器へ水を戻す給水系です。'],
      ['Main Steam','主蒸気','蒸気発生器からタービンまたは代替蒸気経路へ送られる蒸気です。']
    ]},
    {id:'glossary-nz',title:'用語集 N–Z',type:'glossary',terms:[
      ['PWR','Pressurized Water Reactor / 加圧水型原子炉','高圧の一次冷却材が蒸気発生器を介して独立した二次系へ原子炉熱を伝える形式の原子炉です。'],
      ['PZR','Pressurizer / 加圧器','一次系の圧力・保有量の制御および表示に関係する設備です。'],
      ['RCP','Reactor Coolant Pump / 原子炉冷却材ポンプ','原子炉冷却材ループ内で一次冷却材を循環させるポンプです。'],
      ['RCS','Reactor Coolant System / 原子炉冷却材系','原子炉熱を蒸気発生器へ運ぶ高圧の一次系です。'],
      ['RPS','Reactor Protection System / 原子炉保護系','設定条件成立時に原子炉トリップを起動できる保護ロジックです。'],
      ['SG','Steam Generator / 蒸気発生器','一次冷却材の熱を二次側へ伝え、蒸気を発生させる熱交換器です。'],
      ['TRIP（トリップ）','保護停止／切り離し動作','保護機能などによって設備を停止・切り離す動作です。原子炉トリップやタービントリップなどがあります。'],
      ['Vacuum','真空','タービン排気を受け入れて凝縮させるため、復水器内に維持される低い絶対圧です。']
    ]},
    {id:'cmd-status',title:'コマンド — STATUS / ALARM',type:'commands',groups:['status','alarm']},
    {id:'cmd-read-primary',title:'コマンド — READ / 一次系',type:'commands',filter:(cmd)=>/^READ (RCP-|REACTOR$|RCS$|PZR$|RPS$)/.test(cmd)},
    {id:'cmd-read-secondary',title:'コマンド — READ / 二次系',type:'commands',filter:(cmd)=>/^READ (SG-[ABC]$|FRV-|AFW-|AFW-VALVE-)/.test(cmd)},
    {id:'cmd-read-support',title:'コマンド — READ / 補助系',type:'commands',filter:(cmd)=>/^READ (TURBINE|GENERATOR|CONDENSER|STEAM-DUMP|ATM-DUMP|OFFSITE|BUS-|EDG-|SG-B-LVL-CH)/.test(cmd)},
    {id:'cmd-history',title:'コマンド — HISTORY',type:'commands',groups:['history']},
    {id:'cmd-control',title:'コマンド — CONTROL',type:'commands',groups:['control']},
    {id:'terminal',title:'ターミナル操作',type:'content',body:()=>`
      <div class="manual-kicker">ターミナル資料</div><h1>ターミナル操作</h1>
      <h2>基本操作</h2><p>コマンドはターミナル入力欄へ入力し、EnterまたはEXECUTEボタンで実行します。マニュアル内のコマンドボタンは入力欄へ文字列を挿入するだけで、自動実行しません。</p>
      <table class="manual-table"><tr><th>コマンド</th><th>用途</th></tr><tr><td>STATUS [SYSTEM]</td><td>系統単位の概要</td></tr><tr><td>READ &lt;DEVICE&gt;</td><td>設備の詳細表示</td></tr><tr><td>HISTORY &lt;DEVICE&gt; &lt;パラメータ&gt;</td><td>記録されたトレンド</td></tr><tr><td>ALARM [DETAIL]</td><td>発生中アラーム情報</td></tr><tr><td>CONTROL &lt;DEVICE&gt; &lt;ACTION&gt;</td><td>手動操作</td></tr></table>
      <h2>入力履歴</h2><p>ターミナル入力欄で↑／↓キーを使うと、過去に実行したコマンドを呼び出せます。</p>
      <h2>マニュアル内コマンドボタン</h2><p>マニュアル内のコマンドを選ぶと入力欄へ挿入され、入力欄にフォーカスします。内容を確認してEnterまたはEXECUTEを押してください。</p>`}
  ];

  const PAGE_BY_ID=Object.fromEntries(PAGES.map((p,i)=>[p.id,{page:p,index:i}]));
  let current=0, host=null, insertCommand=null;

  const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function commandButton(cmd,desc=''){
    return `<button class="cmd" data-command="${escapeHtml(cmd)}">${escapeHtml(cmd)}${desc?`<small>${escapeHtml(desc)}</small>`:''}</button>`;
  }

  function equipmentBody(eq){
    const indications=eq.indications.map(([a,b])=>`<tr><th>${escapeHtml(a)}</th><td>${escapeHtml(b)}</td></tr>`).join('');
    const normal=eq.normal.map(([a,b])=>`<tr><th>${escapeHtml(a)}</th><td>${escapeHtml(b)}</td></tr>`).join('');
    const notes=eq.notes.map(n=>`<li>${escapeHtml(n)}</li>`).join('');
    const cautions=eq.cautions.map(n=>`<div class="caution"><strong>注意</strong><p>${escapeHtml(n)}</p></div>`).join('');
    const related=eq.related.map(([id,label])=>`<button class="page-link" data-page="${id}">${escapeHtml(label)}</button>`).join('');
    const commands=eq.commands.map(c=>{
      const found=Object.values(COMMANDS).flat().find(([cmd])=>cmd===c);return commandButton(c,found?.[1]||'');
    }).join('');
    return `<div class="manual-kicker">系統／設備説明</div><h1>${escapeHtml(PAGES[current].title)}</h1>
      <p>${escapeHtml(eq.description)}</p><h2>系統図</h2><pre class="diagram">${escapeHtml(eq.diagram)}</pre>
      <div class="manual-columns"><div><h2>表示項目</h2><table class="manual-table">${indications}</table></div><div><h2>通常状態</h2><table class="manual-table">${normal}</table></div></div>
      <h2>表示値の注意点</h2><ul>${notes}</ul>${cautions}
      <h2>関連系統</h2><div class="link-row">${related}</div>
      <h2>利用可能なターミナル参照</h2><div class="command-row">${commands}</div>`;
  }

  function indexBody(){
    const sections=[
      ['プラント基礎',['pwr-overview','plant-diagram']],
      ['一次系',['reactor-rcs','rcp','steam-generator']],
      ['二次系／補助系',['main-feedwater','afw','main-steam','condenser']],
      ['安全系／電気系',['electrical','protection','instrumentation']],
      ['資料',['operating-reference','glossary-am','glossary-nz']],
      ['コマンド資料',['cmd-status','cmd-read-primary','cmd-read-secondary','cmd-read-support','cmd-history','cmd-control','terminal']]
    ];
    return `<div class="manual-kicker">文書ナビゲーション</div><h1>索引</h1><div class="index-sections">${sections.map(([name,ids])=>`<section class="index-group"><h2>${name}</h2><div class="index-list">${ids.map(id=>`<button class="index-btn" data-page="${id}">${PAGES[PAGE_BY_ID[id].index].title}</button>`).join('')}</div></section>`).join('')}</div>`;
  }

  function glossaryBody(page){
    return `<div class="manual-kicker">用語集</div><h1>${page.title}</h1><div class="glossary">${page.terms.map(([term,full,desc])=>`<div class="term"><strong>${escapeHtml(term)}</strong><p>${escapeHtml(full)}</p><p>${escapeHtml(desc)}</p></div>`).join('')}</div>`;
  }

  function commandPageBody(page){
    let items=[];
    if(page.groups){page.groups.forEach(g=>items.push(...COMMANDS[g]));}
    else {items=COMMANDS.read.filter(([cmd])=>page.filter(cmd));}
    return `<div class="manual-kicker">コマンド資料</div><h1>${page.title}</h1><p>コマンドをクリックするとターミナル入力欄へ挿入されます。自動実行はされません。</p><div class="command-row">${items.map(([cmd,desc])=>commandButton(cmd,desc)).join('')}</div>`;
  }

  function coverBody(){
    return `<div class="cover"><h1>PLANT-01</h1><h2>加圧水型原子炉施設</h2><div class="subtitle">運転・保守マニュアル</div><div class="docno">DOCUMENT NO. PL01-OM-001<br>REVISION 06</div><div class="auth">関係者用</div></div>`;
  }

  function pageBody(page){
    if(page.type==='cover')return coverBody();
    if(page.type==='index')return indexBody();
    if(page.type==='equipment')return equipmentBody(page.equipment);
    if(page.type==='glossary')return glossaryBody(page);
    if(page.type==='commands')return commandPageBody(page);
    return page.body();
  }

  function gotoPage(id){if(PAGE_BY_ID[id]){current=PAGE_BY_ID[id].index;draw();}}

  function draw(){
    if(!host)return;
    const page=PAGES[current];
    host.innerHTML=`<div class="manual-shell"><div class="manual-nav"><button data-nav="index">索引</button><button data-nav="prev">◀ 前へ</button><div class="page-indicator">PAGE ${String(current+1).padStart(2,'0')} / ${String(PAGES.length).padStart(2,'0')} — ${escapeHtml(page.title)}</div><button data-nav="next">次へ ▶</button><button data-nav="cover">表紙</button></div><article class="manual-page">${pageBody(page)}</article></div>`;
    const article=host.querySelector('.manual-page');
    host.querySelector('[data-nav="index"]').onclick=()=>gotoPage('index');
    host.querySelector('[data-nav="cover"]').onclick=()=>gotoPage('cover');
    host.querySelector('[data-nav="prev"]').onclick=()=>{current=(current-1+PAGES.length)%PAGES.length;draw();};
    host.querySelector('[data-nav="next"]').onclick=()=>{current=(current+1)%PAGES.length;draw();};
    article.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>gotoPage(b.dataset.page));
    article.querySelectorAll('[data-command]').forEach(b=>b.onclick=()=>insertCommand?.(b.dataset.command));
    article.scrollTop=0;
  }

  return {
    render(root,insert,startPage){host=root;insertCommand=insert;root.className='right-body manual-host';if(startPage&&PAGE_BY_ID[startPage])current=PAGE_BY_ID[startPage].index;draw();},
    goto:gotoPage,
    reset(){current=0;host=null;insertCommand=null;}
  };
})();
