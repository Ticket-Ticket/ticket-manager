'use client';

import { useState, useRef, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useTickets } from '@/hooks/useTickets';
import { TicketCard } from '@/components/TicketCard';
import { TicketCompactCard } from '@/components/TicketCompactCard';
import { TicketFormModal } from '@/components/TicketFormModal';
import { Footer } from '@/components/Footer';
import { Status, STATUS_LABELS, Ticket, CreateTicketInput } from '@/lib/types';

function HomeContent() {
  const searchParams = useSearchParams();
  const demoMode = searchParams.get('demo') === 'true';

  const [filterStatus, setFilterStatus] = useState<Status | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [duplicatingTicket, setDuplicatingTicket] = useState<Ticket | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [displayMode, setDisplayMode] = useState<'card' | 'compact'>('card');

  const {
    tickets,
    allTickets,
    loading,
    createTicket,
    updateTicket,
    deleteTicket,
    exportTickets,
    importTickets,
    loadSampleData,
  } = useTickets({ filterStatus, searchQuery, dateFrom, dateTo, demoMode });

  const handleStatusChange = async (id: string, status: Status) => {
    await updateTicket(id, { status });
  };

  const handleDelete = async (id: string) => {
    if (confirm('このチケットを削除しますか？')) {
      await deleteTicket(id);
    }
  };

  const handleEdit = (ticket: Ticket) => {
    setEditingTicket(ticket);
    setDuplicatingTicket(null);
    setIsModalOpen(true);
  };

  const handleDuplicate = (ticket: Ticket) => {
    setEditingTicket(null);
    setDuplicatingTicket(ticket);
    setIsModalOpen(true);
  };

  const handleNew = () => {
    setEditingTicket(null);
    setDuplicatingTicket(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTicket(null);
    setDuplicatingTicket(null);
  };

  const handleFormSubmit = async (data: CreateTicketInput) => {
    if (editingTicket) {
      await updateTicket(editingTicket.id, data);
    } else {
      await createTicket(data);
    }
  };

  const handleExport = async () => {
    const json = await exportTickets();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tickets-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setShowMenu(false);
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const json = event.target?.result as string;
      const success = await importTickets(json);
      if (success) {
        alert('インポートしました');
      } else {
        alert('インポートに失敗しました');
      }
    };
    reader.readAsText(file);
    setShowMenu(false);
    e.target.value = '';
  };

  // ステータス別集計
  const statusCounts = allTickets.reduce((acc, ticket) => {
    acc[ticket.status] = (acc[ticket.status] || 0) + 1;
    return acc;
  }, {} as Record<Status, number>);

  // フォームのサジェスト用にユニークなツアー名リストを作成
  const tourNames = useMemo(() => {
    const names = new Set(allTickets.map(t => t.tourName).filter(Boolean));
    return Array.from(names);
  }, [allTickets]);

  // フォームのサジェスト用にユニークな名義人リストを作成
  const nameHolders = useMemo(() => {
    const names = new Set(allTickets.map(t => t.nameHolder).filter(Boolean) as string[]);
    return Array.from(names);
  }, [allTickets]);

  // フォームのサジェスト用にユニークなタレント名リストを作成
  const performerNames = useMemo(() => {
    const names = new Set(allTickets.map(t => t.performerName).filter(Boolean) as string[]);
    return Array.from(names);
  }, [allTickets]);

  // フォームのサジェスト用にユニークな会場リストを作成
  const venues = useMemo(() => {
    const names = new Set(allTickets.map(t => t.venue).filter(Boolean));
    return Array.from(names);
  }, [allTickets]);

  // 表示用にチケットをグループ化
  const groupedTickets = useMemo(() => {
    return tickets.reduce((acc, ticket) => {
      const key = ticket.tourName || 'その他';
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(ticket);
      return acc;
    }, {} as Record<string, Ticket[]>);
  }, [tickets]);


  // 複製用の初期データを作成（IDとcreatedAt/updatedAtを除外、ステータスをリセット）
  const getInitialDataForModal = (): Ticket | null => {
    if (editingTicket) return editingTicket;
    if (duplicatingTicket) {
      return {
        ...duplicatingTicket,
        id: '', // 新規作成扱いにするため空に
        status: 'recruiting', // ステータスをリセット
        seatInfo: '', // 座席情報はクリア
        partner: '', // 取引相手もクリア
        mainContact: '', // メイン連絡先もクリア
        subContact: '', // サブ連絡先もクリア
        relatedUrl: '',
        memo: '',
      };
    }
    return null;
  };

  return (
    <div className="min-h-screen pb-20">
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">チケステ</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setDisplayMode(displayMode === 'card' ? 'compact' : 'card')}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title={displayMode === 'card' ? '簡易表示に切り替え' : '詳細表示に切り替え'}
            >
              {displayMode === 'card' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7-4h14" />
                </svg>
              )}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-gray-800">
                  <button
                    onClick={handleExport}
                    className="w-full px-4 py-2 text-left hover:bg-pink-50"
                  >
                    エクスポート
                  </button>
                  <button
                    onClick={handleImport}
                    className="w-full px-4 py-2 text-left hover:bg-pink-50"
                  >
                    インポート
                  </button>
                  <button
                    onClick={() => {
                      loadSampleData();
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-pink-50"
                  >
                    サンプルデータ読込
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* 安全性バッジ */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
        <div className="max-w-lg mx-auto px-4 py-2 flex items-center justify-center gap-4 text-xs">
          <span className="flex items-center gap-1 text-green-700">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            外部通信なし
          </span>
          <span className="flex items-center gap-1 text-green-700">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            登録不要
          </span>
          <span className="flex items-center gap-1 text-green-700">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            端末内保存
          </span>
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* 検索・フィルター */}
        <div className="space-y-3 mb-4">
          {/* 検索ボックス */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ツアー名、会場、取引相手などで検索..."
              className="w-full px-4 py-2 pl-10 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-gray-800"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* 日付範囲 */}
          <div className="flex gap-2 items-center">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="flex-1 px-3 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-gray-800 text-sm"
            />
            <span className="text-gray-500">〜</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="flex-1 px-3 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-gray-800 text-sm"
            />
            {(dateFrom || dateTo) && (
              <button
                onClick={() => { setDateFrom(''); setDateTo(''); }}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* ステータスフィルター */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filterStatus === 'all'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                  : 'bg-white text-gray-600 border border-pink-200'
              }`}
            >
              すべて ({allTickets.length})
            </button>
            {(Object.keys(STATUS_LABELS) as Status[]).map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filterStatus === status
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                    : 'bg-white text-gray-600 border border-pink-200'
                }`}
              >
                {STATUS_LABELS[status]} ({statusCounts[status] || 0})
              </button>
            ))}
          </div>
        </div>

        {/* チケット一覧 */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">読み込み中...</div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎫</div>
            <p className="text-gray-500 mb-4">
              {filterStatus !== 'all'
                ? `${STATUS_LABELS[filterStatus]}のチケットがありません`
                : 'チケットがありません'}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleNew}
                className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-medium"
              >
                チケットを登録
              </button>
              {filterStatus === 'all' && (
                <button
                  onClick={() => {
                    loadSampleData();
                    setDisplayMode('card');
                  }}
                  className="inline-block px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium"
                >
                  サンプルを読込
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedTickets).map(([tourName, ticketsInGroup]) => (
              <div key={tourName}>
                <h2 className="text-lg font-bold text-gray-800 mb-3 sticky top-[72px] bg-gray-50/90 backdrop-blur-sm py-2 z-[1]">
                  {tourName}
                </h2>
                <div className={displayMode === 'card' ? 'space-y-4' : 'border border-gray-200 rounded-lg overflow-hidden'}>
                  {ticketsInGroup.map(ticket => (
                    displayMode === 'card' ? (
                      <TicketCard
                        key={ticket.id}
                        ticket={ticket}
                        onStatusChange={handleStatusChange}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        onDuplicate={handleDuplicate}
                      />
                    ) : (
                      <TicketCompactCard
                        key={ticket.id}
                        ticket={ticket}
                        onClick={handleEdit}
                      />
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 安心ポイント */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm border border-pink-100 p-5">
          <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            安心してご利用いただけます
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-700">端末内保存</p>
                <p className="text-xs text-gray-500">サーバー送信なし</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-700">オフライン対応</p>
                <p className="text-xs text-gray-500">いつでも使える</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-700">バックアップ</p>
                <p className="text-xs text-gray-500">エクスポート可能</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-700">オープンソース</p>
                <p className="text-xs text-gray-500">コード公開中</p>
              </div>
            </div>
          </div>
          <Link
            href="/about"
            className="mt-4 block text-center text-xs text-pink-500 hover:text-pink-600 transition-colors"
          >
            詳しく見る →
          </Link>
        </div>

        <Footer />
      </main>

      {/* FAB */}
      <button
        onClick={handleNew}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* フォームモーダル */}
      <TicketFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialData={getInitialDataForModal()}
        onSubmit={handleFormSubmit}
        isDuplicate={!!duplicatingTicket}
        tourNames={tourNames}
        nameHolders={nameHolders}
        performerNames={performerNames}
        venues={venues}
      />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">読み込み中...</div>}>
      <HomeContent />
    </Suspense>
  );
}
