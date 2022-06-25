import React from 'react'


const Searchbar = () => {
    return (
        <div className='search--bar'>
            <form action="/" method="get">
                <input
                    type="text"
                    id="header-search"
                    placeholder="Search animals"

                />

            </form>
        </div>
    )
}

export default Searchbar