
import React, { useState } from "react";
import {
  Form,
  FormGroup,
  FormSelect,
  FormSelectOption,
  ActionGroup,
  Button,
  CardBody,
  Card,
  Bullseye
} from "@patternfly/react-core";
import SimpleEmptyState from "./SimpleEmptyState";

export default function SimpleForm(props) {
  const [selectProductsVersion, setSelectProductsVersion] = useState("");
  const [selectLocales, setSelectLocales] = useState("");
  return (
    <Bullseye>
      <Card>
        <CardBody>
          <SimpleEmptyState />
          <Form onSubmit={props.handleSubmit}>
            <FormGroup label="Select Version" fieldId="version">
              <FormSelect
                value={selectProductsVersion ? selectProductsVersion : props.selectProductsVersion}
                onChange={(e, event) => (props.handleVersionChange(e, event), setSelectProductsVersion(e, event))}
                aria-label="Version"
                id="version"
                name="version">
                <option>Select</option>
                {props.productsVersion.map((option, index) => (
                  <FormSelectOption
                    key={index}
                    value={option.id}
                    label={option.name}
                  />
                ))}
              </FormSelect>
            </FormGroup>
            <FormGroup label="Select Locale" fieldId="locale" >
              <FormSelect
                value={selectLocales ? selectLocales : props.selectLocales}
                onChange={(e, event) => (props.handleLocaleChange(e, event), setSelectLocales(e, event))}
                aria-label="Locale"
                id="locale"
                name="locale">
                <option>Select</option>
                {props.locales.map((option, index) => (
                  <FormSelectOption
                    key={index}
                    value={option.id}
                    label={option.language}
                  />
                ))}
              </FormSelect>
            </FormGroup>
            <ActionGroup>
              <Button type="submit">Submit</Button>
            </ActionGroup>
          </Form>
        </CardBody>
      </Card>
    </Bullseye>
  )
}
