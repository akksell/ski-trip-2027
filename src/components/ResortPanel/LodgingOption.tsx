import type { HTMLProps } from 'react';
import type { LodgingOption as LodgingOptionSchemaType } from '../../types/mountains';

interface LodgingOptionProps extends
    Pick<HTMLProps<HTMLElement>, 'className'>,
    Omit<LodgingOptionSchemaType, 'id'>
    {}

const LodgingOption = ({ className, recordedPrice, accommodationURL, screenshotPath, searchParameters }: LodgingOptionProps) => {
    return (
        <div className={`${className ?? ''}`}>
        </div>
    );
};

export default LodgingOption;

