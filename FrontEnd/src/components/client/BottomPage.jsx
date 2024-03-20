import React from "react";

const BottomPage = () => {
  return (
    <footer className="flex w-[100vw] bg-slate-200 bg-opacity-40 p-4 text-center">
      <div className="mx-auto max-w-4xl w-full">
        <h2 className="mb-2 font-mono text-3xl text-black">Contact Us</h2>
        <p className="text-justify font-mono text-lg text-black">
          We're always eager to hear from you! If you have any questions, comments, or feedback, please don't hesitate to reach out to us. Here's how you can connect with us:
        </p>
        <div className="flex flex-col sm:flex-row justify-around items-center mt-2">
          <p className="font-mono text-lg text-black">Email: contact@example.com</p>
          <p className="font-mono text-lg text-black">Phone: (123) 456-7890</p>
          <p className="font-mono text-lg text-black">Address: 1234 Street, City, Country</p>
        </div>
      </div>
    </footer>
  );
};

export default BottomPage;
