// 内置词卡库（30天高频词，Jyutping 标注）
var WORDCARDS = [
  {
    "word": "你好",
    "jyutping": "nei5 hou2",
    "meaning": "你好",
    "cat": "问候"
  },
  {
    "word": "早晨",
    "jyutping": "zou2 san4",
    "meaning": "早上好",
    "cat": "问候"
  },
  {
    "word": "再见",
    "jyutping": "zoi3 gin3",
    "meaning": "再见",
    "cat": "问候"
  },
  {
    "word": "唔該",
    "jyutping": "m4 goi1",
    "meaning": "谢谢/劳驾",
    "cat": "问候"
  },
  {
    "word": "多謝",
    "jyutping": "do1 ze6",
    "meaning": "多谢",
    "cat": "问候"
  },
  {
    "word": "唔好意思",
    "jyutping": "m4 hou2 ji3 si1",
    "meaning": "对不起/不好意思",
    "cat": "问候"
  },
  {
    "word": "一",
    "jyutping": "jat1",
    "meaning": "一",
    "cat": "数字"
  },
  {
    "word": "二",
    "jyutping": "ji6",
    "meaning": "二",
    "cat": "数字"
  },
  {
    "word": "三",
    "jyutping": "saam1",
    "meaning": "三",
    "cat": "数字"
  },
  {
    "word": "四",
    "jyutping": "sei3",
    "meaning": "四",
    "cat": "数字"
  },
  {
    "word": "五",
    "jyutping": "ng5",
    "meaning": "五",
    "cat": "数字"
  },
  {
    "word": "六",
    "jyutping": "luk6",
    "meaning": "六",
    "cat": "数字"
  },
  {
    "word": "七",
    "jyutping": "cat1",
    "meaning": "七",
    "cat": "数字"
  },
  {
    "word": "八",
    "jyutping": "baat3",
    "meaning": "八",
    "cat": "数字"
  },
  {
    "word": "九",
    "jyutping": "gau2",
    "meaning": "九",
    "cat": "数字"
  },
  {
    "word": "十",
    "jyutping": "sap6",
    "meaning": "十",
    "cat": "数字"
  },
  {
    "word": "食",
    "jyutping": "sik6",
    "meaning": "吃",
    "cat": "动词"
  },
  {
    "word": "飲",
    "jyutping": "jam2",
    "meaning": "喝",
    "cat": "动词"
  },
  {
    "word": "睇",
    "jyutping": "tai2",
    "meaning": "看",
    "cat": "动词"
  },
  {
    "word": "行",
    "jyutping": "haang4",
    "meaning": "走",
    "cat": "动词"
  },
  {
    "word": "瞓",
    "jyutping": "fan3",
    "meaning": "睡",
    "cat": "动词"
  },
  {
    "word": "知",
    "jyutping": "zi1",
    "meaning": "知道",
    "cat": "动词"
  },
  {
    "word": "想",
    "jyutping": "soeng2",
    "meaning": "想/想要",
    "cat": "动词"
  },
  {
    "word": "要",
    "jyutping": "jiu3",
    "meaning": "要",
    "cat": "动词"
  },
  {
    "word": "有",
    "jyutping": "jau5",
    "meaning": "有",
    "cat": "动词"
  },
  {
    "word": "冇",
    "jyutping": "mou5",
    "meaning": "没有",
    "cat": "动词"
  },
  {
    "word": "講",
    "jyutping": "gong2",
    "meaning": "说/讲",
    "cat": "动词"
  },
  {
    "word": "聽",
    "jyutping": "teng1",
    "meaning": "听",
    "cat": "动词"
  },
  {
    "word": "我",
    "jyutping": "ngo5",
    "meaning": "我",
    "cat": "人称"
  },
  {
    "word": "你",
    "jyutping": "nei5",
    "meaning": "你",
    "cat": "人称"
  },
  {
    "word": "佢",
    "jyutping": "keoi5",
    "meaning": "他/她/它",
    "cat": "人称"
  },
  {
    "word": "我哋",
    "jyutping": "ngo5 dei6",
    "meaning": "我们",
    "cat": "人称"
  },
  {
    "word": "你哋",
    "jyutping": "nei5 dei6",
    "meaning": "你们",
    "cat": "人称"
  },
  {
    "word": "係",
    "jyutping": "hai6",
    "meaning": "是",
    "cat": "常用"
  },
  {
    "word": "唔係",
    "jyutping": "m4 hai6",
    "meaning": "不是",
    "cat": "常用"
  },
  {
    "word": "邊度",
    "jyutping": "bin1 dou6",
    "meaning": "哪里",
    "cat": "常用"
  },
  {
    "word": "而家",
    "jyutping": "ji4 gaa1",
    "meaning": "现在",
    "cat": "常用"
  },
  {
    "word": "今日",
    "jyutping": "gam1 jat6",
    "meaning": "今天",
    "cat": "常用"
  },
  {
    "word": "聽日",
    "jyutping": "ting1 jat6",
    "meaning": "明天",
    "cat": "常用"
  },
  {
    "word": "幾錢",
    "jyutping": "gei2 cin2",
    "meaning": "多少钱",
    "cat": "常用"
  },
  {
    "word": "唔該晒",
    "jyutping": "m4 goi1 saai3",
    "meaning": "非常感谢",
    "cat": "常用"
  },
  {
    "word": "街",
    "jyutping": "gaai1",
    "meaning": "街",
    "cat": "对比"
  },
  {
    "word": "雞",
    "jyutping": "gai1",
    "meaning": "鸡",
    "cat": "对比"
  },
  {
    "word": "山",
    "jyutping": "saan1",
    "meaning": "山",
    "cat": "对比"
  },
  {
    "word": "新",
    "jyutping": "san1",
    "meaning": "新",
    "cat": "对比"
  }
];
if (typeof module !== 'undefined') module.exports = WORDCARDS;
if (typeof window !== 'undefined') window.WORDCARDS = WORDCARDS;
