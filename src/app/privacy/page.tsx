import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | チケ管理',
  description: 'チケ管理アプリのプライバシーポリシー。データの保存方法、取り扱いについて説明します。',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center">
          <Link href="/" className="mr-3 p-1 hover:bg-white/20 rounded transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl font-bold">プライバシーポリシー</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 space-y-6">
          {/* イントロ */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">あなたのデータを守ります</h2>
                <p className="text-sm text-gray-500">最終更新: 2025年1月</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              「チケ管理」は、ユーザーのプライバシーを最優先に設計されています。
              このページでは、データの取り扱いについて詳しく説明します。
            </p>
          </section>

          {/* データの保存について */}
          <section>
            <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              データの保存について
            </h3>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-green-800 font-medium text-sm">すべてのデータはあなたの端末内にのみ保存されます</p>
                  <p className="text-green-700 text-xs mt-1">サーバーへの送信は一切ありません</p>
                </div>
              </div>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-pink-500 mt-1">•</span>
                <span>チケット情報は、ブラウザの <code className="bg-gray-100 px-1 rounded text-xs">localStorage</code> に保存されます。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500 mt-1">•</span>
                <span>データは暗号化されていませんが、あなたの端末から外部に送信されることはありません。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500 mt-1">•</span>
                <span>ブラウザのデータを消去すると、保存されたチケット情報も削除されます。</span>
              </li>
            </ul>
          </section>

          {/* 収集しない情報 */}
          <section>
            <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              収集しない情報
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              当アプリは以下の情報を収集・送信しません：
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>個人を特定できる情報（氏名、メールアドレス等）</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>位置情報</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>チケットの取引内容</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>閲覧履歴や行動データ</span>
              </li>
            </ul>
          </section>

          {/* 広告について */}
          <section>
            <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              広告について
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              将来的に、サービス維持のためGoogle AdSense等の広告を導入する可能性があります。
              広告が導入された場合、広告配信事業者がCookieを使用してユーザーの興味に基づいた広告を表示することがあります。
              ユーザーは<a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">Googleの広告設定</a>でパーソナライズ広告を無効にできます。
            </p>
          </section>

          {/* 免責事項 */}
          <section>
            <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              免責事項
            </h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <ul className="text-sm text-yellow-800 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>本アプリの利用により生じた損害について、開発者は一切の責任を負いません。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>ブラウザのデータ消去等によりデータが失われる可能性があります。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>大切なデータは定期的にエクスポートしてバックアップしてください。</span>
                </li>
              </ul>
            </div>
          </section>

          {/* お問い合わせ */}
          <section>
            <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
              お問い合わせ
            </h3>
            <p className="text-sm text-gray-600">
              プライバシーポリシーに関するご質問は、
              <a href="https://mond.how/hinishi" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">Mond</a>
              または
              <a href="https://github.com/Ticket-Ticket" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">GitHub</a>
              よりお問い合わせください。
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
