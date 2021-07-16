import React, { useState } from "react";
import {
  Form,
  FormSelect,
  FormSelectOption,
  Button,
  ToolbarContent,
  ToolbarItem,
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
        <ToolbarContent>
          <ToolbarItem variant="label" id="version">
            Select a Version 
          </ToolbarItem>
          <ToolbarItem>
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
          </ToolbarItem>
          <ToolbarItem variant="label" id="locale">
            Select a Locale 
          </ToolbarItem>
          <ToolbarItem>
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
          </ToolbarItem>
          <ToolbarItem>
            <Button type="submit" value="submit">
              Submit
            </Button>
          </ToolbarItem>
          <ToolbarItem>
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
          </ToolbarItem>
        </ToolbarContent>
      </Form>
    </>
  );
}
