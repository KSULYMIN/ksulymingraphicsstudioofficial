import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const requirements = [
  { name: '@tanstack/react-start', minimum: '1.168.60' },
  { name: '@tanstack/start-server-core', minimum: '1.169.39' },
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
  let version
  try {
    version = JSON.parse(
      readFileSync(join(process.cwd(), 'node_modules', requirement.name, 'package.json'), 'utf8'),
    ).version
  } catch {
    console.error('FAIL missing package: ' + requirement.name)
    failed = true
    continue
  }
  if (compareVersions(version, requirement.minimum) < 0) {
    console.error('FAIL ' + requirement.name + ' ' + version + ' < ' + requirement.minimum)
    failed = true
  } else {
    console.log('PASS ' + requirement.name + ' ' + version + ' >= ' + requirement.minimum)
  }
}
if (failed) process.exit(1)
