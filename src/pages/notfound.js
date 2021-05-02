import React, {useEffect} from 'react'

const Notfound = () => {
    useEffect(() => {
      document.title = "Not Found - Instagram";
    }, []);

    return (
      <div className="bg-gray-background">
        <div className="m-auto py-7 max-w-screen-lg flex flex-col justify-center items-center">
          <img src="/images/not-found.svg" alt="not found img" className="w-3/6"/>
          <p className="text-center text-2xl mt-3 font-roboto font-medium">Oops! Not Found!</p>
        </div>
      </div>
    );
}

export default Notfound
