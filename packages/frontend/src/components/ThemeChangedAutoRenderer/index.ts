import React from "react";
import { UUID } from "uuidjs";

import { useSettingsModuleOrWait } from "modules/settings";

interface ThemeChangedAutoRendererInterface {
  children: React.JSX.Element;
}

function ThemeChangedAutoRenderer({ children }: ThemeChangedAutoRendererInterface) {
  const [key, setKey] = React.useState<string | null>(null);
  const previousThemeName = React.useRef<string | null>(null);

  const settings = useSettingsModuleOrWait();

  React.useEffect(() => {
    const theme = settings?.theme;
    if (!theme) return;
    if (previousThemeName.current === null) return void (previousThemeName.current = theme);
    if (previousThemeName.current === theme) return;
    previousThemeName.current = theme;
    setKey(UUID.generate());
  }, [settings?.theme]);

  return React.cloneElement(children, { key });
}

export default React.memo(ThemeChangedAutoRenderer);
