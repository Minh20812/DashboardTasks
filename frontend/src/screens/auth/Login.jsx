import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/feature/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 dark:bg-slate-900">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white dark:bg-slate-950 shadow-lg rounded-lg px-6 py-8 sm:px-10">
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img
                className="h-8 w-8 rounded-xl object-cover"
                src="https://i.imgur.com/NOhGpvI.jpeg"
                alt="Your Brand"
              />
              <h1 className="text-lg font-semibold dark:text-white">MINOVA</h1>
            </div>
            <h2 className="text-2xl font-bold text-center dark:text-white">
              Sign in to your account
            </h2>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="example@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md 
                  text-sm 
                  dark:bg-slate-950 
                  dark:text-white 
                  dark:border-slate-600 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-orange-500 
                  transition-all 
                  duration-200"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-orange-500 hover:text-orange-600 dark:text-orange-400"
                >
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md 
                  text-sm 
                  dark:bg-slate-950 
                  dark:text-white 
                  dark:border-slate-600 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-orange-500 
                  transition-all 
                  duration-200"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 
                  border border-transparent 
                  rounded-md 
                  text-sm font-semibold 
                  text-white 
                  bg-orange-500 
                  hover:bg-orange-600 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-offset-2 
                  focus:ring-orange-500 
                  transition-all 
                  duration-200 
                  disabled:opacity-50 
                  disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>

          {isLoading && <Loader />}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              First Time Here?{" "}
              <Link
                to={redirect || "/register"}
                className="font-semibold text-orange-500 hover:text-orange-600"
              >
                Register Today!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
