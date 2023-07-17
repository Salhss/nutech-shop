import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchCategory} from "../store/actions/actionCategory"
import CategoriesSkeleton from "./CategoriesSkeleton";

export default function CategoriesComponent() {
    const dispatch = useDispatch()

    const categories = useSelector((state) => state.categories.categories)
    const loading = useSelector((state) => state.categories.loading)
    const error = useSelector((state) => state.categories.error)

    useState(() => {
        dispatch(fetchCategory())
    },[])

    let categoriesData = categories?.map((category) => {
      return (
        <div key={category._id} className="border-2 w-36 rounded-xl flex justify-center text-center cursor-pointer text-black hover:bg-red-600 hover:text-white py-1">
          <h1 className="capitalize">{category.name}</h1>
        </div>
      );
    });
    

  return (
    <>
    {loading && <CategoriesSkeleton cards={20}/>}
    <div className="flex flex-wrap gap-3">
      {categoriesData}
    </div>
    </>
  );
}
