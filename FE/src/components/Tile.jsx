import { useContext } from "react";
import { AppContext } from "../AppContext";

const Tile = (props) => {
  const { html, idx } = props;
  const { selected, setSelected, isEdit } = useContext(AppContext);

  const handleOnClick = (e) => {
    if (!isEdit) setSelected(idx);
  };

  return (
    <div
      className={`tile ${selected == idx ? "selected" : ""}`}
      onClick={handleOnClick}
    >
      <div dangerouslySetInnerHTML={{ __html: decodeURIComponent(html) }}></div>
    </div>
  );
};

export default Tile;
