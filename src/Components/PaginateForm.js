import React, { useState } from "react";
import {
  Form,
  FormSelect,
  FormSelectOption,
  Button,
  DataToolbarContent,
  DataToolbarItem,
} from "@patternfly/react-core";
import { Switch } from "@patternfly/react-core";

export default function PaginateForm(props) {
  const [selectProductsVersion, setSelectProductsVersion] = useState("");
  const [selectLocales, setSelectLocales] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  function handleChange(isChecked) {
    setIsChecked(isChecked);
    if (isChecked === true) {
      props.handleLayout("Horizontal");
    } else {
      props.handleLayout("Vertical");
    }
  }
  return (
    <>
      <Form onSubmit={props.handleSubmit}>
        <DataToolbarContent>
          <DataToolbarItem variant="label" id="version">
            Select a Version
          </DataToolbarItem>
          <DataToolbarItem>
            <FormSelect
              value={
                selectProductsVersion
                  ? selectProductsVersion
                  : props.selectProductsVersion
              }
              onChange={(e, event) => {
                props.handleVersionChange(e, event);
                setSelectProductsVersion(e, event);
              }}
              aria-label="Version"
              id="version"
              name="version"
            >
              <option>Select</option>
              {props.productsVersion.map((option, index) => (
                <FormSelectOption
                  key={index}
                  value={option.id}
                  label={option.name}
                />
              ))}
            </FormSelect>
          </DataToolbarItem>
          <DataToolbarItem variant="label" id="locale">
            Select a Locale
          </DataToolbarItem>
          <DataToolbarItem>
            <FormSelect
              value={selectLocales ? selectLocales : props.selectLocales}
              onChange={(e, event) => {
                props.handleLocaleChange(e, event);
                setSelectLocales(e, event);
              }}
              aria-label="Locale"
              id="locale"
              name="locale"
            >
              <option>Select</option>
              {props.locales.map((option, index) => (
                <FormSelectOption
                  key={index}
                  value={option.id}
                  label={option.language}
                />
              ))}
            </FormSelect>
          </DataToolbarItem>
          <DataToolbarItem>
            <Button type="submit" value="submit">
              Submit
            </Button>
          </DataToolbarItem>
          <DataToolbarItem>
            <Switch
              id="simple-switch"
              label="Two Column Layout on"
              labelOff="Two Column Layout off"
              className="layout"
              isChecked={isChecked}
              onChange={handleChange}
              isDisabled={
                props.selectLocales === "3" ||
                props.screenshotsOther.length === 0
                  ? true
                  : false
              }
            />
          </DataToolbarItem>
        </DataToolbarContent>
      </Form>
    </>
  );
}
