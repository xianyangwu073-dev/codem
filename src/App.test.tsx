import { describe, it, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

const cases: Array<{ key: string; label: string; index: number; no: string }> = [
  { key: 'feishu', label: '飞书现场', index: 0, no: '01' },
  { key: 'flow', label: '项目流程', index: 1, no: '02' },
  { key: 'codegen', label: '代码生成', index: 2, no: '03' },
  { key: 'collab', label: '智能协作', index: 3, no: '04' },
];

describe('App 能力标签与展示内容一一对应', () => {
  cases.forEach(({ key, label, index, no }) => {
    it(`点击第 ${index + 1} 个标签「${label}」展示对应内容，编号 ${no} 一致`, () => {
      const { container } = render(<App />);
      fireEvent.click(screen.getByTestId(`tab-${key}`));

      // 右侧标题与所点击标签对应
      const titleEl = container.querySelector('[data-testid="feature-title"]') as HTMLElement;
      expect(titleEl?.textContent).toBe(label);

      // SELECTED 编号 = SHOWING 编号 = i+1（两位补零）
      const selectedEl = container.querySelector('[data-testid="selected-no"]') as HTMLElement;
      const showingEl = container.querySelector('[data-testid="showing-no"]') as HTMLElement;
      expect(selectedEl?.textContent).toBe(`SELECTED ${no}`);
      expect(showingEl?.textContent).toBe(`SHOWING ${no}`);
      // 编号（去掉前缀后的数字）必须一致
      const selectedNo = selectedEl?.textContent?.replace(/.*\s/, '').trim();
      const showingNo = showingEl?.textContent?.replace(/.*\s/, '').trim();
      expect(selectedNo).toBe(no);
      expect(showingNo).toBe(no);
      expect(selectedNo).toBe(showingNo);
    });
  });

  it('四个标签各点一遍，依次一一对应', () => {
    const { container } = render(<App />);
    cases.forEach(({ key, label, no }) => {
      fireEvent.click(screen.getByTestId(`tab-${key}`));
      const titleEl = container.querySelector('[data-testid="feature-title"]') as HTMLElement;
      expect(titleEl?.textContent).toBe(label);
      const selectedEl = container.querySelector('[data-testid="selected-no"]') as HTMLElement;
      const showingEl = container.querySelector('[data-testid="showing-no"]') as HTMLElement;
      expect(selectedEl?.textContent).toBe(`SELECTED ${no}`);
      expect(showingEl?.textContent).toBe(`SHOWING ${no}`);
      const selectedNo = selectedEl?.textContent?.replace(/.*\s/, '').trim();
      const showingNo = showingEl?.textContent?.replace(/.*\s/, '').trim();
      expect(selectedNo).toBe(showingNo);
    });
  });
});
