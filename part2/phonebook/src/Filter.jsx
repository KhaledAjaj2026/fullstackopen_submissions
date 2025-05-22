function Filter({nameSearch, handleSearchChange}) {
    return (
        <div>
            Filter for name: <input value={nameSearch} onChange={handleSearchChange} />
        </div>
    );
}

export default Filter;