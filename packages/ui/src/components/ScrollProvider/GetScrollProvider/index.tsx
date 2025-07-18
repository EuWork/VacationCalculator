import React from "react";
import { useProvideRef } from "@worksolutions/react-utils";

import { ScrollProviderContext, ScrollProviderContextInterface } from "../index";

export interface GetScrollProviderInterface {
  onScrollProvider: React.Ref<ScrollProviderContextInterface>;
}

function GetScrollProviderComponent({ onScrollProvider }: GetScrollProviderInterface) {
  useProvideRef(onScrollProvider)(React.useContext(ScrollProviderContext));
  return null;
}

export const GetScrollProvider = React.memo(GetScrollProviderComponent);
