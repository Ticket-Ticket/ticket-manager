import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "チケステ｜現場・名義・金銭の進捗管理ツール",
    template: "%s | チケステ",
  },
  description: "チケットの当選管理から、同行者との精算・受渡状況まで一目で把握。サーバー保存なし、登録不要で今すぐ使えるチケットステータス管理アプリ。",
  keywords: ["チケステ", "TicketStatus", "チケット管理", "チケット譲渡", "チケット交換", "ライブチケット", "コンサートチケット", "同行", "番手", "精算管理"],
  authors: [{ name: "Ticket-Ticket" }],
  creator: "Ticket-Ticket",
  publisher: "Ticket-Ticket",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "チケステ",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    title: "チケステ｜現場・名義・金銭の進捗管理ツール",
    description: "チケットの当選管理から、同行者との精算・受渡状況まで一目で把握。サーバー保存なし、登録不要で今すぐ使えるチケットステータス管理アプリ。",
    siteName: "チケステ",
    images: [{ url: "/thumbnail.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "チケステ｜現場・名義・金銭の進捗管理ツール",
    description: "チケットの当選管理から、同行者との精算・受渡状況まで一目で把握。サーバー保存なし、登録不要。",
    // images: ["/og-image.png"], // TODO: OGP画像を設定
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ec4899",
};

// JSON-LD構造化データ
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "チケステ",
  alternateName: "TicketStatus",
  description: "チケットの当選管理から、同行者との精算・受渡状況まで一目で把握。サーバー保存なし、登録不要で今すぐ使えるチケットステータス管理アプリ。",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "JPY",
  },
  author: {
    "@type": "Organization",
    name: "Ticket-Ticket",
    url: "https://github.com/Ticket-Ticket",
  },
  featureList: [
    "チケット情報の一元管理",
    "取引ステータスの追跡",
    "同行者・番手の管理",
    "精算・受渡状況の記録",
    "オフライン対応",
    "データエクスポート・インポート",
    "完全プライベート（端末内保存のみ）",
    "登録不要・即時利用可能",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-gray-50">
        {children}
      </body>
    </html>
  );
}
