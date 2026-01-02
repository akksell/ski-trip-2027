import type { Mountain } from '../../types/mountains.d.ts';
import CostBreakdown from './CostBreakdown.tsx';
import Lodging from './Lodging.tsx';
import MountainInfo from './MountainInfo';

interface ResortPanelProps {
    mountain: Mountain;
    isActive: boolean;
}

const ResortPanel = ({ mountain, isActive }: ResortPanelProps) => {
    return (
        <div className={`flex flex-col px-8 md:px-24 xl:px-48 transition-opacity duration-500 ease-in-out delay-100 ${getActiveTransition(isActive)}`} aria-hidden={!isActive}>
            <div className="flex flex-row flex-wrap justify-center gap-x-24 pb-4 border-b-2 border-slate-300" aria-hidden={!isActive}>
                <MountainInfo
                    resortName={mountain.resortName}
                    resortStyle={mountain.resortStyle}
                    seasonPassType={mountain.seasonPassType}
                    city={mountain.city}
                    state={mountain.state}
                    mountainMetadata={mountain.mountainMetadata}
                />
                <div className="md:flex-2 p-2">
                    <a className="w-full" href={mountain.mountainMetadata.trailmapFullPDFPath} target='_blank'>
                        <img src={mountain.mountainMetadata.trailmapImagePath} className="rounded-lg shadow-md self-center hover:scale-[105%] transition-all duration-150ms ease-in-out" />
                    </a>
                </div>
            </div>
            <Lodging className="py-4 px-2 border-b-2 border-slate-300" lodgingOptions={mountain.exampleLodgingOptions} />
            <CostBreakdown className="py-4 px-2" />
        </div>
    );
};

function getActiveTransition(isActive: boolean) {
    return isActive ? 'opacity-100 visible' : 'opacity-0 hidden';
}

export default ResortPanel;

