import React from "react";

import Directory from "src/components/directory/directory.component";
import ItemsPreview from "src/components/ItemsPreview/ItemsPreview";
import { MainLayout } from "src/layouts/MainLayout/MainLayout";

export default function Homepage() {
  return (
    <MainLayout>
      <Directory />
      {/* <ItemsPreview /> */}
    </MainLayout>
  );
}
