export default function PaginationComponent(props) {
    const {currentPage, productsData, setCurrentPage} = props
    return (
        <div className="flex flex-col items-center mt-10">
        <span className="text-sm text-red-700 ">
          Showing{" "}
          <span className="font-semibold text-red-900">{currentPage}</span> to{" "}
          <span className="font-semibold text-red-900">
            {Math.ceil(productsData?.length / 10)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-red-900">{productsData?.length}</span>{" "}
          Entries
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-red-800 rounded-l hover:bg-red-900  "
            onClick={(event) => {
              event.preventDefault(), setCurrentPage(currentPage - 1);
            }}
            disabled={currentPage <= 1}
          >
            Prev
          </button>
          <button
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-red-800 border-0 border-l border-red-700 rounded-r hover:bg-red-900"
            onClick={(event) => {
              event.preventDefault(), setCurrentPage(currentPage + 1);
            }}
            disabled={currentPage >= productsData?.length / 10}
          >
            Next
          </button>
        </div>
      </div>
    )
}