"use server";
import React from 'react'
import SearchPageWrapper from '../_components/SearchPageWrapper';

export default async function page(
  { searchParams }: { searchParams: Promise<{ searchQuery?: string, brand?: string }> }
) {

  const {searchQuery, brand} = await searchParams;

  return (
    <SearchPageWrapper searchQuery={searchQuery || ""} brand={brand || ""} />
  )
}
