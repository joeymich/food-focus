import { Navbar } from "./ui/Navbar";
import { CircularProgressBar } from "./ui/circular-pogress-bar";

export const Dashboard = () => {
  return (
    <>
      <Navbar />

      <div  className="bg-background h-screen w-screen flex justify-center items-center"> 
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-defaultText text-center">Today's Total Calories</h1>

          <div> Circular Progrss Bar </div>
          <CircularProgressBar calories="1000" totalCalories="2500"/>
        </div>

      </div>
          
    </>
  );
};
