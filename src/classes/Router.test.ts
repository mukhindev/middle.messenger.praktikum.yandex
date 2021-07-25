import { expect } from 'chai';
import Router from './Router';
import Block from './Block';

describe('Router', () => {
  const router = new Router('.app');

  class MainPage extends Block {}
  class AboutPage extends Block {}
  class BlogPage extends Block {}

  let callbackCounter: number = 0;

  router
    .setUnprotectedPaths(['/about'])
    .onRoute(() => {
      callbackCounter += 1;
    })
    .use('/', MainPage)
    .use('/about', AboutPage)
    .use('/blog', BlogPage)
    .start();

  it('Change route', () => {
    router.go('/');
    router.go('/about');
    expect(router.history.length).to.eq(3);
  });

  it('Get pathname', () => {
    router.go('/blog');
    const { pathname } = router.currentRoute || {};
    expect(pathname).to.eq('/blog');
  });

  it('Call onRoute', () => {
    expect(callbackCounter).to.eq(3);
  });
});
