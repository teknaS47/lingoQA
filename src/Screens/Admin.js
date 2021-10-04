import React, { useState, useCallback, useEffect } from "react";
import BASE_URL from "../API/BASE_URL";
import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";

import {
  Form,
  PageSection,
  FormGroup,
  FormSelectOption,
  FormSelect,
  PageSidebar,
  Page,
  Button,
  TextInput,
  ActionGroup,
  FileUploadField,
  Alert,
  Bullseye,
  Spinner,
} from "@patternfly/react-core";
import { useDropzone } from "react-dropzone";

function Admin() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(0);
  const [locales, setLocales] = useState([]);
  const [selectedLocale, setSelectedLocale] = useState(0);
  const [screenshotsOther, setScreenshotsOther] = useState([]);
  const [newProduct, setNewProduct] = useState("");
  const [newVersion, setNewVersion] = useState("");
  const [newLocaleLanguage, setNewLocaleLanguage] = useState("");
  const [newLocaleCode, setNewLocaleCode] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [validatedProduct, setValidatedProduct] = useState("default");
  const [validatedVersion, setValidatedVersion] = useState("default");
  const [validatedLocale, setValidatedLocale] = useState("default");
  const [ValidatedScreenshotsName, setValidatedScreenshotsName] =
    useState("default");
  const [validatedFileUploadField, setValidatedFileUploadField] =
    useState("default");
  const [screenshotsName, setScreenshotsName] = useState("");
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [adminAlert, setAdminAlert] = useState(false);
  const [adminAlertTitle, setAdminAlertTitle] = useState("");
  const [adminAlertVariant, setAdminAlertVariant] = useState("");

  let data = new FormData();

  const { acceptedFiles, getRootProps, getInputProps, open } = useDropzone({
    accept: "image/*",
    noClick: true,
    noKeyboard: true,
  });

  const files = selectedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  };

  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #d3d3d3",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const thumbs = selectedFiles.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={URL.createObjectURL(file)} style={img} alt={file.name} />
      </div>
    </div>
  ));

  let history = useHistory();

  useEffect(() => {
    setSelectedFiles(acceptedFiles);
    setValidatedFileUploadField("default");
  }, [acceptedFiles]);

  function handleDropdownChangeProduct(e) {
    setValidatedProduct("default");
    setSelectedProduct(e);
    console.log("handleDropdownChangeProduct", e);
    if (e === 0) setSelectedProduct(0);
    else if (e === "+ Add new") {
      setSelectedProduct("+ Add new");
      setSelectedProduct("+ Add new");
    } else {
      fetchProductsVersionData(e);
    }
  }

  function handleDropdownChangeVersion(e) {
    setValidatedVersion("default");
    if (e === "+ Add new") {
      setSelectedVersion("+ Add new");
    } else setSelectedVersion(e);
  }

  const handleDropdownChangeLocale = useCallback((e) => {
    setValidatedLocale("default");
    setSelectedLocale(e);
  }, []);

  const handleNewProductChange = (e) => {
    console.log(e);
    setValidatedProduct("default");
    setNewProduct(e);
  };

  const handleNewVersionChange = (e) => {
    console.log(e);
    setValidatedVersion("default");
    setNewVersion(e);
  };

  const handleNewLocaleLanguageChange = (e) => {
    console.log(e);
    setValidatedLocale("default");
    setNewLocaleLanguage(e);
  };

  const handleNewLocaleCodeChange = (e) => {
    console.log(e);
    setValidatedLocale("default");
    setNewLocaleCode(e);
  };

  const handleScreenshotNameChange = (e) => {
    setScreenshotsName(e);
    setValidatedScreenshotsName("default");
  };

  const fetchProductsData = async () => {
    const ProductsData = await axios(`${BASE_URL}/products`);
    setProducts(ProductsData.data);
  };

  useEffect(() => {
    fetchProductsData();
    getLocale();
  }, []);

  const fetchProductsVersionData = async (e) => {
    if (e === "+ Add new" || e === 0) {
      console.log(e);
      e === "+ Add new"
        ? setSelectedVersion("+ Add new")
        : setSelectedVersion(0);
      setVersions([]);
      setLocales([]);
    } else if (e !== 0) {
      console.log("fetchProductsVersionData", e);
      const productsVersionData = await axios(
        `${BASE_URL}/products/${e}/product_versions`
      ).catch((e) => {
        console.error(e);
      });

      const LocalesData = await axios(`${BASE_URL}/locales`).catch((e) => {
        console.error(e);
      });

      if (productsVersionData && productsVersionData.data.length !== 0) {
        setVersions(productsVersionData.data);
        setLocales(LocalesData.data);
      } else {
        setVersions([]);
        setLocales([]);
        if (e != 0) {
          console.log("fetchProductsVersionData:if", typeof e, e);
          setAdminAlertTitle(
            "No Versions available for selected Product. Please select other Product"
          );
          setAdminAlertVariant("warning");
          setAdminAlert(true);
          setTimeout(() => {
            setAdminAlert(false);
          }, 5000);
          history.push({
            pathname: "/admin",
          });
        }
      }
    }
  };

  const getScreenshots = async () => {
    if (
      selectedVersion !== 0 &&
      selectedLocale !== 0 &&
      selectedVersion !== "+ Add new" &&
      selectedLocale !== "+ Add new"
    )
      try {
        const screenshotsData = await axios(`${BASE_URL}/screenshots`, {
          params: {
            product_version_id: selectedVersion,
            locale_id: selectedLocale,
          },
        });
        const screenshotsENData = await axios(`${BASE_URL}/screenshots`, {
          params: {
            product_version_id: selectedVersion,
            locale_id: selectedLocale,
          },
        });

        console.log(" GET SCREENSHOTS ", screenshotsData, " GET SCREENSHOTS ");

        if (!screenshotsData.data.length) {
          setAdminAlertTitle(
            "The selected Version have no English Screenshots"
          );
          setAdminAlertVariant("warning");
          setAdminAlert(true);
          setTimeout(() => {
            setAdminAlert(false);
          }, 2000);
        } else {
          setScreenshotsOther(screenshotsData.data);
        }
      } catch (err) {
        return err;
      }
  };

  useEffect(() => {
    getScreenshots();
    getLocale();
    setUploadDisabled(false);
  }, [selectedLocale, selectedVersion]);

  useEffect(() => {
    if (screenshotsOther.length !== 0) {
      setAdminAlertTitle(
        "Screenshots for this locale already exists. Please choose another locale."
      );
      setAdminAlertVariant("warning");
      setAdminAlert(true);
      setTimeout(() => {
        setAdminAlert(false);
      }, 5000);

      setUploadDisabled(true);
    } else setUploadDisabled(false);
  }, [screenshotsOther]);

  const addProduct = useCallback(async () => {
    setIsLoading(true);

    let productId = 0;
    let versionId = 0;

    const AddProductsData = await axios
      .post(`${BASE_URL}/products`, {
        name: newProduct,
      })

      .then(async () => {
        const ProductsData = await axios.get(`${BASE_URL}/products`);
        setProducts(ProductsData.data);

        const product = ProductsData.data.find(
          (product) => product.name === newProduct
        );
        if (product) {
          productId = product.id;
          console.log("product.id", product.id);
        }
      })

      .then(async () => {
        const AddVersionsData = await axios.post(
          `${BASE_URL}/products/${productId}/product_versions`,
          {
            name: newVersion,
            product_id: productId,
          }
        );
      })
      .then(async () => {
        const VersionsData = await axios.get(
          `${BASE_URL}/products/${productId}/product_versions`
        );
        setVersions(VersionsData.data);
        const version = VersionsData.data.find(
          (version) => version.name === newVersion
        );
        if (version) {
          versionId = version.id;
          console.log(
            "VersionsData",
            VersionsData,
            "VersionsData.data",
            VersionsData.data
          );
        }
      })

      .catch(function (error) {
        console.log(error);
      });
    return versionId;
  }, [newProduct, newVersion]);

  const addVersion = useCallback(async () => {

    setIsLoading(true);

    const product_id = selectedProduct;
    let versionId = 0;

    const VersionsData = await axios
      .post(`${BASE_URL}/products/${product_id}/product_versions`, {
        name: newVersion,
        product_id: product_id,
      })
      .then(async () => {
        const VersionsData = await axios.get(
          `${BASE_URL}/products/${product_id}/product_versions`
        );
        setVersions(VersionsData.data);
        const version = VersionsData.data.find(
          (version) => version.name === newVersion
        );
        if (version) {
          versionId = version.id;
          console.log(
            "VersionsData",
            VersionsData,
            "VersionsData.data",
            VersionsData.data
          );
          console.log("versionId", versionId);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(VersionsData);
    return versionId;
  }, [newVersion, selectedProduct]);

  const getLocale = async () => {
    const LocalesData = await axios(`${BASE_URL}/locales`).catch((e) => {
      console.error(e);
    });
    setLocales(LocalesData.data);
  };

  const addLocale = useCallback(async () => {
    setIsLoading(true);

    let localeId = 0;

    const AddLocalesData = await axios
      .post(`${BASE_URL}/locales`, {
        language: newLocaleLanguage,
        code: newLocaleCode,
      })

      .then(async () => {
        const LocalesData = await axios.get(`${BASE_URL}/locales`);
        setLocales(LocalesData.data);
        const locale = LocalesData.data.find(
          (locale) => locale.code === newLocaleCode
        );

        if (locale) {
          localeId = locale.id;
          console.log(
            "LocalesData",
            LocalesData,
            "LocalesData.data",
            LocalesData.data
          );
          console.log("localeId", localeId);
        }
      })

      .catch(function (error) {
        console.log(error);
      });
    setIsLoading(false);
    return localeId;
  }, [newLocaleCode, newLocaleLanguage]);

  const addScreenshots = async () => {
    console.log(selectedProduct);
    if (
      (selectedProduct == 0 || selectedProduct === "+ Add new") &&
      newProduct === ""
    )
      setValidatedProduct("error");
    else if (
      (selectedVersion == 0 || selectedVersion === "+ Add new") &&
      newVersion === ""
    )
      setValidatedVersion("error");
    else if (
      (selectedLocale == 0 || selectedLocale === "+ Add new") &&
      (newLocaleLanguage === "" || newLocaleCode === "")
    )
      setValidatedLocale("error");
    else if (screenshotsName === "") setValidatedScreenshotsName("error");
    else if (!selectedFiles.length) {
      setValidatedFileUploadField("error");
      setAdminAlertTitle("Please select Images to Upload");
      setAdminAlertVariant("warning");
      setAdminAlert(true);
      setTimeout(() => {
        setAdminAlert(false);
      }, 5000);
    } else {
      setUploadDisabled(true);
      setIsLoading(true);

      let product_version_id = selectedVersion;
      let locale_id = selectedLocale;

      if (selectedProduct === "+ Add new") {
        product_version_id = await addProduct();
      } 
      
      else if (selectedVersion === "+ Add new") {
        product_version_id = await addVersion();
      }

      if (newLocaleLanguage !== "" && newLocaleCode !== "") {
        locale_id = await addLocale();
      }

      await uploadScreenshots(locale_id, product_version_id);

      setUploadDisabled(false);
      clearSelectedFiles();
      history.push({
        pathname: "/admin",
      });
      setSelectedProduct(0);
      setVersions([]);
      setLocales([]);
      setScreenshotsName("");
      setIsLoading(false);
    }
  };

  const uploadScreenshots = async (locale_id, product_version_id) => {
    setIsLoading(true);

    data.append("name", screenshotsName);
    data.append("locale_id", locale_id);
    data.append("product_version_id", product_version_id);
    selectedFiles.forEach((image) => {
      data.append("images[]", image);
    });

    const ScreenshotsData = await axios
      .post(`${BASE_URL}/screenshots`, data, {
        contentType: `multipart/form-data`,
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("ScreenshotsData ", ScreenshotsData);

    setIsLoading(false);
  };

  const clearSelectedFiles = useCallback(() => {
    setSelectedFiles([]);
  }, []);

  const adminTokenString = localStorage.getItem("adminToken");

  if (!adminTokenString) {
    return <Redirect to="/login" />;
  }

  return (
    <Page sidebar={<PageSidebar nav={"Navigation"} isNavOpen={false} />}>
      {adminAlert ? (
        <Alert variant={adminAlertVariant} title={adminAlertTitle} />
      ) : null}
      <PageSection>
        {isLoading ? (
          <Bullseye>
            <Spinner></Spinner>
          </Bullseye>
        ) : null}

        <Form>
          <FormGroup
            label="Select Product"
            isRequired
            fieldId="product_name"
            helperTextInvalid="Select a product"
            validated={validatedProduct}
          >
            {selectedProduct === "+ Add new" ? (
              <FormGroup>
                <TextInput
                  isRequired
                  autoFocus
                  validated={validatedProduct}
                  onChange={handleNewProductChange}
                ></TextInput>
                {/* <ActionGroup>
                  <Button onClick={addProduct}>Add Product</Button>
                  <Button
                    variant={"secondary"}
                    onClick={() => {
                      setSelectedProduct(0);
                    }}
                  >
                    Cancel
                  </Button>
                </ActionGroup> */}
              </FormGroup>
            ) : (
              <FormSelect
                id="Product"
                isRequired
                value={selectedProduct}
                validated={validatedProduct}
                onChange={(e) => {
                  handleDropdownChangeProduct(e);
                }}
              >
                <option value={0}>Select </option>
                {products.map((products, index) => (
                  <FormSelectOption
                    key={index}
                    value={products.id}
                    label={products.name}
                  />
                ))}
                <option>+ Add new</option>
              </FormSelect>
            )}
          </FormGroup>

          <FormGroup
            label="Select Version"
            isRequired
            fieldId="version"
            helperTextInvalid="Select a version"
            validated={validatedVersion}
          >
            {selectedProduct === "+ Add new" ||
            selectedVersion === "+ Add new" ? (
              <FormGroup>
                <TextInput
                  isRequired
                  validated={validatedVersion}
                  onChange={handleNewVersionChange}
                ></TextInput>
                <ActionGroup>
                  {/* <Button onClick={addVersion}>Add Version</Button> */}
                  {selectedProduct === "+ Add new" ? (
                    <Button
                      variant={"secondary"}
                      onClick={() => {
                        setSelectedProduct(0);
                        setSelectedVersion(0);
                      }}
                    >
                      Cancel
                    </Button>
                  ) : (
                    <Button
                      variant={"secondary"}
                      onClick={() => {
                        setSelectedVersion(0);
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </ActionGroup>
              </FormGroup>
            ) : (
              <FormSelect
                id="Version"
                isRequired
                value={selectedVersion}
                validated={validatedVersion}
                onChange={(e) => {
                  handleDropdownChangeVersion(e);
                }}
              >
                <option value={0}> Select </option>
                {versions.map((versions, index) => (
                  <FormSelectOption
                    key={index}
                    value={versions.id}
                    label={versions.name}
                  />
                ))}
                {selectedProduct === 0 ? null : <option>+ Add new</option>}
              </FormSelect>
            )}
          </FormGroup>

          <FormGroup
            label="Select Locale"
            isRequired
            fieldId="locale"
            helperTextInvalid="Select a locale"
            validated={validatedLocale}
          >
            {selectedLocale === "+ Add new" ? (
              <FormGroup>
                <TextInput
                  isRequired
                  validated={validatedLocale}
                  placeholder="Enter Language"
                  onChange={handleNewLocaleLanguageChange}
                ></TextInput>
                <TextInput
                  isRequired
                  validated={validatedLocale}
                  placeholder="Enter Code"
                  onChange={handleNewLocaleCodeChange}
                ></TextInput>
                <ActionGroup>
                  {/* <Button onClick={addLocale}>Add Locale</Button> */}
                  <Button
                    variant={"secondary"}
                    onClick={() => {
                      setSelectedLocale(0);
                    }}
                  >
                    Cancel
                  </Button>
                </ActionGroup>
              </FormGroup>
            ) : (
              <FormSelect
                id="Locale"
                isRequired
                value={selectedLocale}
                validated={validatedLocale}
                onChange={(e) => {
                  handleDropdownChangeLocale(e);
                }}
              >
                <option value={0}> Select </option>
                {locales.map((locales, index) => (
                  <FormSelectOption
                    key={index}
                    value={locales.id}
                    label={locales.language}
                  />
                ))}
                <option>+ Add new</option>
              </FormSelect>
            )}
          </FormGroup>

          <FormGroup
            label="Add Screenshot name"
            isRequired
            fieldId="product_name"
          >
            <TextInput
              id="Screenshot name"
              placeholder="Screenshot name (eg. Rhel8.4_JP, Rhel8.4_zh_cn)"
              onChange={handleScreenshotNameChange}
              validated={ValidatedScreenshotsName}
            ></TextInput>
          </FormGroup>

          <FormGroup className="container">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <FileUploadField
                onBrowseButtonClick={open}
                isLoading={isLoading}
                isClearButtonDisabled={false}
                onClearButtonClick={() => clearSelectedFiles()}
                validated={validatedFileUploadField}
                isDisabled={uploadDisabled}
              ></FileUploadField>
            </div>
            <aside style={thumbsContainer}>{thumbs}</aside>
            <ActionGroup>
              {/* <h4>Files </h4> */}
              <ol>{files}</ol>
            </ActionGroup>
          </FormGroup>

          <ActionGroup>
            <Button
              onClick={() => {
                addScreenshots();
              }}
            >
              Submit
            </Button>
          </ActionGroup>
        </Form>
      </PageSection>
    </Page>
  );
}
export default Admin;
