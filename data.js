// 30天粤语入门助手 - 静态数据模块（PWA 版）
// 数据源：粤语小程序数据.json (t7)
var DATA = {
  "meta": {
    "name": "30天粤语入门助手",
    "version": "1.0.0",
    "source": "《30天粤语学习手册.md》(my-team 出品, 60分钟/天硬预算)",
    "position": "30天入门而非学会：发音体系 + 200高频词 + 30-50句表达 + 5场景基础对话 + 慢速听力入门",
    "default_daily_minutes": 60,
    "pinyin_system": "Jyutping",
    "core_rules": [
      "听说优先",
      "拼音优先(选Jyutping用到底)",
      "复习优先(每日词卡不断档)",
      "每天不断档 > 单次时长"
    ]
  },
  "weeks": [
    {
      "week": 1,
      "days": "Day 1-7",
      "theme": "发音筑基",
      "goal": "能正确读出六调例字「三九四零五二」，掌握100个高频词发音",
      "keywords": [
        "六调",
        "入声",
        "声韵母"
      ]
    },
    {
      "week": 2,
      "days": "Day 8-14",
      "theme": "句式积累",
      "goal": "能套用句型说10句完整粤语，跟读50个句子",
      "keywords": [
        "30个高频句型",
        "影子跟读"
      ]
    },
    {
      "week": 3,
      "days": "Day 15-21",
      "theme": "听力轰炸",
      "goal": "慢速听力听懂60%大意，能捕捉港剧中学过的词句",
      "keywords": [
        "三遍法精听",
        "港剧",
        "跟唱"
      ]
    },
    {
      "week": 4,
      "days": "Day 22-30",
      "theme": "实战输出",
      "goal": "能独立完成5个生活场景基础对话",
      "keywords": [
        "场景对话",
        "终测"
      ]
    }
  ],
  "daily_time_plan": [
    {
      "slot": "早(通勤前/早餐)",
      "minutes": 15,
      "task": "复习昨日词卡 + 调值训练",
      "tools": [
        "Anki/Quizlet",
        "手机录音"
      ]
    },
    {
      "slot": "通勤路上",
      "minutes": "15~20",
      "task": "泛听(教学播客/粤语歌/情景对话)",
      "tools": [
        "播客App",
        "网易云"
      ]
    },
    {
      "slot": "午休(可选加分项)",
      "minutes": "5~10",
      "task": "跟读2~3个短句(影子跟读+录自己对比)",
      "tools": [
        "手机录音"
      ],
      "optional": true
    },
    {
      "slot": "晚间",
      "minutes": "25~30",
      "task": "精学(发音课/教材1课 + 跟读模仿 + 造句/开口)",
      "tools": [
        "B站发音课",
        "教材"
      ]
    }
  ],
  "days": [
    {
      "day": 1,
      "week": 1,
      "theme": "认识粤语+六调入门",
      "tasks": [
        "看发音课「六调总览」",
        "跟读六调例字(三九四零五二 saam1 gau2 sei3 ling4 ng5 ji6)",
        "学5个问候词(你好/早晨/再见/唔该/多谢)"
      ],
      "target": "能区分1~6调听感",
      "note": ""
    },
    {
      "day": 2,
      "week": 1,
      "theme": "声调精练",
      "tasks": [
        "六调例字每个读10遍",
        "学数字1-10的粤语发音(注意「一 jat1」入声)"
      ],
      "target": "数字1-10发音过关",
      "note": ""
    },
    {
      "day": 3,
      "week": 1,
      "theme": "入声韵尾",
      "tasks": [
        "专攻入声字(一/十/六/百/八)",
        "学「-p/-t/-k收尾」概念",
        "学10个高频词(食/饮/睇/行/瞓/知/想/要/有/冇)"
      ],
      "target": "能正确发出入声字",
      "note": ""
    },
    {
      "day": 4,
      "week": 1,
      "theme": "声母韵母",
      "tasks": [
        "发音课「声韵母系统」",
        "重点n/l、gw/kw、ng"
      ],
      "target": "能拼读课程内的声韵母表",
      "note": ""
    },
    {
      "day": 5,
      "week": 1,
      "theme": "长短元音",
      "tasks": [
        "对比练习：街gaai1/鸡gai1、山saan1/新san1",
        "学10个高频词"
      ],
      "target": "能听辨长短元音",
      "note": ""
    },
    {
      "day": 6,
      "week": 1,
      "theme": "高频词冲刺",
      "tasks": [
        "复习前5天所有词卡(50词)",
        "新增20词(人称/动词/形容词)"
      ],
      "target": "累计70词",
      "note": ""
    },
    {
      "day": 7,
      "week": 1,
      "theme": "周测+复习",
      "tasks": [
        "自测六调+入声+70词",
        "跟读10句综合例句",
        "开口录音第一条"
      ],
      "target": "完成第1周自测表(词卡正确率≥80%)",
      "note": ""
    },
    {
      "day": 8,
      "week": 2,
      "theme": "打招呼+自我介绍",
      "tasks": [
        "学8句打招呼/自我介绍句型",
        "造句4句",
        "跟读录音"
      ],
      "target": "能流利说出4句打招呼",
      "note": ""
    },
    {
      "day": 9,
      "week": 2,
      "theme": "问路句型",
      "tasks": [
        "学4句问路句型",
        "角色扮演自问自答"
      ],
      "target": "能问出「XX喺边度」",
      "note": ""
    },
    {
      "day": 10,
      "week": 2,
      "theme": "点餐句型",
      "tasks": [
        "学6句点餐句型",
        "模拟点一杯奶茶对话"
      ],
      "target": "能完成点餐问答",
      "note": ""
    },
    {
      "day": 11,
      "week": 2,
      "theme": "数字+时间",
      "tasks": [
        "复习数字1-100",
        "学4句时间句型"
      ],
      "target": "能说出自己的年龄/时间",
      "note": ""
    },
    {
      "day": 12,
      "week": 2,
      "theme": "购物砍价",
      "tasks": [
        "学4句购物句型",
        "跟录音模仿语气"
      ],
      "target": "能问价+砍价",
      "note": ""
    },
    {
      "day": 13,
      "week": 2,
      "theme": "句型总复习",
      "tasks": [
        "30句型过一遍",
        "每个造1句",
        "影子跟读10句"
      ],
      "target": "30句型全部过手",
      "note": ""
    },
    {
      "day": 14,
      "week": 2,
      "theme": "周测+口语输出",
      "tasks": [
        "自测30句型",
        "录音：用10句粤语自我介绍+2个场景对话"
      ],
      "target": "完成第2周自测表(正确率≥70%)",
      "note": ""
    },
    {
      "day": 15,
      "week": 3,
      "theme": "精听入门",
      "tasks": [
        "选1个慢速教学音频(3-5分钟)",
        "三遍法精听(第1遍抓大意/第2遍逐句跟读/第3遍盲听验证)"
      ],
      "target": "抓出大意关键词≥5个",
      "note": ""
    },
    {
      "day": 16,
      "week": 3,
      "theme": "数字听力+港剧",
      "tasks": [
        "听数字/价格类材料",
        "晚间看港剧20分钟"
      ],
      "target": "数字听力正确率≥70%",
      "note": ""
    },
    {
      "day": 17,
      "week": 3,
      "theme": "情景听力",
      "tasks": [
        "听点餐/问路情景对话音频"
      ],
      "target": "能复述对话大意",
      "note": ""
    },
    {
      "day": 18,
      "week": 3,
      "theme": "港剧初接触",
      "tasks": [
        "看《爱·回家》等生活剧20分钟(粤语字幕)",
        "记下听到的学过的词"
      ],
      "target": "捕捉到学过的词≥5个",
      "note": ""
    },
    {
      "day": 19,
      "week": 3,
      "theme": "歌曲跟唱",
      "tasks": [
        "选1首慢歌跟唱(通勤或晚间)"
      ],
      "target": "能跟唱副歌",
      "note": ""
    },
    {
      "day": 20,
      "week": 3,
      "theme": "综合听力",
      "tasks": [
        "精听1段新材料",
        "泛听30分钟(通勤+晚间拆分)"
      ],
      "target": "慢速材料听懂60%",
      "note": ""
    },
    {
      "day": 21,
      "week": 3,
      "theme": "周测",
      "tasks": [
        "自测：盲听3段短材料写大意",
        "录音：复述1段听过的对话"
      ],
      "target": "完成第3周自测表(每段抓住≥3个关键词)",
      "note": ""
    },
    {
      "day": 22,
      "week": 4,
      "theme": "场景1·点餐(上)",
      "tasks": [
        "学点餐必会句(我要呢个/唔该埋单/呢个几钱/有冇推荐/唔该一杯奶茶)",
        "模拟练习：自问自答或找语伴"
      ],
      "target": "能完成点餐问答",
      "note": ""
    },
    {
      "day": 23,
      "week": 4,
      "theme": "场景1·点餐(下)",
      "tasks": [
        "完整走一遍「入座→点餐→催单→结账」流程"
      ],
      "target": "验收：不看提示完成对话",
      "note": ""
    },
    {
      "day": 24,
      "week": 4,
      "theme": "场景2·问路(上)",
      "tasks": [
        "学问路必会句(XX喺边度/点样去/远唔远/唔该晒/转左转右)",
        "在地图上选3个目的地口头问路"
      ],
      "target": "能问出「XX喺边度」",
      "note": ""
    },
    {
      "day": 25,
      "week": 4,
      "theme": "场景2·问路(下)",
      "tasks": [
        "完成「问路→听懂方向→致谢」闭环"
      ],
      "target": "验收：能完成问路闭环",
      "note": ""
    },
    {
      "day": 26,
      "week": 4,
      "theme": "场景3·打车",
      "tasks": [
        "学打车必会句(唔该去XX/几多钱/前面路口停/呢度就得/慢啲)",
        "完整打车对话"
      ],
      "target": "验收：能报目的地+听懂价格+到点下车",
      "note": ""
    },
    {
      "day": 27,
      "week": 4,
      "theme": "场景4·日常聊天(上)",
      "tasks": [
        "学寒暄必会句(你食咗饭未/今日点啊/我返工/得闲饮茶/天气好好)",
        "和语伴/老师(或AI对话)聊5分钟天"
      ],
      "target": "能回答「今日点啊」「你食咗饭未」等寒暄",
      "note": ""
    },
    {
      "day": 28,
      "week": 4,
      "theme": "场景4·日常聊天(下)",
      "tasks": [
        "聊天练习深化，录音对比",
        "跟读当日对话2-3遍"
      ],
      "target": "验收：能完成寒暄问答闭环",
      "note": ""
    },
    {
      "day": 29,
      "week": 4,
      "theme": "场景5·综合模拟",
      "tasks": [
        "5场景全过一遍",
        "找语伴/真人老师(iTalki等, ¥80-200/小时)做1次对话课"
      ],
      "target": "5场景各能完成基础对话",
      "note": ""
    },
    {
      "day": 30,
      "week": 4,
      "theme": "最终自测+30天总结",
      "tasks": [
        "终测：发音(朗读六调+10入声字+20随机词)",
        "词汇(Anki随机50词≥80%)",
        "听力(盲听2分钟慢速材料复述≥60%要点)",
        "口语(5场景各1分钟即兴)",
        "对比(Day7录音vs Day30录音)"
      ],
      "target": "完成30天终测(5项)",
      "note": ""
    }
  ],
  "sentences": [
    {
      "category": "打招呼/寒暄",
      "text": "你好",
      "meaning": "你好",
      "usage_hint": "日常问候"
    },
    {
      "category": "打招呼/寒暄",
      "text": "早晨",
      "meaning": "早上好",
      "usage_hint": "上午问候(注意是'早晨'非'早上好')"
    },
    {
      "category": "打招呼/寒暄",
      "text": "你好吗？我好好。",
      "meaning": "你好吗？我很好。",
      "usage_hint": "寒暄问答"
    },
    {
      "category": "打招呼/寒暄",
      "text": "再见",
      "meaning": "再见",
      "usage_hint": "道别"
    },
    {
      "category": "打招呼/寒暄",
      "text": "唔该",
      "meaning": "谢谢/劳驾",
      "usage_hint": "万能感谢+请求语(麻烦别人时)"
    },
    {
      "category": "打招呼/寒暄",
      "text": "多谢",
      "meaning": "多谢",
      "usage_hint": "接受好意时致谢"
    },
    {
      "category": "打招呼/寒暄",
      "text": "唔好意思",
      "meaning": "对不起/不好意思",
      "usage_hint": "道歉"
    },
    {
      "category": "打招呼/寒暄",
      "text": "冇问题",
      "meaning": "没问题",
      "usage_hint": "应答"
    },
    {
      "category": "自我介绍",
      "text": "我係XXX",
      "meaning": "我是XXX",
      "usage_hint": "姓名/身份"
    },
    {
      "category": "自我介绍",
      "text": "我叫XXX",
      "meaning": "我叫XXX",
      "usage_hint": "姓名"
    },
    {
      "category": "自我介绍",
      "text": "我係北方人",
      "meaning": "我是北方人",
      "usage_hint": "籍贯"
    },
    {
      "category": "自我介绍",
      "text": "我唔係本地人",
      "meaning": "我不是本地人",
      "usage_hint": "说明身份"
    },
    {
      "category": "问路",
      "text": "请问XX喺边度？",
      "meaning": "请问XX在哪里？",
      "usage_hint": "问位置"
    },
    {
      "category": "问路",
      "text": "呢度喺边度？",
      "meaning": "这里是哪里？",
      "usage_hint": "确认位置"
    },
    {
      "category": "问路",
      "text": "点样去？",
      "meaning": "怎么去？",
      "usage_hint": "问路线"
    },
    {
      "category": "问路",
      "text": "远唔远？",
      "meaning": "远不远？",
      "usage_hint": "问距离"
    },
    {
      "category": "点餐",
      "text": "我要呢个",
      "meaning": "我要这个",
      "usage_hint": "点单"
    },
    {
      "category": "点餐",
      "text": "唔该，埋单",
      "meaning": "麻烦结账",
      "usage_hint": "结账"
    },
    {
      "category": "点餐",
      "text": "呢个几钱？",
      "meaning": "这个多少钱？",
      "usage_hint": "问价"
    },
    {
      "category": "点餐",
      "text": "有冇推荐？",
      "meaning": "有推荐吗？",
      "usage_hint": "咨询"
    },
    {
      "category": "点餐",
      "text": "唔该，一杯奶茶",
      "meaning": "麻烦来一杯奶茶",
      "usage_hint": "点饮品"
    },
    {
      "category": "点餐",
      "text": "我唔食辣",
      "meaning": "我不吃辣",
      "usage_hint": "忌口说明"
    },
    {
      "category": "数字时间",
      "text": "我识讲少少粤语",
      "meaning": "我会说一点点粤语",
      "usage_hint": "表明水平"
    },
    {
      "category": "数字时间",
      "text": "几点钟？",
      "meaning": "几点了？",
      "usage_hint": "问时间"
    },
    {
      "category": "数字时间",
      "text": "今日星期几？",
      "meaning": "今天星期几？",
      "usage_hint": "问星期"
    },
    {
      "category": "数字时间",
      "text": "我今朝食咗早餐",
      "meaning": "我今天早上吃了早餐",
      "usage_hint": "完成时表达"
    },
    {
      "category": "购物",
      "text": "几钱？",
      "meaning": "多少钱？",
      "usage_hint": "问价"
    },
    {
      "category": "购物",
      "text": "平啲啦",
      "meaning": "便宜点啦",
      "usage_hint": "砍价"
    },
    {
      "category": "购物",
      "text": "我要试下",
      "meaning": "我要试试",
      "usage_hint": "试穿/试用"
    },
    {
      "category": "购物",
      "text": "唔该，帮我包起",
      "meaning": "麻烦帮我包起来",
      "usage_hint": "购买"
    }
  ],
  "scenes": [
    {
      "id": "scene1",
      "name": "点餐",
      "days": [
        22,
        23
      ],
      "order": 1,
      "must_sentences": [
        "我要呢个",
        "唔该，埋单",
        "呢个几钱",
        "有冇推荐",
        "唔该，一杯奶茶"
      ],
      "practice": "自问自答或找语伴，完整走一遍「入座→点餐→催单→结账」",
      "acceptance": "不看提示完成对话",
      "dialogue": [
        {
          "speaker": "你",
          "text": "唔该！"
        },
        {
          "speaker": "服务员",
          "text": "你好，想食啲咩？"
        },
        {
          "speaker": "你",
          "text": "我要呢个，同埋一杯奶茶。"
        },
        {
          "speaker": "服务员",
          "text": "好，仲有冇其他？"
        },
        {
          "speaker": "你",
          "text": "冇啦，唔该。"
        },
        {
          "speaker": "你",
          "text": "(餐后) 唔该，埋单。"
        },
        {
          "speaker": "服务员",
          "text": "总共38蚊。"
        },
        {
          "speaker": "你",
          "text": "好，多谢！"
        }
      ]
    },
    {
      "id": "scene2",
      "name": "问路",
      "days": [
        24,
        25
      ],
      "order": 2,
      "must_sentences": [
        "请问XX喺边度",
        "点样去",
        "远唔远",
        "唔该晒",
        "转左转右(左转/右转)"
      ],
      "practice": "在地图上选3个目的地，口头问路",
      "acceptance": "能完成「问路→听懂方向→致谢」闭环",
      "dialogue": [
        {
          "speaker": "你",
          "text": "唔该，请问地铁站喺边度？"
        },
        {
          "speaker": "路人",
          "text": "一直行，第二个路口转左。"
        },
        {
          "speaker": "你",
          "text": "远唔远？"
        },
        {
          "speaker": "路人",
          "text": "唔远，五分钟就到。"
        },
        {
          "speaker": "你",
          "text": "唔该晒！"
        }
      ]
    },
    {
      "id": "scene3",
      "name": "打车",
      "days": [
        26
      ],
      "order": 3,
      "must_sentences": [
        "唔该，去XX",
        "几多钱",
        "前面路口停",
        "呢度就得(这里就行)",
        "慢啲(慢点)"
      ],
      "practice": "完整打车对话(报目的地+听懂价格+到点下车)",
      "acceptance": "能报目的地+听懂价格+到点下车",
      "dialogue": [
        {
          "speaker": "你",
          "text": "唔该，去尖沙咀。"
        },
        {
          "speaker": "司机",
          "text": "好，上车啦。"
        },
        {
          "speaker": "你",
          "text": "(路上) 唔该，前面路口停。"
        },
        {
          "speaker": "司机",
          "text": "总共45蚊。"
        },
        {
          "speaker": "你",
          "text": "呢度就得，多谢！"
        }
      ]
    },
    {
      "id": "scene4",
      "name": "日常聊天",
      "days": [
        27,
        28
      ],
      "order": 4,
      "must_sentences": [
        "你食咗饭未",
        "今日点啊(今天怎么样)",
        "我返工(我上班)",
        "得闲饮茶",
        "天气好好"
      ],
      "practice": "和语伴/老师(或AI对话)聊5分钟天",
      "acceptance": "能回答「今日点啊」「你食咗饭未」等寒暄",
      "dialogue": [
        {
          "speaker": "A",
          "text": "你食咗饭未？"
        },
        {
          "speaker": "B",
          "text": "食咗啦，你呢？"
        },
        {
          "speaker": "A",
          "text": "我都食咗。今日点啊？"
        },
        {
          "speaker": "B",
          "text": "几好，就係有啲攰(有点累)。"
        },
        {
          "speaker": "A",
          "text": "咁早啲休息啦。得闲饮茶！"
        },
        {
          "speaker": "B",
          "text": "好，饮茶揾我！"
        }
      ]
    },
    {
      "id": "scene5",
      "name": "综合模拟(自我介绍)",
      "days": [
        29,
        30
      ],
      "order": 5,
      "must_sentences": [
        "我係XXX",
        "我係北方人",
        "我识讲少少粤语",
        "得闲一齐饮茶"
      ],
      "practice": "5场景全过一遍；找语伴/真人老师做1次对话课",
      "acceptance": "5场景各能完成基础对话",
      "dialogue": [
        {
          "speaker": "你",
          "text": "你好！我係北方人，嚟咗香港三个月。"
        },
        {
          "speaker": "你",
          "text": "我识讲少少粤语，学咗一个月。"
        },
        {
          "speaker": "你",
          "text": "我喺公司做IT。得闲一齐饮茶？"
        }
      ]
    }
  ],
  "resources": {
    "principle": "1门发音课+1本教材+1个字典+1个听力源足够；发音期只用一套体系；资源在精不在多",
    "free": [
      {
        "type": "发音课",
        "name": "B站「粤语入门发音」系列",
        "usage": "第1周每天1节(晚间)，选1位老师用到底"
      },
      {
        "type": "拼音工具",
        "name": "粵語審音配詞字庫(香港中文大学)",
        "usage": "查标准读音，标Jyutping"
      },
      {
        "type": "字典App",
        "name": "粤典(words.hk) / 羊羊粤语",
        "usage": "查词+听音+看例句"
      },
      {
        "type": "播客",
        "name": "《粤语会话300句》类教学播客",
        "usage": "通勤泛听"
      },
      {
        "type": "听书/有声书",
        "name": "粤语有声书、儿童故事、讲古、广播剧",
        "usage": "第3-4周通勤/晚间泛听，难度从儿童故事→广播剧→讲古/新闻递进"
      },
      {
        "type": "影视",
        "name": "港剧《爱·回家》、TVB生活剧、粤配动画",
        "usage": "第3周起晚间轮换"
      },
      {
        "type": "音乐",
        "name": "Beyond、陈奕迅等经典粤语歌",
        "usage": "通勤/晚间跟唱"
      },
      {
        "type": "词卡",
        "name": "Anki(共享词库) / Quizlet",
        "usage": "每日早间复习"
      },
      {
        "type": "AI陪练",
        "name": "豆包/ChatGPT语音对话",
        "usage": "第4周场景练习(可选)"
      }
    ],
    "paid": [
      {
        "type": "真人纠音",
        "name": "iTalki / Preply 粤语老师(¥80-200/小时)",
        "usage": "预算最值得花的地方：第3-4周做2-4次对话课"
      },
      {
        "type": "教材",
        "name": "《粤语(香港话)入门》《广州话入门》",
        "usage": "体系完整，晚间精学用"
      },
      {
        "type": "App",
        "name": "多邻国粤语课、Drops、Pimsleur",
        "usage": "碎片时间补充"
      }
    ]
  },
  "weekly_tests": [
    {
      "week": 1,
      "content": "六调例字朗读 + 70词卡",
      "pass_line": "词卡正确率≥80%，六调可区分"
    },
    {
      "week": 2,
      "content": "30句型中抽10句翻译+造句",
      "pass_line": "正确率≥70%"
    },
    {
      "week": 3,
      "content": "盲听3段短材料写大意",
      "pass_line": "每段抓住≥3个关键词"
    },
    {
      "week": 4,
      "content": "5场景模拟对话(找语伴/老师/AI)",
      "pass_line": "每个场景能完成问答闭环"
    }
  ],
  "final_test": [
    {
      "item": "发音",
      "content": "朗读「三九四零五二」+10个入声字+20个随机高频词",
      "pass_line": "录音交语伴/老师评判"
    },
    {
      "item": "词汇",
      "content": "Anki随机抽50词",
      "pass_line": "正确率≥80%"
    },
    {
      "item": "听力",
      "content": "盲听1段2分钟慢速材料，复述大意",
      "pass_line": "≥60%要点"
    },
    {
      "item": "口语",
      "content": "5场景各1分钟即兴对话",
      "pass_line": "不打草稿完成"
    },
    {
      "item": "对比",
      "content": "重听Day7录音 vs Day30录音",
      "pass_line": "记录进步点"
    }
  ],
  "not_expected_in_30_days": [
    "流利对话",
    "看剧不用字幕",
    "无口音(需3-6个月)",
    "粤语书写字(嘅/係/㗎)"
  ],
  "daily_check_template": {
    "fields": [
      "第几天",
      "日期",
      "早15分钟词卡复习(新词数/复习数)",
      "通勤15~20分钟泛听素材",
      "午休可选跟读",
      "晚间25~30分钟精学内容",
      "今日新增词数",
      "今日新增句数",
      "今日总时长",
      "自评发音/听力/开口(1-5分)",
      "打卡心情"
    ]
  },
  "audiobooks": [
    {
      "type": "粤语讲古/评书",
      "name": "张悦楷、林兆明经典讲古",
      "difficulty": "中高级",
      "description": "粤语地区经典讲古节目，语速偏快、用词地道，适合第3-4周磨耳朵和模仿语气。",
      "usage": "通勤/晚间泛听15-20分钟，先听懂大意，不追求每句都懂。"
    },
    {
      "type": "粤语广播剧",
      "name": "香港电台/商业电台经典广播剧",
      "difficulty": "中级",
      "description": "有剧情、有对白，比新闻更贴近生活口语，适合做情景听力。",
      "usage": "第3周起每周2-3次，每次20分钟；可先看字幕稿再盲听。"
    },
    {
      "type": "儿童故事/睡前故事",
      "name": "粤语儿童故事（喜马拉雅/小宇宙搜索）",
      "difficulty": "入门",
      "description": "语速慢、词汇简单、发音清晰，是零基础最好的有声书入门材料。",
      "usage": "第1-2周每天10-15分钟，边听边跟读。"
    },
    {
      "type": "粤语有声小说",
      "name": "粤语版有声小说（喜马拉雅/懒人听书）",
      "difficulty": "中高级",
      "description": "长篇内容适合培养持续听力习惯；选现代都市/生活类比古装更贴近日常用词。",
      "usage": "第3-4周每天15-20分钟，选一部感兴趣的长期追更。"
    },
    {
      "type": "粤语新闻/时事",
      "name": "香港电台新闻、TVB News 粤语报道",
      "difficulty": "中高级",
      "description": "发音标准、语速正常，适合检验听力进阶。",
      "usage": "第4周每周2次，每次10分钟，记录听到的关键词。"
    },
    {
      "type": "粤语配音动画/剧集",
      "name": "粤语配音动画、TVB生活剧音频",
      "difficulty": "中级",
      "description": "有画面辅助理解，适合从“看”过渡到“听”。",
      "usage": "第3周晚间与精听轮换，每次20分钟。"
    }
  ]
};
if (typeof module !== 'undefined') module.exports = DATA;
if (typeof window !== 'undefined') window.DATA = DATA;
