'use client';

import { useState, useEffect, useCallback } from 'react';
import { Ticket, CreateTicketInput, UpdateTicketInput, Status, STATUS_ORDER } from '@/lib/types';
import { storage } from '@/lib/storage';

export type SortKey = 'eventDate' | 'createdAt' | 'status' | 'price';
export type SortOrder = 'asc' | 'desc';

interface UseTicketsOptions {
  filterStatus?: Status | 'all';
  searchQuery?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: SortKey;
  sortOrder?: SortOrder;
}

export function useTickets(options: UseTicketsOptions = {}) {
  const { filterStatus = 'all', searchQuery = '', dateFrom = '', dateTo = '', sortBy = 'eventDate', sortOrder = 'asc' } = options;

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // データ取得
  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      const data = await storage.getAll();
      setTickets(data);
      setError(null);
    } catch (e) {
      setError('データの取得に失敗しました');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  // フィルタリング
  const filteredTickets = tickets.filter(ticket => {
    // ステータスフィルター
    const statusMatch = filterStatus === 'all' || ticket.status === filterStatus;

    // 全文検索フィルター
    const query = searchQuery.toLowerCase();
    const searchMatch = !query || [
      ticket.tourName,
      ticket.performerName,
      ticket.venue,
      ticket.partner,
      ticket.nameHolder,
      ticket.memo,
      ticket.seatInfo,
    ].some(field => field?.toLowerCase().includes(query));

    // 日付範囲フィルター
    const eventDate = ticket.eventDate;
    const dateFromMatch = !dateFrom || eventDate >= dateFrom;
    const dateToMatch = !dateTo || eventDate <= dateTo;

    return statusMatch && searchMatch && dateFromMatch && dateToMatch;
  });

  // ソート
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'eventDate':
        const dateA = new Date(a.eventDate).getTime();
        const dateB = new Date(b.eventDate).getTime();
        comparison = (isNaN(dateA) ? Infinity : dateA) - (isNaN(dateB) ? Infinity : dateB);
        break;
      case 'createdAt':
        const createdAtA = new Date(a.createdAt).getTime();
        const createdAtB = new Date(b.createdAt).getTime();
        comparison = (isNaN(createdAtA) ? Infinity : createdAtA) - (isNaN(createdAtB) ? Infinity : createdAtB);
        break;
      case 'status':
        comparison = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
        break;
      case 'price':
        comparison = (a.price ?? 0) - (b.price ?? 0);
        break;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // 作成
  const createTicket = async (input: CreateTicketInput): Promise<Ticket | null> => {
    try {
      const newTicket = await storage.create(input);
      setTickets(prev => [...prev, newTicket]);
      return newTicket;
    } catch (e) {
      setError('チケットの作成に失敗しました');
      console.error(e);
      return null;
    }
  };

  // 更新
  const updateTicket = async (id: string, input: UpdateTicketInput): Promise<Ticket | null> => {
    try {
      const updated = await storage.update(id, input);
      if (updated) {
        setTickets(prev => prev.map(t => (t.id === id ? updated : t)));
      }
      return updated;
    } catch (e) {
      setError('チケットの更新に失敗しました');
      console.error(e);
      return null;
    }
  };

  // 削除
  const deleteTicket = async (id: string): Promise<boolean> => {
    try {
      const success = await storage.delete(id);
      if (success) {
        setTickets(prev => prev.filter(t => t.id !== id));
      }
      return success;
    } catch (e) {
      setError('チケットの削除に失敗しました');
      console.error(e);
      return false;
    }
  };

  // IDで取得
  const getTicketById = (id: string): Ticket | undefined => {
    return tickets.find(t => t.id === id);
  };

  // エクスポート
  const exportTickets = async (): Promise<string> => {
    return storage.exportData();
  };

  // インポート
  const importTickets = async (json: string): Promise<boolean> => {
    const success = await storage.importData(json);
    if (success) {
      await fetchTickets();
    }
    return success;
  };

  const loadSampleData = async () => {
    await storage.loadSampleData();
    await fetchTickets();
  };

  return {
    tickets: sortedTickets,
    allTickets: tickets,
    loading,
    error,
    createTicket,
    updateTicket,
    deleteTicket,
    getTicketById,
    exportTickets,
    importTickets,
    loadSampleData,
    refetch: fetchTickets,
  };
}

// 単一チケット取得用hook
export function useTicket(id: string) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await storage.getById(id);
        setTicket(data);
        setError(null);
      } catch (e) {
        setError('チケットの取得に失敗しました');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  return { ticket, loading, error };
}
