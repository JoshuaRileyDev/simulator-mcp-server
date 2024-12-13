import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);
export class SimulatorService {
    async listDevices() {
        const { stdout } = await execAsync('xcrun simctl list devices --json');
        const result = JSON.parse(stdout);
        const devices = [];
        Object.entries(result.devices).forEach(([runtime, deviceList]) => {
            deviceList.forEach(device => {
                devices.push({
                    udid: device.udid,
                    name: device.name,
                    state: device.state,
                    runtime: runtime.replace('com.apple.CoreSimulator.SimRuntime.', '')
                });
            });
        });
        return devices;
    }
    async bootDevice(deviceId) {
        await execAsync(`xcrun simctl boot ${deviceId}`);
    }
    async shutdownDevice(deviceId) {
        await execAsync(`xcrun simctl shutdown ${deviceId}`);
    }
    async installApp(deviceId, appPath) {
        await execAsync(`xcrun simctl install ${deviceId} "${appPath}"`);
    }
    async launchApp(deviceId, bundleId) {
        await execAsync(`xcrun simctl launch ${deviceId} ${bundleId}`);
    }
}
