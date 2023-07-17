import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import {  fetchProductsId } from "../store/actions/actionProduct"

export default function DetailProduct () {
    const {id} = useParams()
    const dispatch = useDispatch()

    const product = useSelector((state) => state.products.product)
    
    // console.log(">>>",product)

    useEffect(() => {
        dispatch(fetchProductsId(id))
    },[id])

    // convert to rupiah
    const rupiah = (strNum)=>{
      let number = +strNum
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR"
        }).format(number);
      }

    return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
    <div className="mx-auto max-w-screen-lg px-4 md:px-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg bg-gray-100">
            <img src={product.thumbnail} loading="lazy" alt="Photo by Himanshu Dewangan" className="h-full w-full object-cover object-center" />
          </div>
  
        </div>
  
        <div className="md:py-8">

          <div className="mb-2 md:mb-3">
            <h2 className="text-2xl font-bold text-gray-800 uppercase lg:text-3xl">{product.title}</h2>
          </div>

          <div className="mb-4 mt-4">
            <div className="flex items-end gap-2">
              <span className="text-lg font-bold text-gray-800 md:text-2xl">Harga Beli: {rupiah(product.buyPrice)}</span>
              <span className="text-lg font-bold text-gray-800 md:text-2xl">Harga Jual: {rupiah(product.sellPrice)}</span>
            </div>
            </div>

          <div className="mb-6 flex items-center gap-2 text-black">
            <h1 className="my-4 text-base">Stok Barang : {product.stock}</h1>
          </div>

          <div className="md:mt-8 lg:mt-12">
            <div className="mb-3 text-lg font-semibold text-gray-800">Deskripsi Produk</div>
  
            <p className="text-gray-700 text-base mb-10">
              {product.description}
            </p>
            <NavLink to={"/"} className="bg-red-700 px-2 py-3 text-white font-semibold rounded-lg mt-10 hover:bg-red-800 hover:cursor-pointer">
                Kembali
            </NavLink>
          </div>

        <div>
        </div>
        </div>
      </div>
    </div>
  </div>)
}