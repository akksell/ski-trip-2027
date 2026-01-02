import type { Mountain } from '../../types/mountains';
import SeasonPass from './SeasonPass';
import SquareIcon from '../../assets/icons/crop_square.svg?react';
import CircleIcon from '../../assets/icons/circle.svg?react';
import DiamondIcon from '../../assets/icons/diamond.svg?react';

interface MountainInfoProps {
    resortName: Mountain['resortName'];
    resortStyle: Mountain['resortStyle'];
    seasonPassType: Mountain['seasonPassType'];
    city: Mountain['city'];
    state: Mountain['state'];
    mountainMetadata: Mountain['mountainMetadata'];
}

const MountainInfo = ({ resortName, resortStyle, city, state, seasonPassType, mountainMetadata }: MountainInfoProps) => {
    const { baseElevation, summitElevation, totalLiftCount, totalTrailCount, trailCounts, skiableTerrainSize } = mountainMetadata;
    return (
        <div className="flex flex-col flex-1 lg:flex-2 p-2">
            <div className='pb-4'>
                <div className='flex flex-row gap-4'>
                    <h1 className="font-serif font-bold text-3xl md:text-4xl xl:text-5xl uppercase text-nowrap">{resortName}</h1>
                    <SeasonPass type={seasonPassType} />
                </div>
                <h2 className="text-xl">{city}, {state}</h2>
                <span className="text-md capitalize">{resortStyle}</span>
            </div>
            <div>
                <h3 className="font-bold text-lg capitalize">Mountain Statistics</h3>
                <ul>
                    <li><span className="capitalize">Base Elevation:</span> {baseElevation.value} {baseElevation.unit}</li>
                    <li><span className="capitalize">Summit Elevation:</span> {summitElevation.value} {summitElevation.unit}</li>
                    <li><span className="capitalize">Skiable Terrain:</span> {skiableTerrainSize.value} {skiableTerrainSize.unit}</li>
                    <li><span className="capitalize">Lifts: {totalLiftCount}</span></li>
                    <li className='flex flex-row items-center divide-x-2 divide-slate-600 divide-dashed py-2'>
                        <ul className="pr-4">
                            <li className="text-emerald-500 flex items-center">
                                {trailCounts.green} Beginner
                                <CircleIcon
                                    fill="oklch(69.6% 0.17 162.48)"
                                    className="ml-1 w-5"
                                />
                            </li>
                            <li className="text-sky-500 flex items-center">
                                {trailCounts.blue} Intermediate
                                <SquareIcon
                                    fill="oklch(68.5% 0.169 237.323)"
                                    className="ml-1 w-5"
                                />
                            </li>
                            <li className="text-slate-900 flex items-center">
                                {trailCounts.black} Advanced
                                <DiamondIcon
                                    fill="oklch(20.8% 0.042 265.755)"
                                    className="ml-1 w-5"
                                />
                            </li>
                            <li className="text-slate-900 flex items-center">
                                {trailCounts.dblack} Expert
                                <DiamondIcon
                                    fill="oklch(20.8% 0.042 265.755)"
                                    className="ml-1 w-5"
                                />
                                <DiamondIcon
                                    fill="oklch(20.8% 0.042 265.755)"
                                    className="w-5"
                                />
                            </li>
                        </ul>
                        <div className="flex flex-col flex-wrap pl-4">
                            <span className="font-bold">{totalTrailCount} Total Trails</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MountainInfo;
