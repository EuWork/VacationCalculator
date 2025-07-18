import React from "react";
import { Image as KitImage } from "@app/kit";
import cn from "classnames";

import { CacheStorage } from "libs/cache";

import { darkStyles, lightStyles } from "./style.css";

interface EmptyIconImageInterface {
  className?: string;
}

function EmptyIconImage({ className }: EmptyIconImageInterface) {
  return (
    <>
      <KitImage className={cn(className, lightStyles)} src={urlLight} />
      <KitImage className={cn(className, darkStyles)} src={urlDark} />
    </>
  );
}

export default React.memo(EmptyIconImage);

let urlLight = "/images/no_data/empty/light.svg";
let urlDark = "/images/no_data/empty/dark.svg";

const cache = new CacheStorage("empty-icon-image_v1");

getImage(urlLight, "light.svg").then((url) => (urlLight = url));
getImage(urlDark, "dark.svg").then((url) => (urlDark = url));

async function getImage(url: string, cacheName: string) {
  const cachedValue = await cache.get(cacheName);
  const reader = new FileReader();
  if (cachedValue) {
    reader.readAsDataURL(new Blob([cachedValue], { type: "image/svg+xml" }));
  } else {
    const response = await fetch(url, { method: "get" });
    const responseBuffer = await response.arrayBuffer();
    reader.readAsDataURL(new Blob([responseBuffer], { type: "image/svg+xml" }));
    void cache.set(cacheName, responseBuffer);
  }

  return new Promise<string>((resolve) => {
    reader.addEventListener("loadend", () => resolve(reader.result as string));
  });
}
