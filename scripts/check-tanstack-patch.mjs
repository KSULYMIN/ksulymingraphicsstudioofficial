import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const requirements = [
  { name: '@tanstack/react-start', minimum: '1.168.60', paths: [join(root, 'node_modules', '@tanstack', 'react-start', 'package.json')] },
]

function compareVersions(left, right) {
  const a = left.split('.').map((part) => Number.parseInt(part, 10))
  const b = right.split('.').map((part) => Number.parseInt(part, 10))
  for (let index = 0; index < 3; index += 1) {
    const difference = (a[index] ?? 0) - (b[index] ?? 0)
    if (difference !== 0) return difference
  }
  return 0
}

let failed = false

for (const requirement of requirements) {
  let versions = []
  for (const file of requirement.paths) {
    try {
      versions.push(JSON.parse(readFileSync(file, 'utf8')).version)
    } catch {
      // A missing package is reported below as a failed version check.
    }
  }

  if (!versions.length) {
    console.error('FAIL missing installed package: ' + requirement.name)
    failed = true
    continue
  }

  for (const version of versions) {
    if (compareVersions(version, requirement.minimum) < 0) {
      console.error('FAIL ' + requirement.name + ' ' + version + ' < ' + requirement.minimum)
      failed = true
    } else {
      console.log('PASS ' + requirement.name + ' ' + version + ' >= ' + requirement.minimum)
    }
  }
}

const pnpmStore = join(root, 'node_modules', '.pnpm')
let serverCoreVersions = []
try {
  const packageDirs = readdirSync(pnpmStore).filter((entry) =>
    entry.startsWith('@tanstack+start-server-core@'),
  )
  for (const entry of packageDirs) {
    const packageFile = join(pnpmStore, entry, 'node_modules', '@tanstack', 'start-server-core', 'package.json')
    try {
      serverCoreVersions.push(JSON.parse(readFileSync(packageFile, 'utf8')).version)
    } catch {
      // Some store entries may be partial or unused; only inspect installed package manifests.
    }
  }
} catch {
  // Report a missing pnpm store below.
}

if (!serverCoreVersions.length) {
  console.error('FAIL no installed @tanstack/start-server-core package was found in the pnpm store')
  failed = true
} else {
  const uniqueVersions = [...new Set(serverCoreVersions)]
  for (const version of uniqueVersions) {
    if (compareVersions(version, '1.169.39') < 0) {
      console.error('FAIL @tanstack/start-server-core ' + version + ' < 1.169.39')
      failed = true
    } else {
      console.log('PASS @tanstack/start-server-core ' + version + ' >= 1.169.39')
    }
  }
}

if (failed) process.exit(1)
