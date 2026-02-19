#!/bin/bash
set -e

echo "Cleaning up Next.js cache and node_modules..."
rm -rf .next
rm -rf node_modules
rm -rf .turbopack

echo "Reinstalling dependencies..."
npm install

echo "Cache cleaned and dependencies reinstalled successfully!"
