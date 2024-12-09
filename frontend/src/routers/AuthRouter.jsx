import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, SignUp } from "../screens";

const AuthRouter = () => {
  return (
    <>
      <div className="flex min-h-screen dark:bg-slate-900">
        <div className="w-full flex items-center justify-center">
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<SignUp />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
};

export default AuthRouter;
