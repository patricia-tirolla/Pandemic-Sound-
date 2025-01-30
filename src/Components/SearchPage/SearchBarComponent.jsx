import React from "react"

const SearchBar = ({handleSearchSubmit, searchValue, onChange}) => {
    
    return (
        <>
            <form onSubmit={handleSearchSubmit}>
                <label>
                    <input
                        type="text"
                        name="name"
                        value={searchValue}
                        onChange={onChange}
                    />
                </label>
            </form>
        </>
    )
}

export default SearchBar
