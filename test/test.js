const path = require('path');
const test = require('ava');
const sao = require('sao');

const generator = path.join(__dirname, '..');

test('defaults', async t => {
  const stream = await sao.mock({ generator });

  t.snapshot(stream.fileList, 'Generated files');
});
