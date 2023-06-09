import React from "react";
import Graph from "./Graph";
import Graph2 from "./Graph2";
import TreatsInfo from "./TreatsInfo";
import Treats from "./Treats";
import UserPage from "./UserPage";
import Navbar from "./Navbar"

const MainPage = () => {
  return (
    <React.Fragment>
      <section>
        <div className="layout text-2xl text-black" >
          {/* <div className="content1 centered">
            <Navbar/>
          </div> */}
          <div className="content2 centered">
          <Graph2/>
          </div>
          <div className="content3 centered">
          <Graph/>
          </div>

          <div className="content4 centered">
          <Graph2/>
          </div>
          <div className="content5 centered">
          <UserPage/>
          </div>
          <div className="content6 centered">
          <Treats/>
          </div>
          <div className="content8 centered">
          <TreatsInfo/>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default MainPage;
