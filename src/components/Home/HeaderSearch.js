import React, { useState } from "react";
import Select from "react-select";
import InputSearch from "./inputSearch";
export default function Conversations({
  options,
  categories,
  categoriesSelected,
  handlingChange,
  search,
  handlingSearch
}) {
  return (
    <section>
      <InputSearch
        value={search}
        onChange={handlingSearch}
        placeholder="Search"
      />
      <Select
        className="selectSearch "
        classNamePrefix="Select"
        value={categoriesSelected}
        isMulti
        onChange={handlingChange}
        options={categories}
      />
    </section>
  );
}
