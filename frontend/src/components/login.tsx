import { Navbar } from "./ui/Navbar";
import { Button } from "./ui/button";

export const Login = () => {
  return (
    <>
      <Navbar />
      <div className="bg-background h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col items-center space-y-4 p-8 bg-white shadow-md rounded-lg max-w-sm w-full">
          <h1 className="text-defaultText font-bold text-4xl">Login</h1>

          <form className="flex flex-col space-y-4 w-full">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-defaultText focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-defaultText focus:outline-none focus:ring-2 focus:ring-primary"
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
