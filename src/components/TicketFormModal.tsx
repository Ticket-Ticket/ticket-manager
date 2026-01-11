'use client';

import { useState, useEffect } from 'react';
import {
  Ticket,
  CreateTicketInput,
  Status,
  TradeMethod,
  Platform,
  PaymentTiming,
  PaymentMethod,
  STATUS_LABELS,
  TRADE_METHOD_LABELS,
  PLATFORM_LABELS,
  PAYMENT_TIMING_LABELS,
  PAYMENT_METHOD_LABELS,
} from '@/lib/types';

interface TicketFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Ticket | null;
  onSubmit: (data: CreateTicketInput) => Promise<void>;
  onContinue?: (data: CreateTicketInput) => void; // 続けて登録用
  isDuplicate?: boolean;
  tourNames: string[];
  nameHolders: string[];
  performerNames: string[];
  venues: string[];
}

const defaultFormData: CreateTicketInput = {
  tourName: '',
  performerName: '',
  nameHolder: '',
  eventDate: '',
  startTime: '',
  venue: '',
  seatInfo: '',
  tradeMethod: 'qr',
  slotInfo: undefined,
  exchangeEvent: undefined,
  partner: '',
  mainContact: '',
  subContact: '',
  platform: undefined,
  platformDetail: '',
  relatedUrl: '',
  price: undefined,
  paymentTiming: 'none',
  partialAmount: undefined,
  paymentMethod: undefined,
  status: 'recruiting',
  memo: '',
};

export function TicketFormModal({
  isOpen,
  onClose,
  initialData,
  onSubmit,
  onContinue,
  isDuplicate,
  tourNames,
  nameHolders,
  performerNames,
  venues,
}: TicketFormModalProps) {
  const [formData, setFormData] = useState<CreateTicketInput>(defaultFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        tourName: initialData.tourName,
        performerName: initialData.performerName || '',
        nameHolder: initialData.nameHolder || '',
        eventDate: initialData.eventDate,
        startTime: initialData.startTime || '',
        venue: initialData.venue,
        seatInfo: initialData.seatInfo || '',
        tradeMethod: initialData.tradeMethod,
        slotInfo: initialData.slotInfo,
        exchangeEvent: initialData.exchangeEvent,
        partner: initialData.partner || '',
        mainContact: initialData.mainContact || '',
        subContact: initialData.subContact || '',
        platform: initialData.platform,
        platformDetail: initialData.platformDetail || '',
        relatedUrl: initialData.relatedUrl || '',
        price: initialData.price,
        paymentTiming: initialData.paymentTiming || 'none',
        partialAmount: initialData.partialAmount,
        paymentMethod: initialData.paymentMethod,
        status: initialData.status,
        memo: initialData.memo || '',
      });
    } else {
      setFormData(defaultFormData);
    }
    setShowSuccess(false);
  }, [initialData, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (name.startsWith('slotInfo.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        slotInfo: {
          totalSlots: prev.slotInfo?.totalSlots || 0,
          mySlot: prev.slotInfo?.mySlot || 0,
          [field]: value === '' ? 0 : Number(value),
        },
      }));
    } else if (name.startsWith('exchangeEvent.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        exchangeEvent: {
          tourName: prev.exchangeEvent?.tourName || '',
          eventDate: prev.exchangeEvent?.eventDate || '',
          startTime: prev.exchangeEvent?.startTime || '',
          venue: prev.exchangeEvent?.venue || '',
          [field]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? (value === '' ? undefined : Number(value)) : value,
      }));
    }
  };

  // 交換先に公演情報をコピー
  const copyToExchange = () => {
    setFormData(prev => ({
      ...prev,
      exchangeEvent: {
        tourName: prev.tourName,
        eventDate: '',
        startTime: prev.startTime || '',
        venue: '',
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.eventDate) {
      alert('日程を入力してください。');
      setIsLoading(false);
      return;
    }

    try {
      const cleanedData = { ...formData };
      if (cleanedData.tradeMethod !== 'slot') {
        cleanedData.slotInfo = undefined;
      }
      if (cleanedData.tradeMethod !== 'exchange') {
        cleanedData.exchangeEvent = undefined;
      }
      if (cleanedData.platform !== 'other') {
        cleanedData.platformDetail = '';
      }
      // 「一部」系の支払いタイミングでなければ、一部金額は不要
      if (
        cleanedData.paymentTiming !== 'partially_prepaid' &&
        cleanedData.paymentTiming !== 'partially_platform'
      ) {
        cleanedData.partialAmount = undefined;
      }

      await onSubmit(cleanedData);

      if (!initialData) {
        // 新規登録の場合は成功画面を表示
        setShowSuccess(true);
      } else {
        onClose();
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 続けて登録
  const handleContinue = () => {
    const preserved = {
      ...defaultFormData,
      tourName: formData.tourName,
      performerName: formData.performerName,
      nameHolder: formData.nameHolder,
      eventDate: formData.eventDate,
      startTime: formData.startTime,
      venue: formData.venue,
    };
    setFormData(preserved);
    setShowSuccess(false);
    onContinue?.(preserved);
  };

  // 完了して閉じる
  const handleFinish = () => {
    setShowSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  const inputClass =
    'w-full px-3 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-white text-gray-800 text-sm';
  const labelClass = 'block text-xs font-medium text-gray-600 mb-1';

  const showPartialAmount =
    formData.paymentTiming === 'partially_prepaid' ||
    formData.paymentTiming === 'partially_platform';

  // 登録成功画面
  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50" onClick={handleFinish} />
        <div className="relative w-full max-w-sm mx-4 bg-white rounded-2xl p-6 text-center">
          <div className="text-5xl mb-4">🎫</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">登録しました！</h2>
          <p className="text-sm text-gray-500 mb-6">
            同じツアーの別チケットを続けて登録できます
          </p>
          <div className="space-y-3">
            <button
              onClick={handleContinue}
              className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-medium"
            >
              続けて登録（公演情報を保持）
            </button>
            <button
              onClick={handleFinish}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium"
            >
              完了
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative w-full max-w-lg max-h-[90vh] bg-pink-50 rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col">
        {/* ヘッダー */}
        <div className="sticky top-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">
            {isDuplicate
              ? 'チケット複製'
              : initialData
              ? 'チケット編集'
              : 'チケット登録'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* フォーム */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* 公演情報 */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-pink-100">
            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center">
              <span className="w-2 h-2 bg-pink-500 rounded-full mr-2" />
              公演情報
            </h3>
            <div className="space-y-3">
              <div>
                <label className={labelClass}>ツアー名 *</label>
                <input
                  type="text"
                  name="tourName"
                  list="tourNames-list"
                  value={formData.tourName}
                  onChange={handleChange}
                  placeholder="例: VVS"
                  className={inputClass}
                  required
                />
                <datalist id="tourNames-list">
                  {tourNames.map(name => (
                    <option key={name} value={name} />
                  ))}
                </datalist>
              </div>
              <div>
                <label className={labelClass}>タレント名</label>
                <input
                  type="text"
                  name="performerName"
                  list="performerNames-list"
                  value={formData.performerName}
                  onChange={handleChange}
                  placeholder="例: SixTONES"
                  className={inputClass}
                />
                <datalist id="performerNames-list">
                  {performerNames.map(name => (
                    <option key={name} value={name} />
                  ))}
                </datalist>
              </div>
              <div>
                <label className={labelClass}>名義</label>
                <input
                  type="text"
                  name="nameHolder"
                  list="nameHolders-list"
                  value={formData.nameHolder}
                  onChange={handleChange}
                  placeholder="例: 自分, 友人A"
                  className={inputClass}
                />
                <datalist id="nameHolders-list">
                  {nameHolders.map(name => (
                    <option key={name} value={name} />
                  ))}
                </datalist>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>日程 *</label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>開演時間</label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>会場 *</label>
                  <input
                    type="text"
                    name="venue"
                    list="venues-list"
                    value={formData.venue}
                    onChange={handleChange}
                    required
                    placeholder="例: 東京ドーム"
                    className={inputClass}
                  />
                  <datalist id="venues-list">
                    {venues.map(name => (
                      <option key={name} value={name} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className={labelClass}>座席情報</label>
                  <input
                    type="text"
                    name="seatInfo"
                    value={formData.seatInfo}
                    onChange={handleChange}
                    placeholder="例: アリーナA1"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 取引情報 */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-pink-100">
            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
              取引情報
            </h3>
            <div className="space-y-3">
              <div>
                <label className={labelClass}>取引方法 *</label>
                <select
                  name="tradeMethod"
                  value={formData.tradeMethod}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {(Object.keys(TRADE_METHOD_LABELS) as TradeMethod[]).map(method => (
                    <option key={method} value={method}>
                      {TRADE_METHOD_LABELS[method]}
                    </option>
                  ))}
                </select>
              </div>

              {formData.tradeMethod === 'slot' && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={labelClass}>全体名義数</label>
                    <input
                      type="number"
                      name="slotInfo.totalSlots"
                      value={formData.slotInfo?.totalSlots || ''}
                      onChange={handleChange}
                      min="1"
                      placeholder="5"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>自分の番手</label>
                    <input
                      type="number"
                      name="slotInfo.mySlot"
                      value={formData.slotInfo?.mySlot || ''}
                      onChange={handleChange}
                      min="1"
                      placeholder="3"
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              {formData.tradeMethod === 'exchange' && (
                <div className="p-2 bg-pink-50 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-pink-700">交換先公演</span>
                    <button
                      type="button"
                      onClick={copyToExchange}
                      className="text-xs text-pink-600 hover:text-pink-800 underline"
                    >
                      ツアー名をコピー
                    </button>
                  </div>
                  <input
                    type="text"
                    name="exchangeEvent.tourName"
                    value={formData.exchangeEvent?.tourName || ''}
                    onChange={handleChange}
                    placeholder="ツアー名"
                    className={inputClass}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      name="exchangeEvent.eventDate"
                      value={formData.exchangeEvent?.eventDate || ''}
                      onChange={handleChange}
                      className={inputClass}
                    />
                    <input
                      type="time"
                      name="exchangeEvent.startTime"
                      value={formData.exchangeEvent?.startTime || ''}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <input
                    type="text"
                    name="exchangeEvent.venue"
                    value={formData.exchangeEvent?.venue || ''}
                    onChange={handleChange}
                    placeholder="会場"
                    className={inputClass}
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>取引相手</label>
                  <input
                    type="text"
                    name="partner"
                    value={formData.partner}
                    onChange={handleChange}
                    placeholder="例: @username"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>プラットフォーム</label>
                  <select
                    name="platform"
                    value={formData.platform || ''}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">選択</option>
                    {(Object.keys(PLATFORM_LABELS) as Platform[]).map(p => (
                      <option key={p} value={p}>
                        {PLATFORM_LABELS[p]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {formData.platform === 'other' && (
                <div>
                  <label className={labelClass}>プラットフォーム詳細</label>
                  <input
                    type="text"
                    name="platformDetail"
                    value={formData.platformDetail}
                    onChange={handleChange}
                    placeholder="例: 会社の先輩経由"
                    className={inputClass}
                  />
                </div>
              )}

              <div>
                <label className={labelClass}>メイン連絡先（相手のプロフィール等）</label>
                <input
                  type="text"
                  name="mainContact"
                  value={formData.mainContact}
                  onChange={handleChange}
                  placeholder="例: Twitter @username, LINE ID"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>サブ連絡先（緊急時など）</label>
                <input
                  type="text"
                  name="subContact"
                  value={formData.subContact}
                  onChange={handleChange}
                  placeholder="例: LINE ID, 電話番号"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>関連URL（取引投稿・出品ページ等）</label>
                <input
                  type="url"
                  name="relatedUrl"
                  value={formData.relatedUrl}
                  onChange={handleChange}
                  placeholder="例: https://twitter.com/.../status/..."
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* 金額・支払い */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-pink-100">
            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              金額・支払い
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>金額</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="price"
                      value={formData.price ?? ''}
                      onChange={handleChange}
                      min="0"
                      placeholder="15000"
                      className={`${inputClass} pr-8`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">円</span>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>支払いタイミング</label>
                  <select
                    name="paymentTiming"
                    value={formData.paymentTiming || 'none'}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {(Object.keys(PAYMENT_TIMING_LABELS) as PaymentTiming[]).map(timing => (
                      <option key={timing} value={timing}>
                        {PAYMENT_TIMING_LABELS[timing]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {showPartialAmount && (
                <div>
                  <label className={labelClass}>一部金額</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="partialAmount"
                      value={formData.partialAmount ?? ''}
                      onChange={handleChange}
                      min="0"
                      placeholder="5000"
                      className={`${inputClass} pr-8`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">円</span>
                  </div>
                </div>
              )}

              <div>
                <label className={labelClass}>支払い方法</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod || ''}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">選択しない</option>
                  {(Object.keys(PAYMENT_METHOD_LABELS) as PaymentMethod[]).map((method) => (
                    <option key={method} value={method}>
                      {PAYMENT_METHOD_LABELS[method]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ステータス・メモ */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-pink-100">
            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
              ステータス
            </h3>
            <div className="space-y-3">
              <div>
                <label className={labelClass}>ステータス</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {(Object.keys(STATUS_LABELS) as Status[]).map(status => (
                    <option key={status} value={status}>
                      {STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>メモ</label>
                <textarea
                  name="memo"
                  value={formData.memo}
                  onChange={handleChange}
                  rows={2}
                  placeholder="備考があれば入力..."
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* 送信ボタン */}
          <div className="flex gap-3 pb-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-colors disabled:opacity-50"
            >
              {isLoading
                ? '保存中...'
                : isDuplicate
                ? '複製して登録'
                : initialData
                ? '更新'
                : '登録'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
