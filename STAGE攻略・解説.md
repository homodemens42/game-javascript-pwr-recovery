# PWR Recovery Prototype v0.6.0-pre.2
## 解説・攻略（最短手順）

> **完全なネタバレを含みます。**

## 共通仕様

- 時間倍率：**現実1秒 = プラント内1分**
- `TIME LIMIT`：番号付き全ステージ共通 **08:00**
  - 復旧・解明の最終期限。
  - `00:00` で `TIME LIMIT EXCEEDED`。
- `PLANT TIME`：現在の設備状態から見た**物理FAILまでの推定猶予**。
  - 悪化で短く、改善で長くなる。
  - 安全側へ収束し、物理FAILが予測されない場合は `--:--`。
  - 物理FAILまでの推定猶予が残り `TIME LIMIT` より長い場合、ヘッダ表示は `> TIME LIMIT`。
  - 内部では物理猶予の推定値を保持しており、悪化して `TIME LIMIT` より短くなると具体的な時刻表示へ切り替わる。
  - `00:00` 相当の物理限界で `PLANT FAILURE`。
- `AUTO` は安全側へ介入するが、故障そのものを必ず解決するわけではない。
- `INTERLOCK` は成立条件を満たさない操作を拒否する。

## TUTORIAL

実際の簡略RCP-A異常を使って、以下を順番に体験する。

1. 左＝ターミナル、右＝マニュアル
2. `PLANT TIME` / `TIME LIMIT`
3. `STATUS`
4. マニュアル索引からRCPページを開く
5. RCPページの対象コマンドボタンが強調される
6. `STATUS PRIMARY`（直接入力でも、強調ボタンから入力欄へ挿入しても可）
7. `READ RCP-A`
8. `ALARM`
9. マニュアルのCONTROLページを確認
10. `CONTROL REACTOR TRIP`（直接入力／ボタン挿入どちらでも可）
11. `CONTROL RCP-A STOP`（直接入力／ボタン挿入どちらでも可）
12. 状態が安全側へ収束するまで監視

チュートリアルの目的は「正解コマンドを暗記すること」ではなく、

`STATUS → 系統を絞る → READ / ALARM → マニュアル参照 → CONTROL → 収束確認`

というゲームの流れを覚えること。

## SIMULATION

正常運転状態の施設から開始する自由練習モード。

- CLEARなし
- TIME LIMITなし
- AUTO / INTERLOCK / COMMAND→ACTUAL→下流状態は動作
- 操作で危険状態を作れば `PLANT TIME` が出現する
- 物理限界に達すると警告を出すが、シミュレーションは継続
- `RESET` で正常初期状態へ戻す

---

# STAGE-1

## 異常
RCP-Aの進行性劣化。

## 最短手順

```text
CONTROL REACTOR TRIP
CONTROL RCP-A STOP
```

RCP-A停止、熱的リスク低下、RCS温度低下を待つ。

## 放置
一次流量低下でAUTO原子炉トリップ。重大化は防ぐがRCP-A故障は残るため、未処置ならTIME LIMIT。

---

# STAGE-2

## 異常
FRV-B ACTUALが閉方向へずれ、FW-B FLOWとSG-B LEVELが低下。

## 最短手順

```text
CONTROL FRV-B OPEN
```

ACTUAL → FLOW → LEVEL TREND → LEVELの回復を待つ。

## AUTO
LOW-LOW水位で原子炉トリップ＋AFW起動。

## 物理FAIL経路
AUTO後にAFW-Bを停止し、FRV-Bも未復旧のままならSG-B保有水量を失いPLANT FAILUREへ進む。

---

# STAGE-3

## 異常
原子炉・タービントリップ、AFW起動までは完了しているが、STEAM-DUMP開度不足で復水器への除熱が足りない。

## 最短手順

```text
CONTROL STEAM-DUMP OPEN
```

## 放置
SG圧力・RCS温度が悪化し、TIME LIMITより先にPLANT FAILURE。

## 逆操作

```text
CONTROL STEAM-DUMP CLOSE
```

で再び除熱能力を失う。

---

# STAGE-4

## 異常
復水器真空喪失。AUTOでタービン／原子炉トリップ、AFW起動。

## 最短手順

OPEN permissive成立後：

```text
CONTROL ATM-DUMP OPEN
```

## 放置
復水器が使えないため代替蒸気放出経路がなく、PLANT FAILUREへ進む。

## 逆操作

```text
CONTROL ATM-DUMP CLOSE
```

で成立した代替除熱を失う。

---

# STAGE-5

## 異常
外部電源喪失。EDG-Aは自動でBUS-Aへ接続するが、EDG-BはRUNNINGでもbreaker OPENのためBUS-Bが復旧しない。

## 最短手順

EDG-B speed permissive成立後：

```text
CONTROL EDG-B-BREAKER CLOSE
```

## 物理FAIL経路
BUS-B未復旧中に、復旧済みのEDG-A breakerまで開けば両安全母線を失う。

```text
CONTROL EDG-A-BREAKER OPEN
```

両BUS喪失が継続すると冷却能力が低下しPLANT FAILURE。

---

# STAGE-6

## 異常
MFW喪失。AFW-A/C正常、AFW-BはポンプRUNNINGだがdelivery valve閉で流量なし。

## 最短手順

```text
CONTROL AFW-VALVE-B OPEN
```

## 物理FAIL経路
A/Cまで停止して総AFW能力を失えば、RCS温度が上昇してPLANT FAILURE。

例：

```text
CONTROL AFW-A STOP
CONTROL AFW-C STOP
```

---

# STAGE-7

## 異常
SG-B水位CH1が低値固着。CH2/CH3と不一致。

## 最短手順

```text
CONTROL SG-B-LVL DIAG
```

診断完了後、端末に必ず以下が出る。

```text
MAINTENANCE NOTIFICATION REQUIRED
TYPE: REPORT <DEVICE>
```

続けて：

```text
REPORT SG-B-LVL-CH1
```

`REPORT` はマニュアルには掲載しない。

## 放置
物理的には安定。解明・故障連絡ができないままTIME LIMITで失敗。

---

# STAGE-8

## 異常
保護動作後、必要な冷却がすでに成立している。

## 最短手順

**操作しない。**

STATUS / READ / ALARMで安全側への収束を確認する。

RCP-Aを止めれば収束が遅れるが、停止しただけで不自然に即PLANT FAILUREにはしない。

---

# STAGE-9

## 異常
RCS letdown経路下流で継続漏えい。RCS圧力・PZR水位・一次冷却材在庫が低下。

## AUTO
RCS圧力低下で：

```text
REACTOR TRIP
SAFETY INJECTION
```

が作動する。

安全注入は時間を稼ぐが、漏えい源そのものは止めない。

## 調査例

```text
STATUS PRIMARY
READ RCS
READ PZR
READ RCS-LETDOWN
READ RCS-LETDOWN-ISO
READ SI
HISTORY RCS PRESSURE
HISTORY PZR LEVEL
```

## 最短手順

```text
CONTROL RCS-LETDOWN-ISO CLOSE
```

漏えいを隔離し、圧力・保有量が安定／回復するまで待つ。

## 放置
AUTO安全注入より流出が大きく、RCS在庫を失ってTIME LIMITより先にPLANT FAILURE。

---

# STAGE-10

## 異常
CCW-A喪失。共通の補機冷却水流量が低下し、RCP・AFW・EDGなど無関係に見える複数設備の温度が同時に上昇する。

## AUTO
CCW HEADER FLOWが十分低下すると原子炉トリップ。

しかし共通支持系統が復旧しなければ、安全設備の冷却も悪化し続ける。

## 調査例

```text
STATUS SUPPORT
READ CCW-A
READ CCW-B
READ CCW-HEADER
READ RCP-A
READ AFW-A
READ EDG-A
```

## 最短手順

```text
CONTROL CCW-B START
```

CCW-B回転数・HEADER FLOW・各設備温度が回復するまで待つ。

## 放置
共通支持系統喪失がカスケードして除熱能力を失い、TIME LIMITより先にPLANT FAILURE。

---

# 最短手順一覧

| モード / STAGE | 最短手順 |
|---|---|
| TUTORIAL | ガイドに従い、最後は `REACTOR TRIP → RCP-A STOP` |
| SIMULATION | CLEARなし。自由操作。`RESET`で復帰 |
| 1 | `CONTROL REACTOR TRIP` → `CONTROL RCP-A STOP` |
| 2 | `CONTROL FRV-B OPEN` |
| 3 | `CONTROL STEAM-DUMP OPEN` |
| 4 | `CONTROL ATM-DUMP OPEN` |
| 5 | `CONTROL EDG-B-BREAKER CLOSE` |
| 6 | `CONTROL AFW-VALVE-B OPEN` |
| 7 | `CONTROL SG-B-LVL DIAG` → `REPORT SG-B-LVL-CH1` |
| 8 | 操作しない |
| 9 | `CONTROL RCS-LETDOWN-ISO CLOSE` |
| 10 | `CONTROL CCW-B START` |
