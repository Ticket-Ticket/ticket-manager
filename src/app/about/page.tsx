import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About',
  description: 'チケステ（TicketStatus）の開発背景、特徴、サーバーレス設計のメリットについて説明します。',
};

export default function AboutPage() {
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
          <h1 className="text-xl font-bold">About</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* アプリ紹介 */}
          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 text-center">
            <div className="text-5xl mb-4">🎫</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">チケステ</h2>
            <p className="text-sm text-gray-500 mb-2">TicketStatus</p>
            <p className="text-gray-600 text-sm">現場・名義・金銭の進捗管理ツール</p>
          </div>

          {/* 開発背景 */}
          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6">
            <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center text-lg">💭</span>
              開発のきっかけ
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              ライブやコンサートのチケット取引って、複数の公演を同時進行で管理するのが大変ですよね。
              「この人との取引、どこまで進んでたっけ？」「入金はいつだっけ？」「同行者への精算は済んだ？」
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mt-3">
              そんな悩みを解決するために「チケステ」を作りました。
              当選から受渡、精算まで、チケットの「ステータス」を一目で管理できるツールです。
            </p>
          </div>

          {/* 安全性 */}
          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6">
            <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center text-lg">🔒</span>
              安全性へのこだわり
            </h3>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
              <p className="text-green-800 font-medium text-sm">すべてのデータはあなたの端末内にのみ保存されます</p>
              <p className="text-green-700 text-xs mt-1">サーバーへの送信は一切ありません</p>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>データはブラウザの <code className="bg-gray-100 px-1 rounded text-xs">localStorage</code> に保存</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>外部サーバーとの通信なし（完全オフライン動作）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>会員登録・ログイン不要で即時利用可能</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>個人情報の収集は一切行いません</span>
              </li>
            </ul>
          </div>

          {/* 特徴 */}
          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6">
            <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center text-lg">✨</span>
              特徴
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">ステータス管理</h4>
                  <p className="text-xs text-gray-500 mt-1">募集中・確定・入金済・受渡済など、進捗を一目で把握。</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">同行・番手管理</h4>
                  <p className="text-xs text-gray-500 mt-1">同行者情報や番手の管理もまとめて記録。</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">精算管理</h4>
                  <p className="text-xs text-gray-500 mt-1">支払い状況や精算タイミングを記録して忘れ防止。</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">エクスポート対応</h4>
                  <p className="text-xs text-gray-500 mt-1">JSON形式でバックアップ・復元が可能。機種変更時も安心。</p>
                </div>
              </div>
            </div>
          </div>

          {/* オープンソース */}
          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6">
            <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center text-lg">🔓</span>
              オープンソース
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              チケステはオープンソースで開発されています。
              ソースコードを確認することで、データが外部に送信されていないことを技術的に検証できます。
            </p>
            <a
              href="https://github.com/Ticket-Ticket"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHubで見る
            </a>
          </div>

          {/* 技術スタック */}
          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6">
            <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center text-lg">🛠</span>
              使用技術
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'localStorage'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 要望・フィードバック */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-6 text-white">
            <h3 className="text-base font-bold mb-3">ご意見・ご要望</h3>
            <p className="text-sm opacity-90 mb-4">
              バグ報告や機能リクエストなど、お気軽にお寄せください。
            </p>
            <div className="flex gap-3">
              <a
                href="https://mond.how/hinishi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 bg-white text-pink-600 rounded-lg text-sm font-medium text-center hover:bg-pink-50 transition-colors"
              >
                Mondで質問
              </a>
              <a
                href="https://github.com/Ticket-Ticket"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 bg-white/20 text-white rounded-lg text-sm font-medium text-center hover:bg-white/30 transition-colors"
              >
                GitHub Issue
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
