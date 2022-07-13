import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import BASE_URL from "../API/BASE_URL";
import Paginate from "../Components/Paginate";
import Breadcrumbs from "../Components/Breadcrumbs";
import { useHistory, Redirect } from "react-router-dom";
import constant from "../Constants/EnglishScreens.json";
import SimpleForm from "../Components/SimpleForm";
import PaginateForm from "../Components/PaginateForm";
import {
  PageSection,
  PageSectionVariants,
  Bullseye,
  Spinner,
} from "@patternfly/react-core";

export default function Versions(props) {
  const [elementsRight] = useState([]);
  const [elementsLeft] = useState([]);
  const [elements] = useState([]);
  const [offset] = useState(0);
  const [currentPage] = useState(0);
  const [page] = useState(1);
  const [perPage] = useState(10);
  const [productsVersion, setProductsVersion] = useState([]);
  const [locales, setLocales] = useState([]);
  const [selectProductsVersion, setSelectProductsVersion] = useState("");
  const [selectLocales, setSelectLocales] = useState("");
  const [screenshotsOther, setScreenshotsOther] = useState([]);
  const [screenshotsEN, setScreenshotsEN] = useState([]);
  const [itemCount, setItemCount] = useState();
  const [previousProductId] = useState(props.match.params.productid);
  const [versionId, setVersionId] = useState(props.match.params.versionId);
  const [localeId, setLocaleId] = useState(props.match.params.localeId);
  // const [imageId] = useState(props.match.params.localeId);

  const [bugzillaProductName, setBugzillaProductName] = useState("");
  // const [previousProductsVersion,setPreviousProductsVersion] = useState("");
  // const [previousLocales,setPreviousLocales] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [filteredLocales, setFilteredLocales] = useState([]);

  let history = useHistory();

  function handleDropdownChangeVersion(e) {
    // setVersionId(null);
    // setLocaleId(null);
    resetIds();
    setSelectProductsVersion(e);
    fetchfilteredVersionData(e);
  }

  function handleDropdownChangeLocale(e) {
    // setVersionId(null);
    setLocaleId(e);
    // window.location.replace("/products/"+previousProductId+"/screenshots/");
    setSelectLocales(e);
    // resetIds();
  }

  const resetIds = useCallback(() => {
    setIsLoading(true);
    setVersionId(null);
    setLocaleId(null);
    setIsLoading(false);
  }, []);

  // const resetIds = ()  =>{
  //   setIsLoading(true);
  //   setVersionId(null);
  //   setLocaleId(null);
  //   setIsLoading(false);
  // }

  // React.useEffect(() => {
  //   const previousLocalesS = (localStorage.getItem("previousLocalesS") || "")
  //   setPreviousLocales(previousLocalesS)

  //   const previousProductsVersionS = (localStorage.getItem("previousProductsVersionS") || "")
  //   setPreviousProductsVersion(previousProductsVersionS)
  // }, [])

  //To get Versions and Locales of selected Product
  useEffect(() => {
    const fetchProductsVersionData = async () => {
      const productsVersionData = await axios(
        `${BASE_URL}/products/${previousProductId}/product_versions`
      ).catch((e) => {
        console.error(e);
      });

      const LocalesData = await axios(`${BASE_URL}/locales`).catch((e) => {
        console.error(e);
      });

      // console.log(previousLocales,previousProductsVersion)

      // localStorage.setItem("previousLocalesS", previousLocales)
      // localStorage.setItem("previousProductsVersionS", previousProductsVersion)

      //Return to Products if no version for selected Product is available
      if (productsVersionData.data.length !== 0) {
        setProductsVersion(productsVersionData.data);
        setLocales(LocalesData.data);
      } else {
        alert(
          " No Versions available for selected Product. Please select other Product"
        );
        history.push({
          pathname: "/",
        });
      }

      if (versionId && localeId) {
        fetchfilteredVersionData(versionId);

        const screenshotsData = await axios(`${BASE_URL}/screenshots`, {
          params: {
            product_version_id: versionId,
            locale_id: localeId,
          },
        });
        const screenshotsENData = await axios(`${BASE_URL}/screenshots`, {
          params: {
            product_version_id: versionId,
            locale_id: constant.englishLocaleId,
          },
        });

        if (!screenshotsENData.data.length) {
          alert("The selected Version have no English Screenshots");
        } else {
          setSelectLocales(localeId);
          // setSelectProductsVersion(versionId);
          // setBugzillaProductName(bugzillaProductName.data);
          setScreenshotsOther(screenshotsData.data);
          setScreenshotsEN(screenshotsENData.data);
          setItemCount(screenshotsENData.data[0].images.length);
        }
      }
      // else if ()

      // if (previousProductsVersion !== "" && previousLocales !== "") {
      //   const screenshotsData = await axios(`${BASE_URL}/screenshots`, {
      //     params: {
      //       product_version_id: previousProductsVersion,
      //       locale_id: previousLocales,
      //     },
      //   });
      //   const screenshotsENData = await axios(`${BASE_URL}/screenshots`, {
      //     params: {
      //       product_version_id: previousProductsVersion,
      //       locale_id: constant.englishLocaleId,
      //     },
      //   });

      //   if (!screenshotsENData.data.length) {
      //     alert("The selected Version have no English Screenshots");
      //   } else {
      //     setScreenshotsOther(screenshotsData.data);
      //     setScreenshotsEN(screenshotsENData.data);
      //     setItemCount(screenshotsENData.data[0].images.length);
      //   }
      // }
    };
    fetchProductsVersionData();
  }, [previousProductId, history, selectProductsVersion, selectLocales]);

  const fetchfilteredVersionData = async (e) => {
    setIsLoading(true);
    let localeArr = [];
    for (var x = 0; x < locales.length; x++) {
      let lid = locales[x].id;
      try {
        const screenshotsData = await axios(`${BASE_URL}/screenshots`, {
          params: {
            product_version_id: e,
            locale_id: lid,
          },
        });
        // .then( () => {
        if (screenshotsData.status === 200) {
          console.log("screenshotsData: ", screenshotsData);
          localeArr.push(locales[lid - 1]);
          // setFilteredLocales([...filteredLocales, locales[lid]]);
        }
        // })
      } catch (e) {
        console.error(e);
      }
    }
    setFilteredLocales(localeArr);
    setIsLoading(false);
  };

  // To get selected Version and Locale to get screenshots
  const onFormSubmit = async (event) => {
    event.preventDefault();

    // window.location.replace("/products/"+previousProductId+"/screenshots/"+selectProductsVersion+"/"+selectLocales)

    const bugzillaProductName = await axios(
      `${BASE_URL}/bugzilla_product_names`,
      {
        params: {
          id: selectProductsVersion,
        },
      }
    );

    const bugzillaProductNames = await axios(
      `${BASE_URL}/bugzilla_product_names`
    );
    console.log(bugzillaProductNames);

    try {
      const screenshotsData = await axios(`${BASE_URL}/screenshots`, {
        params: {
          product_version_id: selectProductsVersion,
          locale_id: selectLocales,
        },
      });
      const screenshotsENData = await axios(`${BASE_URL}/screenshots`, {
        params: {
          product_version_id: selectProductsVersion,
          locale_id: constant.englishLocaleId,
        },
      });

      // setPreviousProductsVersion(selectProductsVersion);
      // setPreviousLocales(selectLocales);

      // console.log(selectLocales,selectProductsVersion,previousLocales.previousProductsVersion)

      if (!screenshotsENData.data.length) {
        alert("The selected Version have no English Screenshots");
      } else {
        setBugzillaProductName(bugzillaProductName.data);
        setScreenshotsOther(screenshotsData.data);
        setScreenshotsEN(screenshotsENData.data);
        setItemCount(screenshotsENData.data[0].images.length);
      }
    } catch (err) {
      return err;
    }
  };

  const tokenString = localStorage.getItem("token");

  if (!tokenString) {
    return <Redirect to="/login" />;
  }

  return (
    <>
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

      <PageSection variant={PageSectionVariants.light}>
        <Breadcrumbs />
        {filteredLocales &&
          productsVersion &&
          ((screenshotsOther && screenshotsOther.length !== 0) ||
            (screenshotsEN && screenshotsEN.length !== 0)) && (
            <PaginateForm
              selectProductsVersion={
                selectProductsVersion ? selectProductsVersion : versionId
              }
              selectLocales={selectLocales ? selectLocales : localeId}
              productsVersion={productsVersion}
              locales={filteredLocales}
              handleVersionChange={(e, event) =>
                handleDropdownChangeVersion(e, event)
              }
              handleLocaleChange={(e, event) =>
                handleDropdownChangeLocale(e, event)
              }
              handleSubmit={onFormSubmit}
            />
          )}
      </PageSection>
      <PageSection>
        {(screenshotsOther && screenshotsOther.length !== 0) ||
        (screenshotsEN && screenshotsEN.length !== 0) ? (
          <Paginate
            bugzillaProductName={bugzillaProductName}
            screenshotsOther={screenshotsOther}
            screenshotsEN={screenshotsEN}
            itemCount={itemCount}
            selectProductsVersion={
              versionId ? versionId : selectProductsVersion
            }
            selectLocales={localeId ? localeId : selectLocales}
            elements={elements}
            elementsRight={elementsRight}
            elementsLeft={elementsLeft}
            offset={offset}
            currentPage={currentPage}
            page={page}
            perPage={perPage}
            // imageId={imageId}
          />
        ) : (
          filteredLocales &&
          productsVersion && (
            <SimpleForm
              productsVersion={productsVersion}
              locales={filteredLocales}
              handleVersionChange={(e, event) =>
                handleDropdownChangeVersion(e, event)
              }
              handleLocaleChange={(e, event) =>
                handleDropdownChangeLocale(e, event)
              }
              handleSubmit={onFormSubmit}
            />
          )
        )}
      </PageSection>
    </>
  );
}
