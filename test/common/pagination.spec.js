/* eslint-disable no-undef */
/* eslint-disable no-console */

import { paginate } from '@/common/pagination';

describe('PAGINATION', () => {
  it('default limit', () => {
    const req = {
      query: {},
    };

    paginate()(req, {}, () => {
      expect(req.limit).toBe(20);
    });
  });

  it('custom limit', () => {
    const req = {
      query: {},
    };

    paginate(5)(req, {}, () => {
      expect(req.limit).toBe(5);
    });
  });

  it('default page', () => {
    const req = {
      query: {},
    };

    paginate()(req, {}, () => {
      expect(req.page).toBe(1);
    });
  });

  it('custom page', () => {
    const req = {
      query: {
        page: 7,
      },
    };

    paginate()(req, {}, () => {
      expect(req.page).toBe(7);
    });
  });

  it('default offset', () => {
    const req = {
      query: {},
    };

    paginate()(req, {}, () => {
      expect(req.offset).toBe(0);
    });
  });

  it('offset with custom page', () => {
    const req = {
      query: {
        page: 8,
      },
    };

    paginate()(req, {}, () => {
      expect(req.offset).toBe(140);
    });
  });
});
