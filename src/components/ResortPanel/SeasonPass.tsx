import type { SeasonPass as SeasonPassType } from '../../types/mountains.d.ts'
import EpicPass from '../../assets/icons/epic-pass.svg?react';
import IkonPass from '../../assets/icons/ikon-pass.svg?react';

interface SeasonPassProps {
    type: SeasonPassType;
}

const SeasonPass = ({ type }: SeasonPassProps) => {
    switch (type) {
    case 'epic':
        return <EpicPass className="w-12" />;
    case 'ikon':
        return <IkonPass className="w-12" />;     
    default:
        return null;
   }
};

export default SeasonPass;

