import type { HTMLProps } from 'react';
import type { Mountain } from '../../types/mountains';
import { useState } from 'react';
import LodgingOption from './LodgingOption';

interface LodgingProps extends Pick<HTMLProps<HTMLElement>, 'className'> {
    lodgingOptions: Mountain['exampleLodgingOptions'];
}

const Lodging = ({ className, lodgingOptions }: LodgingProps) => {
    const [activeItem, setActiveItem] = useState<number>(0);

    return (
        <div className={`flex flex-col ${className ?? ''}`} >
            <h2 className="font-bold text-xl">Lodging Options</h2>
            <div className="flex flex-row w-full justify-center py-4">
                {lodgingOptions.length === 0 
                    ? <span className="text-slate-400">None</span>
                    : lodgingOptions.map(option => (
                        <LodgingOption
                            key={option.id}
                            accommodationURL={option.accommodationURL}
                            recordedPrice={option.recordedPrice}
                            screenshotPath={option.screenshotPath}
                            searchParameters={option.searchParameters}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default Lodging;
