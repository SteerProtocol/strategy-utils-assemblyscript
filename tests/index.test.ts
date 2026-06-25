const fs = require('fs');
const os = require('os');
const { execFileSync } = require('child_process');
const loader = require('@assemblyscript/loader');
const path = require('path');

describe('AssemblyScript package surface', () => {
  it('compiles the package with the modern AssemblyScript toolchain', () => {
    execFileSync('npm', ['run', 'asbuild'], {
      cwd: path.resolve(__dirname, '..'),
      stdio: 'pipe',
    });
  });

  it('compiles a Panoptic consumer using exported DTOs and wrappers', () => {
    execFileSync(
      path.resolve(__dirname, '../node_modules/.bin/asc'),
      [path.resolve(__dirname, 'fixtures/panoptic-consumer.ts'), '--config', path.resolve(__dirname, '../asconfig.json'), '--noEmit'],
      {
        cwd: path.resolve(__dirname, '..'),
        stdio: 'pipe',
      },
    );
  });

  it('preserves json-as runtime compatibility for legacy prices and dynamic Merkle proof keys', () => {
    const repoRoot = path.resolve(__dirname, '..');
    const wasmPath = path.join(os.tmpdir(), 'strategy-utils-json-compat.fixture.wasm');

    execFileSync(
      path.resolve(repoRoot, 'node_modules/.bin/asc'),
      [
        path.resolve(__dirname, 'fixtures/json-compat.ts'),
        '--config',
        path.resolve(repoRoot, 'asconfig.json'),
        '--outFile',
        wasmPath,
        '--exportRuntime',
      ],
      {
        cwd: repoRoot,
        stdio: 'pipe',
      },
    );

    const wasm = loader.instantiateSync(fs.readFileSync(wasmPath), {});
    const { parseStringifiedPrices, roundTripMerkleProofActions, __getString, __newString } = wasm.exports;

    expect(__getString(parseStringifiedPrices())).toBe('ok');

    const input = JSON.stringify({
      leafs: [],
      proofsByAction: {
        approveToken: ['0xaaa'],
        rebalanceVault: ['0xbbb', '0xccc'],
      },
      proofsByDigest: {
        '0x111': ['0xddd'],
      },
    });

    const output = JSON.parse(__getString(roundTripMerkleProofActions(__newString(input))));
    expect(output.approveToken).toStrictEqual(['0xaaa']);
    expect(output.rebalanceVault).toStrictEqual(['0xbbb', '0xccc']);
  });
});
