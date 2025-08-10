import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.scss';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'График работы сотрудников',
    description: 'Визуализация планового и фактического графика работы',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}