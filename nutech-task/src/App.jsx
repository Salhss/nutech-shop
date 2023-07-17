import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./store/index";
import router from "./routes/route";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  return (
    <>
    <SkeletonTheme baseColor="#820000" highlightColor="#444">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </SkeletonTheme>
    </>
  );
}

export default App;
