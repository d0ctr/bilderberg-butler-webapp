import { GetText, GetVideo, GetPhoto } from './getsTypes';

interface GetCardProps {
    getData: GetPhoto & GetVideo & GetText
}

function getThumbnailElement(url: string) {
    return (
        <div className='flex-initial justify-center items-center shrink-0 grow-0 rounded-lg h-24 w-24 m-2 overflow-hidden'>
            <img src={url}></img>
        </div>
    )
}

export function GetCard({ getData }: GetCardProps) {
    return (
        <div className='flex flex-row items-center justify-start card rounded-lg max-h-36 p-2 m-4'>
            {getData.thumbnail_url && getThumbnailElement(getData.thumbnail_url)}
            <div className='flex flex-col max-h-36 items-start p-4 justify-stretch'>
                <label className='pb-2 font-semibold uppercase'>{getData.name}</label>
                {getData.text && <div className='break-all text-clip overflow-hidden text-xs'>{getData.text}</div>}
            </div>
        </div>
    );
}