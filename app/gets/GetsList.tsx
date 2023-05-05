import GETS_MOCKS from './gets_mocks.json';
import { GetCard } from './GetCard';

export default function GetsList() {
    return (
        <div className='flex flex-col sm:flex-row flex-nowrap sm:flex-wrap py-2'>
            {GETS_MOCKS.map((getData: any) => {
                return (
                    <GetCard key={getData.id} getData={getData} />
                )
            })}
        </div>
    );
}