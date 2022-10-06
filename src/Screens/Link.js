import React, { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";
import { AngleRightIcon, AngleLeftIcon } from "@patternfly/react-icons";
import { Bullseye, Spinner } from "@patternfly/react-core";
import axios from "axios";
import BASE_URL from "../API/BASE_URL";

function Link(props) {
  const [nextImg, setNextImg] = useState(true);
  const [compareImagesData, setCompareImagesData] = useState();
  const [english, setEnglish] = useState();
  const [other, setOther] = useState();
  const [isLoading, setIsLoading] = useState(false);

  let { version_id, locale_id, compare_id } = useParams();

  React.useEffect(() => {
    const getImages = async () => {
      setIsLoading(true);

      try {

      const imageCompare = await axios(`${BASE_URL}/screenshots`, {
        params: {
          product_version_id: version_id,
          locale_id: locale_id,
          compare_id: compare_id,
        },
        headers: { "Content-Type": "image/png" },
      });

      if (imageCompare.data.length !== 0) {
        setCompareImagesData(imageCompare.data);
        setEnglish(imageCompare.data.english_image);
        setOther(imageCompare.data.other_image);
      }
      else{
        alert("Fail")
      }

      console.log(imageCompare.data.english_image);

      setIsLoading(false);
      handleImageSwitch()
    }
    catch (err){
        return(err)
    }
    };

    getImages();
  }, []);

  const handleImageSwitch = () => {
    setIsLoading(true)
    setNextImg(!nextImg);
    setIsLoading(false)
  };


  const tokenString = localStorage.getItem('token');


  if(!tokenString)
  {
    return (<Redirect to="/login"/>)
  }

  return (
    <div>
      
      <div className="zoomed_image_navigation">
        <button
          style={{
            opacity: nextImg ? 1 : 0.5,
          }}
          disabled={!nextImg}
          onClick={handleImageSwitch}
        >
          <AngleLeftIcon color="white" width={20} height={"auto"} />
        </button>

        <p>{nextImg ? 2 : 1} / 2</p>

        <button
          style={{
            opacity: !nextImg ? 1 : 0.5,
          }}
          disabled={nextImg}
          onClick={handleImageSwitch}
        >
          <AngleRightIcon color="white" width={20} height={"auto"} />
        </button>
      </div>

      <div className="zoomed_image_container">
      {isLoading ? (
        <div
          style={{
            position: "fixed",
            zIndex: 10000,
            top: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            opacity: "0.5",
            backdropFilter: "blur(2px)",
          }}
        >
          <Bullseye>
            <Spinner></Spinner>
          </Bullseye>
        </div>
      ) : null}
        {!nextImg ? (
          <img
            src={english}
            alt="1st"
            // key={zoomImgIndex}
          />
        ) : (
          <img
            src={other}
            alt="2nd"
            // onLoad={setIsLoading(true)}
            // key={zoomImgIndex}
          />
        )}
      </div>
    </div>
  );
}

export default Link;
