import React, { useState } from "react";
import {
  Form,
  FormSelect,
  FormSelectOption,
  Button,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";

export default function PaginateForm(props) {
  const [selectProductsVersion, setSelectProductsVersion] = useState("");
  const [selectLocales, setSelectLocales] = useState("");
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
              onChange={(e, event) => (
                props.handleLocaleChange(e, event) setSelectLocales(e, event)
              )}
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
            <Button type="submit" value="Submit">
              Submit
            </Button>
          </ToolbarItem>
        </ToolbarContent>
      </Form>
    </>
  );
}
