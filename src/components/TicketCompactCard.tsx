// src/components/TicketCompactCard.tsx
'use client';

import { Ticket } from '@/lib/types';

interface TicketCompactCardProps {
  ticket: Ticket;
  onClick: (ticket: Ticket) => void;
}

export function TicketCompactCard({ ticket, onClick }: TicketCompactCardProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '日付未設定';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '無効な日付';
    return date.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' }); // 月日のみ
  };

  return (
    <div
      className="flex items-center space-x-3 p-2 border-b border-gray-200 last:border-b-0 cursor-pointer hover:bg-pink-50 transition-colors"
      onClick={() => onClick(ticket)}
    >
      <span className="text-sm font-medium text-gray-700">
        {formatDate(ticket.eventDate)}
      </span>
      <span className="text-sm text-gray-600 truncate flex-1 min-w-0">
        {ticket.venue}
      </span>
      {ticket.nameHolder && (
        <span className="text-xs bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded-full whitespace-nowrap">
          {ticket.nameHolder}
        </span>
      )}
      <span className="text-sm text-gray-800 truncate flex-1 min-w-0">
        {ticket.performerName || ticket.tourName}
      </span>
    </div>
  );
}
