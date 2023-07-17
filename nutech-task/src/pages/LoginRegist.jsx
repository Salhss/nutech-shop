import { useState } from "react";
import { generateToken } from "../../helper";
import { useNavigate } from "react-router-dom";

export default function LoginRegist() {
  const [form, setForm] = useState({
    username: "",
  });
  const navigate = useNavigate()

  const handleInput = async (event) => {
    event.preventDefault();
    const token = await generateToken(form)

    localStorage.setItem("access_token", token)
    navigate("/")
  };

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <h2 className="mb-4 text-center text-2xl font-bold text-red-800 md:mb-8 lg:text-3xl">
          Log In
        </h2>

        <form
          className="mx-auto max-w-lg rounded-lg border"
          onSubmit={handleInput}
        >
          <div className="flex flex-col gap-4 p-4 md:p-8">
            <div>
              <label
                for="username"
                className="mb-2 inline-block text-sm text-red-800 sm:text-base"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                className="w-full rounded border bg-red-50 px-3 py-2 text-red-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                defaultValue={form.username}
                onChange={(event) => {event.preventDefault(), setForm({ ...form, username: event.target.value })}}
              />
            </div>

            <button
              type="submit"
              className="block rounded-lg bg-red-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-red-300 transition duration-100 hover:bg-red-700 focus-visible:ring active:bg-red-600 md:text-base"
            >
              Masuk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
