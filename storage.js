/**
 * 进度存储工具 - PWA 版（localStorage）
 * 相比小程序版新增：数据导出/导入备份（JSON 文件），解决换设备丢进度问题
 */
const KEY = 'cantonese30_progress';

function get() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch (e) {
    return {};
  }
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

function today() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** 计算当前应学到的 Day（1-30），基于开始日期 */
function getCurrentDay() {
  const p = get();
  if (!p.startDate) return 1;
  const diff = Math.floor((new Date(today()) - new Date(p.startDate)) / 86400000);
  return Math.min(30, Math.max(1, diff + 1));
}

/** 是否已完成第 day 天打卡 */
function isDone(day) {
  const p = get();
  return (p.completedDays || []).indexOf(day) !== -1;
}

/** 完成打卡 */
function checkIn(day, payload) {
  const p = get();
  p.completedDays = p.completedDays || [];
  p.checkIns = p.checkIns || {};
  if (p.completedDays.indexOf(day) === -1) {
    p.completedDays.push(day);
    p.completedDays.sort((a, b) => a - b);
  }
  p.checkIns[day] = Object.assign({ date: today() }, payload);
  save(p);
}

/** 保存某天任务勾选状态 */
function saveTaskChecks(day, checks) {
  const p = get();
  p.taskChecks = p.taskChecks || {};
  p.taskChecks[day] = checks;
  save(p);
}

/** 获取某天任务勾选状态 */
function getTaskChecks(day) {
  const p = get();
  return (p.taskChecks || {})[day] || [];
}

/** 计算连续打卡天数 */
function getStreak() {
  const p = get();
  if (!p.startDate) return 0;
  const done = p.completedDays || [];
  if (!done.length) return 0;
  const doneSet = {};
  done.forEach((d) => { doneSet[d] = true; });
  const now = new Date(today());
  let streak = 0;
  let cursor = new Date(now);
  const todayNum = getCurrentDay();
  if (!doneSet[todayNum]) {
    cursor = new Date(now.getTime() - 86400000);
  }
  const start = new Date(p.startDate);
  for (let i = 0; i < 60; i++) {
    const dayNum = Math.floor((cursor - start) / 86400000) + 1;
    if (dayNum >= 1 && dayNum <= 30 && doneSet[dayNum]) {
      streak++;
      cursor = new Date(cursor.getTime() - 86400000);
    } else {
      break;
    }
  }
  return streak;
}

/** 统计概览 */
function getStats() {
  const p = get();
  const done = p.completedDays || [];
  const checkIns = p.checkIns || {};
  let words = 0;
  let sentences = 0;
  Object.keys(checkIns).forEach((k) => {
    words += Number(checkIns[k].newWords || 0);
    sentences += Number(checkIns[k].newSentences || 0);
  });
  return {
    totalDone: done.length,
    streak: getStreak(),
    words: words,
    sentences: sentences,
    rate: Math.round((done.length / 30) * 100)
  };
}

/** 收藏句型（切换） */
function toggleFavorite(index) {
  const p = get();
  p.favorites = p.favorites || [];
  const i = p.favorites.indexOf(index);
  if (i === -1) p.favorites.push(index);
  else p.favorites.splice(i, 1);
  save(p);
  return p.favorites;
}

function isFavorite(index) {
  const p = get();
  return (p.favorites || []).indexOf(index) !== -1;
}

/** 场景验收完成 */
function markSceneDone(id) {
  const p = get();
  p.sceneDone = p.sceneDone || [];
  if (p.sceneDone.indexOf(id) === -1) p.sceneDone.push(id);
  save(p);
  return p.sceneDone;
}

/** 周测标记 */
function markWeeklyTest(week, status) {
  const p = get();
  p.weeklyTests = p.weeklyTests || {};
  p.weeklyTests[week] = status;
  save(p);
  return p.weeklyTests;
}

/* ============ 新增：数据备份（导出/导入） ============ */

/** 导出全部进度为 JSON 字符串（含版本与时间戳） */
function exportJSON() {
  const p = get();
  const payload = {
    app: '30天粤语入门助手',
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    progress: p
  };
  return JSON.stringify(payload, null, 2);
}

/** 下载进度备份文件（浏览器触发下载） */
function downloadBackup() {
  const json = exportJSON();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cantonese30-backup-${today()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * 导入备份：解析 JSON 并合并/覆盖进度
 * @param {string} jsonText 备份文件内容
 * @returns {{ok: boolean, message: string, data?: object}}
 */
function importJSON(jsonText) {
  try {
    const parsed = JSON.parse(jsonText);
    // 兼容两种格式：带包装的备份 / 裸 progress 对象
    const progress = parsed.progress || parsed;
    if (!progress || typeof progress !== 'object') {
      return { ok: false, message: '备份文件格式不正确' };
    }
    // 校验关键字段
    if (!Array.isArray(progress.completedDays) && !progress.startDate) {
      return { ok: false, message: '备份文件缺少进度数据' };
    }
    // 覆盖式导入（保留用户确认）
    save(progress);
    return { ok: true, message: '导入成功！', data: progress };
  } catch (e) {
    return { ok: false, message: '文件解析失败：' + e.message };
  }
}

const Storage = {
  get,
  save,
  today,
  getCurrentDay,
  isDone,
  checkIn,
  saveTaskChecks,
  getTaskChecks,
  getStreak,
  getStats,
  toggleFavorite,
  isFavorite,
  markSceneDone,
  markWeeklyTest,
  exportJSON,
  downloadBackup,
  importJSON
};

// 浏览器环境：暴露为全局 Storage（data.js 已用同款模式）
if (typeof module !== 'undefined') {
  module.exports = Storage;
} else {
  window.Storage = Storage;
}
