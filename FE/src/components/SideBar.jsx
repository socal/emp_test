import { useContext } from "react";
import Tile from "./Tile";
import { AppContext } from "../AppContext";

const SideBar = () => {
  const { data } = useContext(AppContext);

  return (
    <div className="sidebar">
      {data.map((val, idx) => (
        <Tile key={idx} html={val} idx={idx} />
      ))}
    </div>
  );
};

export default SideBar;
