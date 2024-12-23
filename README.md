# iOS Simulator MCP Server
[![smithery badge](https://smithery.ai/badge/@joshuarileydev/simulator-mcp-server)](https://smithery.ai/server/@joshuarileydev/simulator-mcp-server)

A Model Context Protocol (MCP) server that provides programmatic control over iOS simulators. This server implements the MCP specification to expose simulator functionality through a standardized interface.

## Features

- List available iOS simulators
- Boot and shutdown simulators
- Install .app bundles on simulators
- Launch installed apps by bundle ID

## Installation

### Installing via Smithery

To install iOS Simulator Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@joshuarileydev/simulator-mcp-server):

```bash
npx -y @smithery/cli install @joshuarileydev/simulator-mcp-server --client claude
```

### Installing Manually
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
