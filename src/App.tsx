import { useState } from 'react';

interface Feature {
  key: string;
  label: string;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    key: 'feishu',
    label: '飞书现场',
    title: '飞书现场',
    description: '在飞书群内直接驱动 CodeM 完成需求拆解、代码修改与评审，现场即写即改。',
    color: '#1e9bff',
  },
  {
    key: 'flow',
    label: '项目流程',
    title: '项目流程',
    description: '从需求到上线全流程闭环：建项、建工作项、改码、评审、合并、部署一气呵成。',
    color: '#2ea043',
  },
  {
    key: 'codegen',
    label: '代码生成',
    title: '代码生成',
    description: '基于上下文自动生成可编译、可测试的代码改动，并附带单元测试与类型校验。',
    color: '#db6d28',
  },
  {
    key: 'collab',
    label: '智能协作',
    title: '智能协作',
    description: '多 agent 协同：主 agent 拆解任务，子 agent 并行执行，结果汇总回流。',
    color: '#8957e5',
  },
];

function pad2(n: number): string {
  return n.toString().padStart(2, '0');
}

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // FIX: 下标直接用 selectedIndex，确保点击第 i 个标签展示第 i 个能力内容。
  const visibleFeature = features[selectedIndex];

  return (
    <div style={{ minHeight: '100vh', padding: 24 }}>
      <h1 style={{ marginBottom: 4 }}>CodeM</h1>
      <p style={{ color: '#8b949e', marginBottom: 24 }}>代码即对话，现场即交付</p>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {/* 左侧：能力标签 */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 140 }}>
          {features.map((f, i) => (
            <button
              key={f.key}
              onClick={() => setSelectedIndex(i)}
              data-testid={`tab-${f.key}`}
              style={{
                padding: '10px 14px',
                textAlign: 'left',
                cursor: 'pointer',
                border: '1px solid #30363d',
                background: selectedIndex === i ? f.color : '#161b22',
                color: selectedIndex === i ? '#fff' : '#c9d1d9',
                borderRadius: 6,
                fontWeight: selectedIndex === i ? 600 : 400,
              }}
            >
              {f.label}
            </button>
          ))}
        </nav>

        {/* 右侧：展示内容 */}
        <section
          data-testid="feature-panel"
          style={{
            flex: 1,
            padding: 20,
            borderRadius: 8,
            border: '1px solid #30363d',
            background: visibleFeature.color + '22',
            minHeight: 180,
          }}
        >
          <div style={{ display: 'flex', gap: 24, marginBottom: 12, fontFamily: 'monospace', color: '#8b949e' }}>
            <span data-testid="selected-no">SELECTED {pad2(selectedIndex + 1)}</span>
            <span data-testid="showing-no">SHOWING {pad2(selectedIndex + 1)}</span>
          </div>
          <h2 data-testid="feature-title" style={{ color: visibleFeature.color, marginBottom: 8 }}>
            {visibleFeature.title}
          </h2>
          <p data-testid="feature-desc" style={{ color: '#c9d1d9', lineHeight: 1.6 }}>
            {visibleFeature.description}
          </p>
        </section>
      </div>
    </div>
  );
}
