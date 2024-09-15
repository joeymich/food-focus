import { Navbar } from "./ui/Navbar";
import { Button } from "./ui/button";

export const Login = () => {
  return (
    <>
      <Navbar />
      <div className="bg-background h-screen w-screen flex justify-center items-center">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-defaultText text-center">Login</h1>

          <form className="flex flex-col space-y-4 w-full">
            <label className="block text-defaultText font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <label className="block text-defaultText font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <Button className="w-full bg-secondary text-defaultText py-2 font-bold text-lg rounded-lg">
              Login
            </Button>
          </form>

          <p className="text-defaultText text-sm mt-4">
            Don't have an account? <a href="/register" className="text-primary hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </>
  );
};
