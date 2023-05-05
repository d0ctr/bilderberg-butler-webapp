import { GetText, GetVideo, GetPhoto } from './getsTypes';
import Image from 'next/image';

interface GetCardProps {
    getData: GetPhoto & GetVideo & GetText
}

function getThumbnailElement(url: string) {
    return (
        <div className='flex items-center flex-shrink-0 h-36 w-36 rounded-lg overflow-hidden'>
            <img className='flex-auto' src={url} />
        </div>
    )
}

export function GetCard({ getData }: GetCardProps) {
    return (
        <div className='flex flex-row items-center justify-start card rounded-lg max-h-fit p-2 m-2 mx-4'>
            {getData.thumbnail_url && getThumbnailElement(getData.thumbnail_url)}
            <div className='flex flex-col max-h-36 sm:max-w-sm items-start mx-4 justify-start'>
                <div className='text-start flex-none font-semibold uppercase line-clamp-1'>{getData.name}</div>
                {getData.text && <div className='break-all text-clip text-sm overflow-hidden text-justify'>{getData.text}</div>}
            </div>
        </div>
    );
}