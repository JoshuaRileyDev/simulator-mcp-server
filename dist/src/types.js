// Type guards
export function isAppLaunchOptions(args) {
    return (typeof args === 'object' &&
        args !== null &&
        typeof args.deviceId === 'string' &&
        typeof args.bundleId === 'string');
}
export function isAppInstallOptions(args) {
    return (typeof args === 'object' &&
        args !== null &&
        typeof args.deviceId === 'string' &&
        typeof args.appPath === 'string');
}
export function isSimulatorBootOptions(args) {
    return (typeof args === 'object' &&
        args !== null &&
        typeof args.deviceId === 'string');
}
