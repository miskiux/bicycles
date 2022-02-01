import React from "react";
import { ShopOverview } from "src/components/Shop/ShopOverview/ShopOverview";
import { MainLayout } from "src/layouts/MainLayout/MainLayout";

export default function ShopPage() {
  return (
    <MainLayout>
      <ShopOverview />
    </MainLayout>
  );
}
