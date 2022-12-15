import React from 'react';
import { CircleLoader } from 'react-spinners';

const Loading = () => {
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      };

    return (
        <div className='h-screen flex justify-center items-center'>
            <CircleLoader
                color= '#E811B1'
                cssOverride={override}
                size={120}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default Loading;