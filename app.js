/**
 * 30天粤语入门助手 - PWA 版主逻辑
 * 7个视图：home / daily / sentences / scenes / resources / audio / progress
 * 底部 Tab 4个 + 首页快捷入口进入二级视图
 */
// 浏览器：data.js 定义全局 window.DATA；Node 测试：从 require 获取
const APP_DATA = (typeof window !== 'undefined' && window.DATA) ? window.DATA : (typeof require !== 'undefined' ? require('./data.js') : null);
// 浏览器：storage.js 定义全局 window.Storage（带 get 方法标记）；Node 测试：从 require 获取
const Storage = (typeof window !== 'undefined' && window.Storage && window.Storage.get) ? window.Storage : (typeof require !== 'undefined' ? require('./storage.js') : null);

// ---------- 全局状态 ----------
let currentView = 'home';
let currentDay = 1;
let sceneExpanded = null;
let sceneTab = 0;
let checkinRatings = { pron: 3, listen: 3, speak: 3 };

// ---------- 工具 ----------
function $(sel) { return document.querySelector(sel); }
function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstChild;
}
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.add('hidden'), 1800);
}
function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => toast('已复制'));
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    toast('已复制');
  }
}

/* ============ 优化3：TTS 粤语发音（Web Speech API） ============ */
let ttsSupported = false;
let ttsVoice = null;
(function initTTS() {
  try {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      ttsSupported = true;
      const tryLoad = () => {
        const voices = window.speechSynthesis.getVoices();
        const preferred = ['zh-HK', 'yue', 'yue-Hant-HK', 'zh-Hant-HK', 'zh-TW', 'zh-CN'];
        for (const lang of preferred) {
          const found = voices.find((v) => v.lang && v.lang.toLowerCase().indexOf(lang.toLowerCase()) !== -1);
          if (found) { ttsVoice = found; break; }
        }
      };
      tryLoad();
      window.speechSynthesis.onvoiceschanged = tryLoad;
    }
  } catch (e) { /* TTS 不可用时静默降级 */ }
})();

/** 朗读粤语文本（Web Speech API）；不支持时复制文本兜底 */
function speak(text) {
  if (!ttsSupported) {
    toast('当前浏览器不支持语音朗读，已复制文本');
    copyText(text);
    return;
  }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = (ttsVoice && ttsVoice.lang) || 'zh-HK';
  u.rate = 0.8; // 稍慢便于跟读
  if (ttsVoice) u.voice = ttsVoice;
  window.speechSynthesis.speak(u);
  toast('🔊 播放中（效果依赖系统粤语语音）');
}

/* ============ 优化4：词卡闭环（内置闪卡 + 正确率统计） ============ */
const CARDS = (typeof window !== 'undefined' && window.WORDCARDS) ? window.WORDCARDS : (typeof require !== 'undefined' ? require('./wordcards.js') : []);
let cardSession = { deck: [], idx: 0, correct: 0, total: 0, flipped: false, mode: 'learn' }; // mode: learn / quiz

/** 获取词卡统计（累计正确率，存 localStorage） */
function getCardStats() {
  try {
    return JSON.parse(localStorage.getItem('cantonese30_cardstats')) || { correct: 0, total: 0 };
  } catch (e) { return { correct: 0, total: 0 }; }
}
function saveCardStats(correct, total) {
  localStorage.setItem('cantonese30_cardstats', JSON.stringify({ correct, total }));
}

/** 开始词卡练习：从指定分类（或全部）抽卡 */
function startCards(cat) {
  let deck = cat ? CARDS.filter((c) => c.cat === cat) : CARDS.slice();
  if (!deck.length) deck = CARDS.slice();
  // 洗牌
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  cardSession = { deck, idx: 0, correct: 0, total: 0, flipped: false, mode: 'learn' };
  // 每张卡附重现计数（learn 模式"不认识"放回队尾用，最多重现2次防无限循环）
  cardSession.deck = cardSession.deck.map((c) => Object.assign({}, c, { _repeats: 0 }));
  currentView = 'cards';
  render();
}

/** 翻卡 */
function flipCard() {
  cardSession.flipped = !cardSession.flipped;
  render();
}

/** 标记"认识/不认识"（learn 模式）或"正确/错误"（quiz 模式） */
function answerCard(known) {
  const s = cardSession;
  const stats = getCardStats();
  if (s.mode === 'quiz') {
    s.correct += known ? 1 : 0;
    s.total += 1;
    saveCardStats(stats.correct + (known ? 1 : 0), stats.total + 1);
    s.idx++;
  } else {
    // learn 模式：认识则移出队列（跳过）；不认识则放回队尾稍后再见
    s.correct += known ? 1 : 0;
    s.total += 1;
    const cur = s.deck[s.idx];
    if (known) {
      s.idx++;
    } else if (cur && cur._repeats < 2) {
      // 放回队尾，重现计数+1；最多重现2次，保证本轮有终局
      cur._repeats += 1;
      s.deck.splice(s.idx, 1);
      s.deck.push(cur);
      // idx 不变（下一张补位到当前位置）
    } else {
      // 已重现2次仍不认识 → 放行（本轮结束条件）
      s.idx++;
    }
  }
  s.flipped = false;
  if (s.idx >= s.deck.length) {
    // 本轮结束（learn 模式：每张卡最多重现2次，保证有终局）
    const rate = Math.round((s.correct / s.total) * 100);
    cardSession.done = true;
    cardSession.rate = rate;
  }
  render();
}

/** 词卡模式切换 */
function setCardMode(mode) { cardSession.mode = mode; cardSession.idx = 0; cardSession.correct = 0; cardSession.total = 0; cardSession.flipped = false; cardSession.done = false; render(); }

/* ============ 优化5：30天后衔接（Day31+ 输入累积期） ============ */
const PHASE2 = {
  title: 'Day31+ 输入累积期',
  subtitle: '30天入门完成后的第二阶段（3-6个月达日常会话基本流利）',
  plan: [
    { icon: '🎧', name: '每日听力30分钟', detail: '通勤/晚间泛听+精听，保持语感不断档' },
    { icon: '🗣', name: '每周2次语伴对话', detail: 'iTalki/Preply 真人课，或语伴/社群练习' },
    { icon: '📖', name: '每周1篇材料精读', detail: '新闻/文章精读，扩充词汇与句式' },
    { icon: '🔁', name: '每周1次录音对比', detail: '录自己 vs 母语者，回听纠音' },
    { icon: '📈', name: '每月1次阶段性自测', detail: '复测30天周测/终测，跟踪进步' }
  ],
  targets: [
    '听懂正常语速日常对话',
    '能完成生活场景自由对话',
    '发音明显更自然（可识别口音但清晰）',
    '跟唱粤语歌、看剧半字幕'
  ],
  warn: '目标 3-6 个月：不追求速成，保持每周 4-5 次、每次 30-45 分钟即可。'
};

// ---------- 视图渲染 ----------
const VIEWS = {
  /* 词卡练习视图 */
  cards() {
    const s = cardSession;
    if (s.done) {
      return `
      <div class="card" style="text-align:center;padding:40px 20px">
        <div style="font-size:52px">🎉</div>
        <div class="day-theme">本轮完成！</div>
        <div class="day-target" style="margin-top:12px">正确 ${s.correct}/${s.total} · 正确率 <b style="color:var(--primary)">${s.rate}%</b></div>
        <div class="progress-bar" style="margin-top:16px"><div class="progress-fill" style="width:${s.rate}%"></div></div>
        <div style="margin-top:24px;display:flex;gap:10px;flex-direction:column">
          <button class="btn-primary" onclick="startCards(null)">再练一轮（全部）</button>
          <button class="btn-secondary" onclick="goView('cards')">返回词卡首页</button>
        </div>
      </div>`;
    }
    const card = s.deck[s.idx];
    if (!card) {
      return `<div class="empty">暂无词卡，请先刷新页面</div>`;
    }
    const stats = getCardStats();
    const totalRate = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0;
    return `
    <div class="card" style="text-align:center;padding:20px">
      <div class="row">
        <span class="tag tag-blue">${esc(card.cat)}</span>
        <span class="tag">${s.idx + 1} / ${s.deck.length}</span>
        <span class="tag tag-green">正确率 ${totalRate}%（累计）</span>
      </div>
      <div class="card-face ${s.flipped ? 'flipped' : ''}" onclick="flipCard()">
        ${s.flipped ? `
          <div style="font-size:17px;color:var(--text-muted)">${esc(card.jyutping)}</div>
          <div style="font-size:34px;font-weight:800;margin-top:10px">${esc(card.word)}</div>
          <div style="font-size:18px;color:var(--text-sub);margin-top:12px">${esc(card.meaning)}</div>
        ` : `
          <div style="font-size:17px;color:var(--text-muted)">点击翻面查看</div>
          <div style="font-size:40px;font-weight:800;margin-top:10px">${esc(card.word)}</div>
          <div style="font-size:15px;color:var(--text-muted);margin-top:8px">🔊 点喇叭听发音</div>
        `}
      </div>
      <div style="display:flex;gap:10px;margin-top:20px;justify-content:center">
        <span class="speak-btn" onclick="speak('${esc(card.word).replace(/'/g, "\\'")}')">🔊</span>
        <button class="btn-secondary" onclick="answerCard(false)" style="flex:1">不认识</button>
        <button class="btn-primary" onclick="answerCard(true)" style="flex:1">认识 ✓</button>
      </div>
      <div style="margin-top:14px;font-size:12px;color:var(--text-muted)">
        ${s.mode === 'quiz' ? '测验模式：答对计入正确率' : '学习模式：认识的移出队列，不认识的会再出现'}
      </div>
    </div>
    <div class="card">
      <div class="card-title">词卡模式</div>
      <div class="test-btns">
        <button class="test-btn ${s.mode === 'learn' ? 'pass-btn' : 'fail-btn'}" onclick="setCardMode('learn')">学习模式</button>
        <button class="test-btn ${s.mode === 'quiz' ? 'pass-btn' : 'fail-btn'}" onclick="setCardMode('quiz')">测验模式</button>
      </div>
    </div>
    `;
  },

  /* Day31+ 衔接视图 */
  phase2() {
    return `
    <div class="card intro audio-intro" style="background:linear-gradient(135deg,#7C3AED,#A78BFA)">
      <div class="intro-title">📅 ${esc(PHASE2.title)}</div>
      <div class="intro-sub">${esc(PHASE2.subtitle)}</div>
    </div>
    <div class="card">
      <div class="card-title">🗓 每周节奏</div>
      ${PHASE2.plan.map((p, i) => `
        <div class="time-item">
          <span class="time-slot">${p.icon} ${esc(p.name)}</span>
          <span class="time-task">${esc(p.detail)}</span>
        </div>`).join('')}
    </div>
    <div class="card">
      <div class="card-title">🎯 阶段目标（3-6个月）</div>
      ${PHASE2.targets.map((t) => `<div class="today-task">· ${esc(t)}</div>`).join('')}
      <div class="hint" style="margin-top:14px">⚠️ ${esc(PHASE2.warn)}</div>
    </div>
    <div class="card backup-card">
      <div class="label">🔁 继续用 30 天计划？</div>
      <div class="backup-btns">
        <button class="btn-secondary" onclick="goView('daily')">回到 Day 任务</button>
        <button class="btn-secondary" onclick="startCards(null)">练词卡保持语感</button>
      </div>
    </div>
    `;
  },

  home() {
    const day = Storage.getCurrentDay();
    const info = APP_DATA.days[day - 1];
    const week = APP_DATA.weeks[info.week - 1];
    const done = Storage.isDone(day);
    const stats = Storage.getStats();
    const favCount = (Storage.get().favorites || []).length;

    return `
    <div class="hero">
      <div class="hero-date">${Storage.today()}</div>
      <div class="hero-title">${esc(APP_DATA.meta.name)}</div>
      <div class="hero-sub">第 ${day} 天 / 共 30 天 · 🔥连续 ${stats.streak} 天</div>
    </div>

    <div class="card today-card" onclick="goDaily()">
      <div class="today-head">
        <span class="today-day">Day ${day} · ${esc(week.theme)}</span>
        <span class="today-status">${done ? '✅ 已完成' : '▶ 开始今日学习'}</span>
      </div>
      <div class="today-theme">${esc(info.theme)}</div>
      <div class="today-target">🎯 ${esc(info.target)}</div>
      <div class="progress-bar"><div class="progress-fill" style="width:${done ? 100 : 0}%"></div></div>
      <div class="today-tasks">${info.tasks.map((t) => `<div class="today-task">· ${esc(t)}</div>`).join('')}</div>
    </div>

    <div class="grid">
      <div class="grid-item" onclick="goView('scenes')"><div class="grid-icon">🗣</div><div>场景对话</div></div>
      <div class="grid-item" onclick="goView('audio')"><div class="grid-icon">🎧</div><div>听书素材</div></div>
      <div class="grid-item" onclick="startCards(null)"><div class="grid-icon">🃏</div><div>词卡练习</div></div>
      <div class="grid-item" onclick="goView('resources')"><div class="grid-icon">📚</div><div>学习资源</div></div>
      <div class="grid-item" onclick="goView('phase2')"><div class="grid-icon">📅</div><div>Day31+</div></div>
      <div class="grid-item" onclick="goView('progress')"><div class="grid-icon">📊</div><div>我的进度</div></div>
    </div>

    <div class="card">
      <div class="row"><span class="label">30天总进度</span><span class="value">${stats.rate}%</span></div>
      <div class="progress-bar"><div class="progress-fill" style="width:${stats.rate}%"></div></div>
      <div class="stats-row">
        <div class="stat"><div class="stat-num">${stats.totalDone}</div><div>打卡天数</div></div>
        <div class="stat"><div class="stat-num">${stats.streak}</div><div>连续天数</div></div>
        <div class="stat"><div class="stat-num">${stats.words}</div><div>累计词数</div></div>
        <div class="stat"><div class="stat-num">${stats.sentences}</div><div>累计句数</div></div>
      </div>
    </div>

    <div class="card">
      <div class="row"><span class="label">当前阶段 · ${esc(week.theme)}</span><span class="tag">${week.days}</span></div>
      <div class="week-goal">${esc(week.goal)}</div>
      <div>${week.keywords.map((k) => `<span class="tag tag-blue">${esc(k)}</span>`).join('')}</div>
    </div>

    <div class="card">
      <div class="label">三条铁律</div>
      ${APP_DATA.meta.core_rules.map((r) => `<div class="rule">· ${esc(r)}</div>`).join('')}
    </div>

    <div class="card backup-card">
      <div class="label">💾 数据备份（收藏 ${favCount} 句）</div>
      <div class="backup-btns">
        <button class="btn-secondary" onclick="backupData()">⬇ 导出备份</button>
        <button class="btn-secondary" onclick="document.getElementById('import-file').click()">⬆ 导入备份</button>
      </div>
      <div class="backup-hint">换手机/清缓存前先导出，新设备导入即可恢复进度</div>
    </div>
    `;
  },

  daily() {
    const info = APP_DATA.days[currentDay - 1];
    const week = APP_DATA.weeks[info.week - 1];
    const checks = Storage.getTaskChecks(currentDay);
    const done = Storage.isDone(currentDay);
    const allChecked = info.tasks.length > 0 && checks.length === info.tasks.length && checks.every(Boolean);
    const testDays = { 7: 0, 14: 1, 21: 2, 30: 3 };
    const isTest = testDays[currentDay] !== undefined;
    const test = isTest ? APP_DATA.weekly_tests[testDays[currentDay]] : null;

    return `
    <div class="day-nav">
      <div class="nav-btn ${currentDay <= 1 ? 'nav-disabled' : ''}" onclick="prevDay()">‹</div>
      <div class="nav-title">
        <div class="nav-day">Day ${currentDay}</div>
        <div class="nav-week">${esc(week.theme)} · 第${info.week}周</div>
      </div>
      <div class="nav-btn ${currentDay >= 30 ? 'nav-disabled' : ''}" onclick="nextDay()">›</div>
    </div>

    ${isTest ? `<div class="test-banner" onclick="goView('progress')">📝 今日为周测日：${esc(test.content)}<div class="test-line">合格线：${esc(test.pass_line)} → 去完成</div></div>` : ''}
    ${done ? '<div class="done-banner">✅ 已完成今日打卡，明天继续加油！</div>' : ''}

    <div class="card">
      <div class="day-theme">${esc(info.theme)}</div>
      <div class="day-target">🎯 目标：${esc(info.target)}</div>
      ${info.note ? `<div class="day-note">💡 ${esc(info.note)}</div>` : ''}
    </div>

    <div class="card">
      <div class="card-title">今日任务</div>
      ${info.tasks.map((t, i) => `
        <div class="task-item" onclick="toggleTask(${i})">
          <div class="checkbox ${checks[i] ? 'checked' : ''}">${checks[i] ? '✓' : ''}</div>
          <div class="task-text ${checks[i] ? 'task-done' : ''}">${esc(t)}</div>
        </div>`).join('')}
    </div>

    <div class="card">
      <div class="card-title">⏱ 每日60分钟分配</div>
      ${APP_DATA.daily_time_plan.map((s) => `
        <div class="time-item">
          <span class="time-slot">${esc(s.slot)}</span>
          <span class="time-min">${esc(s.minutes)}分钟</span>
          <span class="time-task">${esc(s.task)}</span>
        </div>`).join('')}
    </div>

    <div class="footer">
      <button class="btn-primary ${done ? 'disabled' : ''}" onclick="${done ? '' : 'openCheckin()'}">${done ? '今日已完成' : (allChecked ? '✅ 完成今日打卡' : '完成今日打卡')}</button>
    </div>
    `;
  },

  sentences() {
    const cats = ['全部', ...APP_DATA.sentences.map((s) => s.category).filter((v, i, a) => a.indexOf(v) === i)];
    return `
    <div class="search-bar"><input id="sent-search" placeholder="搜索：粤语 / 中文 / 用法" oninput="renderSentences()"></div>
    <div class="cats">
      ${cats.map((c) => `<span class="cat ${c === sentCat ? 'cat-active' : ''}" onclick="setSentCat('${esc(c)}')">${esc(c)}</span>`).join('')}
    </div>
    <div class="list" id="sent-list"></div>
    `;
  },

  scenes() {
    const scenes = APP_DATA.scenes.slice().sort((a, b) => a.order - b.order);
    let done = Storage.get().sceneDone || [];
    if (!Array.isArray(done)) done = [];
    return `
    <div class="card intro">
      <div>🗣 5大生活场景实战练习（第4周 Day 22-30）</div>
      <div class="intro-sub">点击场景卡片展开：必会句 / 对话跟读 / 练习指南</div>
    </div>
    ${scenes.map((s) => renderSceneCard(s, done)).join('')}
    `;
  },

  audio() {
    const all = APP_DATA.audiobooks || [];
    const levels = ['入门', '中级', '中高级'];
    const groups = levels.map((lv) => ({
      level: lv,
      items: all.filter((a) => a.difficulty === lv)
    })).filter((g) => g.items.length);
    const rest = all.filter((a) => !levels.includes(a.difficulty));
    if (rest.length) groups.push({ level: '通用', items: rest });
    const total = all.length;

    return `
    <div class="card intro audio-intro">
      <div class="intro-title">🎧 听书 · 听力素材库</div>
      <div class="intro-sub">按难度分级，循序渐进磨耳朵。共 ${total} 类素材。</div>
      <div class="intro-tips">
        <div class="tip-line">🌱 入门：第1-2周使用，语速慢、词汇简单</div>
        <div class="tip-line">🌿 中级：第3周起使用，贴近生活口语</div>
        <div class="tip-line">🌳 中高级：第3-4周使用，地道表达磨耳朵</div>
      </div>
    </div>
    ${groups.map((g) => `
      <div class="section-title">${g.level}</div>
      ${g.items.map((a) => `
        <div class="card audio-card">
          <div class="audio-head">
            <span class="tag ${a.difficulty === '入门' ? 'tag-green' : (a.difficulty === '中级' ? 'tag-blue' : 'tag-gray')}">${esc(a.type)}</span>
            <button class="copy-btn" onclick="copyText('${esc(a.name).replace(/'/g, "\\'")}')">复制</button>
          </div>
          <div class="audio-name">${esc(a.name)}</div>
          <div class="audio-desc">${esc(a.description)}</div>
          <div class="audio-usage">📖 ${esc(a.usage)}</div>
        </div>`).join('')}
    `).join('')}
    <div class="card tip">💡 听力素材在精不在多：每个难度选1-2个持续听，比每天换新素材更有效。先泛听抓大意，再精听跟读。</div>
    `;
  },

  resources() {
    return `
    <div class="card principle">
      <div class="principle-title">📌 资源使用原则</div>
      <div class="principle-text">${esc(APP_DATA.resources.principle)}</div>
    </div>
    <div class="section-title">免费（先用满）</div>
    ${APP_DATA.resources.free.map((r) => `
      <div class="card res-card">
        <div class="res-head"><span class="tag tag-green">${esc(r.type)}</span>
          <button class="copy-btn" onclick="copyText('${esc(r.name).replace(/'/g, "\\'")}')">复制</button></div>
        <div class="res-name">${esc(r.name)}</div>
        <div class="res-usage">${esc(r.usage)}</div>
      </div>`).join('')}
    <div class="section-title">付费（有预算再上）</div>
    ${APP_DATA.resources.paid.map((r) => `
      <div class="card res-card">
        <div class="res-head"><span class="tag tag-blue">${esc(r.type)}</span>
          <button class="copy-btn" onclick="copyText('${esc(r.name).replace(/'/g, "\\'")}')">复制</button></div>
        <div class="res-name">${esc(r.name)}</div>
        <div class="res-usage">${esc(r.usage)}</div>
      </div>`).join('')}
    <div class="section-title">🎧 听书 · 听力素材（${(APP_DATA.audiobooks || []).length}类）</div>
    <div class="card audio-entry" onclick="goView('audio')">
      <div>
        <div class="audio-entry-title">分级听力素材库</div>
        <div class="audio-entry-sub">入门 · 中级 · 中高级 —— 点击查看完整分级与使用建议</div>
      </div>
      <div class="audio-entry-arrow">›</div>
    </div>
    <div class="card tip">💡 资源在精不在多：1门发音课 + 1本教材 + 1个字典 + 1个听力源，足够撑完30天。</div>
    `;
  },

  progress() {
    const stats = Storage.getStats();
    const current = Storage.getCurrentDay();
    const completedRaw = Storage.get().completedDays || [];
    const completed = Array.isArray(completedRaw) ? completedRaw : [];
    const doneSet = {};
    completed.forEach((d) => { doneSet[d] = true; });
    const cal = [];
    for (let i = 1; i <= 30; i++) {
      let status = 'missed';
      if (doneSet[i]) status = 'done';
      if (i === current) status = 'today';
      cal.push({ day: i, status, isTest: [7, 14, 21, 30].includes(i) });
    }
    const tests = Storage.get().weeklyTests || {};

    return `
    <div class="card stats-card">
      <div class="stats-title">📊 学习统计</div>
      <div class="stats-grid">
        <div class="stat-box"><div class="stat-big">${stats.totalDone}/30</div><div>打卡天数</div></div>
        <div class="stat-box"><div class="stat-big">${stats.streak}</div><div>连续天数 🔥</div></div>
        <div class="stat-box"><div class="stat-big">${stats.rate}%</div><div>完成率</div></div>
        <div class="stat-box"><div class="stat-big">${stats.words}</div><div>累计词数</div></div>
        <div class="stat-box"><div class="stat-big">${stats.sentences}</div><div>累计句数</div></div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">🗓 30天打卡日历</div>
      <div class="cal-grid">
        ${cal.map((c) => `<div class="cal-cell ${c.status}" onclick="goDay(${c.day})"><span>${c.day}</span>${c.isTest ? '<em>测</em>' : ''}</div>`).join('')}
      </div>
      <div class="cal-legend">
        <span class="legend-item"><i class="legend-box done"></i>已打卡</span>
        <span class="legend-item"><i class="legend-box today"></i>今天</span>
        <span class="legend-item"><i class="legend-box missed"></i>未打卡</span>
        <span class="legend-item"><i class="legend-box test"></i>周测日</span>
      </div>
      <div class="hint-tip">点击日期可查看/补打当日任务</div>
    </div>

    <div class="card">
      <div class="card-title">📝 4次周测</div>
      ${APP_DATA.weekly_tests.map((t, idx) => {
        const day = [7, 14, 21, 30][idx];
        const status = tests[idx + 1];
        return `
        <div class="test-card">
          <div class="test-head">
            <span class="tag tag-blue">第${idx + 1}周 · Day ${day}</span>
            ${status === 'passed' ? '<span class="test-status pass">✅ 通过</span>' : (status === 'failed' ? '<span class="test-status fail">❌ 未通过</span>' : '')}
          </div>
          <div class="test-content">${esc(t.content)}</div>
          <div class="test-line">合格线：${esc(t.pass_line)}</div>
          ${status !== 'passed' ? `
            <div class="test-btns">
              <button class="test-btn pass-btn" onclick="markTest(${idx + 1}, 'passed')">标记通过</button>
              <button class="test-btn fail-btn" onclick="markTest(${idx + 1}, 'failed')">未通过</button>
            </div>` : ''}
        </div>`;
      }).join('')}
    </div>

    <div class="card">
      <div class="card-title">🏁 30天终测（Day 30）</div>
      ${APP_DATA.final_test.map((f) => `
        <div class="final-item">
          <div class="final-name">${esc(f.item)}</div>
          <div class="final-content">${esc(f.content)}</div>
          <div class="final-line">合格线：${esc(f.pass_line)}</div>
        </div>`).join('')}
    </div>

    <div class="card warn">
      <div class="warn-title">⚠️ 30天明确不达标项（别焦虑）</div>
      ${APP_DATA.not_expected_in_30_days.map((n) => `<div class="warn-item">· ${esc(n)}</div>`).join('')}
      <div class="warn-sub">这些需要3-6个月持续学习，30天做到"入门"已很棒！</div>
    </div>
    `;
  }
};

// ---------- 渲染入口 ----------
function render() {
  const view = $('#view');
  view.innerHTML = VIEWS[currentView] ? VIEWS[currentView]() : VIEWS.home();
  // sentences 视图：DOM 就绪后填充句型列表（避免拼接时 #sent-list 尚不存在）
  if (currentView === 'sentences') {
    renderSentences();
  }
  // 更新 Tab 高亮
  document.querySelectorAll('.tab').forEach((t) => {
    t.classList.toggle('active', t.dataset.view === currentView);
  });
  // 更新头部
  const titles = { home: '30天粤语入门', daily: '每日任务', sentences: '句型速查', scenes: '场景对话', audio: '听书素材', resources: '学习资源', progress: '我的进度', cards: '词卡练习', phase2: 'Day31+ 衔接' };
  $('#header-title').textContent = titles[currentView] || '30天粤语入门助手';
  // 二级页隐藏 Tab 高亮（不属 Tab）
  if (['scenes', 'audio', 'resources', 'cards', 'phase2'].includes(currentView)) {
    document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
  }
  window.scrollTo(0, 0);
}

function goView(view) {
  currentView = view;
  render();
}

function goDaily() {
  currentDay = Storage.getCurrentDay();
  currentView = 'daily';
  render();
}

function goDay(day) {
  currentDay = day;
  currentView = 'daily';
  render();
}

function prevDay() { if (currentDay > 1) { currentDay--; render(); } }
function nextDay() { if (currentDay < 30) { currentDay++; render(); } }

function toggleTask(i) {
  const checks = Storage.getTaskChecks(currentDay).slice();
  checks[i] = !checks[i];
  Storage.saveTaskChecks(currentDay, checks);
  render();
}

// ---------- 打卡 ----------
function openCheckin() {
  const info = APP_DATA.days[currentDay - 1];
  const checks = Storage.getTaskChecks(currentDay);
  const allChecked = info.tasks.length > 0 && checks.length === info.tasks.length && checks.every(Boolean);
  if (!allChecked) { toast('请先完成今日任务再打卡'); return; }
  $('#checkin-mask').classList.remove('hidden');
  $('#checkin-panel').classList.remove('hidden');
  $('#ci-words').value = '';
  $('#ci-sentences').value = '';
  $('#ci-minutes').value = 60;
  $('#ci-mood').value = '';
  checkinRatings = { pron: 3, listen: 3, speak: 3 };
  renderStars();
}

function closeCheckin() {
  $('#checkin-mask').classList.add('hidden');
  $('#checkin-panel').classList.add('hidden');
}

function renderStars() {
  [['ci-pron', 'pron'], ['ci-listen', 'listen'], ['ci-speak', 'speak']].forEach(([id, key]) => {
    document.getElementById(id).innerHTML = [1, 2, 3, 4, 5].map((n) =>
      `<span class="star ${checkinRatings[key] >= n ? 'on' : ''}" onclick="setRating('${key}', ${n})">★</span>`).join('');
  });
}

function setRating(key, value) {
  checkinRatings[key] = value;
  renderStars();
}

function submitCheckin() {
  // 校验：任务未全部勾选时拦截（与小程序 v1.0.1 对齐，防绕过面板直接调用）
  const info = APP_DATA.days[currentDay - 1];
  const checks = Storage.getTaskChecks(currentDay);
  const allChecked = info.tasks.length > 0 && checks.length === info.tasks.length && checks.every(Boolean);
  if (!allChecked) { toast('请先完成今日任务再打卡'); return; }
  Storage.checkIn(currentDay, {
    newWords: Number($('#ci-words').value) || 0,
    newSentences: Number($('#ci-sentences').value) || 0,
    minutes: Number($('#ci-minutes').value) || 60,
    rating: { pron: checkinRatings.pron, listen: checkinRatings.listen, speak: checkinRatings.speak },
    mood: $('#ci-mood').value
  });
  closeCheckin();
  toast('🎉 打卡成功！');
  render();
}

// ---------- 句型速查 ----------
let sentCat = '全部';
function setSentCat(c) { sentCat = c; render(); }

function renderSentences() {
  const q = ($('#sent-search') ? $('#sent-search').value : '').trim().toLowerCase();
  let list = APP_DATA.sentences.map((s, i) => Object.assign({}, s, { idx: i }));
  if (sentCat !== '全部') list = list.filter((s) => s.category === sentCat);
  if (q) list = list.filter((s) => s.text.includes(q) || s.meaning.includes(q) || (s.usage_hint || '').includes(q));
  const favRaw = Storage.get().favorites || [];
  const favorites = Array.isArray(favRaw) ? favRaw : [];
  const box = $('#sent-list');
  if (!box) return;
  box.innerHTML = list.map((s) => `
    <div class="card sent-card">
      <div class="sent-row">
        <div class="sent-main">
          <div class="sent-text">${esc(s.text)}</div>
          <div class="sent-meaning">${esc(s.meaning)}</div>
          ${s.usage_hint ? `<div class="sent-hint">${esc(s.usage_hint)}</div>` : ''}
        </div>
        <div class="sent-actions">
          <span class="speak-btn" onclick="speak('${esc(s.text).replace(/'/g, "\\'")}')">🔊</span>
          <span class="fav ${favorites.includes(s.idx) ? 'fav-on' : ''}" onclick="toggleFav(${s.idx})">★</span>
          <button class="copy-btn" onclick="copyText('${esc(s.text).replace(/'/g, "\\'")}')">复制</button>
        </div>
      </div>
      <span class="cat-tag">${esc(s.category)}</span>
    </div>`).join('') || '<div class="empty">没有找到匹配的句型</div>';
}

function toggleFav(idx) {
  Storage.toggleFavorite(idx);
  renderSentences();
}

// ---------- 场景 ----------
function renderSceneCard(s, done) {
  const expanded = sceneExpanded === s.id;
  return `
  <div class="card scene-card" onclick="toggleScene('${s.id}')">
    <div class="scene-head">
      <div>
        <div class="scene-name">${s.order}. ${esc(s.name)}</div>
        <div class="scene-days">Day ${s.days[0]}-${s.days[s.days.length - 1]}</div>
      </div>
      <span class="scene-badge ${done.includes(s.id) ? 'done' : ''}">${done.includes(s.id) ? '✅ 已验收' : '待练习'}</span>
    </div>
    <div class="scene-accept">验收：${esc(s.acceptance)}</div>
    ${expanded ? `
      <div class="divider"></div>
      <div class="detail-tabs">
        <span class="detail-tab ${sceneTab === 0 ? 'tab-active' : ''}" onclick="event.stopPropagation();setSceneTab(0)">必会句</span>
        <span class="detail-tab ${sceneTab === 1 ? 'tab-active' : ''}" onclick="event.stopPropagation();setSceneTab(1)">对话跟读</span>
        <span class="detail-tab ${sceneTab === 2 ? 'tab-active' : ''}" onclick="event.stopPropagation();setSceneTab(2)">练习指南</span>
      </div>
      ${sceneTab === 0 ? s.must_sentences.map((m) => `
        <div class="must-sent"><span>${esc(m)}</span><span style="display:flex;gap:6px"><span class="speak-btn" onclick="event.stopPropagation();speak('${esc(m).replace(/'/g, "\\'")}')">🔊</span><button class="copy-btn" onclick="event.stopPropagation();copyText('${esc(m).replace(/'/g, "\\'")}')">复制</button></span></div>`).join('')
      : sceneTab === 1 ? s.dialogue.map((l) => `
        <div class="dialogue">
          <span class="line-speaker ${l.speaker === '你' ? 'me' : ''}">${esc(l.speaker)}</span>
          <span class="line-text">${esc(l.text)}</span>
          <span class="speak-btn line-copy" onclick="event.stopPropagation();speak('${esc(l.text).replace(/'/g, "\\'")}')">🔊</span>
          <button class="copy-btn line-copy" onclick="event.stopPropagation();copyText('${esc(l.text).replace(/'/g, "\\'")}')">复制</button>
        </div>`).join('') + '<div class="hint">💡 练习方法：逐句跟读 → 隐藏对方台词角色扮演 → 不看文本完整走一遍</div>'
      : `
        <div class="guide-item"><span class="guide-label">练习方法：</span>${esc(s.practice)}</div>
        <div class="guide-item"><span class="guide-label">验收标准：</span>${esc(s.acceptance)}</div>
        <button class="btn-primary accept-btn ${done.includes(s.id) ? 'disabled' : ''}" onclick="event.stopPropagation();markScene('${s.id}')">${done.includes(s.id) ? '已验收 ✓' : '✅ 我完成了验收'}</button>`}
    ` : ''}
  </div>`;
}

function toggleScene(id) {
  sceneExpanded = sceneExpanded === id ? null : id;
  sceneTab = 0;
  render();
}

function setSceneTab(t) { sceneTab = t; render(); }
function markScene(id) { Storage.markSceneDone(id); toast('🎉 场景验收通过！'); render(); }

// ---------- 周测 ----------
function markTest(week, status) {
  Storage.markWeeklyTest(week, status);
  toast(status === 'passed' ? '周测通过 🎉' : '已标记未通过');
  render();
}

// ---------- 备份 ----------
function backupData() {
  Storage.downloadBackup();
  toast('⬇ 备份已下载');
}

document.getElementById('import-file').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function () {
    const result = Storage.importJSON(String(reader.result));
    if (result.ok) {
      toast('✅ ' + result.message);
      render();
    } else {
      toast('❌ ' + result.message);
    }
  };
  reader.readAsText(file);
  e.target.value = '';
});

// ---------- 初始化 ----------
document.querySelectorAll('.tab').forEach((t) => {
  t.addEventListener('click', () => {
    currentView = t.dataset.view;
    if (currentView === 'daily') currentDay = Storage.getCurrentDay();
    render();
  });
});

// 首次启动初始化
(function init() {
  const p = Storage.get();
  if (!p || !p.startDate) {
    Storage.save({
      startDate: Storage.today(),
      completedDays: [],
      checkIns: {},
      taskChecks: {},
      favorites: [],
      sceneDone: [],
      weeklyTests: {}
    });
  }
  render();
})();

// 测试钩子（仅 Node 测试环境生效，浏览器中 module 未定义自动跳过）
if (typeof module !== 'undefined') {
  module.exports = {
    render, goView, goDaily, goDay, prevDay, nextDay, toggleTask,
    openCheckin, closeCheckin, submitCheckin, setRating,
    setSentCat, renderSentences, toggleFav,
    toggleScene, setSceneTab, markScene,
    markTest, backupData, copyText, toast,
    speak, startCards, flipCard, answerCard, setCardMode,
    getCardStats, saveCardStats,
    get currentView() { return currentView; },
    set currentView(v) { currentView = v; },
    get currentDay() { return currentDay; },
    set currentDay(v) { currentDay = v; }
  };
}
