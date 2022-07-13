import React, { useCallback, useState } from "react";
import { Split, SplitItem, Alert } from "@patternfly/react-core";
import {
  Pagination,
  Modal,
  ModalVariant,
  Bullseye,
  Spinner,
  Button,
} from "@patternfly/react-core";
import SimpleEmptyState from "./SimpleEmptyState";
import PropTypes from "prop-types";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import axios from "axios";
import BASE_URL from "../API/BASE_URL";
import {
  AngleRightIcon,
  AngleLeftIcon,
  InfoCircleIcon,
} from "@patternfly/react-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
function Paginate(props) {
  const [screenshotsOther, setScreenshotsOther] = useState([]);
  const [screenshotsEN, setScreenshotsEN] = useState([]);
  const [itemCount, setItemCount] = useState();
  const [elementsRight, setElementRight] = useState([]);
  const [elementsLeft, setElementLeft] = useState([]);
  const [offset, setOffset] = useState();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isZoomed, setIsZoomed] = useState(false);
  const [nextImg, setNextImg] = useState(false);
  const [zoomImgIndex, setZoomImgIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageColumn, setImageColumn] = useState(0);
  const [bugzillaProductName, setBugzillaProductName] = useState("");
  const [copyAlert, setCopyAlert] = useState(false);
  const [selectProductsVersion, setSelectProductsVersion] = useState("");
  const [selectLocales, setSelectLocales] = useState("");
  const [analysedImage, setAnalysedImage] = useState("");
  const [analyseImageIndex, setAnalyseImageIndex] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // const [imageId, setImageId] = useState(0);

  // const myRef = useRef(null);

  // const executeScroll = () => myRef.current.scrollIntoView()

  //Set the page
  const onSetPage = (_event, pageNumber) => {
    setPage(pageNumber);
  };

  //Items to be displayed per page
  const onPerPageSelect = (_event, perPage) => {
    setPerPage(perPage);
  };

  //Next set of Items
  const onNextClick = (_event, page) => {
    setPage(page);
    setOffset((page - 1) * perPage);
  };

  //Previous set of Items
  const onPreviousClick = (_event, page) => {
    setPage(page);
    setOffset((page - 1) * perPage);
  };

  //First set of Items
  const onFirstClick = (_event, page) => {
    setPage(page);
    setOffset(0);
  };

  //Last set of items
  const onLastClick = (_event, page) => {
    setPage(page);
    setOffset((page - 1) * perPage);
  };

  React.useEffect(() => {
    setBugzillaProductName(props.bugzillaProductName);
    setScreenshotsOther(props.screenshotsOther);
    setScreenshotsEN(props.screenshotsEN);
    setItemCount(props.itemCount);
    setSelectProductsVersion(props.selectProductsVersion);
    setSelectLocales(props.selectLocales);
    setOffset(0);
    // setImageId(props.imageId);
  }, [
    props.screenshotsEN,
    props.screenshotsOther,
    props.itemCount,
    props.bugzillaProductName,
    props.selectProductsVersion,
    props.selectLocales,
  ]);

  React.useEffect(() => {
    const SetImages = () => {
      if (props.screenshotsEN.length !== 0) {
        const elementsLeft = props.screenshotsEN[0].images.slice(
          offset,
          offset + perPage
        );
        setElementLeft(elementsLeft);
      }
      if (props.screenshotsOther.length !== 0) {
        const elementsRight = props.screenshotsOther[0].images.slice(
          offset,
          offset + perPage
        );
        setElementRight(elementsRight);
      }
    };
    SetImages();
  }, [
    offset,
    perPage,
    screenshotsEN,
    screenshotsOther,
    props.screenshotsEN,
    props.screenshotsOther,
  ]);

  const analyse = async (index) => {
    setIsLoading(true);

    // if(analyseImageIndex===index){
    //   setAnalysedImage(analysedImage)
    // }
    // else{
    const analysedImageResponse = await axios(`${BASE_URL}/screenshots`, {
      params: {
        product_version_id: selectProductsVersion,
        locale_id: selectLocales,
        indexnumber: index,
      },
      headers: { "Content-Type": "image/png" },
    });
    // setAnalyseImageIndex(index);
    setAnalysedImage(analysedImageResponse.data);
    // }

    setIsLoading(false);
  };

  const paginateEN = () => (
    <>
      <Pagination
        widgetId="pagination-options-menu-bottom"
        itemCount={itemCount}
        perPage={perPage}
        page={page}
        onSetPage={onSetPage}
        onPerPageSelect={onPerPageSelect}
        onNextClick={onNextClick}
        onPreviousClick={onPreviousClick}
        onFirstClick={onFirstClick}
        onLastClick={onLastClick}
      />

      <div style={{ position: "fixed", zIndex: 10000, width: "97%", top: 50 }}>
        {copyAlert ? (
          <Alert variant="success" title="Image link coppied successfully" />
        ) : null}
      </div>

      {/* To display the dialog for confirmation for redirection to Bugzilla */}

      <Modal
        variant={ModalVariant.small}
        title="Report bug to Bugzilla?"
        isOpen={isModalOpen}
        onClose={handleModalToggle}
        actions={[
          <CopyToClipboard
            text={elementsLeft[currentImageIndex]}
            onCopy={() => {
              redirect();
            }}
          >
            <Button key="confirm" variant="primary">
              Confirm
            </Button>
          </CopyToClipboard>,
          <Button key="cancel" variant="link" onClick={handleModalToggle}>
            Cancel
          </Button>,
        ]}
      >
        {bugzillaProductName === "" ? (
          <p>
            <p style={{ color: "red" }}>
              This product is not available on Bugzilla.{" "}
            </p>
            <br />
            You will be redirected to Bugzilla to report a bug. A link to the
            current screenshot will be coppied to clipboard which you can paste
            in the <strong>Attachment</strong> field.
          </p>
        ) : (
          <p>
            You will be redirected to Bugzilla to report a bug. A link to the
            current screenshot will be coppied to clipboard which you can paste
            in the <strong>Attachment</strong> field.
          </p>
        )}
      </Modal>

      {/* Click image to zoom information */}

      <div
        style={{
          display: "flex",
          alignContent: "center",
          marginBottom: 20,
          opacity: 0.5,
        }}
      >
        <InfoCircleIcon color="black" width={20} height={"auto"} />

        <h6 style={{ marginLeft: 5 }}>Click on image to zoom</h6>
      </div>

      <div className="en_screens mb-4">
        {elementsLeft.map((image, index) => (
          <div key={index}>
            <div className="container">
              {/* Report a Bug button */}

              <div
                className="redirect"
                onClick={() => {
                  setCurrentImageIndex(index);
                  setImageColumn(0);
                  handleModalToggle();
                }}
              >
                <div className="text">Report bug</div>
              </div>

              <CopyToClipboard
                text={elementsLeft[index]}
                onCopy={() => {
                  setCopyAlert(true);
                  setTimeout(() => {
                    setCopyAlert(false);
                  }, 2000);
                }}
              >
                <div className="copyLink">
                  <div className="text">Copy Link</div>
                </div>
              </CopyToClipboard>

              <Zoom zoomMargin={10} overlayBgColorEnd="RGBA(0,0,0,0.75)">
                <img src={image} alt="" key={index} className="image" />
              </Zoom>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        widgetId="pagination-options-menu-bottom"
        itemCount={itemCount}
        perPage={perPage}
        page={page}
        onSetPage={onSetPage}
        onPerPageSelect={onPerPageSelect}
        onNextClick={onNextClick}
        onPreviousClick={onPreviousClick}
        onFirstClick={onFirstClick}
        onLastClick={onLastClick}
      />
    </>
  );

  const zoomIn = useCallback(() => {
    setIsZoomed(true);
  }, []);

  const zoomOut = useCallback((event) => {
    setIsZoomed(false);
    event.preventDefault();
  }, []);

  const handleImageSwitch = () => {
    setNextImg(!nextImg);
  };

  const redirect = (index) => {
    window.open(
      `https://bugzilla.redhat.com/enter_bug.cgi?product=${bugzillaProductName}`,
      "_blank"
    );
    handleModalToggle();
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const paginateOther = () => (
    // imageId?
    //   executeScroll():

    <>
      {isLoading ? (
        <div
          style={{
            position: "fixed",
            zIndex: 10000,
            left: 0,
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

      <Pagination
        widgetId="pagination-options-menu-bottom"
        itemCount={itemCount}
        perPage={perPage}
        page={page}
        onSetPage={onSetPage}
        onPerPageSelect={onPerPageSelect}
        onNextClick={onNextClick}
        onPreviousClick={onPreviousClick}
        onFirstClick={onFirstClick}
        onLastClick={onLastClick}
      />

      {analysedImage ? (
        <div
          className="zoomed_image_container"
          onClick={() => {
            setAnalysedImage(false);
          }}
        >
          <img src={`data:image/png;base64,${analysedImage}`} alt="" />
        </div>
      ) : (
        ""
      )}

      <div style={{ position: "fixed", zIndex: 10000, width: "97%", top: 50 }}>
        {copyAlert ? (
          <Alert variant="success" title="Image link coppied successfully" />
        ) : null}
      </div>

      {/* To display the dialog for confirmation for redirection to Bugzilla */}

      <Modal
        variant={ModalVariant.small}
        title="Report bug to Bugzilla?"
        isOpen={isModalOpen}
        onClose={handleModalToggle}
        actions={[
          <CopyToClipboard
            text={
              imageColumn === 0
                ? elementsLeft[currentImageIndex]
                : elementsRight[currentImageIndex]
            }
            onCopy={() => {
              redirect();
            }}
          >
            <Button key="confirm" variant="primary">
              Confirm
            </Button>
          </CopyToClipboard>,
          <Button key="cancel" variant="link" onClick={handleModalToggle}>
            Cancel
          </Button>,
        ]}
      >
        {bugzillaProductName === "" ? (
          <p>
            <p style={{ color: "red" }}>
              This product is not available on Bugzilla.{" "}
            </p>
            <br />
            You will be redirected to Bugzilla to report a bug. A link to the
            current screenshot will be coppied to clipboard which you can paste
            in the <strong>Attachment</strong> field.
          </p>
        ) : (
          <p>
            You will be redirected to Bugzilla to report a bug. A link to the
            current screenshot will be coppied to clipboard which you can paste
            in the <strong>Attachment</strong> field.
          </p>
        )}
      </Modal>

      {/* Click image to zoom information */}

      <div
        style={{
          display: "flex",
          alignContent: "center",
          marginBottom: 20,
          opacity: 0.5,
        }}
      >
        <InfoCircleIcon color="black" width={20} height={"auto"} />

        <h6 style={{ marginLeft: 5 }}>Click on image to zoom</h6>
      </div>

      {/* For screenshots display side by side */}

      <div id="image-compare">
        <Split hasGutter gutter="md">
          <div>
            {elementsLeft.length && (
              <SplitItem>
                <div>
                  {elementsLeft.map((image, index) => (
                    <div className="container" key={index}>
                      {/* Report a Bug button */}

                      <div
                        key={index}
                        className="redirect"
                        onClick={() => {
                          setCurrentImageIndex(index);
                          setImageColumn(0);
                          handleModalToggle();
                        }}
                      >
                        <div className="text">Report bug</div>
                      </div>

                      <CopyToClipboard
                        text={elementsLeft[index]}
                        onCopy={() => {
                          setCopyAlert(true);
                          setTimeout(() => {
                            setCopyAlert(false);
                          }, 2000);
                        }}
                      >
                        <div className="copyLink">
                          <div className="text">Copy Link</div>
                        </div>
                      </CopyToClipboard>

                      <img
                        style={{ cursor: "zoom-in" }}
                        src={image}
                        alt=""
                        id={index}
                        className="image"
                        onClick={() => {
                          setZoomImgIndex(index);
                          zoomIn();
                          setNextImg(false);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </SplitItem>
            )}
          </div>
          <div>
            {elementsRight.length && (
              <SplitItem>
                <div>
                  {elementsRight.map((image, index) => (
                    <div id={index}>
                      <div className="container" key={index}>
                        {/* Report a Bug button */}

                        <div
                          key={index}
                          className="redirect"
                          onClick={() => {
                            setCurrentImageIndex(index);
                            setImageColumn(1);
                            handleModalToggle();
                          }}
                        >
                          <div className="text">Report bug</div>
                        </div>

                        <div
                          key={index}
                          className="analyse"
                          onClick={() => {
                            analyse(perPage * (page - 1 + index));
                          }}
                        >
                          <div className="text">Analyse</div>
                        </div>

                        <CopyToClipboard
                          text={elementsRight[index]}
                          onCopy={() => {
                            setCopyAlert(true);
                            setTimeout(() => {
                              setCopyAlert(false);
                            }, 2000);
                          }}
                        >
                          <div className="copyLink">
                            <div className="text">Copy Link</div>
                          </div>
                        </CopyToClipboard>

                        <img
                          style={{ cursor: "zoom-in" }}
                          src={image}
                          alt=""
                          className="image"
                          onClick={() => {
                            setZoomImgIndex(index);
                            zoomIn();
                            setNextImg(true);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SplitItem>
            )}
          </div>

          {/* Zoomed image view */}

          {isZoomed ? (
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

              <div className="zoomed_image_container" onClick={zoomOut}>
                {!nextImg ? (
                  <img
                    src={elementsLeft[zoomImgIndex]}
                    alt=""
                    key={zoomImgIndex}
                    onClick={zoomOut}
                  />
                ) : (
                  <img
                    src={elementsRight[zoomImgIndex]}
                    alt=""
                    key={zoomImgIndex}
                    onClick={zoomOut}
                  />
                )}
              </div>
            </div>
          ) : null}
        </Split>
      </div>
      <Pagination
        widgetId="pagination-options-menu-bottom"
        itemCount={itemCount}
        perPage={perPage}
        page={page}
        onSetPage={onSetPage}
        onPerPageSelect={onPerPageSelect}
        onNextClick={onNextClick}
        onPreviousClick={onPreviousClick}
        onFirstClick={onFirstClick}
        onLastClick={onLastClick}
      />
    </>
  );

  if (props.screenshotsEN.length === 0) {
    return <SimpleEmptyState />;
  } else if (
    typeof itemCount !== "undefined" &&
    props.screenshotsOther.length === 0
  ) {
    return <div className="mb-4">{paginateEN()}</div>;
  } else if (
    typeof itemCount !== "undefined" &&
    props.screenshotsOther[0].id === props.screenshotsEN[0].id
  ) {
    return <div className="mb-4">{paginateEN()}</div>;
  } else {
    if (typeof itemCount !== "undefined")
      return <div className="mb-4">{paginateOther()}</div>;
    else return null;
  }
}

Paginate.propTypes = {
  screenshotsEN: PropTypes.arrayOf(PropTypes.object),
  screenshotsOther: PropTypes.arrayOf(PropTypes.object),
  itemCount: PropTypes.number,
};

export default Paginate;
