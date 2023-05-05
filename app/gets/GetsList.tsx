import GETS_MOCKS from './gets_mocks.json';
import { GetCard } from './GetCard';

export default function GetsList() {
    return (
        <div className='flex flex-col justify-around'>
            <ul>
                {GETS_MOCKS.map((getData: any) => {
                    return (
                        <li key={getData.id}>
                            <GetCard getData={getData} />
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}