import { Ticket, CreateTicketInput, UpdateTicketInput, TradeMethod, Platform, PaymentTiming, Status, PAYMENT_METHOD_LABELS, PaymentMethod } from './types';
import { sampleTickets } from './sample-data';

const STORAGE_KEY = 'ticket-manager-tickets';

// ストレージインターフェース（将来Supabase対応時に差し替え可能）
export interface StorageAdapter {
  getAll(): Promise<Ticket[]>;
  getById(id: string): Promise<Ticket | null>;
  create(input: CreateTicketInput): Promise<Ticket>;
  update(id: string, input: UpdateTicketInput): Promise<Ticket | null>;
  delete(id: string): Promise<boolean>;
  exportData(): Promise<string>;
  importData(json: string): Promise<boolean>;
  loadSampleData(): Promise<Ticket[]>;
}

// UUID生成
function generateId(): string {
  return crypto.randomUUID();
}

// 日本語キー → 英語キー変換マップ
const TRADE_METHOD_MAP: Record<string, TradeMethod> = {
  'QRごと': 'qr',
  '同行': 'accompany',
  '番手': 'slot',
  'ランダム': 'random',
  '交換': 'exchange',
  '支払い番号譲渡': 'payment-number',
  '友人譲渡': 'friend',
  'その他': 'other',
};

const PLATFORM_MAP: Record<string, Platform> = {
  'チケジャム': 'ticketjam',
  'チケット流通センター': 'ticket-ryutsu',
  'チケットサークル': 'ticket-circle',
  'アズカリ': 'azukari',
  'Twitter/X': 'twitter',
  '対面': 'in-person',
  'その他': 'other',
};

const PAYMENT_TIMING_MAP: Record<string, PaymentTiming> = {
  '先払い': 'prepaid',
  '都度清算': 'each',
  'アプリ経由': 'app',
  '後払い': 'postpaid',
  'なし': 'none',
};

const PAYMENT_METHOD_MAP: Record<string, PaymentMethod> = Object.fromEntries(
  (Object.entries(PAYMENT_METHOD_LABELS) as [PaymentMethod, string][]).map(([key, value]) => [value, key])
);

const STATUS_MAP: Record<string, Status> = {
  '保留': 'pending',
  '募集中': 'recruiting',
  '確定': 'confirmed',
  '金銭処理済': 'paid',
  '受渡済': 'received',
  '完了': 'completed',
};

// 日本語形式のデータを英語形式に変換
function convertJapaneseToEnglish(data: Record<string, unknown>): Ticket {
  const jpData = data as Record<string, unknown>;

  // 番手情報の変換
  let slotInfo = undefined;
  if (jpData['番手情報']) {
    const jp = jpData['番手情報'] as Record<string, number>;
    slotInfo = {
      totalSlots: jp['全体名義数'],
      mySlot: jp['自分の番手'],
    };
  }

  // 交換先公演の変換
  let exchangeEvent = undefined;
  if (jpData['交換先公演']) {
    const jp = jpData['交換先公演'] as Record<string, string>;
    exchangeEvent = {
      tourName: jp['ツアー名'],
      eventDate: jp['日程'],
      startTime: jp['開演時間'],
      venue: jp['会場'],
    };
  }

  return {
    id: (jpData['id'] as string) || generateId(),
    tourName: jpData['ツアー名'] as string,
    eventDate: jpData['日程'] as string,
    startTime: jpData['開演時間'] as string | undefined,
    venue: jpData['会場'] as string,
    seatInfo: jpData['座席情報'] as string | undefined,
    tradeMethod: TRADE_METHOD_MAP[jpData['取引方法'] as string] || 'other',
    slotInfo,
    exchangeEvent,
    partner: jpData['取引相手'] as string | undefined,
    contactUrl: jpData['連絡先URL'] as string | undefined,
    platform: jpData['プラットフォーム'] ? PLATFORM_MAP[jpData['プラットフォーム'] as string] : undefined,
    platformDetail: jpData['プラットフォーム詳細'] as string | undefined,
    relatedUrl: jpData['関連URL'] as string | undefined,
    price: jpData['金額'] as number | undefined,
    paymentTiming: jpData['支払いタイミング'] ? PAYMENT_TIMING_MAP[jpData['支払いタイミング'] as string] : undefined,
    paymentMethod: jpData['支払い方法'] ? PAYMENT_METHOD_MAP[jpData['支払い方法'] as string] : undefined,
    status: STATUS_MAP[jpData['ステータス'] as string] || 'recruiting',
    memo: jpData['メモ'] as string | undefined,
    createdAt: (jpData['作成日'] as string) || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// データが日本語形式かどうかを判定
function isJapaneseFormat(data: Record<string, unknown>): boolean {
  return 'ツアー名' in data;
}

// localStorage実装
export const localStorageAdapter: StorageAdapter = {
  async getAll(): Promise<Ticket[]> {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data) as Ticket[];
    } catch {
      return [];
    }
  },

  async getById(id: string): Promise<Ticket | null> {
    const tickets = await this.getAll();
    return tickets.find(t => t.id === id) || null;
  },

  async create(input: CreateTicketInput): Promise<Ticket> {
    const tickets = await this.getAll();
    const now = new Date().toISOString();
    const newTicket: Ticket = {
      ...input,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    tickets.push(newTicket);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    return newTicket;
  },

  async update(id: string, input: UpdateTicketInput): Promise<Ticket | null> {
    const tickets = await this.getAll();
    const index = tickets.findIndex(t => t.id === id);
    if (index === -1) return null;

    const updatedTicket: Ticket = {
      ...tickets[index],
      ...input,
      updatedAt: new Date().toISOString(),
    };
    tickets[index] = updatedTicket;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    return updatedTicket;
  },

  async delete(id: string): Promise<boolean> {
    const tickets = await this.getAll();
    const filtered = tickets.filter(t => t.id !== id);
    if (filtered.length === tickets.length) return false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  async exportData(): Promise<string> {
    const tickets = await this.getAll();
    return JSON.stringify(tickets, null, 2);
  },

  async importData(json: string): Promise<boolean> {
    try {
      const rawData = JSON.parse(json) as Record<string, unknown>[];
      if (!Array.isArray(rawData)) return false;

      // 日本語形式か英語形式かを判定して変換
      const tickets: Ticket[] = rawData.map(item => {
        if (isJapaneseFormat(item)) {
          return convertJapaneseToEnglish(item);
        }
        return item as unknown as Ticket;
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
      return true;
    } catch {
      return false;
    }
  },

  async loadSampleData(): Promise<Ticket[]> {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleTickets));
    return sampleTickets;
  },
};

// デフォルトのストレージアダプター
export const storage = localStorageAdapter;
