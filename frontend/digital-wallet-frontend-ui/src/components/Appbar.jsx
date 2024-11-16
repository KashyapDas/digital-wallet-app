import React from "react";

function Appbar({userName}) {
  // console.log("Username : "+userName)
  return (
    <div className="w-full h-fit flex justify-between bg-white p-2 border-b-2 border-solid border-black">
      <h1 className="text-xl font-medium">PayTM App</h1>
      <span className="flex items-center gap-x-2 font-medium text-md">
        Hello
        <h1 className="text-md font-medium rounded-full p-1 h-10 w-10 flex items-center justify-center bg-lime-300 uppercase">
          {userName}
        </h1>
      </span>
    </div>
  );
}

export default Appbar;
