import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import MainContainer from "./components/MainContainer";
import axios from "axios";
import { AppContext } from "./AppContext";

// Hard coded settings
const USER_ID = "2";
const SLIDE_ID = "1";
const BE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3001"
    : window.location.origin;

function App() {
  const [selected, setSelected] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data: resp } = await axios.get(
        `${BE_URL}/slides/user/${USER_ID}`
      );
      if (resp && resp.length > 0) {
        const decodedData = resp[0].data.map((elm) => decodeURIComponent(elm));
        setData(decodedData);
      }
    } catch (e) {
      console.error("Could not fetch data");
    }
  };

  const saveData = async () => {
    try {
      const encodedData = data.map((elm) => encodeURIComponent(elm));
      axios.post(`${BE_URL}/slides`, {
        userId: USER_ID,
        slideId: SLIDE_ID,
        data: encodedData,
      });
    } catch (e) {
      console.error("Could not save data");
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  useEffect(() => {
    if (!isEdit && data && data.length > 0) saveData();
  }, [isEdit]);

  return (
    <AppContext.Provider
      value={{ selected, setSelected, isEdit, setIsEdit, data, setData }}
    >
      <>
        <NavBar />
        <MainContainer />
      </>
    </AppContext.Provider>
  );
}

export default App;
