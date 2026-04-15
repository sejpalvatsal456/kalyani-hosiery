"use server";
import React from 'react'
import SearchPageWrapper from '../_components/SearchPageWrapper';

export default async function page(
  { searchParams }: { searchParams: Promise<{ searchQuery?: string, brand?: string, subcategory?: string }> }
) {

  const {searchQuery, brand, subcategory} = await searchParams;

  return (
    <SearchPageWrapper searchQuery={searchQuery || ""} brand={brand || ""} subcategory={subcategory || ""} />
  )
}
