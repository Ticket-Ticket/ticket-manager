'use client';

import { Ticket, TRADE_METHOD_LABELS, PLATFORM_LABELS, Status, PAYMENT_TIMING_LABELS } from '@/lib/types';
import { StatusBadge } from './StatusBadge';

interface TicketCardProps {
  ticket: Ticket;
  onStatusChange?: (id: string, status: Status) => void;
  onDelete?: (id: string) => void;
  onEdit?: (ticket: Ticket) => void;
  onDuplicate?: (ticket: Ticket) => void;
}

export function TicketCard({ ticket, onStatusChange, onDelete, onEdit, onDuplicate }: TicketCardProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '日付未設定';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '無効な日付';
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    });
  };

  const formatPrice = (price?: number) => {
    if (price === undefined || price === null) return '-';
    return price.toLocaleString('ja-JP') + '円';
  };

  // 次のステータスに進める
  const handleNextStatus = () => {
    const statuses: Status[] = ['pending', 'recruiting', 'confirmed', 'paid', 'received', 'completed'];
    const currentIndex = statuses.indexOf(ticket.status);
    if (currentIndex < statuses.length - 1 && onStatusChange) {
      onStatusChange(ticket.id, statuses[currentIndex + 1]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-pink-100 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        {/* ヘッダー */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 text-lg line-clamp-1">
              {ticket.tourName}
            </h3>
            {ticket.performerName && (
              <p className="text-sm text-gray-600 mt-1">
                {ticket.performerName}
              </p>
            )}
            {ticket.nameHolder && (
              <p className="text-sm text-gray-600 mt-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {ticket.nameHolder}
              </p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              {formatDate(ticket.eventDate)}
              {ticket.startTime && ` ${ticket.startTime}`} @ {ticket.venue}
            </p>
            {ticket.seatInfo && (
              <p className="text-sm text-purple-600 mt-1">{ticket.seatInfo}</p>
            )}
          </div>
          <StatusBadge
            status={ticket.status}
            onClick={ticket.status !== 'completed' ? handleNextStatus : undefined}
          />
        </div>

        {/* 取引情報 */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-pink-50 text-pink-700 rounded text-sm">
            {TRADE_METHOD_LABELS[ticket.tradeMethod]}
          </span>
          {ticket.tradeMethod === 'slot' && ticket.slotInfo && (
            <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-sm">
              {ticket.slotInfo.mySlot}/{ticket.slotInfo.totalSlots}番手
            </span>
          )}
          {ticket.platform && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
              {PLATFORM_LABELS[ticket.platform]}
            </span>
          )}
        </div>

        {/* 取引相手と金額 */}
        <div className="flex items-end justify-between text-sm">
          <span className="text-gray-600">
            {ticket.partner && `${ticket.partner}`}
          </span>
          <div className="text-right">
            <span className="font-bold text-pink-600 text-lg">
              {formatPrice(ticket.price)}
            </span>
            {/* 支払いタイミング */}
            {ticket.paymentTiming && ticket.paymentTiming !== 'none' && (
              <div className="text-xs text-gray-500 mt-1">
                {PAYMENT_TIMING_LABELS[ticket.paymentTiming]}
                {(ticket.paymentTiming === 'partially_prepaid' || ticket.paymentTiming === 'partially_platform') && ticket.partialAmount != null && (
                  <span className="ml-1 font-medium text-gray-700">({formatPrice(ticket.partialAmount)})</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 交換先公演（交換の場合） */}
        {ticket.tradeMethod === 'exchange' && ticket.exchangeEvent && (
          <div className="mt-2 p-2 bg-pink-50 rounded text-sm text-pink-700">
            <div className="font-medium">交換先:</div>
            <div>{ticket.exchangeEvent.tourName}</div>
            <div className="text-xs">
              {formatDate(ticket.exchangeEvent.eventDate)}
              {ticket.exchangeEvent.startTime && ` ${ticket.exchangeEvent.startTime}`} @ {ticket.exchangeEvent.venue}
            </div>
          </div>
        )}

        {/* メモ */}
        {ticket.memo && (
          <p className="mt-2 text-sm text-gray-500 line-clamp-2">
            {ticket.memo}
          </p>
        )}
      </div>

      {/* アクションボタン */}
      <div className="flex border-t border-pink-100">
        <button
          onClick={() => onEdit?.(ticket)}
          className="flex-1 py-3 text-center text-purple-600 hover:bg-purple-50 transition-colors text-sm font-medium"
        >
          編集
        </button>
        <button
          onClick={() => onDuplicate?.(ticket)}
          className="flex-1 py-3 text-center text-green-600 hover:bg-green-50 transition-colors text-sm font-medium border-l border-pink-100"
        >
          複製
        </button>
        {ticket.mainContact && (
          (ticket.mainContact.startsWith('http://') || ticket.mainContact.startsWith('https://')) ? (
            <a
              href={ticket.mainContact}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 text-center text-blue-600 hover:bg-blue-50 transition-colors text-sm font-medium border-l border-pink-100"
            >
              メイン連絡
            </a>
          ) : (
            <span
              className="flex-1 py-3 text-center text-blue-600 text-sm font-medium border-l border-pink-100"
              title={ticket.mainContact}
            >
              メイン連絡
            </span>
          )
        )}
        {ticket.subContact && (
          (ticket.subContact.startsWith('http://') || ticket.subContact.startsWith('https://')) ? (
            <a
              href={ticket.subContact}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 text-center text-blue-600 hover:bg-blue-50 transition-colors text-sm font-medium border-l border-pink-100"
            >
              サブ連絡
            </a>
          ) : (
            <span
              className="flex-1 py-3 text-center text-blue-600 text-sm font-medium border-l border-pink-100"
              title={ticket.subContact}
            >
              サブ連絡
            </span>
          )
        )}
        {ticket.relatedUrl && (
          <a
            href={ticket.relatedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 text-center text-pink-600 hover:bg-pink-50 transition-colors text-sm font-medium border-l border-pink-100"
          >
            関連リンク
          </a>
        )}
        <button
          onClick={() => onDelete?.(ticket.id)}
          className="flex-1 py-3 text-center text-gray-500 hover:bg-gray-50 hover:text-red-500 transition-colors text-sm font-medium border-l border-pink-100"
        >
          削除
        </button>
      </div>
    </div>
  );
}
