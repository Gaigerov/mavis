import {Schedule} from '@/widgets/schedule';
import {getScheduleData} from '@/shared/api/mockData';
import RootProvider from './RootProvider';
import {Header} from '@/widgets/header';

export default async function Home() {
    const data = await getScheduleData();

    return (
        <RootProvider>
            <Header />
            <main>
                <Schedule data={data} />
            </main>
        </RootProvider>
    );
}