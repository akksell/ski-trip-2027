import type { HTMLProps } from 'react';
import type { Price as PriceType } from '../../types/price';

interface PriceProps extends Pick<HTMLProps<HTMLElement>, 'className' | 'id'> {
    amount: PriceType['amount'];
    currency: PriceType['currency'];
}

const Price = ({ id, className, amount, currency }: PriceProps) => {
    return (
        <div id={id} className={`${className ?? ''}`}>
            <span>
                {amount.toLocaleString('en-US', { style: 'currency', currency, maximumFractionDigits: 0 })}
            </span>
        </div>
    );
};

export default Price;

