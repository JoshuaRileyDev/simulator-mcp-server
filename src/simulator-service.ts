import { exec } from 'child_process';
import { promisify } from 'util';
import { SimulatorDevice } from './types.js';

const execAsync = promisify(exec);

export class SimulatorService {
  async listDevices(): Promise<SimulatorDevice[]> {
    const { stdout } = await execAsync('xcrun simctl list devices --json');
    const result = JSON.parse(stdout) as { devices: Record<string, any[]> };
    
    const devices: SimulatorDevice[] = [];
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

  async bootDevice(deviceId: string): Promise<void> {
    await execAsync(`xcrun simctl boot ${deviceId}`);
  }

  async shutdownDevice(deviceId: string): Promise<void> {
    await execAsync(`xcrun simctl shutdown ${deviceId}`);
  }

  async installApp(deviceId: string, appPath: string): Promise<void> {
    await execAsync(`xcrun simctl install ${deviceId} "${appPath}"`);
  }

  async launchApp(deviceId: string, bundleId: string): Promise<void> {
    await execAsync(`xcrun simctl launch ${deviceId} ${bundleId}`);
  }
} 