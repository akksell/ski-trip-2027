import type { HTMLProps } from 'react';
import type { Mountain } from '../../types/mountains';
import { useState, useRef } from 'react';
import LodgingOption from './LodgingOption';
import ArrowRight from '../../assets/icons/arrow_circle_right.svg?react';
import ArrowLeft from '../../assets/icons/arrow_circle_left.svg?react';

interface LodgingProps extends Pick<HTMLProps<HTMLElement>, 'className'> {
    lodgingOptions: Mountain['exampleLodgingOptions'];
}

const Lodging = ({ className, lodgingOptions }: LodgingProps) => {
    const [isPreviousBtnDisabled, setIsPreviousBtnDisabled] = useState<boolean>(true);
    const [isNextBtnDisabled, setIsNextBtnDisabled] = useState<boolean>(false);
    const container = useRef<HTMLDivElement>(null);
    const carouselContainer = useRef<HTMLDivElement>(null);
    const isLodgingOptionsEmpty = lodgingOptions.length === 0;

    // TODO: probably need a useEffect hook on mount to determine if both the
    // next and previous buttons should be disabled - this is currently a bug

    // TODO: clean this up because it doesn't function like I want it to and it
    // will not cleanly clamp to the right side of the container on when the
    // for the last few items in the carousel. This can leave extra padding on
    // the right side on certain screen sizes which is bad UX
    const handleNextBtnClick = () => {
        if (!carouselContainer.current || !container.current) {
            return;
        }

        const carousel = carouselContainer.current;
        const containerWidth = getContainerWidth();
        const currentTranslation = getTranslation();
        const { totalItemWidth, itemPadding } = getCarouselItemWidth();
        const numVisible = max(Math.floor(containerWidth / totalItemWidth), 1);
        const clampEndingPosition = -(carousel.scrollWidth - (numVisible * totalItemWidth) + itemPadding);
        const newScrollAmount = max(currentTranslation - (numVisible * totalItemWidth), clampEndingPosition);
        carousel.style = `transform: translateX(${newScrollAmount}px)`;
        
        setIsPreviousBtnDisabled(false);
        if (newScrollAmount === clampEndingPosition) {
            setIsNextBtnDisabled(true);
        }
        getContainerWidth();
    };

    const handlePreviousBtnClick = () => {
        if (!carouselContainer.current || !container.current) {
            return;
        }

        const carousel = carouselContainer.current;
        const containerWidth = container.current.clientWidth;
        const { totalItemWidth } = getCarouselItemWidth();
        const numVisible = max(Math.floor(containerWidth / totalItemWidth), 1);
        const currentTranslation = getTranslation();

        const newScrollAmount = min(currentTranslation + (numVisible * totalItemWidth), 0);
        carousel.style = `transform: translateX(${newScrollAmount}px)`;

        setIsNextBtnDisabled(false);
        if (newScrollAmount === 0) {
            setIsPreviousBtnDisabled(true);
        }
    };

    function getContainerWidth() {
        if (!container.current) {
            return 0;
        }
        const paddingLeft = parseInt(getComputedStyle(container.current).paddingLeft.replace('px', ''));
        const paddingRight = parseInt(getComputedStyle(container.current).paddingRight.replace('px', ''));
        return container.current.clientWidth - (paddingLeft + paddingRight);
    }

    function getTranslation() {
        if (!carouselContainer.current) {
            return 0;
        }
        const style = getComputedStyle(carouselContainer.current);
        const transform = style.transform;
        if (transform === 'none') {
            return 0;
        }

        const matrix = new DOMMatrix(transform);
        // This is translateX value
        return matrix.m41;
    }

    function getCarouselItemWidth() {
        if (!carouselContainer.current || !container.current) {
            return { totalItemWidth: 1, itemPadding: 0 };
        }

        const carousel = carouselContainer.current;
        const totalCarouselWidth = carousel.scrollWidth;
        const numItems = lodgingOptions.length;

        const itemWidth = carousel.children[0]?.scrollWidth ?? 1;
        const itemPadding = (totalCarouselWidth - (itemWidth * numItems)) / (numItems - 1);
        return { totalItemWidth: itemWidth + itemPadding, itemPadding };
    }

    return (
        <div ref={container} className={`flex flex-col overflow-hidden ${className ?? ''}`} >
            <div className={`flex flex-row items-center ${isLodgingOptionsEmpty ? 'justify-start' : 'justify-between'}`}>
                <h2 className="font-bold text-xl">Lodging Options</h2>
                {!isLodgingOptionsEmpty && (
                    <div className="flex gap-2">
                        {/* TODO: accessibility is bad here. fix it */}
                        <button type="button" onClick={handlePreviousBtnClick} disabled={isPreviousBtnDisabled} className="cursor-pointer">
                            <ArrowLeft className="fill-slate-300 hover:fill-slate-400 transition-all duration-200" />
                        </button>
                        <button type="button" onClick={handleNextBtnClick} disabled={isNextBtnDisabled} className="cursor-pointer">
                            <ArrowRight className="fill-slate-300 hover:fill-slate-400 transition-all duration-200" />
                        </button>
                    </div>
               )}
            </div>
            <div ref={carouselContainer} className={`flex flex-row w-full py-4 gap-8 flex-nowrap overflow-none transition-transform duration-200 ${isLodgingOptionsEmpty ? 'justify-center' : ''}`}>
                {isLodgingOptionsEmpty
                    ? <span className="text-slate-400">None</span>
                    : lodgingOptions.map(option => (
                        <LodgingOption
                            key={option.id}
                            className="flex-none w-80"
                            accommodationURL={option.accommodationURL}
                            thumbnail={option.thumbnail}
                            recordedPrice={option.recordedPrice}
                            screenshotPath={option.screenshotPath}
                            searchParameters={option.searchParameters}
                            maxNumberGuests={option.maxNumberGuests}
                            numberOfBeds={option.numberOfBeds}
                            numberOfBaths={option.numberOfBaths}
                        />
                    ))
                }
            </div>
        </div>
    );
};

function min(a: number, b: number) {
    return a <= b ? a : b;
}

function max(a: number, b: number) {
    return a >= b ? a : b;
}

export default Lodging;
