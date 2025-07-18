import { DateTime } from "luxon";
import { setAsyncInterval } from "@worksolutions/utils";

export function tokenAutoUpdater(createdAtMS: number, expiredAtMS: number, refresh: () => Promise<void>) {
  const createdAtDateTime = DateTime.fromMillis(createdAtMS);
  const expirationDateTime = DateTime.fromMillis(expiredAtMS).minus({ minute: 1 });

  const localAndExpireDeltaMS = expirationDateTime.diff(DateTime.local(), "milliseconds").milliseconds;
  const tokenAliveMS = expirationDateTime.diff(createdAtDateTime, "milliseconds").milliseconds;

  let disposeEachRefreshTokenTimer: (() => void) | undefined = undefined;
  const firstRefreshTokenTimeout = setTimeout(
    () => {
      void refresh();

      disposeEachRefreshTokenTimer = setAsyncInterval(() => refresh(), Math.min(100000000, tokenAliveMS));
    },
    Math.min(100000000, localAndExpireDeltaMS),
  );

  return () => {
    clearTimeout(firstRefreshTokenTimeout);
    disposeEachRefreshTokenTimer?.();
  };
}
