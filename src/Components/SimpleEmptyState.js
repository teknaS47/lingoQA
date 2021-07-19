import React from "react";
import {
  Title,
  EmptyState,
  EmptyStateVariant,
  EmptyStateIcon,
} from "@patternfly/react-core";
import { CubesIcon } from "@patternfly/react-icons";

export default function SimpleEmptyState() {
  return (
    <EmptyState variant={EmptyStateVariant.full}>
      <EmptyStateIcon icon={CubesIcon} />
      <Title headingLevel="h5" size="lg">
        Please select appropriate Version and Locale to display images.
      </Title>
    </EmptyState>
  );
}
