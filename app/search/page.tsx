"use server";
import React from 'react'
import SearchPageWrapper from '../_components/SearchPageWrapper';

export default async function page(
  { searchParams }: { searchParams: Promise<{ searchQuery: string }> }
) {

  const searchQuery = (await searchParams).searchQuery;

  return (
    <SearchPageWrapper searchQuery={searchQuery} />
  )
}
