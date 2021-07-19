import { assert } from 'chai';
import { convertKeysToCamelCase, convertKeysToSnakeCase } from './keysConverter';

describe('KeysConverter', () => {
  it('Map object keys from snake_case to camelCase', () => {
    assert.deepEqual(
      convertKeysToCamelCase({
        name: 'Sergey',
        second_name: 'Mukhin',
        is_active_account: true,
      }),
      {
        name: 'Sergey',
        secondName: 'Mukhin',
        isActiveAccount: true,
      },
    );
  });

  it('Map object keys from camelCase to camelCase', () => {
    assert.deepEqual(
      convertKeysToSnakeCase({
        name: 'Sergey',
        secondName: 'Mukhin',
        isActiveAccount: true,
      }),
      {
        name: 'Sergey',
        second_name: 'Mukhin',
        is_active_account: true,
      },
    );
  });
});
