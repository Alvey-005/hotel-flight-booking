const HotelCard = ({ name, location, description, facilities, price }) => {
    return (
        <>
            <div className="max-w-sm w-full mx-auto	 lg:max-w-full lg:flex p-4 lg:p-4">
                <div className="h-48 lg:h-auto lg:w-48 flex-none bg-contain bg-no-repeat bg-center rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-[url('/images/hotel.jpg')]" title="Woman holding a mug">
                </div>
                <div className=" w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-4">
                        <div className="text-gray-900 font-bold text-xl mb-2">{name}</div>
                        <p className="text-gray-700 text-base">{description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        {/* <p className="text-gray-600">Aug 18</p> */}
                        <div className="text-gray-700 font-medium">
                            {location}
                        </div>
                        <div className="flex flex-row gap-1">
                            <span className="text-base"> $ </span>
                            <p className="text-5xl font-semibold">{price}</p>
                        </div>

                    </div>
                    <div className="flex gap-4 flex-wrap mt-4">
                    {Object.entries(facilities).map(([key, value]) =>{
                        if (value === true){
                            return(
                            <span key = {key} className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{key}</span>
                    )}
                        else{
                            return(
                            <span key = {key} className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{key}</span>

                    )}
                    })}


                    </div>
                    {/* <div className="mt-4 flex gap-2">
                        <p>Only 2 Rooms Left</p>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default HotelCard;