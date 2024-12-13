export interface SimulatorDevice {
  udid: string;
  name: string;
  state: string;
  runtime: string;
}

export interface AppLaunchOptions {
  deviceId: string;
  bundleId: string;
}

export interface AppInstallOptions {
  deviceId: string;
  appPath: string;
}

export interface SimulatorBootOptions {
  deviceId: string;
}

// Type guards
export function isAppLaunchOptions(args: any): args is AppLaunchOptions {
  return (
    typeof args === 'object' &&
    args !== null &&
    typeof args.deviceId === 'string' &&
    typeof args.bundleId === 'string'
  );
}

export function isAppInstallOptions(args: any): args is AppInstallOptions {
  return (
    typeof args === 'object' &&
    args !== null &&
    typeof args.deviceId === 'string' &&
    typeof args.appPath === 'string'
  );
}

export function isSimulatorBootOptions(args: any): args is SimulatorBootOptions {
  return (
    typeof args === 'object' &&
    args !== null &&
    typeof args.deviceId === 'string'
  );
} 