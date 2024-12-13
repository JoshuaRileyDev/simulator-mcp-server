# iOS Simulator MCP Server

A Model Context Protocol (MCP) server that provides programmatic control over iOS simulators. This server implements the MCP specification to expose simulator functionality through a standardized interface.

## Features

- List available iOS simulators
- Boot and shutdown simulators
- Install .app bundles on simulators
- Launch installed apps by bundle ID

## Installation
Add the following to your Claude Config JSON file
```
{
  "mcpServers": {
    "simulator": {
      "command": "npx",
      "args": [
        "y",
        "@joshuarileydev/simulator-mcp-server"
      ]
    }
  }
}
```