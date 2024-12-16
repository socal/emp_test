import Content from "./Conent";
import SideBar from "./SideBar";

const MainContainer = () => {
  return (
    <div className="main-container">
      <SideBar />
      <Content />
    </div>
  );
};

export default MainContainer;
