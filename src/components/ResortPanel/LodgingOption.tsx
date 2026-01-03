import type { HTMLProps } from 'react';
import type { LodgingOption as LodgingOptionSchemaType } from '../../types/mountains';
import Price from '../Price';

interface LodgingOptionProps
 extends
    Pick<HTMLProps<HTMLElement>, 'className'>,
    Omit<LodgingOptionSchemaType, 'id'>
    {}

const LodgingOption = ({ className, recordedPrice, accommodationURL, thumbnail, screenshotPath, searchParameters, maxNumberGuests, numberOfBeds, numberOfBaths }: LodgingOptionProps) => {
    return (
        <div className={`${className ?? ''}`}>
            {!!thumbnail && (
                <div className="w-full h-48">
                    <img
                        src={thumbnail}
                        alt={`thumbnail of a lodging option at the resort`}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
            )}
            <div className="flex gap-4 py-2">
                <span className="text-sm text-slate-600">{maxNumberGuests} Guests</span>
                <span className="text-sm text-slate-600">{numberOfBeds} Beds</span>
                <span className="text-sm text-slate-600">{numberOfBaths} Baths</span>
            </div>
            <div className="flex gap-2 items-end justify-between">
                <div className="flex flex-col gap-y-2">
                    <a href={screenshotPath} target='_blank' className="underline text-sky-600 hover:text-sky-800 visited:text-purple-600">
                        View proof of price
                    </a>
                    <a href={accommodationURL} target='_blank' className="underline text-sky-600 hover:text-sky-800 visited:text-purple-600">
                        View on {getAccommodationBookingServiceName(accommodationURL)}
                    </a>
                </div>
                <div className="flex flex-col items-end">
                    <Price
                        className="text-lg font-bold"
                        amount={recordedPrice.price.amount}
                        currency={recordedPrice.price.currency}
                    />
                    <span className="text-slate-600">for 5 nights</span>
                </div>
            </div>
        </div>
    );
};


function getAccommodationBookingServiceName(url: LodgingOptionProps['accommodationURL']) {
    if (url.includes('airbnb')) {
        return 'Airbnb';
    }
    if (url.includes('vrbo')) {
        return 'VRBO';
    }
    if (url.includes('expedia')) {
        return 'Expedia';
    }
    if (url.includes('booking.com')) {
        return 'Booking.com'
    }
    return 'Booking Site';
}

export default LodgingOption;

