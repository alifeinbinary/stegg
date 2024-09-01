import { Console } from 'console-feed'
import { Message } from 'console-feed/lib/definitions/Component';
import '../App.css';

interface LogConainterProps {
    logs: Message[]
}
const LogsContainer = (logs: LogConainterProps) => {

    return (
        <div className='flex justify-center items-center pt-2'>
            <div className='w-full max-w-xl h-full text-left'>
                <Console logs={logs.logs} filter={['table']} variant="light" styles={{ BASE_FONT_SIZE: '12px', PADDING: '0px', LOG_BORDER: 'none' }} />
            </div>
        </div>
    )
}

export { LogsContainer }