import { Ticket } from './types';

// STARTO ENTERTAINMENT所属グループを例にしたサンプルデータ
// 各機能の使い方がわかるよう、様々なパターンを用意
export const sampleTickets: Ticket[] = [
  // ========================================
  // 売り手パターン（自分のチケットを譲る）
  // ========================================

  // 保留: まだどうするか決めていない
  {
    id: 'sample-1',
    tourName: 'Aぇ! group LIVE TOUR 2026 "RUNWAY"',
    performerName: 'Aぇ! group',
    nameHolder: '自分名義',
    eventDate: '2026-04-12',
    startTime: '17:00',
    venue: '大阪城ホール',
    seatInfo: 'アリーナ Bブロック 5列',
    tradeMethod: 'qr',
    status: 'pending',
    price: 9800,
    memo: '友達と被ったけど、まだどうするか決めてない。様子見。',
    createdAt: '2026-01-10T10:00:00.000Z',
    updatedAt: '2026-01-10T10:00:00.000Z',
  },

  // 募集中: Xで募集を出している（連絡先URL付き）
  {
    id: 'sample-2',
    tourName: 'SixTONES LIVE TOUR 2026 "VVS"',
    performerName: 'SixTONES',
    nameHolder: '自分名義',
    eventDate: '2026-03-22',
    startTime: '18:00',
    venue: '東京ドーム',
    seatInfo: 'スタンド 1塁側 20ゲート 5列',
    tradeMethod: 'qr',
    status: 'recruiting',
    price: 12000,
    paymentTiming: 'cash_on_delivery',
    platform: 'twitter',
    mainContact: 'https://x.com/example_user',
    relatedUrl: 'https://x.com/example_user/status/1234567890',
    memo: 'Xで募集中。リプかDMでご連絡ください。当日手渡し希望。本人確認対応可。',
    createdAt: '2026-01-08T15:00:00.000Z',
    updatedAt: '2026-01-11T09:00:00.000Z',
  },

  // 募集中: チケジャムに出品中（関連URL付き）
  {
    id: 'sample-3',
    tourName: 'Snow Man LIVE TOUR 2026 "RAYS"',
    performerName: 'Snow Man',
    nameHolder: '友人A',
    eventDate: '2026-05-03',
    startTime: '17:00',
    venue: '京セラドーム大阪',
    tradeMethod: 'accompany',
    status: 'recruiting',
    price: 13000,
    paymentTiming: 'platform',
    platform: 'ticketjam',
    relatedUrl: 'https://ticketjam.jp/items/example123',
    memo: '友人Aの名義分。同行者として入場。チケジャムに出品中。',
    createdAt: '2026-01-05T20:00:00.000Z',
    updatedAt: '2026-01-05T20:00:00.000Z',
  },

  // 確定: 買い手が決まった
  {
    id: 'sample-4',
    tourName: 'Aぇ! group LIVE TOUR 2026 "RUNWAY"',
    performerName: 'Aぇ! group',
    nameHolder: '自分名義',
    eventDate: '2026-04-13',
    startTime: '13:00',
    venue: '大阪城ホール',
    seatInfo: 'スタンド Iブロック 8列',
    tradeMethod: 'qr',
    status: 'confirmed',
    partner: '田中さん',
    price: 9800,
    paymentTiming: 'cash_on_delivery',
    platform: 'twitter',
    mainContact: 'https://x.com/tanaka_example',
    subContact: 'LINE: tanaka123',
    memo: 'Xで見つけてくれた田中さんに譲渡予定。当日手渡しで精算。',
    createdAt: '2026-01-09T14:00:00.000Z',
    updatedAt: '2026-01-12T10:00:00.000Z',
  },

  // ========================================
  // 買い手パターン（譲ってもらう）
  // ========================================

  // 確定: 譲ってもらえることが決まった
  {
    id: 'sample-5',
    tourName: 'なにわ男子 LIVE TOUR 2026 "POPMALL 2"',
    performerName: 'なにわ男子',
    eventDate: '2026-06-15',
    startTime: '17:00',
    venue: '横浜アリーナ',
    tradeMethod: 'accompany',
    status: 'confirmed',
    partner: '山田さん',
    price: 10500,
    paymentTiming: 'cash_on_delivery',
    platform: 'twitter',
    mainContact: 'https://x.com/yamada_example',
    relatedUrl: 'https://x.com/yamada_example/status/9876543210',
    memo: 'Xで見つけた山田さんから同行枠で譲っていただく。当日現地で手渡し。',
    createdAt: '2026-01-11T18:00:00.000Z',
    updatedAt: '2026-01-12T09:00:00.000Z',
  },

  // 金銭処理済: 支払いは完了、チケット待ち
  {
    id: 'sample-6',
    tourName: 'Travis Japan LIVE TOUR 2026 "ELEVATION"',
    performerName: 'Travis Japan',
    eventDate: '2026-07-20',
    startTime: '18:00',
    venue: 'さいたまスーパーアリーナ',
    seatInfo: 'アリーナ C3ブロック',
    tradeMethod: 'qr',
    status: 'paid',
    partner: '高橋さん',
    price: 11000,
    paymentTiming: 'platform',
    platform: 'ticket-ryutsu',
    relatedUrl: 'https://www.ticket.co.jp/trade/example456',
    memo: 'チケット流通センター経由で購入済み。QRが届くのを待っている。',
    createdAt: '2026-01-06T11:00:00.000Z',
    updatedAt: '2026-01-08T16:00:00.000Z',
  },

  // ========================================
  // 交換パターン
  // ========================================

  // 確定: 交換相手が決まった
  {
    id: 'sample-7',
    tourName: 'SixTONES LIVE TOUR 2026 "VVS"',
    performerName: 'SixTONES',
    nameHolder: '自分名義',
    eventDate: '2026-03-29',
    startTime: '17:00',
    venue: '京セラドーム大阪',
    tradeMethod: 'exchange',
    status: 'confirmed',
    exchangeEvent: {
      tourName: 'SixTONES LIVE TOUR 2026 "VVS"',
      eventDate: '2026-03-30',
      startTime: '17:00',
      venue: '京セラドーム大阪',
    },
    partner: '鈴木さん',
    platform: 'twitter',
    mainContact: 'https://x.com/suzuki_example',
    memo: '鈴木さんと29日⇔30日で交換。公演前日にQR送り合い予定。',
    createdAt: '2026-01-07T20:00:00.000Z',
    updatedAt: '2026-01-10T14:00:00.000Z',
  },

  // ========================================
  // 番手パターン
  // ========================================

  // 確定: 番手で譲渡
  {
    id: 'sample-8',
    tourName: 'Snow Man LIVE TOUR 2026 "RAYS"',
    performerName: 'Snow Man',
    nameHolder: '自分名義',
    eventDate: '2026-05-04',
    startTime: '17:00',
    venue: '京セラドーム大阪',
    tradeMethod: 'slot',
    status: 'confirmed',
    slotInfo: {
      totalSlots: 4,
      mySlot: 2,
    },
    partner: '佐藤さん',
    price: 12500,
    paymentTiming: 'cash_on_delivery',
    mainContact: 'https://x.com/sato_example',
    subContact: 'LINE ID: sato_line',
    memo: '4名義中2番手。佐藤さんに譲渡。当日現地で精算予定。',
    createdAt: '2026-01-08T12:00:00.000Z',
    updatedAt: '2026-01-11T15:00:00.000Z',
  },

  // ========================================
  // 進行中・完了パターン
  // ========================================

  // 受渡済: チケット渡した、完了待ち
  {
    id: 'sample-9',
    tourName: 'Aぇ! group LIVE TOUR 2026 "RUNWAY"',
    performerName: 'Aぇ! group',
    nameHolder: '自分名義',
    eventDate: '2026-02-11',
    startTime: '17:00',
    venue: 'Kアリーナ横浜',
    seatInfo: 'レベル2 セクション205',
    tradeMethod: 'qr',
    status: 'received',
    partner: '中村さん',
    price: 9800,
    paymentTiming: 'prepaid',
    paymentMethod: 'bank',
    platform: 'twitter',
    mainContact: 'https://x.com/nakamura_example',
    payments: [
      {
        id: 'payment-1',
        amount: 9800,
        paidAt: '2026-02-01T10:00:00.000Z',
        method: 'bank',
        memo: '振込確認済み'
      }
    ],
    memo: '中村さんにQRごと譲渡完了。公演終わったら完了にする。',
    createdAt: '2026-01-05T09:00:00.000Z',
    updatedAt: '2026-02-10T18:00:00.000Z',
  },

  // 完了: 全て終了
  {
    id: 'sample-10',
    tourName: 'SixTONES LIVE TOUR 2025 "GOLD"',
    performerName: 'SixTONES',
    nameHolder: '自分名義',
    eventDate: '2025-12-28',
    startTime: '17:00',
    venue: '東京ドーム',
    seatInfo: 'アリーナ A5ブロック 3列',
    tradeMethod: 'accompany',
    status: 'completed',
    partner: '友人B',
    price: 11500,
    paymentTiming: 'cash_on_delivery',
    memo: '友人Bと参戦。最高のライブだった！',
    createdAt: '2025-10-15T14:00:00.000Z',
    updatedAt: '2025-12-29T12:00:00.000Z',
  },
];
