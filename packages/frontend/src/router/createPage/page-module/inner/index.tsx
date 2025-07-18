import React from "react";
import { AbstractModule, RenderModule } from "@app/front-modules";
import { Constructable } from "@app/kit";

import { useIntlDate, useRouterProxyRef, useTranslation } from "libs";

import FullSizeLoader from "components/FullSizeLoader";

import PageNotLoaded from "./PageNotLoaded";

interface InnerInterface {
  Page: Constructable<AbstractModule> | undefined;
}

function Inner({ Page }: InnerInterface) {
  const intlDate = useIntlDate();
  const t = useTranslation();
  const routerProxy = useRouterProxyRef();

  const disposeRouterRef = React.useRef<Function | undefined>(undefined);
  React.useEffect(() => () => disposeRouterRef.current?.(), []);

  const handleCustomBeforeInit = React.useCallback(
    async (page: AbstractModule) => {
      const [disposeRouter] = await Promise.all([
        page.loadExternalModule("router", { data: routerProxy }),
        page.loadExternalModule("intlDate", { data: intlDate }),
        page.loadExternalModule("t", { data: t }),
      ]);
      disposeRouterRef.current = disposeRouter.dispose;
    },
    [intlDate, routerProxy, t],
  );

  if (!Page) return <PageNotLoaded t={t} />;

  return (
    <RenderModule
      Module={Page}
      loadingElement={<FullSizeLoader />}
      ErrorComponent={ErrorComponent}
      onCustomBeforeInit={handleCustomBeforeInit}
    />
  );
}

export default React.memo(Inner);

function ErrorComponent() {
  const t = useTranslation();
  return <PageNotLoaded t={t} />;
}
