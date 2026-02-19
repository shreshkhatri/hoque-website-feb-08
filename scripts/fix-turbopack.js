#!/usr/bin/env node
import { execSync } from 'child_process';
import { rmSync, existsSync } from 'fs';
import { resolve } from 'path';

console.log('[v0] Clearing Next.js cache and dependencies...');

try {
  // Remove .next cache
  const nextDir = resolve(process.cwd(), '.next');
  if (existsSync(nextDir)) {
    rmSync(nextDir, { recursive: true, force: true });
    console.log('[v0] Removed .next cache');
  }

  // Remove node_modules
  const nodeModulesDir = resolve(process.cwd(), 'node_modules');
  if (existsSync(nodeModulesDir)) {
    rmSync(nodeModulesDir, { recursive: true, force: true });
    console.log('[v0] Removed node_modules');
  }

  // Reinstall dependencies
  console.log('[v0] Reinstalling dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('[v0] Successfully fixed Turbopack error');
} catch (error) {
  console.error('[v0] Error:', error.message);
  process.exit(1);
}
