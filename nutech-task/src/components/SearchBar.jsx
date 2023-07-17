export default function SearchBar(props) {
    const {searchQuery, setSearchQuery} = props

    const handleInputChange = (event) => {
      if(event.key === "Enter") {
        setSearchQuery(event.target.value)
      }
    }
    
    return (
        <div className="relative mb-3 md:mr-3 flex justify-end">
        <input
          type="text"
          id="search"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-48 pl-4 p-2"
          placeholder="Cari..."
          defaultValue={searchQuery}
          onKeyDown={handleInputChange}
        />
      </div>
    )
}