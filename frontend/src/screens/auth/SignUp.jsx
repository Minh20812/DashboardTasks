import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/feature/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await register({ username, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("User successfully registered");
    } catch (err) {
      console.error(err);
      toast.error(err.data?.message || "Registration failed");
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
              Register
            </h2>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter name"
                value={username}
                onChange={(e) => setName(e.target.value)}
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
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter email"
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
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
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
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
                {isLoading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

          {isLoading && <Loader />}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-orange-500 hover:text-orange-600"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
