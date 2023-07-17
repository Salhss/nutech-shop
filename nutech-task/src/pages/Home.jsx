import CategoriesComponent from "../components/Categories";
import ProductComponent from "../components/ProductComponent";

export default function Home() {
  return (
    <>
      {/* HEADER */}
      <div className="bg-gray-50 flex items-center">
        <section
          className="w-full bg-cover bg-center py-32 h-96"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/premium-photo/man-holding-small-shopping-cart-trolley-red-online-shopping-fast-delivery-concept_224798-739.jpg')",
          }}
        >
          <div className=" text-white max-w-2xl ml-10">
            <h1
              className="text-5xl font-medium mb-6"
              style={{
                textShadow: "1px 1px 2px rgba(0, 0, 0, 1)",
                fontFamily: "'Poppins', 'sans-serif'",
              }}
            >
              Welcome to Nutech Shop
            </h1>
            <p
              className="text-xl mb-12"
              style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 1)" }}
            >
              Selamat datang di Nutech Shop! Temukan produk berkualitas dan
              nikmati pengalaman belanja yang praktis dan aman. Selamat
              berbelanja!
            </p>
          </div>
        </section>
      </div>

      <div className="mx-10 ">

        {/* CATEGORIES */}
        <div className="border-b-2 pb-10">
          <div className="mt-10">
            <h1
              className="font-bold tracking-wide text-xl"
              style={{ fontFamily: "'Poppins', 'sans-serif'" }}
            >
              Kategori Pilihan
            </h1>
          </div>
          <div className="mt-4">
            <CategoriesComponent />
          </div>
        </div>

        {/* PRODUCT */}
        <div className="mt-10">
          <h1
            className="font-bold tracking-wide text-xl"
            style={{ fontFamily: "'Poppins', 'sans-serif'" }}
          >
            Produk Pilihan
          </h1>
        </div>
        <div className="mt-4">
          <ProductComponent />
        </div>

      </div>
    </>
  );
}
