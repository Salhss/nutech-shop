import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../store/actions/actionProduct";
import { useEffect, useState } from "react";
import PaginationComponent from "./Pagination";
import SearchBar from "./SearchBar";
import Modal from "./Modal";
import { NavLink } from "react-router-dom";

export default function ProductComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    sellPrice: "",
    buyPrice: "",
    thumbnail: "",
    stock: "",
  });

  const dispatch = useDispatch();

  // implement loading dan error
  const productsData = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.products.loading);
  const error = useSelector((state) => state.products.error);

  // variable global lainnya
  let limit = 10;

  useEffect(() => {
    dispatch(fetchProducts(searchQuery));
  }, [searchQuery]);

  // membagi data menjadi halaman sesuai limit
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const currentData = productsData?.slice(startIndex, endIndex);

  // delete data
  const handleDelete = (id) => {
    Swal.fire({
      title: "Ingin Hapus Produk Ini?",
      text: "Data tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Berhasil!", "Data berhasil dihapus", "success");
        dispatch(deleteProduct(id));
      }
    });
  };

  //data yang akan dipassing untuk validasi nama unik
  let titles = [];
  for (let i = 0; i < productsData?.length; i++) {
    titles.push(productsData[i].title);
  }

  // mapping data
  const productsMapData = currentData?.map((product) => {
    return (
      <div
        key={product._id}
        className="w-52 h-96 bg-white border border-gray-200 rounded-lg shadow"
      >
        <div className="w-52 h-52 flex justify-center align-middle">
          <div className="mt-auto">
            <img
              className="rounded-t-lg object-cover max-w-52 max-h-52"
              src={product.thumbnail}
              alt={product.title}
              style={{ minHeight: "170px" }}
            />
          </div>
        </div>

        <div className="p-2 flex flex-col h-40 w-full">
          <div>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-90 capitalize">
              {product.title}
            </h5>
          </div>
          <div className="flex-grow"></div>
          <div className="flex gap-3">
            {/* Button Detail */}
            <NavLink
              to={`/product/${product._id}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 "
            >
              Lihat
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </NavLink>
            {/* Button Update */}
            <Modal
              form={form}
              setForm={setForm}
              titles={titles}
              id={product._id}
            />
            {/* <button className="items-center rounded-lg px-1 py-1 font-medium text-center text-white bg-red-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button> */}
            {/* Button Delete */}
            <button
              className="items-center rounded-lg px-1 py-1 font-medium text-center text-white bg-red-700"
              onClick={(event) => {
                event.preventDefault(), handleDelete(product._id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 6.38597C3 5.90152 3.34538 5.50879 3.77143 5.50879L6.43567 5.50832C6.96502 5.49306 7.43202 5.11033 7.61214 4.54412C7.61688 4.52923 7.62232 4.51087 7.64185 4.44424L7.75665 4.05256C7.8269 3.81241 7.8881 3.60318 7.97375 3.41617C8.31209 2.67736 8.93808 2.16432 9.66147 2.03297C9.84457 1.99972 10.0385 1.99986 10.2611 2.00002H13.7391C13.9617 1.99986 14.1556 1.99972 14.3387 2.03297C15.0621 2.16432 15.6881 2.67736 16.0264 3.41617C16.1121 3.60318 16.1733 3.81241 16.2435 4.05256L16.3583 4.44424C16.3778 4.51087 16.3833 4.52923 16.388 4.54412C16.5682 5.11033 17.1278 5.49353 17.6571 5.50879H20.2286C20.6546 5.50879 21 5.90152 21 6.38597C21 6.87043 20.6546 7.26316 20.2286 7.26316H3.77143C3.34538 7.26316 3 6.87043 3 6.38597Z"
                  fill="#FFFFFF"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.5956 22.0001H12.4044C15.1871 22.0001 16.5785 22.0001 17.4831 21.1142C18.3878 20.2283 18.4803 18.7751 18.6654 15.8686L18.9321 11.6807C19.0326 10.1037 19.0828 9.31524 18.6289 8.81558C18.1751 8.31592 17.4087 8.31592 15.876 8.31592H8.12404C6.59127 8.31592 5.82488 8.31592 5.37105 8.81558C4.91722 9.31524 4.96744 10.1037 5.06788 11.6807L5.33459 15.8686C5.5197 18.7751 5.61225 20.2283 6.51689 21.1142C7.42153 22.0001 8.81289 22.0001 11.5956 22.0001ZM10.2463 12.1886C10.2051 11.7548 9.83753 11.4382 9.42537 11.4816C9.01321 11.525 8.71251 11.9119 8.75372 12.3457L9.25372 17.6089C9.29494 18.0427 9.66247 18.3593 10.0746 18.3159C10.4868 18.2725 10.7875 17.8856 10.7463 17.4518L10.2463 12.1886ZM14.5746 11.4816C14.9868 11.525 15.2875 11.9119 15.2463 12.3457L14.7463 17.6089C14.7051 18.0427 14.3375 18.3593 13.9254 18.3159C13.5132 18.2725 13.2125 17.8856 13.2537 17.4518L13.7537 12.1886C13.7949 11.7548 14.1625 11.4382 14.5746 11.4816Z"
                  fill="#FFFFFF"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      {/* SEARCH BAR */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Modal form={form} setForm={setForm} titles={titles} id={"Add"} />

      {/* PRODUCT CARD */}
      {loading && <h1>Loading...</h1>}
      {productsData == [] && <h1 className="font-bold">DATA TIDAK ADA</h1>}

      <div className="flex flex-wrap gap-6 justify-center">
        {productsMapData}
      </div>

      {/* PAGINATION */}
      <PaginationComponent
        productsData={productsData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
