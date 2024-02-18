import React from 'react';

export const Loading = () => {

    const cubes =  []; 
    for(let i = 0; i < 6; i++){                    
        cubes.push(<div key={i} className="cube"></div>)
    }

    return (
        <div className='loader-container'>
        
            <h1>Blog Loading</h1>
            <section id='loader'>
                {
                    cubes
                }

            </section>
        </div>
    )

}