'use client';

import { Status, STATUS_LABELS } from '@/lib/types';

interface StatusBadgeProps {
  status: Status;
  onClick?: () => void;
}

const statusColors: Record<Status, string> = {
  pending: 'bg-gray-100 text-gray-800 border-gray-300',
  recruiting: 'bg-orange-100 text-orange-800 border-orange-300',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
  paid: 'bg-purple-100 text-purple-800 border-purple-300',
  received: 'bg-pink-100 text-pink-800 border-pink-300',
  completed: 'bg-green-100 text-green-800 border-green-300',
};

export function StatusBadge({ status, onClick }: StatusBadgeProps) {
  const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium border';
  const colorClasses = statusColors[status];
  const clickableClasses = onClick ? 'cursor-pointer hover:opacity-80' : '';

  return (
    <span
      className={`${baseClasses} ${colorClasses} ${clickableClasses}`}
      onClick={onClick}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
