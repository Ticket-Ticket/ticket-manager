'use client';

interface EmptyStateProps {
  onAddTicket: () => void;
  onLoadSampleData: () => void;
}

export function EmptyState({ onAddTicket, onLoadSampleData }: EmptyStateProps) {
  return (
    <div className="text-center py-20 px-6 bg-white rounded-xl shadow-md border border-pink-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        チケットを登録しましょう
      </h2>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        ようこそ！「+ チケットを追加」ボタンから、あなたの最初のチケット情報を登録・管理できます。
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={onAddTicket}
          className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-sm"
        >
          + チケットを追加
        </button>
        <button
          onClick={onLoadSampleData}
          className="w-full sm:w-auto bg-white hover:bg-pink-50 text-pink-600 font-bold py-3 px-6 rounded-lg transition-colors border border-pink-200"
        >
          サンプルデータを読み込む
        </button>
      </div>
       <div className="mt-8 text-sm text-gray-400">
        <p>※ このツールはすべてのデータをブラウザ内（ローカルストレージ）に保存します。</p>
        <p>サーバーに情報が送信されることはありません。</p>
      </div>
    </div>
  );
}
