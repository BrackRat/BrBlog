import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BlogCard from './BlogCard.vue';

// Mock composables
vi.mock('~/composables/formatTime', () => ({
  formatUnixTimestamp: vi.fn((t) => 'formatted-time'),
  formatUnixTimestampEasy: vi.fn((t) => 'easy-time'),
}));

// Mock Nuxt components
const NuxtImg = { template: '<img>' };
const Icon = { template: '<i></i>' };

describe('BlogCard.vue', () => {
  const mockArticle = {
    id: 1,
    title: 'Test Title',
    desc: 'Test Description',
    cover: 'test.jpg',
    tag: 'TestTag',
    publishTime: 1234567890,
    viewCount: 42,
  };

  it('renders article details correctly', () => {
    const wrapper = mount(BlogCard, {
      props: {
        article: mockArticle as any,
      },
      global: {
        stubs: {
          'nuxt-img': NuxtImg,
          'Icon': Icon,
        },
        mocks: {
          $router: {
            push: vi.fn(),
          },
        },
      },
    });

    expect(wrapper.text()).toContain('Test Title');
    expect(wrapper.text()).toContain('Test Description');
    expect(wrapper.text()).toContain('TestTag');
    expect(wrapper.text()).toContain('easy-time');
    expect(wrapper.text()).toContain('42');
  });

  it('navigates to article page on click', async () => {
    const push = vi.fn();
    const wrapper = mount(BlogCard, {
      props: {
        article: mockArticle as any,
      },
      global: {
        stubs: {
          'nuxt-img': NuxtImg,
          'Icon': Icon,
        },
        mocks: {
          $router: {
            push,
          },
        },
      },
    });

    await wrapper.trigger('click');
    expect(push).toHaveBeenCalledWith('/article/1');
  });
});
