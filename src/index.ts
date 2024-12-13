#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { SimulatorService } from './simulator-service.js';

// Input schemas
const ListSimulatorsSchema = z.object({});

const BootSimulatorSchema = z.object({
  deviceId: z.string().describe("The UDID of the simulator to boot")
});

const ShutdownSimulatorSchema = z.object({
  deviceId: z.string().describe("The UDID of the simulator to shutdown")
});

const InstallAppSchema = z.object({
  deviceId: z.string().describe("The UDID of the target simulator"),
  appPath: z.string().describe("Path to the .app bundle to install")
});

const LaunchAppSchema = z.object({
  deviceId: z.string().describe("The UDID of the target simulator"),
  bundleId: z.string().describe("Bundle identifier of the app to launch")
});

// Initialize simulator service
const simulatorService = new SimulatorService();

// Initialize server
const server = new Server({
  name: "ios-simulator-server",
  version: "1.0.0"
}, {
  capabilities: {
    tools: {}
  }
});

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_simulators",
        description: "List all available iOS simulators",
        inputSchema: zodToJsonSchema(ListSimulatorsSchema)
      },
      {
        name: "boot_simulator",
        description: "Boot an iOS simulator",
        inputSchema: zodToJsonSchema(BootSimulatorSchema)
      },
      {
        name: "shutdown_simulator",
        description: "Shutdown an iOS simulator",
        inputSchema: zodToJsonSchema(ShutdownSimulatorSchema)
      },
      {
        name: "install_app",
        description: "Install an app on a simulator",
        inputSchema: zodToJsonSchema(InstallAppSchema)
      },
      {
        name: "launch_app",
        description: "Launch an installed app on a simulator",
        inputSchema: zodToJsonSchema(LaunchAppSchema)
      }
    ]
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    if (!request.params.arguments) {
      throw new Error("Arguments are required");
    }

    switch (request.params.name) {
      case "list_simulators": {
        const devices = await simulatorService.listDevices();
        return { toolResult: { devices } };
      }
      case "boot_simulator": {
        const args = BootSimulatorSchema.parse(request.params.arguments);
        await simulatorService.bootDevice(args.deviceId);
        return { toolResult: { success: true } };
      }
      case "shutdown_simulator": {
        const args = ShutdownSimulatorSchema.parse(request.params.arguments);
        await simulatorService.shutdownDevice(args.deviceId);
        return { toolResult: { success: true } };
      }
      case "install_app": {
        const args = InstallAppSchema.parse(request.params.arguments);
        await simulatorService.installApp(args.deviceId, args.appPath);
        return { toolResult: { success: true } };
      }
      case "launch_app": {
        const args = LaunchAppSchema.parse(request.params.arguments);
        await simulatorService.launchApp(args.deviceId, args.bundleId);
        return { toolResult: { success: true } };
      }
      default:
        throw new Error(`Unknown tool: ${request.params.name}`);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid arguments: ${error.message}`);
    }
    throw error;
  }
});

// Start the server
async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("iOS Simulator MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});