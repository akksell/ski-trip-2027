import { useState, type HTMLProps } from 'react';
import type { CostBreakdown, BreakdownItem, Mountain } from '../../types/mountains';
import type { Price as PriceType } from '../../types/price';
import Price from '../Price';

interface CostBreakdownProps extends
    Pick<HTMLProps<HTMLElement>, 'className'>,
    CostBreakdown
    {
        mountainId: string;
        seasonPassType?: Mountain['seasonPassType'];
    }

interface BreakdownSectionItem {
    key: string;
    label: string;
    price: BreakdownItem['price'];
    subItems?: Array<Omit<BreakdownSectionItem, 'subItems'>>;
}

interface BreakdownSectionProps extends Pick<HTMLProps<HTMLElement>, 'className'> {
    title?: string;
    items: Array<BreakdownSectionItem>;
    subtotal?: PriceType;
}

const BreakdownSection = ({ className, title, items, subtotal }: BreakdownSectionProps) => (
    <div>
        {!!title && !!subtotal && (
            <div className="flex flex-row justify-between">
                <h5 className="text-lg">{title}</h5>
                <Price amount={subtotal.amount} currency={subtotal.currency} maximumFractionDigits={2} />
            </div>
        )}
        {!!title && !subtotal && <h5 className="text-lg">{title}</h5>}
        <ul className={`flex flex-col ${className} ?? ''`}>
            {items.map(item => (
                <>
                    <li key={item.key} className="flex flex-row w-full justify-between pl-4">
                        <div>
                            <span className="capitalize">{item.label}</span>
                        </div>
                        <Price amount={item.price.amount} currency={item.price.currency} maximumFractionDigits={2} />
                    </li>
                    {!!item.subItems?.length && <BreakdownSection className="pl-8 text-md" items={item.subItems} />}
                </>
            ))}
        </ul>
    </div>
);

const NUM_DAYS = 5;
const NUM_SKI_DAYS = 3;
const EMPTY_ARRAY: Array<any> = [];

const CostBreakdown = ({ className, gear, lodging, liftTickets, food, mountainId, seasonPassType }: CostBreakdownProps) => {
    const [numGuests, setNumGuests] = useState<number>(9);
    const [shouldUseDailyPrice, setShouldUseDailyPrice] = useState<boolean>(true);
    const [ownsSkiJacketAndPants, setOwnsSkiAndPants] = useState<boolean>(false);
    const [ownsHelmet, setOwnsHelmet] = useState<boolean>(false);
    const [selectedRentalType, setSelectedRentalType] = useState<'ski' | 'snowboard'>('ski');
    const [shouldUsePassProduct, setShouldUsePassProduct] = useState<boolean>(true);

    const totalPrice: PriceType = { amount: 0, currency: 'USD' };
    const gearItems = (Object.keys(gear) as Array<keyof typeof gear>)
        .reduce((memo: Array<BreakdownSectionItem>, itemKey) => {
            const item = gear[itemKey];
            if (!item || isGearOppositeOfSelectedRentalType(itemKey, selectedRentalType) || shouldSkipAncillaryGear(itemKey, ownsSkiJacketAndPants)) {
                return memo;
            }
            const transformedItem: BreakdownSectionItem = {
                key: itemKey,
                label: getBreakdownItemLabel(itemKey),
                price: getItemPrice(NUM_SKI_DAYS, item.price, item.rateUnit, shouldUseDailyPrice),
            };
            if (hasHelmet(item) && !ownsHelmet) {
                const helmetPrice = getItemPrice(NUM_SKI_DAYS, item.helmet.price, item.helmet.rateUnit, shouldUseDailyPrice);
                const helmetItem = { key: `${itemKey}-helmet`, label: 'helmet', price: helmetPrice };
                transformedItem.subItems = [helmetItem];
                totalPrice.amount += helmetPrice.amount;
            }
            memo.push(transformedItem);
            totalPrice.amount += transformedItem.price.amount;
            return memo;
        }, []);

    const foodItems = (Object.keys(food) as Array<keyof typeof food>)
        .reduce((memo: Array<BreakdownSectionItem>, itemKey) => {
            const item = food[itemKey];
            if (!item) {
                return memo;
            }
            const transformedItem = {
                key: itemKey,
                label: getBreakdownItemLabel(itemKey),
                price: getItemPrice(NUM_DAYS, item.price, item.rateUnit, shouldUseDailyPrice),
            };
            memo.push(transformedItem);
            totalPrice.amount += transformedItem.price.amount;
            return memo;
        }, []);

    const liftTicketProduct = shouldUsePassProduct && !!liftTickets.passProduct ? liftTickets.passProduct : liftTickets.windowPrice;
    const liftTicketItem = { ...liftTicketProduct, price: getItemPrice(NUM_SKI_DAYS, liftTicketProduct.price, liftTicketProduct.rateUnit, shouldUseDailyPrice) };

    const lodgingPrice = getItemPrice(NUM_DAYS, { ...lodging.price, amount: lodging.price.amount / numGuests }, lodging.rateUnit, shouldUseDailyPrice);
    totalPrice.amount += liftTicketItem.price.amount + lodgingPrice.amount;

    return (
        <div className={`flex flex-col ${className ?? ''}`}>
            <h3 className="font-bold text-xl">Cost Breakdown</h3>
            <span className="text-slate-600">This is just an estimate of how much a trip <span className="italic underline">could</span> cost for a <span className="font-bold">single person</span> at this ski area. Ski & Snowboard rentals are priced as of January 4th, 2025 but you may be able to find others that are cheaper. Lodging cost is estimated based on the available lodging examples above. Food pricing will likely be the least accurate and is estimated based on going out every night to a restaurant or bar.</span>
            <span className="mt-4">I want to:</span>
            <fieldset className="flex gap-x-2 mb-2">
                <label className={`flex w-full justify-center items-center px-3 py-1 rounded-lg border-1 cursor-pointer ${selectedRentalType === 'ski' ? 'bg-sky-200 border-sky-600' : 'bg-slate-200 border-slate-600'}`}>
                    <input className="w-0 h-0" type="radio" name="price-calculation-method" onChange={() => setSelectedRentalType('ski')} />
                    Ski
                </label>
                <label className={`flex w-full justify-center items-center px-3 py-1 rounded-lg border-1 cursor-pointer ${selectedRentalType === 'snowboard' ? 'bg-sky-200 border-sky-600' : 'bg-slate-200 border-slate-600'}`}>
                    <input className="w-0 h-0" type="radio" name="price-calculation-method" onChange={() => setSelectedRentalType('snowboard')} />
                    Snowboard
                </label>
            </fieldset>
            <fieldset className="flex flex-col mb-2">
                <label className="mb-1">
                    <input type="checkbox" className="mr-2" checked={ownsSkiJacketAndPants} onChange={(e) => setOwnsSkiAndPants(e.target.checked)} />
                    I already own a ski jacket and pants or will buy my own
                </label>
                <label className="mb-1">
                    <input type="checkbox" className="mr-2" checked={ownsHelmet} onChange={(e) => setOwnsHelmet(e.target.checked)} />
                    I already own a helmet or don't want one
                </label>
                {!!seasonPassType && seasonPassType !== 'other' && (
                    <label className="">
                        <input type="checkbox" className="mr-2" checked={shouldUsePassProduct} onChange={(e) => setShouldUsePassProduct(e.target.checked)} />
                        I'll buy an {seasonPassType} pass instead of directly buying lift tickets from the resort (this can be a cheaper option)
                    </label>
                )}
            </fieldset>
            <span>View trip cost:</span>
            <fieldset className="flex gap-x-2 mb-2">
                <label className={`flex w-full justify-center items-center px-3 py-1 rounded-lg border-1 cursor-pointer ${shouldUseDailyPrice ? 'bg-sky-200 border-sky-600' : 'bg-slate-200 border-slate-600'}`}>
                    <input id={`${mountainId}-daily-option`} className="w-0 h-0" type="radio" name="price-calculation-method" onChange={() => setShouldUseDailyPrice(true)} />
                    Daily
                </label>
                <label className={`flex w-full justify-center items-center px-3 py-1 rounded-lg border-1 cursor-pointer ${!shouldUseDailyPrice ? 'bg-sky-200 border-sky-600' : 'bg-slate-200 border-slate-600'}`}>
                    <input id={`${mountainId}-total-trip-option`} className="w-0 h-0" type="radio" name="price-calculation-method" onChange={() => setShouldUseDailyPrice(false)} />
                    Entire Trip
                </label>
            </fieldset>
            <div className="flex flex-col py-4 gap-y-2">
                <BreakdownSection className="" title="Gear" items={gearItems} />
                <BreakdownSection className="" title="Lift Tickets" items={(EMPTY_ARRAY as Array<BreakdownSectionItem>)} subtotal={liftTicketItem.price} />
                <BreakdownSection className="" title="Food" items={foodItems} />
                <BreakdownSection className="mb-2" title="Lodging" items={(EMPTY_ARRAY as Array<BreakdownSectionItem>)} subtotal={lodgingPrice} />
                <div className="flex flex-row justify-between border-t-1 pt-2">
                    <h4 className="text-lg font-bold mb-0">Total</h4>
                    <div className="flex flex-col items-end">
                        <Price className="text-lg font-bold mb-0" amount={totalPrice.amount} currency={totalPrice.currency} maximumFractionDigits={2} />
                        {shouldUseDailyPrice && <span>per day</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

function getBreakdownItemLabel(itemKey: string) {
    return itemKey.replace(/[A-Z]/g, match => ` ${match}`);
}

function isGearOppositeOfSelectedRentalType(itemKey: keyof CostBreakdownProps['gear'], rentalType: 'ski' | 'snowboard') {
    if (itemKey !== 'skiRental' && itemKey !== 'snowboardRental') {
        return false;
    }
    return (itemKey === 'skiRental' && rentalType === 'snowboard') || (itemKey === 'snowboardRental' && rentalType === 'ski');
}

function shouldSkipAncillaryGear(itemKey: keyof CostBreakdownProps['gear'], ownsSkiJacketAndPants: boolean) {
    return ownsSkiJacketAndPants && (itemKey === 'skiJacket' || itemKey === 'snowPants');
}

function isBreakdownItem(item: object): item is BreakdownItem {
    return (
        'price' in item &&
        !!item.price &&
        typeof item.price === 'object' &&
        'amount' in item.price &&
        item.price.amount != null &&
        typeof item.price.amount === 'number' &&
        'currency' in item.price &&
        item.price.currency != null &&
        typeof item.price.currency === 'string'
    );
};

function hasHelmet(item: object): item is { helmet: BreakdownItem } {
    return 'helmet' in item && item.helmet != null && isBreakdownItem(item.helmet);
}

function getItemPrice(numDays: number, itemPrice: BreakdownItem['price'], itemRateUnit: BreakdownItem['rateUnit'], shouldUseDailyPrice: boolean) {
    if (!itemRateUnit || (itemRateUnit === 'daily' && shouldUseDailyPrice) || (itemRateUnit === 'full-trip' && !shouldUseDailyPrice)) {
        return itemPrice;
    }
    if (itemRateUnit === 'daily' && !shouldUseDailyPrice) {
        return { ...itemPrice, amount: itemPrice.amount * numDays};
    }
    return { ...itemPrice, amount: itemPrice.amount / numDays };
}

export default CostBreakdown;
