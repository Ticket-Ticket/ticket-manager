import { Ticket } from './types';

// スクリーンショット撮影用の完全架空デモデータ
// URLパラメータ ?demo=true で表示
export const demoTickets: Ticket[] = [
  // ========================================
  // AURORA PIXELS - LIVE TOUR 2026 'PRISM'
  // ========================================

  // 募集中: Xで同行者募集
  {
    id: 'demo-1',
    tourName: "AURORA PIXELS LIVE TOUR 2026 'PRISM'",
    performerName: 'AURORA PIXELS',
    nameHolder: '自分名義',
    eventDate: '2026-03-22',
    startTime: '18:00',
    venue: 'ベイサイド・ホール',
    tradeMethod: 'accompany',
    status: 'recruiting',
    price: 10000,
    paymentTiming: 'cash_on_delivery',
    platform: 'twitter',
    mainContact: 'https://x.com/example_user',
    memo: '1枚余ってます。当日精算OK',
    createdAt: '2026-01-08T15:00:00.000Z',
    updatedAt: '2026-01-11T09:00:00.000Z',
  },

  // 確定: 同行者決定
  {
    id: 'demo-2',
    tourName: "AURORA PIXELS LIVE TOUR 2026 'PRISM'",
    performerName: 'AURORA PIXELS',
    nameHolder: '自分名義',
    eventDate: '2026-04-05',
    startTime: '17:00',
    venue: 'スカイビュー・スタジアム',
    tradeMethod: 'accompany',
    status: 'confirmed',
    partner: '友人A',
    price: 9800,
    paymentTiming: 'cash_on_delivery',
    memo: '当日13時に会場前で待ち合わせ',
    createdAt: '2026-01-05T20:00:00.000Z',
    updatedAt: '2026-01-12T09:00:00.000Z',
  },

  // 交換確定
  {
    id: 'demo-3',
    tourName: "AURORA PIXELS LIVE TOUR 2026 'PRISM'",
    performerName: 'AURORA PIXELS',
    nameHolder: '自分名義',
    eventDate: '2026-03-29',
    startTime: '17:00',
    venue: 'シティガーデン・アリーナ',
    tradeMethod: 'exchange',
    status: 'confirmed',
    exchangeEvent: {
      tourName: "AURORA PIXELS LIVE TOUR 2026 'PRISM'",
      eventDate: '2026-04-12',
      startTime: '17:00',
      venue: 'ベイサイド・ホール',
    },
    partner: '@ap_exchange',
    platform: 'twitter',
    mainContact: 'https://x.com/ap_exchange',
    memo: '3/29と4/12で交換',
    createdAt: '2026-01-07T20:00:00.000Z',
    updatedAt: '2026-01-11T14:00:00.000Z',
  },

  // ========================================
  // BLUE NOSTALGY - Special Stage 'UNFOLD'
  // ========================================

  // 保留: 入金済みだけど迷い中
  {
    id: 'demo-4',
    tourName: "BLUE NOSTALGY Special Stage 'UNFOLD'",
    performerName: 'BLUE NOSTALGY',
    nameHolder: '自分名義',
    eventDate: '2026-05-10',
    startTime: '18:00',
    venue: 'シティガーデン・アリーナ',
    tradeMethod: 'qr',
    status: 'pending',
    price: 12000,
    memo: '同日に別現場あり。どちらか譲るかも',
    createdAt: '2026-01-09T14:00:00.000Z',
    updatedAt: '2026-01-09T14:00:00.000Z',
  },

  // 確定: QRごと譲渡
  {
    id: 'demo-5',
    tourName: "BLUE NOSTALGY Special Stage 'UNFOLD'",
    performerName: 'BLUE NOSTALGY',
    nameHolder: '自分名義',
    eventDate: '2026-05-11',
    startTime: '13:00',
    venue: 'ベイサイド・ホール',
    tradeMethod: 'qr',
    status: 'confirmed',
    partner: '@ticket_friend',
    price: 12000,
    paymentTiming: 'prepaid',
    paymentMethod: 'paypay',
    platform: 'twitter',
    mainContact: 'https://x.com/ticket_friend',
    memo: '入金済み。公演前日にログイン情報送付予定',
    createdAt: '2026-01-06T11:00:00.000Z',
    updatedAt: '2026-01-11T16:00:00.000Z',
  },

  // 金銭処理済: 支払い完了、チケット待ち
  {
    id: 'demo-6',
    tourName: "BLUE NOSTALGY Special Stage 'UNFOLD'",
    performerName: 'BLUE NOSTALGY',
    eventDate: '2026-05-12',
    startTime: '17:00',
    venue: 'スカイビュー・スタジアム',
    tradeMethod: 'qr',
    status: 'paid',
    partner: '@bn_lover',
    price: 13000,
    paymentTiming: 'platform',
    platform: 'ticketjam',
    relatedUrl: 'https://ticketjam.jp/items/example',
    memo: 'チケジャムで購入済み',
    createdAt: '2026-01-07T10:00:00.000Z',
    updatedAt: '2026-01-10T15:00:00.000Z',
  },

  // ========================================
  // THE VELVET - Anniversary Live 'RESONANCE'
  // ========================================

  // 未入金
  {
    id: 'demo-7',
    tourName: "THE VELVET Anniversary Live 'RESONANCE'",
    performerName: 'THE VELVET',
    nameHolder: '自分名義',
    eventDate: '2026-06-20',
    startTime: '17:00',
    venue: 'シティガーデン・アリーナ',
    tradeMethod: 'other',
    status: 'unpaid',
    price: 11000,
    memo: '入金期限 1/20',
    createdAt: '2026-01-08T12:00:00.000Z',
    updatedAt: '2026-01-12T10:00:00.000Z',
  },

  // 受渡済: デジチケ送付完了
  {
    id: 'demo-8',
    tourName: "THE VELVET Anniversary Live 'RESONANCE'",
    performerName: 'THE VELVET',
    nameHolder: '自分名義',
    eventDate: '2026-02-15',
    startTime: '18:00',
    venue: 'ベイサイド・ホール',
    tradeMethod: 'qr',
    status: 'received',
    partner: '@velvet_fan22',
    price: 11500,
    paymentTiming: 'prepaid',
    paymentMethod: 'bank',
    platform: 'twitter',
    mainContact: 'https://x.com/velvet_fan22',
    payments: [
      {
        id: 'payment-demo-1',
        amount: 11500,
        paidAt: '2026-02-05T10:00:00.000Z',
        method: 'bank',
        memo: '振込確認済み'
      }
    ],
    memo: 'デジチケURL送付済み',
    createdAt: '2026-01-05T09:00:00.000Z',
    updatedAt: '2026-02-10T18:00:00.000Z',
  },

  // 完了
  {
    id: 'demo-9',
    tourName: "THE VELVET Anniversary Live 'RESONANCE'",
    performerName: 'THE VELVET',
    nameHolder: '自分名義',
    eventDate: '2026-01-05',
    startTime: '17:00',
    venue: 'スカイビュー・スタジアム',
    tradeMethod: 'accompany',
    status: 'completed',
    partner: '友人A',
    price: 11000,
    paymentTiming: 'cash_on_delivery',
    memo: '',
    createdAt: '2025-11-15T14:00:00.000Z',
    updatedAt: '2026-01-06T12:00:00.000Z',
  },

  // 番手で確定
  {
    id: 'demo-10',
    tourName: "THE VELVET Anniversary Live 'RESONANCE'",
    performerName: 'THE VELVET',
    nameHolder: '友人C名義',
    eventDate: '2026-06-21',
    startTime: '17:00',
    venue: 'ベイサイド・ホール',
    tradeMethod: 'slot',
    status: 'confirmed',
    slotInfo: {
      totalSlots: 3,
      mySlot: 2,
    },
    partner: '友人C',
    price: 11000,
    paymentTiming: 'cash_on_delivery',
    memo: '',
    createdAt: '2026-01-08T12:00:00.000Z',
    updatedAt: '2026-01-12T10:00:00.000Z',
  },
];
