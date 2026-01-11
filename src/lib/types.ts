// ステータス
export type Status = 'unpaid' | 'pending' | 'recruiting' | 'confirmed' | 'paid' | 'received' | 'completed';

// 取引方法
export type TradeMethod = 'qr' | 'accompany' | 'slot' | 'random' | 'exchange' | 'payment-number' | 'friend' | 'other';

// プラットフォーム
export type Platform = 'ticketjam' | 'ticket-ryutsu' | 'ticket-circle' | 'azukari' | 'twitter' | 'in-person' | 'other';

// 支払いタイミング
export type PaymentTiming =
  'prepaid' |           // 先払い
  'partially_prepaid' | // 一部先払い
  'platform' |          // アプリ/サイト通し
  'partially_platform'| // 一部アプリ/サイト通し
  'postpaid' |          // 後払い
  'cash_on_delivery' |  // 当日手渡し
  'each' |              // 都度清算
  'app' |               // アプリ経由
  'none';               // なし

// 番手情報
export interface SlotInfo {
  totalSlots: number;  // 全体名義数
  mySlot: number;      // 自分の番手
}

// 交換先公演
export interface ExchangeEvent {
  tourName: string;    // ツアー名
  eventDate: string;   // 日程
  startTime?: string;  // 開演時間
  venue: string;       // 会場
}

// 支払い方法
export type PaymentMethod = 'paypay' | 'bank' | 'cash' | 'linepay' | 'merpay' | 'creditcard' | 'app' | 'other';

// 支払い記録
export interface Payment {
  id: string;
  amount: number;
  paidAt: string;
  method: PaymentMethod;
  memo?: string;
}

// チケット
export interface Ticket {
  id: string;
  // 公演情報
  tourName: string;       // ツアー名
  performerName?: string; // タレント名
  nameHolder?: string;    // 名義人
  eventDate: string;      // 日程
  startTime?: string;     // 開演時間
  venue: string;          // 会場
  seatInfo?: string;      // 座席情報
  // 取引情報
  tradeMethod: TradeMethod;
  slotInfo?: SlotInfo;    // 番手情報
  exchangeEvent?: ExchangeEvent; // 交換先公演
  partner?: string;       // 取引相手
  contactUrl?: string;    // 連絡先URL
  mainContact?: string;   // メイン連絡先
  subContact?: string;    // サブ連絡先
  platform?: Platform;    // プラットフォーム
  platformDetail?: string; // プラットフォーム詳細
  relatedUrl?: string;    // 関連URL
  price?: number;         // 金額
  paymentTiming?: PaymentTiming; // 支払いタイミング
  partialAmount?: number; // 一部支払いの金額
  paymentMethod?: PaymentMethod; // 支払い方法
  payments?: Payment[];   // 支払い記録
  // ステータス
  status: Status;
  memo?: string;
  createdAt: string;
  updatedAt: string;
}

// 新規作成用
export type CreateTicketInput = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

// 更新用
export type UpdateTicketInput = Partial<CreateTicketInput>;

// ステータスラベル
export const STATUS_LABELS: Record<Status, string> = {
  unpaid: '未入金',
  pending: '保留',
  recruiting: '募集中',
  confirmed: '確定',
  paid: '金銭処理済',
  received: '受渡済',
  completed: '完了',
};

// 取引方法ラベル
export const TRADE_METHOD_LABELS: Record<TradeMethod, string> = {
  qr: 'QRごと',
  accompany: '同行',
  slot: '番手',
  random: 'ランダム',
  exchange: '交換',
  'payment-number': '支払い番号譲渡',
  friend: '友人譲渡',
  other: 'その他',
};

// プラットフォームラベル
export const PLATFORM_LABELS: Record<Platform, string> = {
  'ticketjam': 'チケジャム',
  'ticket-ryutsu': 'チケット流通センター',
  'ticket-circle': 'チケットサークル',
  'azukari': 'アズカリ',
  'twitter': 'Twitter/X',
  'in-person': '対面',
  'other': 'その他',
};

// 支払いタイミングラベル
export const PAYMENT_TIMING_LABELS: Record<PaymentTiming, string> = {
  prepaid: '先払い',
  partially_prepaid: '一部先払い',
  platform: 'アプリ/サイト通し',
  partially_platform: '一部アプリ/サイト通し',
  postpaid: '後払い',
  cash_on_delivery: '当日手渡し',
  each: '都度清算',
  app: 'アプリ経由',
  none: 'なし',
};

// 支払い方法ラベル
export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  paypay: 'PayPay',
  bank: '銀行振込',
  cash: '現金',
  linepay: 'LINE Pay',
  merpay: 'メルペイ',
  creditcard: 'クレジットカード決済',
  app: 'アプリ決済',
  other: 'その他',
};

// ステータスの順序
export const STATUS_ORDER: Record<Status, number> = {
  unpaid: 0,
  pending: 1,
  recruiting: 2,
  confirmed: 3,
  paid: 4,
  received: 5,
  completed: 6,
};