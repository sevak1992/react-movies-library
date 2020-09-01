import React, {useEffect} from 'react';

import {getPopularMovies} from 'actions/movies';

function Home() {
    useEffect(() => {
        getPopularMovies()
            .catch(err => {
                console.log('err ', err);
            });
    }, []);

    return (
        <div>
            Home page
        </div>
    )
}

export default Home