// Structured from the supplied player guide; not game prototype data.
window.PLAYER_GUIDES = [
  {
    "id": "luna-chemistry",
    "title": "Личный гайд на химку",
    "author": "Травница Луна",
    "source": "player-guides/chemistry-original.txt",
    "stock": [
      {
        "amount": 10,
        "name": "плазмы",
        "jugs": "×"
      },
      {
        "amount": 200,
        "name": "азот",
        "jugs": "1"
      },
      {
        "amount": 400,
        "name": "водород",
        "jugs": "2 *"
      },
      {
        "amount": 400,
        "name": "железо",
        "jugs": "2 *"
      },
      {
        "amount": 200,
        "name": "калий",
        "jugs": "1"
      },
      {
        "amount": 400,
        "name": "кислород",
        "jugs": "2 *"
      },
      {
        "amount": 400,
        "name": "кремний",
        "jugs": "2 *"
      },
      {
        "amount": 200,
        "name": "литий",
        "jugs": "1"
      },
      {
        "amount": 200,
        "name": "медь",
        "jugs": "1"
      },
      {
        "amount": 200,
        "name": "натрий",
        "jugs": "1"
      },
      {
        "amount": 400,
        "name": "радий",
        "jugs": "2 *"
      },
      {
        "amount": 400,
        "name": "сахар",
        "jugs": "2 *"
      },
      {
        "amount": 800,
        "name": "углерод",
        "jugs": "4 ***"
      },
      {
        "amount": 400,
        "name": "фосфор",
        "jugs": "2 *"
      },
      {
        "amount": 400,
        "name": "хлор",
        "jugs": "2 *"
      },
      {
        "amount": 400,
        "name": "этанол",
        "jugs": "2 *"
      },
      {
        "amount": 600,
        "name": "вода",
        "jugs": "3"
      },
      {
        "amount": 200,
        "name": "топливо",
        "jugs": "1"
      }
    ],
    "stockNote": "По автору: кувшины берутся из раздатчика химикатов, затем дополняются из химмастера. Звёздочки обозначают количество кувшинов из Химкомата; обозначения сохранены как в оригинале.",
    "sections": [
      {
        "id": "1",
        "title": "Подготовка рабочего места",
        "subtitle": "Оборудование и порядок загрузки реагентов",
        "blocks": [
          {
            "title": "Порядок работы",
            "recipeId": null,
            "paragraphs": [
              "Ставим мензурку с каплей воды на плитку.",
              "Для варки нужно залить все нужные реагенты в алфавитном порядке в химмастер (оставить сверху плазму а снизу воду и топляк).",
              "Приносим топливо и ставим скрубер. (рекомендуем не хранить топливо в химке, лучше за ней)",
              "После всего ставим мензурку в химмастер и сливаем воду"
            ],
            "cardId": "player:luna-chemistry:1:0",
            "batch": null
          }
        ]
      },
      {
        "id": "1.1",
        "title": "Помощь ботаникам",
        "subtitle": "Необязательный этап · требуется дополнительный запас реагентов",
        "blocks": [
          {
            "title": "Порядок работы",
            "recipeId": null,
            "paragraphs": [
              "Эти ******** могут исключить 6 этап. Потому вы исполняете им этот коктель:",
              "Мутаген, криоксадон, фалангимин, диловен, left-4-zed. (Всего по 200, фаланги можно 100)."
            ],
            "cardId": "player:luna-chemistry:1.1:0",
            "batch": null
          },
          {
            "title": "Мутаген",
            "recipeId": "reaction:UnstableMutagen",
            "paragraphs": [
              "66 радий, фосфор, хлор."
            ],
            "cardId": "player:luna-chemistry:1.1:1",
            "batch": {
              "ingredients": [
                {
                  "name": "Радий",
                  "quantity": 66,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Фосфор",
                  "quantity": 66,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Хлор",
                  "quantity": 66,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "Точный выход в этом блоке не указан.",
              "note": ""
            }
          },
          {
            "title": "Криоксадон",
            "recipeId": "reaction:Cryoxadone",
            "paragraphs": [
              " 66 декс, вода, кисл."
            ],
            "cardId": "player:luna-chemistry:1.1:2",
            "batch": {
              "ingredients": [
                {
                  "name": "Дексалин",
                  "quantity": 66,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Вода",
                  "quantity": 66,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Кислород",
                  "quantity": 66,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "Точный выход в этом блоке не указан.",
              "note": ""
            }
          },
          {
            "title": "Фалангимин",
            "recipeId": "reaction:Phalanximine",
            "paragraphs": [
              " 66 мутаген, хироналин (33 радия, 33дил (11 азот, крем, кали)), этанол."
            ],
            "cardId": "player:luna-chemistry:1.1:3",
            "batch": {
              "ingredients": [
                {
                  "name": "Мутаген",
                  "quantity": 66,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Хироналин",
                  "quantity": 66,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Этанол",
                  "quantity": 66,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "Точный выход в этом блоке не указан.",
              "note": ""
            }
          },
          {
            "title": "Диловен",
            "recipeId": "reaction:Dylovene",
            "paragraphs": [
              " 66 азот, крем, кали."
            ],
            "cardId": "player:luna-chemistry:1.1:4",
            "batch": {
              "ingredients": [
                {
                  "name": "Азот",
                  "quantity": 66,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Кремний",
                  "quantity": 66,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Калий",
                  "quantity": 66,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "Точный выход в этом блоке не указан.",
              "note": ""
            }
          },
          {
            "title": "Left-4-zed",
            "recipeId": "reaction:Left4Zed",
            "paragraphs": [
              " по 100 ez-нутриент (34 калий, фосфор, азот), радий."
            ],
            "cardId": "player:luna-chemistry:1.1:5",
            "batch": {
              "ingredients": [
                {
                  "name": "EZ-нутриент",
                  "quantity": 100,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Радий",
                  "quantity": 100,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "Точный выход в этом блоке не указан.",
              "note": ""
            }
          }
        ]
      },
      {
        "id": "2",
        "title": "Механические повреждения",
        "subtitle": "Бикаридин, бруизин, лацеринол и пунктураз",
        "blocks": [
          {
            "title": "Бикаридин",
            "recipeId": "reaction:Bicaridine",
            "paragraphs": [
              "Берем 50ун сахара и кислорода в кувшин, к ним 100 углерода, вышло 100 бики и 100 ина., перелить в химмастер. Наливаем весь ина. в кувшин и туда ещё 100 углерода. 300 бики готово."
            ],
            "cardId": "player:luna-chemistry:2:0",
            "batch": {
              "ingredients": [
                {
                  "name": "Сахар",
                  "quantity": 50,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Кислород",
                  "quantity": 50,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Углерод",
                  "quantity": 200,
                  "unit": "ед.",
                  "note": "100 в начале + ещё 100 на втором шаге"
                }
              ],
              "yieldText": "300 ед. бикаридина",
              "note": ""
            }
          },
          {
            "title": "Бруизин",
            "recipeId": "reaction:Bruizine",
            "paragraphs": [
              "берём 2 кувшина, на мензе ставим кол. перелив. 50, набираем в химмастере 100 ун лития, разливаем по 50 в 2 кувшина, так же с сахаром по 50, и с бики по 50. Потом всё в химмастер и жостаём чистых 200ун бруи."
            ],
            "cardId": "player:luna-chemistry:2:1",
            "batch": {
              "ingredients": [
                {
                  "name": "Литий",
                  "quantity": 100,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Сахар",
                  "quantity": 100,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Бикаридин",
                  "quantity": 100,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "200 ед. бруизина",
              "note": ""
            }
          },
          {
            "title": "Лацеринол",
            "recipeId": "reaction:Lacerinol",
            "paragraphs": [
              "в кувшин льем 100 углерода, к нему 100 водорода. Выходит, 100 бензы, к ним 100 бики. Лац готов."
            ],
            "cardId": "player:luna-chemistry:2:2",
            "batch": {
              "ingredients": [
                {
                  "name": "Углерод",
                  "quantity": 100,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Водород",
                  "quantity": 100,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Бикаридин",
                  "quantity": 100,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "Точный выход в этом блоке не указан.",
              "note": ""
            }
          },
          {
            "title": "Пунктураз",
            "recipeId": "reaction:Puncturase",
            "paragraphs": [
              "70 кислорода 70 водорода, 100 гидроксид в кувшин (остаток в химмастер) и 100 в химмастер, к ним 100 бики."
            ],
            "cardId": "player:luna-chemistry:2:3",
            "batch": {
              "ingredients": [
                {
                  "name": "Кислород",
                  "quantity": 70,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Водород",
                  "quantity": 70,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Бикаридин",
                  "quantity": 100,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "Точный выход в этом блоке не указан.",
              "note": "В оригинале повторено «100 в химмастер»: неоднозначность сохранена в шагах."
            }
          }
        ]
      },
      {
        "id": "3",
        "title": "Ожоги",
        "subtitle": "Лепоразин, келотан, инсузин и пиразин",
        "blocks": [
          {
            "title": "Лепоразин",
            "recipeId": "reaction:Leporazine",
            "paragraphs": [
              "Варим 340 ун лепо. Варим 170 силицида жел. Смешиваем по 50 кремния и железа, и потом еще по 35, вышло 170 сил. жел. Берем 2 кувшина, в каждый по 85 силицида, и в каждый по 1 плазма с медью (брать можно от 85 до 99 меди ибо все идет в химмастер все равно). 340ун лепо готово"
            ],
            "cardId": "player:luna-chemistry:3:0",
            "batch": {
              "ingredients": [
                {
                  "name": "Кремний",
                  "quantity": 85,
                  "unit": "ед.",
                  "note": "50 + 35"
                },
                {
                  "name": "Железо",
                  "quantity": 85,
                  "unit": "ед.",
                  "note": "50 + 35"
                },
                {
                  "name": "Плазма",
                  "quantity": 2,
                  "unit": "ед.",
                  "note": "по 1 в каждый кувшин; катализатор"
                },
                {
                  "name": "Медь",
                  "quantity": "170–198",
                  "unit": "ед.",
                  "note": "по 85–99 в каждый кувшин"
                }
              ],
              "yieldText": "340 ед. лепоразина",
              "note": ""
            }
          },
          {
            "title": "Келотан",
            "recipeId": "reaction:Kelotane",
            "paragraphs": [
              "Варим 140 келотана, 70 крем. 70 углер. в химмастере."
            ],
            "cardId": "player:luna-chemistry:3:1",
            "batch": {
              "ingredients": [
                {
                  "name": "Кремний",
                  "quantity": 70,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Углерод",
                  "quantity": 70,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "140 ед. келотана",
              "note": ""
            }
          },
          {
            "title": "Инсузин",
            "recipeId": "reaction:Insuzine",
            "paragraphs": [
              "66 келотана 66 кремния, выносим кувшин по дальше от приборов, и заливаем 66 лепо."
            ],
            "cardId": "player:luna-chemistry:3:2",
            "batch": {
              "ingredients": [
                {
                  "name": "Келотан",
                  "quantity": 66,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Кремний",
                  "quantity": 66,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Лепоразин",
                  "quantity": 66,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "Точный выход в этом блоке не указан.",
              "note": ""
            }
          },
          {
            "title": "Пиразин",
            "recipeId": "reaction:Pyrazine",
            "paragraphs": [
              "22 кислород, келотан, фосфор. 66 Дермалин, в кувшин. К ним 66 лепо и углерода. Готово."
            ],
            "cardId": "player:luna-chemistry:3:3",
            "batch": {
              "ingredients": [
                {
                  "name": "Кислород",
                  "quantity": 22,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Келотан",
                  "quantity": 22,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Фосфор",
                  "quantity": 22,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Лепоразин",
                  "quantity": 66,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Углерод",
                  "quantity": 66,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "Точный выход в этом блоке не указан.",
              "note": ""
            }
          }
        ]
      },
      {
        "id": "4",
        "title": "Промежуточные реагенты",
        "subtitle": "Хироналин, мутаген, соль, дексалин и аммиак",
        "blocks": [
          {
            "title": "Хироналин",
            "recipeId": "reaction:Hyronalin",
            "paragraphs": [
              "Варим 200 хироналина. По 35 азота, кремния, калия, в 100ун дила, добавить 100ун радия. Хироналин готов"
            ],
            "cardId": "player:luna-chemistry:4:0",
            "batch": {
              "ingredients": [
                {
                  "name": "Азот",
                  "quantity": 35,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Кремний",
                  "quantity": 35,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Калий",
                  "quantity": 35,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Радий",
                  "quantity": 100,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "200 ед. хироналина",
              "note": ""
            }
          },
          {
            "title": "Мутаген",
            "recipeId": "reaction:UnstableMutagen",
            "paragraphs": [
              "Варим 200 мутагена. 70 радия, фосфор, хлор. Готово"
            ],
            "cardId": "player:luna-chemistry:4:1",
            "batch": {
              "ingredients": [
                {
                  "name": "Радий",
                  "quantity": 70,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Фосфор",
                  "quantity": 70,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Хлор",
                  "quantity": 70,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "200 ед. мутагена",
              "note": ""
            }
          },
          {
            "title": "Столовая соль",
            "recipeId": "reaction:TableSalt",
            "paragraphs": [
              "Варим 140 столовой соли. По 70 натрия и хлора."
            ],
            "cardId": "player:luna-chemistry:4:2",
            "batch": {
              "ingredients": [
                {
                  "name": "Натрий",
                  "quantity": 70,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Хлор",
                  "quantity": 70,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "140 ед. соли",
              "note": ""
            }
          },
          {
            "title": "Дексалин",
            "recipeId": "reaction:Dexalin",
            "paragraphs": [
              "Варим 175 дексы. 117 кислорода в кувшин и 1 плазма, готово"
            ],
            "cardId": "player:luna-chemistry:4:3",
            "batch": {
              "ingredients": [
                {
                  "name": "Кислород",
                  "quantity": 117,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Плазма",
                  "quantity": 1,
                  "unit": "ед.",
                  "note": "катализатор"
                }
              ],
              "yieldText": "175 ед. дексалина",
              "note": ""
            }
          },
          {
            "title": "Аммиак",
            "recipeId": "reaction:Ammonia",
            "paragraphs": [
              "Варим 60 амиака 15 азота и водорода пока не выйдет нужное кол-во, готово."
            ],
            "cardId": "player:luna-chemistry:4:4",
            "batch": {
              "ingredients": [
                {
                  "name": "Азот",
                  "quantity": "по 15",
                  "unit": "ед.",
                  "note": "повторять до нужного выхода"
                },
                {
                  "name": "Водород",
                  "quantity": "по 15",
                  "unit": "ед.",
                  "note": "повторять до нужного выхода"
                }
              ],
              "yieldText": "60 ед. аммиака",
              "note": ""
            }
          }
        ]
      },
      {
        "id": "5",
        "title": "Радиация, удушье и другие задачи",
        "subtitle": "Аритразин, дексалин-плюс, физраствор и фалангимин",
        "blocks": [
          {
            "title": "Аритразин",
            "recipeId": "reaction:Arithrazine",
            "paragraphs": [
              "100 хиранолин 100 водорода в кувшин."
            ],
            "cardId": "player:luna-chemistry:5:0",
            "batch": {
              "ingredients": [
                {
                  "name": "Хироналин",
                  "quantity": 100,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Водород",
                  "quantity": 100,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "Точный выход в этом блоке не указан.",
              "note": ""
            }
          },
          {
            "title": "Дексалин +",
            "recipeId": "reaction:DexalinPlus",
            "paragraphs": [
              "66 дексы, углерода и железа."
            ],
            "cardId": "player:luna-chemistry:5:1",
            "batch": {
              "ingredients": [
                {
                  "name": "Дексалин",
                  "quantity": 66,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Углерод",
                  "quantity": 66,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Железо",
                  "quantity": 66,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "Точный выход в этом блоке не указан.",
              "note": ""
            }
          },
          {
            "title": "Физраствор",
            "recipeId": "reaction:Saline",
            "paragraphs": [
              "40 соли в кувшин и остальное залить водой."
            ],
            "cardId": "player:luna-chemistry:5:2",
            "batch": {
              "ingredients": [
                {
                  "name": "Столовая соль",
                  "quantity": 40,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Вода",
                  "quantity": "до заполнения кувшина",
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "Точный выход в этом блоке не указан.",
              "note": ""
            }
          },
          {
            "title": "Фалангимин",
            "recipeId": "reaction:Phalanximine",
            "paragraphs": [
              "100 мутагена, хироналина и этанола. 200 в кувшин, 100 на церебрин"
            ],
            "cardId": "player:luna-chemistry:5:3",
            "batch": {
              "ingredients": [
                {
                  "name": "Мутаген",
                  "quantity": 100,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Хироналин",
                  "quantity": 100,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Этанол",
                  "quantity": 100,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "300 ед.: 200 в кувшин, 100 на церебрин",
              "note": ""
            }
          }
        ]
      },
      {
        "id": "5.1",
        "title": "Криогенная медицина",
        "subtitle": "Церебрин, криоксадон и доксарубиксадон",
        "blocks": [
          {
            "title": "Церебрин",
            "recipeId": "reaction:Cerebrin",
            "paragraphs": [
              "100 фаланги и сахара"
            ],
            "cardId": "player:luna-chemistry:5.1:0",
            "batch": {
              "ingredients": [
                {
                  "name": "Фалангимин",
                  "quantity": 100,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Сахар",
                  "quantity": 100,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "Точный выход в этом блоке не указан.",
              "note": ""
            }
          },
          {
            "title": "Криоксадон",
            "recipeId": "reaction:Cryoxadone",
            "paragraphs": [
              "66 дексалина, воды, кислорода."
            ],
            "cardId": "player:luna-chemistry:5.1:1",
            "batch": {
              "ingredients": [
                {
                  "name": "Дексалин",
                  "quantity": 66,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Вода",
                  "quantity": 66,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Кислород",
                  "quantity": 66,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "Точный выход в этом блоке не указан.",
              "note": ""
            }
          },
          {
            "title": "Доксарубиксадон",
            "recipeId": "reaction:Doxarubixadone",
            "paragraphs": [
              "100 криоксадона, 100 мутагена."
            ],
            "cardId": "player:luna-chemistry:5.1:2",
            "batch": {
              "ingredients": [
                {
                  "name": "Криоксадон",
                  "quantity": 100,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Мутаген",
                  "quantity": 100,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "Точный выход в этом блоке не указан.",
              "note": ""
            }
          }
        ]
      },
      {
        "id": "6",
        "title": "Кислоты и яды",
        "subtitle": "Сигинат, дифенгидрамин и советы автора",
        "blocks": [
          {
            "title": "Сигинат",
            "recipeId": "reaction:Sigynate",
            "paragraphs": [
              " 15 аммиак, соль, кислород, углерод, получаем 60 карбонат натрия в химмастер. 30 гидроксида и натрия, 60 гдркс.натр. в химмастер, готовим воду, сахар, келотан. Дальше ставим 2 кувшина, 50 ун каждого реагента разливаем по кувшинам (по 25ун в каждый). Переливаем всё в 1 кувшин. Готово"
            ],
            "cardId": "player:luna-chemistry:6:0",
            "batch": {
              "ingredients": [
                {
                  "name": "Карбонат натрия",
                  "quantity": 50,
                  "unit": "ед.",
                  "note": "приготовить 60: по 15 аммиака, соли, кислорода и углерода"
                },
                {
                  "name": "Гидроксид натрия",
                  "quantity": 50,
                  "unit": "ед.",
                  "note": "приготовить 60: по 30 гидроксида и натрия"
                },
                {
                  "name": "Вода",
                  "quantity": 50,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Сахар",
                  "quantity": 50,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Келотан",
                  "quantity": 50,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "Точный выход в этом блоке не указан.",
              "note": ""
            }
          },
          {
            "title": "Дифенгидрамин",
            "recipeId": "reaction:Diphenhydramine",
            "paragraphs": [
              "БЕРЁМ НОВУЮ МЕНЗУРКУ И ВСЕ МАХИНАЦИИ ДЕЛАЕМ С НЕЙ. Мешаем в химмастере 40 амиака и этанол, вышло 80 диэтиамина. По 25 топлива, углерода, водорода, вышло 75 масла. Теперь греем 5ун масла до 400к. Дале ставим мензурку в химмастер, сливаем масло, и готовим 3 кувшина. Разливаем диетиламин, соль, углерод, этанол по 75 (кроме масла) по кувшинах ( по 25 один кувшин). И в последнюю очередь масло в тех же пропорциях. Все что вышло сливаем в один кувшин."
            ],
            "cardId": "player:luna-chemistry:6:1",
            "batch": {
              "ingredients": [
                {
                  "name": "Диэтиламин",
                  "quantity": 75,
                  "unit": "ед.",
                  "note": "приготовить 80 из 40 аммиака и 40 этанола"
                },
                {
                  "name": "Столовая соль",
                  "quantity": 75,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Углерод",
                  "quantity": 75,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Этанол",
                  "quantity": 75,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Масло",
                  "quantity": 75,
                  "unit": "ед.",
                  "note": "по 25 топлива, углерода, водорода; 5 ед. для прогрева мензурки"
                }
              ],
              "yieldText": "Точный выход в этом блоке не указан.",
              "note": ""
            }
          },
          {
            "title": "Совет автора",
            "recipeId": null,
            "paragraphs": [
              "Совет! – если у вас нет очков хим. Анализа, вы наливаете 5ун масла в мензурку, ставите на плиту и считаете 4 секунды, после чего быстро снимаете, температура будет в границах 380-410К чего будет достаточно."
            ],
            "cardId": "player:luna-chemistry:6:2",
            "batch": null
          },
          {
            "title": "Совет автора",
            "recipeId": null,
            "paragraphs": [
              "Совет! – если вам срочно нужен Церебрин повторите следующие действия в раздатчике химикатов:",
              "По 5 азот, кремний, калий, добавить 15 радия, дальше 10 радий, фосфор, хлор, добавить 30 этанола.",
              "90 фалангимина слить в кувшин и добавить 90 сахара. 180ун церебрина готово."
            ],
            "cardId": "player:luna-chemistry:6:3",
            "batch": null
          }
        ]
      },
      {
        "id": "8",
        "title": "Дополнительные лекарства",
        "subtitle": "Ницерголин и окулин · по необходимости",
        "blocks": [
          {
            "title": "Ницерголин",
            "recipeId": "reaction:Nicergoline",
            "paragraphs": [
              "Вновь берем холодную мензурку и варим немного масла (по 5 топляк, углерод, водород). С остатков в химмастере берем по 5 диэтиламина, соли, водорода смешиваем с 5ун масла – получили эфидрин. В химмастер заливаем 20йода, теперь берём горячую мензу и смешиваем по 20 эфидрин, йод, фосфор, углерод. Получили 80 дезоксы.",
              "Для цербрина берем 35ун фалангимина с кувшина с шкафа с лекарств, добавляем 35 сахара. Получили 70 Церебрина",
              "Смешиваем как удобно 70 : 70 : 70 Дезоксу, Церебрин, Кислород. Вышло 210 Ницы"
            ],
            "cardId": "player:luna-chemistry:8:0",
            "batch": {
              "ingredients": [
                {
                  "name": "Дезоксиэфедрин",
                  "quantity": 70,
                  "unit": "ед.",
                  "note": "подготовить 80 по шагам ниже"
                },
                {
                  "name": "Церебрин",
                  "quantity": 70,
                  "unit": "ед.",
                  "note": "35 фалангимина + 35 сахара"
                },
                {
                  "name": "Кислород",
                  "quantity": 70,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "210 ед. ницерголина",
              "note": ""
            }
          },
          {
            "title": "Окулин",
            "recipeId": "reaction:Oculine",
            "paragraphs": [
              "варим 50 гидроксида (по 25 кислород и водород) и 25 соли (по 15 хлор и натрий), набираем у кого-нибудь 25 крови. Смешиваем и получаем 100 Окулина."
            ],
            "cardId": "player:luna-chemistry:8:1",
            "batch": {
              "ingredients": [
                {
                  "name": "Гидроксид",
                  "quantity": 50,
                  "unit": "ед.",
                  "note": "по 25 кислорода и водорода"
                },
                {
                  "name": "Столовая соль",
                  "quantity": 25,
                  "unit": "ед.",
                  "note": "автор предлагает подготовить из 15 хлора и 15 натрия"
                },
                {
                  "name": "Кровь",
                  "quantity": 25,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "100 ед. окулина",
              "note": ""
            }
          }
        ]
      },
      {
        "id": "9",
        "title": "Продвинутые расходники",
        "subtitle": "Сети и нити · по желанию, с пополнением запасов",
        "blocks": [
          {
            "title": "Порядок работы",
            "recipeId": null,
            "paragraphs": [
              "Пополняем наш химмастер реагентами (того что написано в начале не хватит)"
            ],
            "cardId": "player:luna-chemistry:9:0",
            "batch": null
          },
          {
            "title": "Сети",
            "recipeId": null,
            "paragraphs": [
              "Сети варим 400ун сигината и 400ун дермалина и смешиваем в кувшинах с пропорцией 1 : 1, просим у ботаников 20 алое, ищем 20 мазей и 20 ткани. Тащим в химку микроволновку. Суём кувшин с смесью, мази, ткань, и 3 алое в микроволновку на 30 сек. На выходе получим 3 сети и остатки мазей, ткани и жижки в кувшине (одного кувшина хватает на 5 сетей потому не забывайте сувать в микроволновку новые)."
            ],
            "cardId": "player:luna-chemistry:9:1",
            "batch": {
              "ingredients": [
                {
                  "name": "Сигинат",
                  "quantity": 400,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Дермалин",
                  "quantity": 400,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Алоэ",
                  "quantity": 20,
                  "unit": "шт.",
                  "note": "штук; в микроволновку по 3"
                },
                {
                  "name": "Мазь",
                  "quantity": 20,
                  "unit": "шт.",
                  "note": "штук"
                },
                {
                  "name": "Ткань",
                  "quantity": 20,
                  "unit": "шт.",
                  "note": "штук"
                }
              ],
              "yieldText": "3 сети за описанный запуск микроволновки",
              "note": ""
            }
          },
          {
            "title": "Нити",
            "recipeId": null,
            "paragraphs": [
              "Нити варим 450ун транексамовой кислоты и 450ун криптобиолина и смешиваем в кувшинах с пропорцией 1 : 1, просим у ботаников 20 мака, ищем 20 наборов и 20 ткани. Суём кувшин с смесью, наборы, ткань, и 3 мак в микроволновку на 30 сек. На выходе получим 3 нити и остатки наборов, ткани и жижки в кувшине (одного кувшина хватает на 5 нитей потому не забывайте сувать в микроволновку новые)."
            ],
            "cardId": "player:luna-chemistry:9:2",
            "batch": {
              "ingredients": [
                {
                  "name": "Транексамовая кислота",
                  "quantity": 450,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Криптобиолин",
                  "quantity": 450,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Мак",
                  "quantity": 20,
                  "unit": "шт.",
                  "note": "штук; в микроволновку по 3"
                },
                {
                  "name": "Наборы",
                  "quantity": 20,
                  "unit": "шт.",
                  "note": "штук; название в оригинале не уточнено"
                },
                {
                  "name": "Ткань",
                  "quantity": 20,
                  "unit": "шт.",
                  "note": "штук"
                }
              ],
              "yieldText": "3 нити за описанный запуск микроволновки",
              "note": ""
            }
          },
          {
            "title": "Сигинат",
            "recipeId": "reaction:Sigynate",
            "paragraphs": [
              "100 карбоната натрия (по 25 соль, аммиак, кислород, углерод) 100 гидроксид натрия (по 25 кислород, водород, + 50 натрия) 100 келотана (по 50 углерод, кремний) 100 сахара, 100 воды."
            ],
            "cardId": "player:luna-chemistry:9:3",
            "batch": {
              "ingredients": [
                {
                  "name": "Карбонат натрия",
                  "quantity": 100,
                  "unit": "ед.",
                  "note": "по 25 соли, аммиака, кислорода и углерода"
                },
                {
                  "name": "Гидроксид натрия",
                  "quantity": 100,
                  "unit": "ед.",
                  "note": "по 25 кислорода и водорода, затем 50 натрия"
                },
                {
                  "name": "Келотан",
                  "quantity": 100,
                  "unit": "ед.",
                  "note": "по 50 углерода и кремния"
                },
                {
                  "name": "Сахар",
                  "quantity": 100,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Вода",
                  "quantity": 100,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "Точный выход в этом блоке не указан.",
              "note": ""
            }
          },
          {
            "title": "Дермалин",
            "recipeId": "reaction:Dermaline",
            "paragraphs": [
              "150 келотан (75 углерод, кремний) 150 фосфор, 150 кислород. (остаток 50)"
            ],
            "cardId": "player:luna-chemistry:9:4",
            "batch": {
              "ingredients": [
                {
                  "name": "Келотан",
                  "quantity": 150,
                  "unit": "ед.",
                  "note": "по 75 углерода и кремния"
                },
                {
                  "name": "Фосфор",
                  "quantity": 150,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Кислород",
                  "quantity": 150,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "Точный выход в этом блоке не указан.",
              "note": ""
            }
          },
          {
            "title": "Транексамовая кислота",
            "recipeId": "reaction:TranexamicAcid",
            "paragraphs": [
              "150 серной кислоты (100 кислорода, по 50 серы, водорода), сахар, инапровалин (по 50 углерода, кислорода, сахара). (остаток 50)"
            ],
            "cardId": "player:luna-chemistry:9:5",
            "batch": {
              "ingredients": [
                {
                  "name": "Серная кислота",
                  "quantity": 150,
                  "unit": "ед.",
                  "note": "100 кислорода, по 50 серы и водорода"
                },
                {
                  "name": "Сахар",
                  "quantity": 150,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Инапровалин",
                  "quantity": 150,
                  "unit": "ед.",
                  "note": "по 50 углерода, кислорода и сахара"
                }
              ],
              "yieldText": "Точный выход в этом блоке не указан.",
              "note": ""
            }
          },
          {
            "title": "Криптобиолин",
            "recipeId": "reaction:Cryptobiolin",
            "paragraphs": [
              "по 150 кислорода, калия, сахара. (остаток 50)."
            ],
            "cardId": "player:luna-chemistry:9:6",
            "batch": {
              "ingredients": [
                {
                  "name": "Кислород",
                  "quantity": 150,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Калий",
                  "quantity": 150,
                  "unit": "ед.",
                  "note": ""
                },
                {
                  "name": "Сахар",
                  "quantity": 150,
                  "unit": "ед.",
                  "note": ""
                }
              ],
              "yieldText": "Точный выход в этом блоке не указан.",
              "note": ""
            }
          }
        ]
      },
      {
        "id": "end",
        "title": "После основной работы",
        "subtitle": "Пополнение лекарств и дополнительные идеи автора",
        "blocks": [
          {
            "title": "Порядок работы",
            "recipeId": null,
            "paragraphs": [
              "Дальше пополняем химкомат и кайфуем. Пополняем лекарства, и варим 1000унц космического миража.",
              "Или можете намешать Этанола, Сахара и Воды как 1 : 3 : 3 и получить себе кристалик.",
              "Или смешав Волокно с Миражем как 1 : 2 наварить ковриков"
            ],
            "cardId": "player:luna-chemistry:end:0",
            "batch": null
          }
        ]
      }
    ]
  }
];
window.PLAYER_RECIPES = [
  {
    "id": "player:luna-chemistry:1.1:1",
    "name": "Мутаген",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "1.1",
    "stageTitle": "Помощь ботаникам",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:1.1:1",
    "officialRecipeId": "reaction:UnstableMutagen",
    "ingredients": [
      {
        "name": "Радий",
        "quantity": 66,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Фосфор",
        "quantity": 66,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Хлор",
        "quantity": 66,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "66 радий, фосфор, хлор."
    ],
    "yieldText": "Точный выход в этом блоке не указан.",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:1.1:2",
    "name": "Криоксадон",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "1.1",
    "stageTitle": "Помощь ботаникам",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:1.1:2",
    "officialRecipeId": "reaction:Cryoxadone",
    "ingredients": [
      {
        "name": "Дексалин",
        "quantity": 66,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Вода",
        "quantity": 66,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Кислород",
        "quantity": 66,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      " 66 декс, вода, кисл."
    ],
    "yieldText": "Точный выход в этом блоке не указан.",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:1.1:3",
    "name": "Фалангимин",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "1.1",
    "stageTitle": "Помощь ботаникам",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:1.1:3",
    "officialRecipeId": "reaction:Phalanximine",
    "ingredients": [
      {
        "name": "Мутаген",
        "quantity": 66,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Хироналин",
        "quantity": 66,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Этанол",
        "quantity": 66,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      " 66 мутаген, хироналин (33 радия, 33дил (11 азот, крем, кали)), этанол."
    ],
    "yieldText": "Точный выход в этом блоке не указан.",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:1.1:4",
    "name": "Диловен",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "1.1",
    "stageTitle": "Помощь ботаникам",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:1.1:4",
    "officialRecipeId": "reaction:Dylovene",
    "ingredients": [
      {
        "name": "Азот",
        "quantity": 66,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Кремний",
        "quantity": 66,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Калий",
        "quantity": 66,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      " 66 азот, крем, кали."
    ],
    "yieldText": "Точный выход в этом блоке не указан.",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:1.1:5",
    "name": "Left-4-zed",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "1.1",
    "stageTitle": "Помощь ботаникам",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:1.1:5",
    "officialRecipeId": "reaction:Left4Zed",
    "ingredients": [
      {
        "name": "EZ-нутриент",
        "quantity": 100,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Радий",
        "quantity": 100,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      " по 100 ez-нутриент (34 калий, фосфор, азот), радий."
    ],
    "yieldText": "Точный выход в этом блоке не указан.",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:2:0",
    "name": "Бикаридин",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "2",
    "stageTitle": "Механические повреждения",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:2:0",
    "officialRecipeId": "reaction:Bicaridine",
    "ingredients": [
      {
        "name": "Сахар",
        "quantity": 50,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Кислород",
        "quantity": 50,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Углерод",
        "quantity": 200,
        "unit": "ед.",
        "note": "100 в начале + ещё 100 на втором шаге"
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "Берем 50ун сахара и кислорода в кувшин, к ним 100 углерода, вышло 100 бики и 100 ина., перелить в химмастер.",
      "Наливаем весь ина. в кувшин и туда ещё 100 углерода. 300 бики готово."
    ],
    "yieldText": "300 ед. бикаридина",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:2:1",
    "name": "Бруизин",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "2",
    "stageTitle": "Механические повреждения",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:2:1",
    "officialRecipeId": "reaction:Bruizine",
    "ingredients": [
      {
        "name": "Литий",
        "quantity": 100,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Сахар",
        "quantity": 100,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Бикаридин",
        "quantity": 100,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "берём 2 кувшина, на мензе ставим кол. перелив. 50, набираем в химмастере 100 ун лития, разливаем по 50 в 2 кувшина, так же с сахаром по 50, и с бики по 50.",
      "Потом всё в химмастер и жостаём чистых 200ун бруи."
    ],
    "yieldText": "200 ед. бруизина",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:2:2",
    "name": "Лацеринол",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "2",
    "stageTitle": "Механические повреждения",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:2:2",
    "officialRecipeId": "reaction:Lacerinol",
    "ingredients": [
      {
        "name": "Углерод",
        "quantity": 100,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Водород",
        "quantity": 100,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Бикаридин",
        "quantity": 100,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "в кувшин льем 100 углерода, к нему 100 водорода.",
      "Выходит, 100 бензы, к ним 100 бики.",
      "Лац готов."
    ],
    "yieldText": "Точный выход в этом блоке не указан.",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:2:3",
    "name": "Пунктураз",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "2",
    "stageTitle": "Механические повреждения",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:2:3",
    "officialRecipeId": "reaction:Puncturase",
    "ingredients": [
      {
        "name": "Кислород",
        "quantity": 70,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Водород",
        "quantity": 70,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Бикаридин",
        "quantity": 100,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "70 кислорода 70 водорода, 100 гидроксид в кувшин (остаток в химмастер) и 100 в химмастер, к ним 100 бики."
    ],
    "yieldText": "Точный выход в этом блоке не указан.",
    "note": "В оригинале повторено «100 в химмастер»: неоднозначность сохранена в шагах."
  },
  {
    "id": "player:luna-chemistry:3:0",
    "name": "Лепоразин",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "3",
    "stageTitle": "Ожоги",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:3:0",
    "officialRecipeId": "reaction:Leporazine",
    "ingredients": [
      {
        "name": "Кремний",
        "quantity": 85,
        "unit": "ед.",
        "note": "50 + 35"
      },
      {
        "name": "Железо",
        "quantity": 85,
        "unit": "ед.",
        "note": "50 + 35"
      },
      {
        "name": "Плазма",
        "quantity": 2,
        "unit": "ед.",
        "note": "по 1 в каждый кувшин; катализатор"
      },
      {
        "name": "Медь",
        "quantity": "170–198",
        "unit": "ед.",
        "note": "по 85–99 в каждый кувшин"
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "Варим 340 ун лепо.",
      "Варим 170 силицида жел.",
      "Смешиваем по 50 кремния и железа, и потом еще по 35, вышло 170 сил. жел.",
      "Берем 2 кувшина, в каждый по 85 силицида, и в каждый по 1 плазма с медью (брать можно от 85 до 99 меди ибо все идет в химмастер все равно). 340ун лепо готово"
    ],
    "yieldText": "340 ед. лепоразина",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:3:1",
    "name": "Келотан",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "3",
    "stageTitle": "Ожоги",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:3:1",
    "officialRecipeId": "reaction:Kelotane",
    "ingredients": [
      {
        "name": "Кремний",
        "quantity": 70,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Углерод",
        "quantity": 70,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "Варим 140 келотана, 70 крем. 70 углер. в химмастере."
    ],
    "yieldText": "140 ед. келотана",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:3:2",
    "name": "Инсузин",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "3",
    "stageTitle": "Ожоги",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:3:2",
    "officialRecipeId": "reaction:Insuzine",
    "ingredients": [
      {
        "name": "Келотан",
        "quantity": 66,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Кремний",
        "quantity": 66,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Лепоразин",
        "quantity": 66,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "66 келотана 66 кремния, выносим кувшин по дальше от приборов, и заливаем 66 лепо."
    ],
    "yieldText": "Точный выход в этом блоке не указан.",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:3:3",
    "name": "Пиразин",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "3",
    "stageTitle": "Ожоги",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:3:3",
    "officialRecipeId": "reaction:Pyrazine",
    "ingredients": [
      {
        "name": "Кислород",
        "quantity": 22,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Келотан",
        "quantity": 22,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Фосфор",
        "quantity": 22,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Лепоразин",
        "quantity": 66,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Углерод",
        "quantity": 66,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "22 кислород, келотан, фосфор. 66 Дермалин, в кувшин.",
      "К ним 66 лепо и углерода.",
      "Готово."
    ],
    "yieldText": "Точный выход в этом блоке не указан.",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:4:0",
    "name": "Хироналин",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "4",
    "stageTitle": "Промежуточные реагенты",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:4:0",
    "officialRecipeId": "reaction:Hyronalin",
    "ingredients": [
      {
        "name": "Азот",
        "quantity": 35,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Кремний",
        "quantity": 35,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Калий",
        "quantity": 35,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Радий",
        "quantity": 100,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "Варим 200 хироналина.",
      "По 35 азота, кремния, калия, в 100ун дила, добавить 100ун радия.",
      "Хироналин готов"
    ],
    "yieldText": "200 ед. хироналина",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:4:1",
    "name": "Мутаген",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "4",
    "stageTitle": "Промежуточные реагенты",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:4:1",
    "officialRecipeId": "reaction:UnstableMutagen",
    "ingredients": [
      {
        "name": "Радий",
        "quantity": 70,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Фосфор",
        "quantity": 70,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Хлор",
        "quantity": 70,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "Варим 200 мутагена. 70 радия, фосфор, хлор.",
      "Готово"
    ],
    "yieldText": "200 ед. мутагена",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:4:2",
    "name": "Столовая соль",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "4",
    "stageTitle": "Промежуточные реагенты",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:4:2",
    "officialRecipeId": "reaction:TableSalt",
    "ingredients": [
      {
        "name": "Натрий",
        "quantity": 70,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Хлор",
        "quantity": 70,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "Варим 140 столовой соли.",
      "По 70 натрия и хлора."
    ],
    "yieldText": "140 ед. соли",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:4:3",
    "name": "Дексалин",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "4",
    "stageTitle": "Промежуточные реагенты",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:4:3",
    "officialRecipeId": "reaction:Dexalin",
    "ingredients": [
      {
        "name": "Кислород",
        "quantity": 117,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Плазма",
        "quantity": 1,
        "unit": "ед.",
        "note": "катализатор"
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "Варим 175 дексы. 117 кислорода в кувшин и 1 плазма, готово"
    ],
    "yieldText": "175 ед. дексалина",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:4:4",
    "name": "Аммиак",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "4",
    "stageTitle": "Промежуточные реагенты",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:4:4",
    "officialRecipeId": "reaction:Ammonia",
    "ingredients": [
      {
        "name": "Азот",
        "quantity": "по 15",
        "unit": "ед.",
        "note": "повторять до нужного выхода"
      },
      {
        "name": "Водород",
        "quantity": "по 15",
        "unit": "ед.",
        "note": "повторять до нужного выхода"
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "Варим 60 амиака 15 азота и водорода пока не выйдет нужное кол-во, готово."
    ],
    "yieldText": "60 ед. аммиака",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:5:0",
    "name": "Аритразин",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "5",
    "stageTitle": "Радиация, удушье и другие задачи",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:5:0",
    "officialRecipeId": "reaction:Arithrazine",
    "ingredients": [
      {
        "name": "Хироналин",
        "quantity": 100,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Водород",
        "quantity": 100,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "100 хиранолин 100 водорода в кувшин."
    ],
    "yieldText": "Точный выход в этом блоке не указан.",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:5:1",
    "name": "Дексалин +",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "5",
    "stageTitle": "Радиация, удушье и другие задачи",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:5:1",
    "officialRecipeId": "reaction:DexalinPlus",
    "ingredients": [
      {
        "name": "Дексалин",
        "quantity": 66,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Углерод",
        "quantity": 66,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Железо",
        "quantity": 66,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "66 дексы, углерода и железа."
    ],
    "yieldText": "Точный выход в этом блоке не указан.",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:5:2",
    "name": "Физраствор",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "5",
    "stageTitle": "Радиация, удушье и другие задачи",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:5:2",
    "officialRecipeId": "reaction:Saline",
    "ingredients": [
      {
        "name": "Столовая соль",
        "quantity": 40,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Вода",
        "quantity": "до заполнения кувшина",
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "40 соли в кувшин и остальное залить водой."
    ],
    "yieldText": "Точный выход в этом блоке не указан.",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:5:3",
    "name": "Фалангимин",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "5",
    "stageTitle": "Радиация, удушье и другие задачи",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:5:3",
    "officialRecipeId": "reaction:Phalanximine",
    "ingredients": [
      {
        "name": "Мутаген",
        "quantity": 100,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Хироналин",
        "quantity": 100,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Этанол",
        "quantity": 100,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "100 мутагена, хироналина и этанола. 200 в кувшин, 100 на церебрин"
    ],
    "yieldText": "300 ед.: 200 в кувшин, 100 на церебрин",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:5.1:0",
    "name": "Церебрин",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "5.1",
    "stageTitle": "Криогенная медицина",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:5.1:0",
    "officialRecipeId": "reaction:Cerebrin",
    "ingredients": [
      {
        "name": "Фалангимин",
        "quantity": 100,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Сахар",
        "quantity": 100,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "100 фаланги и сахара"
    ],
    "yieldText": "Точный выход в этом блоке не указан.",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:5.1:1",
    "name": "Криоксадон",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "5.1",
    "stageTitle": "Криогенная медицина",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:5.1:1",
    "officialRecipeId": "reaction:Cryoxadone",
    "ingredients": [
      {
        "name": "Дексалин",
        "quantity": 66,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Вода",
        "quantity": 66,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Кислород",
        "quantity": 66,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "66 дексалина, воды, кислорода."
    ],
    "yieldText": "Точный выход в этом блоке не указан.",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:5.1:2",
    "name": "Доксарубиксадон",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "5.1",
    "stageTitle": "Криогенная медицина",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:5.1:2",
    "officialRecipeId": "reaction:Doxarubixadone",
    "ingredients": [
      {
        "name": "Криоксадон",
        "quantity": 100,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Мутаген",
        "quantity": 100,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "100 криоксадона, 100 мутагена."
    ],
    "yieldText": "Точный выход в этом блоке не указан.",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:6:0",
    "name": "Сигинат",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "6",
    "stageTitle": "Кислоты и яды",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:6:0",
    "officialRecipeId": "reaction:Sigynate",
    "ingredients": [
      {
        "name": "Карбонат натрия",
        "quantity": 50,
        "unit": "ед.",
        "note": "приготовить 60: по 15 аммиака, соли, кислорода и углерода"
      },
      {
        "name": "Гидроксид натрия",
        "quantity": 50,
        "unit": "ед.",
        "note": "приготовить 60: по 30 гидроксида и натрия"
      },
      {
        "name": "Вода",
        "quantity": 50,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Сахар",
        "quantity": 50,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Келотан",
        "quantity": 50,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      " 15 аммиак, соль, кислород, углерод, получаем 60 карбонат натрия в химмастер. 30 гидроксида и натрия, 60 гдркс.натр. в химмастер, готовим воду, сахар, келотан.",
      "Дальше ставим 2 кувшина, 50 ун каждого реагента разливаем по кувшинам (по 25ун в каждый).",
      "Переливаем всё в 1 кувшин.",
      "Готово"
    ],
    "yieldText": "Точный выход в этом блоке не указан.",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:6:1",
    "name": "Дифенгидрамин",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "6",
    "stageTitle": "Кислоты и яды",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:6:1",
    "officialRecipeId": "reaction:Diphenhydramine",
    "ingredients": [
      {
        "name": "Диэтиламин",
        "quantity": 75,
        "unit": "ед.",
        "note": "приготовить 80 из 40 аммиака и 40 этанола"
      },
      {
        "name": "Столовая соль",
        "quantity": 75,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Углерод",
        "quantity": 75,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Этанол",
        "quantity": 75,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Масло",
        "quantity": 75,
        "unit": "ед.",
        "note": "по 25 топлива, углерода, водорода; 5 ед. для прогрева мензурки"
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "БЕРЁМ НОВУЮ МЕНЗУРКУ И ВСЕ МАХИНАЦИИ ДЕЛАЕМ С НЕЙ.",
      "Мешаем в химмастере 40 амиака и этанол, вышло 80 диэтиамина.",
      "По 25 топлива, углерода, водорода, вышло 75 масла.",
      "Теперь греем 5ун масла до 400к.",
      "Дале ставим мензурку в химмастер, сливаем масло, и готовим 3 кувшина.",
      "Разливаем диетиламин, соль, углерод, этанол по 75 (кроме масла) по кувшинах ( по 25 один кувшин).",
      "И в последнюю очередь масло в тех же пропорциях.",
      "Все что вышло сливаем в один кувшин."
    ],
    "yieldText": "Точный выход в этом блоке не указан.",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:8:0",
    "name": "Ницерголин",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "8",
    "stageTitle": "Дополнительные лекарства",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:8:0",
    "officialRecipeId": "reaction:Nicergoline",
    "ingredients": [
      {
        "name": "Дезоксиэфедрин",
        "quantity": 70,
        "unit": "ед.",
        "note": "подготовить 80 по шагам ниже"
      },
      {
        "name": "Церебрин",
        "quantity": 70,
        "unit": "ед.",
        "note": "35 фалангимина + 35 сахара"
      },
      {
        "name": "Кислород",
        "quantity": 70,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "Вновь берем холодную мензурку и варим немного масла (по 5 топляк, углерод, водород).",
      "С остатков в химмастере берем по 5 диэтиламина, соли, водорода смешиваем с 5ун масла – получили эфидрин.",
      "В химмастер заливаем 20йода, теперь берём горячую мензу и смешиваем по 20 эфидрин, йод, фосфор, углерод.",
      "Получили 80 дезоксы.",
      "Для цербрина берем 35ун фалангимина с кувшина с шкафа с лекарств, добавляем 35 сахара.",
      "Получили 70 Церебрина",
      "Смешиваем как удобно 70 : 70 : 70 Дезоксу, Церебрин, Кислород.",
      "Вышло 210 Ницы"
    ],
    "yieldText": "210 ед. ницерголина",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:8:1",
    "name": "Окулин",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "8",
    "stageTitle": "Дополнительные лекарства",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:8:1",
    "officialRecipeId": "reaction:Oculine",
    "ingredients": [
      {
        "name": "Гидроксид",
        "quantity": 50,
        "unit": "ед.",
        "note": "по 25 кислорода и водорода"
      },
      {
        "name": "Столовая соль",
        "quantity": 25,
        "unit": "ед.",
        "note": "автор предлагает подготовить из 15 хлора и 15 натрия"
      },
      {
        "name": "Кровь",
        "quantity": 25,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "варим 50 гидроксида (по 25 кислород и водород) и 25 соли (по 15 хлор и натрий), набираем у кого-нибудь 25 крови.",
      "Смешиваем и получаем 100 Окулина."
    ],
    "yieldText": "100 ед. окулина",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:9:1",
    "name": "Сети",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "9",
    "stageTitle": "Продвинутые расходники",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:9:1",
    "officialRecipeId": null,
    "ingredients": [
      {
        "name": "Сигинат",
        "quantity": 400,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Дермалин",
        "quantity": 400,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Алоэ",
        "quantity": 20,
        "unit": "шт.",
        "note": "штук; в микроволновку по 3"
      },
      {
        "name": "Мазь",
        "quantity": 20,
        "unit": "шт.",
        "note": "штук"
      },
      {
        "name": "Ткань",
        "quantity": 20,
        "unit": "шт.",
        "note": "штук"
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "Сети варим 400ун сигината и 400ун дермалина и смешиваем в кувшинах с пропорцией 1 : 1, просим у ботаников 20 алое, ищем 20 мазей и 20 ткани.",
      "Тащим в химку микроволновку.",
      "Суём кувшин с смесью, мази, ткань, и 3 алое в микроволновку на 30 сек.",
      "На выходе получим 3 сети и остатки мазей, ткани и жижки в кувшине (одного кувшина хватает на 5 сетей потому не забывайте сувать в микроволновку новые)."
    ],
    "yieldText": "3 сети за описанный запуск микроволновки",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:9:2",
    "name": "Нити",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "9",
    "stageTitle": "Продвинутые расходники",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:9:2",
    "officialRecipeId": null,
    "ingredients": [
      {
        "name": "Транексамовая кислота",
        "quantity": 450,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Криптобиолин",
        "quantity": 450,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Мак",
        "quantity": 20,
        "unit": "шт.",
        "note": "штук; в микроволновку по 3"
      },
      {
        "name": "Наборы",
        "quantity": 20,
        "unit": "шт.",
        "note": "штук; название в оригинале не уточнено"
      },
      {
        "name": "Ткань",
        "quantity": 20,
        "unit": "шт.",
        "note": "штук"
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "Нити варим 450ун транексамовой кислоты и 450ун криптобиолина и смешиваем в кувшинах с пропорцией 1 : 1, просим у ботаников 20 мака, ищем 20 наборов и 20 ткани.",
      "Суём кувшин с смесью, наборы, ткань, и 3 мак в микроволновку на 30 сек.",
      "На выходе получим 3 нити и остатки наборов, ткани и жижки в кувшине (одного кувшина хватает на 5 нитей потому не забывайте сувать в микроволновку новые)."
    ],
    "yieldText": "3 нити за описанный запуск микроволновки",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:9:3",
    "name": "Сигинат",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "9",
    "stageTitle": "Продвинутые расходники",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:9:3",
    "officialRecipeId": "reaction:Sigynate",
    "ingredients": [
      {
        "name": "Карбонат натрия",
        "quantity": 100,
        "unit": "ед.",
        "note": "по 25 соли, аммиака, кислорода и углерода"
      },
      {
        "name": "Гидроксид натрия",
        "quantity": 100,
        "unit": "ед.",
        "note": "по 25 кислорода и водорода, затем 50 натрия"
      },
      {
        "name": "Келотан",
        "quantity": 100,
        "unit": "ед.",
        "note": "по 50 углерода и кремния"
      },
      {
        "name": "Сахар",
        "quantity": 100,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Вода",
        "quantity": 100,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "100 карбоната натрия (по 25 соль, аммиак, кислород, углерод) 100 гидроксид натрия (по 25 кислород, водород, + 50 натрия) 100 келотана (по 50 углерод, кремний) 100 сахара, 100 воды."
    ],
    "yieldText": "Точный выход в этом блоке не указан.",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:9:4",
    "name": "Дермалин",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "9",
    "stageTitle": "Продвинутые расходники",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:9:4",
    "officialRecipeId": "reaction:Dermaline",
    "ingredients": [
      {
        "name": "Келотан",
        "quantity": 150,
        "unit": "ед.",
        "note": "по 75 углерода и кремния"
      },
      {
        "name": "Фосфор",
        "quantity": 150,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Кислород",
        "quantity": 150,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "150 келотан (75 углерод, кремний) 150 фосфор, 150 кислород. (остаток 50)"
    ],
    "yieldText": "Точный выход в этом блоке не указан.",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:9:5",
    "name": "Транексамовая кислота",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "9",
    "stageTitle": "Продвинутые расходники",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:9:5",
    "officialRecipeId": "reaction:TranexamicAcid",
    "ingredients": [
      {
        "name": "Серная кислота",
        "quantity": 150,
        "unit": "ед.",
        "note": "100 кислорода, по 50 серы и водорода"
      },
      {
        "name": "Сахар",
        "quantity": 150,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Инапровалин",
        "quantity": 150,
        "unit": "ед.",
        "note": "по 50 углерода, кислорода и сахара"
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "150 серной кислоты (100 кислорода, по 50 серы, водорода), сахар, инапровалин (по 50 углерода, кислорода, сахара). (остаток 50)"
    ],
    "yieldText": "Точный выход в этом блоке не указан.",
    "note": ""
  },
  {
    "id": "player:luna-chemistry:9:6",
    "name": "Криптобиолин",
    "category": "chem",
    "playerGuide": true,
    "author": "Травница Луна",
    "stage": "9",
    "stageTitle": "Продвинутые расходники",
    "source": "player-guides/chemistry-original.txt",
    "prototype": "player:luna-chemistry:9:6",
    "officialRecipeId": "reaction:Cryptobiolin",
    "ingredients": [
      {
        "name": "Кислород",
        "quantity": 150,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Калий",
        "quantity": 150,
        "unit": "ед.",
        "note": ""
      },
      {
        "name": "Сахар",
        "quantity": 150,
        "unit": "ед.",
        "note": ""
      }
    ],
    "outputs": [],
    "conditions": [],
    "method": "Партия игрока",
    "steps": [
      "по 150 кислорода, калия, сахара. (остаток 50)."
    ],
    "yieldText": "Точный выход в этом блоке не указан.",
    "note": ""
  }
];
