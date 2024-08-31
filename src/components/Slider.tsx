interface SliderProps {
    size: number;
    setSize: React.Dispatch<React.SetStateAction<number>>;
}

const Slider: React.FC<SliderProps> = ({ size, setSize }) => {

    function handleSliderChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSize(Math.floor(Number(event.target.value)));
    }
    return (
        <div className="relative lg:w-60 md:w-40 sm:w-48 mb-6 mx-3">
            <label htmlFor="labels-range-input" className="xs:sr-only text-left block mb-0 text-xs font-medium text-gray-900 dark:text-white">Node size</label>
            <input id="labels-range-input" tabIndex={2} type="range" min="12" max="22" value={size} step="3.33" onChange={(e) => handleSliderChange(e)} className="w-full h-1 mb-1 range-sm text-blue-900 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
            <span className="text-xs uppercase text-gray-500 dark:text-gray-400 absolute start-0 -bottom-4">sm</span>
            <span className="text-xs uppercase text-gray-500 dark:text-gray-400 absolute start-1/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-4">md</span>
            <span className="text-xs uppercase text-gray-500 dark:text-gray-400 absolute start-2/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-4">lg</span>
            <span className="text-xs uppercase text-gray-500 dark:text-gray-400 absolute end-0 -bottom-4">xl</span>
        </div>
    )
}

export default Slider