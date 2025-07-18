import React from "react";
import { PaginationEntity } from "@app/dto";
import { ScrollProviderContextInterface, scrollToElement } from "@app/ui";
import { useInfinityScroll, useProvideRef } from "@worksolutions/react-utils";

interface InfinityScrollWrapperInterface {
  resetPaginationHash?: string;
  loading: boolean;
  pagination: PaginationEntity | undefined;
  children: React.JSX.Element;
  onLoadMore: () => void;
}

function InfinityScrollWrapper({
  resetPaginationHash,
  loading,
  pagination,
  children,
  onLoadMore,
}: InfinityScrollWrapperInterface) {
  const initInfinityScroll = useInfinityScroll({
    loading,
    hasNextPage: pagination?.canGetMore ?? false,
    onLoadMore,
    threshold: 300,
    waitLoadingMS: 200,
  });

  const [scrollProvider, setScrollProvider] = React.useState<ScrollProviderContextInterface | null>(null);
  React.useEffect(() => {
    if (!resetPaginationHash || !scrollProvider) return;
    scrollToElement(scrollProvider.scrollableElement, { mode: "top", top: 0 }, "instant");
  }, [resetPaginationHash, scrollProvider]);

  React.useEffect(() => {
    if (!scrollProvider) return;
    initInfinityScroll(scrollProvider.scrollableElement);
  }, [initInfinityScroll, scrollProvider]);

  return React.cloneElement(children, {
    scrollProviderRef: useProvideRef(setScrollProvider, children.props.scrollProviderRef),
  });
}

export default React.memo(InfinityScrollWrapper);
