const { execFileSync } = require('child_process');
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
});
