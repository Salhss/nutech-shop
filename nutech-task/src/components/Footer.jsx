export default function Footer() {
  return (
    <>
      <footer className="border-t-2 py-8 mt-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-4">Nutech Shop</h2>
              <p className="text-gray-400">
                A mini-web for technical test purpose
              </p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">Email: salwa21salsabila@gmail.com</p>
              <p className="text-gray-400">Phone Number: +62 858 245 582 51</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-4">Notes for judges :</h3>
              <p className="text-gray-400">1. Karena keterbatasan waktu, upload image hanya berupa validasi jika format atau ukuran yang salah</p>
              <p className="text-gray-400">2. Impelementasi jsonwebtoken menggunakan jose</p>
            </div>
            
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Nutech Shop - 2023
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
