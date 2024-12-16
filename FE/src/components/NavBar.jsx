import { useContext, useEffect } from "react";
import { AppContext } from "../AppContext";

let cachedData;

const NavBar = () => {
  const { isEdit, setIsEdit, data, setData, selected, setSelected } =
    useContext(AppContext);

  const handleAddSlide = (e) => {
    e.preventDefault();

    if (isEdit) {
      return;
    }

    const newData = [...data, ""];
    setSelected(newData.length - 1);
    setData(newData);
    setIsEdit(true);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEdit(!isEdit);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (data && data.length === 1) {
      setData([""]);
      return;
    }
    const newData = data.filter((itm, idx) => idx != selected);
    setSelected(selected == 0 ? 0 : selected - 1);
    setData(newData);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setData(cachedData);
    setIsEdit(false);
  };

  const handleForward = (e) => {
    e.preventDefault();
    if (isEdit || selected == data.length - 1) {
      return;
    }
    setSelected(selected + 1);
  };

  const handleBackward = (e) => {
    e.preventDefault();
    if (isEdit || selected == 0) {
      return;
    }
    setSelected(selected - 1);
  };

  useEffect(() => {
    cachedData = [...data];
  }, [isEdit]);

  return (
    <div className="navbar">
      <ul className="right">
        <li>
          <a href="#" onClick={handleAddSlide} className="button">
            Add slide
          </a>
        </li>
        <li>
          <a href="#" className="button" onClick={handleEdit}>
            {isEdit ? "Save" : "Edit"}
          </a>
        </li>
        {isEdit && (
          <li>
            <a href="#" className="button" onClick={handleCancel}>
              Cancel
            </a>
          </li>
        )}
        {isEdit && (
          <li>
            <a href="#" className="button" onClick={handleDelete}>
              Delete
            </a>
          </li>
        )}
      </ul>
      <ul className="left">
        <li>
          <a href="#" onClick={handleBackward} className="button icon">
            <span className="material-symbols-outlined">arrow_back</span>
          </a>
        </li>
        <li>
          <a href="#" onClick={handleForward} className="button icon">
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
