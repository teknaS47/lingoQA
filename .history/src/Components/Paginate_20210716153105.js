import React, { useState } from "react";
import { Split, SplitItem } from "@patternfly/react-core";
import { Pagination, PaginationVariant, Badge } from "@patternfly/react-core";
import SimpleEmptyState from "./SimpleEmptyState";
// import { uuid } from "uuidv4";

export default function Paginate(props) {
  const [screenshotsOther, setScreenshotsOther] = useState([]);
  const [screenshotsEN, setScreenshotsEN] = useState([]);
  const [itemCount, setItemCount] = useState();
  const [elementsRight, setElementRight] = useState([]);
  const [elementsLeft, setElementLeft] = useState([]);
  const [offset, setOffset] = useState();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  let [IdL, setIdL] = useState(0);
  let [IdR, setIdR] = useState(0);

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
    setIdL(IdL, IdL++);
    setIdR(IdR, IdR++);
    setPage(page);
    setOffset((page - 1) * perPage);
  };

  //Previous set of Items
  const onPreviousClick = (_event, page) => {
    setIdL((page - 1) * perPage);
    setIdR((page - 1) * perPage);
    setPage(page);
    setOffset((page - 1) * perPage);
  };

  //First set of Items
  const onFirstClick = (_event, page) => {
    setIdL(0);
    setIdR(0);
    setPage(page);
    setOffset(0);
  };

  //Last set of items
  const onLastClick = (_event, page) => {
    setIdL((page - 1) * perPage);
    setIdR((page - 1) * perPage);
    setPage(page);
    setOffset((page - 1) * perPage);
  };

  React.useEffect(() => {
    setScreenshotsOther(props.screenshotsOther);
    setScreenshotsEN(props.screenshotsEN);
    setItemCount(props.itemCount);
    setOffset(0);
  }, [props.screenshotsEN, props.screenshotsOther, props.itemCount]);

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

  const paginateEN = () => (
    <>
      <Pagination
        widgetId="pagination-options-menu-bottom"
        itemCount={itemCount}
        perPage={perPage}
        page={page}
        // variant={PaginationVariant.bottom}
        onSetPage={onSetPage}
        onPerPageSelect={onPerPageSelect}
        onNextClick={onNextClick}
        onPreviousClick={onPreviousClick}
        onFirstClick={onFirstClick}
        onLastClick={onLastClick}
      />

      <div className="en_screens mb-4">
        {elementsLeft.map((image, index) => (
          <div key={index}>
            <div>
              {" "}
              <Badge id={IdL++}>id: {IdL}</Badge>{" "}
            </div>
            <img key={index} src={image} alt="" id={index} className="image" />
          </div>
        ))}
      </div>
      <Pagination
        widgetId="pagination-options-menu-bottom"
        itemCount={itemCount}
        perPage={perPage}
        page={page}
        // variant={PaginationVariant.bottom}
        onSetPage={onSetPage}
        onPerPageSelect={onPerPageSelect}
        onNextClick={onNextClick}
        onPreviousClick={onPreviousClick}
        onFirstClick={onFirstClick}
        onLastClick={onLastClick}
      />
    </>
  );

  const paginateOther = () => (
    <>
      <Pagination
        widgetId="pagination-options-menu-top"
        itemCount={itemCount}
        perPage={perPage}
        page={page}
        // variant={PaginationVariant}
        onSetPage={onSetPage}
        onPerPageSelect={onPerPageSelect}
        onNextClick={onNextClick}
        onPreviousClick={onPreviousClick}
        onFirstClick={onFirstClick}
        onLastClick={onLastClick}
        color={"#0000"}
      />
      {props.changeLayout === true ? (
        //  For screenshots display side by side
        <div>
          <Split gutter="md">
            <div>
              {elementsLeft.length && (
                <SplitItem>
                  <div>
                    {elementsLeft.map((image, index) => (
                      <div key={index + 1}>
                        <div>
                          {" "}
                          <Badge id={IdL++}>id: {IdL}</Badge>{" "}
                        </div>
                        <img
                          key={index + 2}
                          src={image}
                          alt=""
                          id={index}
                          className="image_EN"
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
                      <div key={index + 3}>
                        <div>
                          {" "}
                          <Badge id={IdR++}>id: {IdR}</Badge>{" "}
                        </div>
                        <img
                          key={index + 4}
                          src={image}
                          alt=""
                          id={index}
                          className="image_other"
                        />
                      </div>
                    ))}
                  </div>
                </SplitItem>
              )}
            </div>
          </Split>
        </div>
      ) : (
        //  For screenshots display one by one
        <div>
          {elementsLeft.map((image, index) => (
            <div key={index + 5}>
              <div>
                {" "}
                <Badge id={IdL++}>id: {IdL}</Badge>{" "}
              </div>
              <img key={index + 6} src={image} alt="" className="image1" />
              <div>
                {" "}
                <Badge id={IdL}>id: {IdL}</Badge>{" "}
              </div>
              <img
                key={index + 7}
                src={elementsRight[index]}
                alt=""
                className="image1"
              />
              <br />
              <br />
              <br />
            </div>
          ))}
        </div>
      )}
      <Pagination
        widgetId="pagination-options-menu-bottom"
        itemCount={itemCount}
        perPage={perPage}
        page={page}
        variant={PaginationVariant.bottom}
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
