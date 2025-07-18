export function getDependenciesFromPackageLock(packageLock: Record<string, any>) {
  const dependencies: string[] = [];
  Object.values(packageLock.packages ?? {}).forEach((pkg: any) => {
    if (pkg.name) dependencies.push(pkg.name);
    if (pkg.dependencies) {
      dependencies.push(...Object.keys(packageLock.packages));
    }
  });
  return dependencies;
}
