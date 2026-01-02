import type { HTMLProps } from 'react';

interface CostBreakdownProps extends Pick<HTMLProps<HTMLElement>, 'className'> {}

const CostBreakdown = ({ className }: CostBreakdownProps) => {
    return (
        <div className={`flex flex-col ${className ?? ''}`}>
            <h3 className="font-bold text-xl">Cost Breakdown</h3>
            <div className="flex flex-row justify-center py-4">
                <span className="text-slate-400">Coming Soon</span>
            </div>
        </div>
    );
};

export default CostBreakdown;
