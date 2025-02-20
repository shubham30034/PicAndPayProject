import React from 'react';
import Sidebar from '../component/Sidebar';
import MainSection from '../component/MainSection';

const Home = () => {
  return (
    <div className="min-h-screen flex sm:px-0 md:px-4  gap-x-4">
      {/* Sidebar */}
      <aside className="flex-shrink-0 p-0 sm:p-0 md:p-4 shadow-lg  mt-0">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-0 sm:p-0 md:p-3 overflow-hidden">
        <MainSection/>
      </main>
    </div>
  );
};

export default Home;
