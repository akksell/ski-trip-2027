import type { HTMLProps } from 'react';
import type { Price as PriceType } from '../../types/price';

interface PriceProps extends Pick<HTMLProps<HTMLElement>, 'className' | 'id'> {
    amount: PriceType['amount'];
    currency: PriceType['currency'];
    maximumFractionDigits?: number;
}

const Price = ({ id, className, amount, currency, maximumFractionDigits = 0 }: PriceProps) => {
    return (
        <div id={id} className={`${className ?? ''}`}>
            <span>
                {amount.toLocaleString('en-US', { style: 'currency', currency, maximumFractionDigits })}
            </span>
        </div>
    );
};

export default Price;

