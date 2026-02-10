import SubCategoryWrapper from "@/app/_components/SubCategoryWrapper";

import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ categoryName: string; subcategoryName: string }>;
}) {
  const { categoryName, subcategoryName } = await params;

  return (
    <div>
      <SubCategoryWrapper
        categoryName={categoryName}
        subcategoryName={subcategoryName}
      />
    </div>
  );
}
