

const FilterSelector = ({setSelectedFilter, selectedFilter}: {setSelectedFilter: (filter: number) => void, selectedFilter: number}) => {
  return (
    <div>
        {Array.from({length: 3}, (_, index) => (
            <button key={index} className={`w-10 h-10 bg-gray-200 rounded-full ${selectedFilter === index + 1 ? 'bg-blue-500' : ''}`} onClick={() => setSelectedFilter(index + 1)}></button>
        ))}
        {selectedFilter}
    </div>
  )
}

export default FilterSelector