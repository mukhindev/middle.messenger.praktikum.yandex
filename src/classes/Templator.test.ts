import { assert } from 'chai';
import Templator from './Templator';

describe('Templator', () => {
  it('Compile template', () => {
    const { compile } = new Templator();
    assert.equal(
      compile(() => '<div class="{{ className }}">{{ user.name }}<div>', {
        className: 'user',
        user: { name: 'Sergey' },
      }),
      '<div class="user">Sergey<div>',
    );
  });
});
