import type { MountainCollection } from '../../types/mountains';
import { useState } from 'react';
import ResortPanel from '../ResortPanel';
import GondolaSVG from '../../assets/images/2027/gondola.svg?react';
import './Carousel.css';

interface CarouselProps {
    items: Array<MountainCollection>;
}

type GondolaMovementDirection = 'forward' | 'backward' | 'none';

const Carousel = ({ items }: CarouselProps) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [gondolaDirection, setGondolaDirection] = useState<GondolaMovementDirection>('none');

    const handleNextItemButtonAction = () => {
        const newActiveIndex = activeIndex + 1 >= items.length ? 0 : activeIndex + 1;
        setActiveIndex(newActiveIndex);
        setGondolaDirection('forward');
    };

    const handlePrevItemButtonAction = () => {
        const newActiveIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(newActiveIndex);
        setGondolaDirection('backward');
    }

    return (
        <div className="flex flex-col w-full relative z-10 pt-24 pb-16">
            <div className="w-screen flex flex-row justify-around items-center bg-center bg-linear-[transparent_27.5%,#4e4978_27.5%,#4e4978_28.5%,transparent_28.5%]">
                <button type="button" className="cursor-pointer md:mx-16 px-2 py-2" onClick={handlePrevItemButtonAction}>Previous</button>
                <div className="flex relative justify-center w-full">
                    <GondolaSVG
                        className={`w-1/2 absolute -translate-x-[200%] ${getSecondaryGondolaDirectionClass(gondolaDirection)}`}
                    />
                    <GondolaSVG
                        className={`w-1/2 ${getMainGondolaDirectionClass(gondolaDirection)}`}
                        onAnimationEnd={() => setGondolaDirection('none')}
                    />
                    <GondolaSVG
                        className={`w-1/2 absolute translate-x-[200%] ${getSecondaryGondolaDirectionClass(gondolaDirection)}`}
                    />
                </div>
                <button type="button" className="cursor-pointer md:mx-16 px-2 py-2" onClick={handleNextItemButtonAction}>Next</button>
            </div>
            {items.map((item, index) => (
                <ResortPanel key={item.id} mountain={item.data} isActive={activeIndex === index} />
            ))}
        </div>
    );
};


function getSecondaryGondolaDirectionClass(direction: GondolaMovementDirection) {
    if (direction === 'none') {
        return '';
    }
    return direction === 'forward' ? 'next-active' : 'prev-active';
}

function getMainGondolaDirectionClass(direction: GondolaMovementDirection) {
    if (direction === 'none') {
        return '';
    }
    return `current-${direction}-active`;
}
export default Carousel;
