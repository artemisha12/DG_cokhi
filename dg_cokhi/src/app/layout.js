import './globals.css';

export const metadata = {
  title: 'Đức Giáp - Cơ Khí Nhôm Kính | Thiết Kế & Thi Công Chuyên Nghiệp',
  description:
    'Đức Giáp - Cơ Khí Nhôm Kính chuyên thiết kế, thi công lắp đặt cửa nhôm kính, cửa sắt, nhà tiền chế, mái tôn, mái poly, hàng rào, inox, cầu thang lan can. Uy tín - Chất lượng - Bền vững.',
  keywords:
    'cơ khí, nhôm kính, cửa nhôm, cửa sắt, nhà tiền chế, mái tôn, mái poly, hàng rào, inox, cầu thang, lan can, thi công, lắp đặt',
  openGraph: {
    title: 'Đức Giáp - Cơ Khí Nhôm Kính | Uy Tín - Chất Lượng - Bền Vững',
    description:
      'Chuyên thiết kế, thi công và lắp đặt các công trình cơ khí chất lượng cao.',
    type: 'website',
    locale: 'vi_VN',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
