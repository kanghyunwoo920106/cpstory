import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { GetPhotoData } from "../components/GetPhotoData";

export default function DateList() {
  const [value, setValue] = useState("0");
  const { datas } = useSelector((state) => state);
  const dispatch = useDispatch();

  // 중복된 날짜를 찾아서 묶음으로 만듦
  const groups = datas.reduce((acc, data) => {
    const date = data.date.split("T")[0];
    const group = acc.find((group) => group.date === date);
    if (group) {
      group.items.push(data);
    } else {
      acc.push({
        date,
        items: [data],
      });
    }
    return acc;
  }, []);

  useEffect(() => {
    const getPhotoData = async () => {
      await GetPhotoData(dispatch);
    };

    getPhotoData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const useStyles = makeStyles(() => ({
    root: {
      position: "relative",
    },
    img: {
      display: "block",
      maxWidth: "100%",
      width: "auto",
      borderRadius: "10px",
    },
    nav: {
      position: "absolute",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "#fff",
      opacity: 0.6,
      marginRight: 8,
      cursor: "pointer",
      transition: "opacity 0.2s",
      "&.active": {
        opacity: 1,
      },
    },
    box: {
      position: "absolute",
      bottom: "0%",
      width: "100%",
      backgroundColor: "rgba(0,0,0,0.7)",
      padding: "16px 0",
      textAlign: "center",
    },
    center: {
      textAlign: "center",
    },
  }));

  const classes = useStyles();
  return (
    <Box
      sx={
        datas.length == 0
          ? { width: "auto" }
          : { width: "100%", typography: "body1" }
      }
      className={datas.length == 0 ? "nodata" : ""}
    >
      {datas.length != 0 ? (
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable"
            >
              {groups.map((group, index) => {
                return (
                  <Tab label={group.date} value={`${index}`} key={index} />
                );
              })}
            </Tabs>
          </Box>
          {groups.map((group, index) => {
            {
              return group.items.map((data, dataIndex) => (
                <TabPanel
                  value={`${index}`}
                  key={dataIndex}
                  className={classes.root}
                  sx={{ padding: "0", margin: "15px 0" }}
                >
                  <img
                    className={`${classes.img} d-block w-100`}
                    src={require(`../../public/upload/${data.image}`)}
                    // src={`http://3.34.46.36:8000/upload/${data.image}`}
                    alt="First slide"
                  />

                  <div key={data.idx} className={classes.box}>
                    <h3>{data.title}</h3>
                    <p>{data.description}</p>
                    <span className="date">
                      {data.date.split("T")[0]} / {data.address}
                    </span>
                  </div>
                </TabPanel>
              ));
            }
          })}
        </TabContext>
      ) : (
        <div>추억을 등록해주세요</div>
      )}
    </Box>
  );
}
