import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, updateProduct } from "../store/actions/actionProduct";
import { productUrl } from "../store/baseUrl/url";
import { v4 } from "uuid";
import { imageDb } from "../../firebaseConfig";
import { getDownloadURL, listAll, uploadBytes, ref } from "firebase/storage";

export default function Form(props) {
  const { form, setForm, titles, setModelOpen, id } = props;
  const [validationImage, setValidationImage] = useState("");
  const [validationName, setValidationName] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (id !== "Add") {

      async function productById(id) {
        try {
          const response = await fetch(productUrl + `/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const jsonProduct = await response.json();
          setForm({
            title: jsonProduct.title,
            description: jsonProduct.description,
            sellPrice: jsonProduct.sellPrice,
            buyPrice: jsonProduct.buyPrice,
            thumbnail: jsonProduct.thumbnail,
            stock: jsonProduct.stock,
          });
        } catch (error) {
          console.log(error);
        }
      }
      productById(id);
    }
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "thumbnail") {
      const file = files[0];
      setImage(file)
      const allowedFormats = ["image/jpeg", "image/png"];
      const maxSizeKB = 100;

      if (!allowedFormats.includes(file.type) || file.size > maxSizeKB * 1024) {
        setValidationImage("Format atau ukuran gambar salah");
        return;
      }

      const imgRef = ref(imageDb, `files/${v4()}`)
      uploadBytes(imgRef, image)

      listAll(ref(imageDb, "files")).then(imgs => {
        imgs.items.forEach(val => {
          getDownloadURL(val).then(url => {
            console.log(url)
            setForm((form) => ({
              ...form,
              thumbnail: url,
            }));
          })
        })
      })

      setValidationImage("");
      
    } else if (name === "title") {
      if (titles.includes(value)) {
        setValidationName("Nama harus unik");
        return;
      }
      setValidationName("");
    }
    setForm((form) => ({
      ...form,
      [name]: value,
    }));

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id === "Add") {
      dispatch(createProduct(form));
      setModelOpen(false);
    } else if (id !== "Add") {
      dispatch(updateProduct(form, id));
      setModelOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="title"
          id="title_product"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
          placeholder=" "
          defaultValue={form.title}
          onChange={handleInputChange}
          required
        />
        <label
          for="title_product"
          className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Nama Produk
        </label>
        <p className="text-xs text-red-700">{validationName}</p>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="description"
          id="description_product"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
          placeholder=" "
          defaultValue={form.description}
          onChange={handleInputChange}
          required
        />
        <label
          for="description_product"
          className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Deskripsi Produk
        </label>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="number"
            name="sellPrice"
            id="sellPrice"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
            placeholder=" "
            defaultValue={form.sellPrice}
            onChange={handleInputChange}
            required
          />
          <label
            for="harga_jual"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Harga Jual
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="number"
            name="buyPrice"
            id="buyPrice"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
            placeholder=" "
            defaultValue={form.buyPrice}
            onChange={handleInputChange}
            required
          />
          <label
            for="buyPrice"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Harga Beli
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        {id === "Add" && (
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="file"
              name="thumbnail"
              id="image"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
              placeholder=" "
              defaultValue={form.thumbnail}
              onChange={handleInputChange}
              required
            />
            <label
              for="image"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Foto Produk
            </label>
            <p className="text-xs text-red-700">{validationImage}</p>
          </div>
        )}

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="number"
            name="stock"
            id="stok"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
            placeholder=" "
            defaultValue={form.stock}
            onChange={handleInputChange}
            required
          />
          <label
            for="stok"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Stok Barang
          </label>
        </div>
      </div>
      {validationImage == "" && validationName == "" && (
        <button
          type="submit"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Submit
        </button>
      )}
    </form>
  );
}
