import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";

const Content = (props = {}) => {
  const { isEdit, selected, data, setData } = useContext(AppContext);
  const handleInputChange = (e) => {
    const html = e.target.value;
    const updatedData = data.map((elm, idx) => (idx === selected ? html : elm));
    setData(updatedData);
  };

  if (isEdit) {
    return (
      <div className="content">
        <div className="textarea-container">
          <textarea
            className="expandable-textarea"
            value={data[selected]}
            onChange={handleInputChange}
            placeholder="Please add your markup"
          />
        </div>
        <div className="preview-container">
          <div
            className="preview"
            dangerouslySetInnerHTML={{ __html: data[selected] }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ flexGrow: "1", padding: "30px" }}
      dangerouslySetInnerHTML={{ __html: data[selected] }}
    ></div>
  );
};

export default Content;
