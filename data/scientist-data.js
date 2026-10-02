window.SCIENTIST_DATA = {
  "source": "Resources/Prototypes/XenoArch/triggers.yml",
  "effectSource": "Resources/Prototypes/XenoArch/effects.yml",
  "generated": "2026-09-14",
  "triggers": [
    {
      "id": "TriggerMusic",
      "name": "Гармоничные звуковые вибрации",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Играйте на музыкальном инструменте в радиусе 2 клеток от артефакта. Нужен активный инструмент, а не просто речь или звук рации."
      ],
      "group": "Окружение",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerMusic",
        "tip": "xenoarch-trigger-tip-music",
        "components": [
          {
            "type": "XATCompNearby",
            "requireComponentWithName": "ActiveInstrument",
            "radius": 2
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    },
    {
      "id": "TriggerHeat",
      "name": "Газ высокой температуры",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Измените температуру газа на клетке артефакта до не ниже 373 K (99.85 °C). Проверяется атмосфера, а не температура предмета в руке.",
        "Нанесите артефакту суммарно 20 ед. теплового урона. Урон от самого артефакта не учитывается."
      ],
      "group": "Атмосфера",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerHeat",
        "tip": "xenoarch-trigger-tip-heat",
        "components": [
          {
            "type": "XATTemperature",
            "targetTemperature": 373,
            "triggerOnHigherTemp": true
          },
          {
            "type": "XATDamageThresholdReached",
            "typesNeeded": {
              "Heat": 20
            }
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    },
    {
      "id": "TriggerCold",
      "name": "Газ низкой температуры",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Измените температуру газа на клетке артефакта до не выше 255 K (-18.15 °C). Проверяется атмосфера, а не температура предмета в руке.",
        "Нанесите артефакту суммарно 20 ед. урона холодом. Урон от самого артефакта не учитывается."
      ],
      "group": "Атмосфера",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerCold",
        "tip": "xenoarch-trigger-tip-cold",
        "components": [
          {
            "type": "XATTemperature",
            "targetTemperature": 255,
            "triggerOnHigherTemp": false
          },
          {
            "type": "XATDamageThresholdReached",
            "typesNeeded": {
              "Cold": 20
            }
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    },
    {
      "id": "TriggerNoOxygen",
      "name": "Безкислородное окружение",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Снизьте количество кислорода на клетке артефакта до 10 моль или меньше. Полное отсутствие кислорода не обязательно."
      ],
      "group": "Атмосфера",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerNoOxygen",
        "tip": "xenoarch-trigger-tip-no-oxygen",
        "components": [
          {
            "type": "XATGas",
            "targetGas": "Oxygen",
            "moles": 10,
            "shouldBePresent": false
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    },
    {
      "id": "TriggerWater",
      "name": "Вода",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Подайте газ «водяной пар» на клетку артефакта. Порог — 0,1 × стандартное количество молей в клетке; проверяется количество газа, не процент состава.",
        "Обеспечьте контакт (Touch) артефакта минимум с 5 ед. одного из реагентов: вода. Подходит обливание; держать ёмкость рядом недостаточно. Порог относится к одному событию контакта, а не сумме мелких порций."
      ],
      "group": "Атмосфера",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerWater",
        "tip": "xenoarch-trigger-tip-water",
        "components": [
          {
            "type": "XATGas",
            "targetGas": "WaterVapor"
          },
          {
            "type": "XATReactive",
            "reagents": [
              "Water"
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    },
    {
      "id": "TriggerCO2",
      "name": "Диоксид углерода",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Подайте газ «диоксид углерода» на клетку артефакта. Порог — 0,1 × стандартное количество молей в клетке; проверяется количество газа, не процент состава.",
        "Обеспечьте контакт (Touch) артефакта минимум с 5 ед. одного из реагентов: диоксид углерода. Подходит обливание; держать ёмкость рядом недостаточно. Порог относится к одному событию контакта, а не сумме мелких порций."
      ],
      "group": "Атмосфера",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerCO2",
        "tip": "xenoarch-trigger-tip-co2",
        "components": [
          {
            "type": "XATGas",
            "targetGas": "CarbonDioxide"
          },
          {
            "type": "XATReactive",
            "reagents": [
              "CarbonDioxide"
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    },
    {
      "id": "TriggerPlasma",
      "name": "Нетвёрдая плазма",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Подайте газ «плазма» на клетку артефакта. Порог — 0,1 × стандартное количество молей в клетке; проверяется количество газа, не процент состава.",
        "Обеспечьте контакт (Touch) артефакта минимум с 5 ед. одного из реагентов: плазма. Подходит обливание; держать ёмкость рядом недостаточно. Порог относится к одному событию контакта, а не сумме мелких порций."
      ],
      "group": "Атмосфера",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerPlasma",
        "tip": "xenoarch-trigger-tip-plasma",
        "components": [
          {
            "type": "XATGas",
            "targetGas": "Plasma"
          },
          {
            "type": "XATReactive",
            "reagents": [
              "Plasma"
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    },
    {
      "id": "TriggerTritium",
      "name": "Тритий",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Подайте газ «тритий» на клетку артефакта. Порог — 0,1 × стандартное количество молей в клетке; проверяется количество газа, не процент состава.",
        "Обеспечьте контакт (Touch) артефакта минимум с 5 ед. одного из реагентов: Tritium. Подходит обливание; держать ёмкость рядом недостаточно. Порог относится к одному событию контакта, а не сумме мелких порций."
      ],
      "group": "Атмосфера",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerTritium",
        "tip": "xenoarch-trigger-tip-tritium",
        "components": [
          {
            "type": "XATGas",
            "targetGas": "Tritium"
          },
          {
            "type": "XATReactive",
            "reagents": [
              "Tritium"
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    },
    {
      "id": "TriggerAmmonia",
      "name": "Аммиак",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Подайте газ «аммиак» на клетку артефакта. Порог — 0,1 × стандартное количество молей в клетке; проверяется количество газа, не процент состава.",
        "Обеспечьте контакт (Touch) артефакта минимум с 5 ед. одного из реагентов: аммиак. Подходит обливание; держать ёмкость рядом недостаточно. Порог относится к одному событию контакта, а не сумме мелких порций."
      ],
      "group": "Атмосфера",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerAmmonia",
        "tip": "xenoarch-trigger-tip-ammonia",
        "components": [
          {
            "type": "XATGas",
            "targetGas": "Ammonia"
          },
          {
            "type": "XATReactive",
            "reagents": [
              "Ammonia"
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    },
    {
      "id": "TriggerN2O",
      "name": "Оксид азота",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Подайте газ «оксид азота» на клетку артефакта. Порог — 0,1 × стандартное количество молей в клетке; проверяется количество газа, не процент состава.",
        "Обеспечьте контакт (Touch) артефакта минимум с 5 ед. одного из реагентов: оксид азота. Подходит обливание; держать ёмкость рядом недостаточно. Порог относится к одному событию контакта, а не сумме мелких порций."
      ],
      "group": "Атмосфера",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerN2O",
        "tip": "xenoarch-trigger-tip-n2o",
        "components": [
          {
            "type": "XATGas",
            "targetGas": "NitrousOxide"
          },
          {
            "type": "XATReactive",
            "reagents": [
              "NitrousOxide"
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    },
    {
      "id": "TriggerFrezon",
      "name": "Фрезон",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Подайте газ «фрезон» на клетку артефакта. Порог — 0,1 × стандартное количество молей в клетке; проверяется количество газа, не процент состава.",
        "Обеспечьте контакт (Touch) артефакта минимум с 5 ед. одного из реагентов: фрезон. Подходит обливание; держать ёмкость рядом недостаточно. Порог относится к одному событию контакта, а не сумме мелких порций."
      ],
      "group": "Атмосфера",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerFrezon",
        "tip": "xenoarch-trigger-tip-frezon",
        "components": [
          {
            "type": "XATGas",
            "targetGas": "Frezon"
          },
          {
            "type": "XATReactive",
            "reagents": [
              "Frezon"
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    },
    {
      "id": "TriggerRadiation",
      "name": "Радиация",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Нанесите артефакту суммарно 20 ед. радиационного урона. Урон от самого артефакта не учитывается."
      ],
      "group": "Воздействие",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerRadiation",
        "tip": "xenoarch-trigger-tip-radiation",
        "components": [
          {
            "type": "XATDamageThresholdReached",
            "typesNeeded": {
              "Radiation": 20
            }
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    },
    {
      "id": "TriggerPressureHigh",
      "name": "Высокое давление",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Измените давление газа на клетке артефакта: не ниже 385 кПа. Используйте изолированную испытательную камеру и газовый анализатор."
      ],
      "group": "Атмосфера",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerPressureHigh",
        "tip": "xenoarch-trigger-tip-pressure-high",
        "components": [
          {
            "type": "XATPressure",
            "maxPressureThreshold": 385
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    },
    {
      "id": "TriggerPressureLow",
      "name": "Низкое давление",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Измените давление газа на клетке артефакта: не выше 50 кПа. Используйте изолированную испытательную камеру и газовый анализатор."
      ],
      "group": "Атмосфера",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerPressureLow",
        "tip": "xenoarch-trigger-tip-pressure-low",
        "components": [
          {
            "type": "XATPressure",
            "minPressureThreshold": 50
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    },
    {
      "id": "TriggerExamine",
      "name": "Внимательное изучение",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Подойдите к артефакту на дистанцию подробного осмотра и используйте «Осмотреть» (обычно Shift + клик). Осмотр призраком не учитывается."
      ],
      "group": "Действия",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerExamine",
        "tip": "xenoarch-trigger-tip-examine",
        "components": [
          {
            "type": "XATExamine"
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    },
    {
      "id": "TriggerBruteDamage",
      "name": "Физический урон",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Нанесите артефакту суммарно 20 ед. физического урона (ушибы, порезы, уколы). Урон от самого артефакта не учитывается."
      ],
      "group": "Воздействие",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerBruteDamage",
        "tip": "xenoarch-trigger-tip-brute-damage",
        "components": [
          {
            "type": "XATDamageThresholdReached",
            "groupsNeeded": {
              "Brute": 20
            }
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    },
    {
      "id": "TriggerInteraction",
      "name": "Физическое взаимодействие",
      "active": false,
      "status": "Вне стандартной генерации",
      "steps": [
        "Взаимодействуйте с артефактом. Этот вариант задан в прототипах, но исключён из DefaultTriggers."
      ],
      "group": "Действия",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerInteraction",
        "tip": "xenoarch-trigger-tip-interaction",
        "components": [
          {
            "type": "XATInteraction"
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    },
    {
      "id": "TriggerWrenching",
      "name": "Затягивание",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Гаечный ключ: примените инструмент к артефакту и завершите действие. Базовое время — 3 с, фактическое зависит от скорости инструмента.",
        "Подсказка при осмотре: Вокруг него свободно крутится частичка."
      ],
      "group": "Инструменты",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerWrenching",
        "tip": "xenoarch-trigger-tip-wrenching",
        "components": [
          {
            "type": "XATToolUse",
            "requiredTool": "Anchoring"
          },
          {
            "type": "XATExaminableText",
            "examineText": "xenoarch-trigger-examine-wrenching"
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    },
    {
      "id": "TriggerPrying",
      "name": "Вскрывание",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Лом: примените инструмент к артефакту и завершите действие. Базовое время — 3 с, фактическое зависит от скорости инструмента.",
        "Подсказка при осмотре: С его поверхности поднимается панель."
      ],
      "group": "Инструменты",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerPrying",
        "tip": "xenoarch-trigger-tip-prying",
        "components": [
          {
            "type": "XATToolUse",
            "requiredTool": "Prying"
          },
          {
            "type": "XATExaminableText",
            "examineText": "xenoarch-trigger-examine-prying"
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    },
    {
      "id": "TriggerScrewing",
      "name": "Свинчивание",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Отвёртка: примените инструмент к артефакту и завершите действие. Базовое время — 3 с, фактическое зависит от скорости инструмента.",
        "Подсказка при осмотре: На нём имеется приподнятая часть с небольшой вставкой в ней."
      ],
      "group": "Инструменты",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerScrewing",
        "tip": "xenoarch-trigger-tip-screwing",
        "components": [
          {
            "type": "XATToolUse",
            "requiredTool": "Screwing"
          },
          {
            "type": "XATExaminableText",
            "examineText": "xenoarch-trigger-examine-screwing"
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    },
    {
      "id": "TriggerPulsing",
      "name": "Пульсирование",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Мультитул: примените инструмент к артефакту и завершите действие. Базовое время — 3 с, фактическое зависит от скорости инструмента.",
        "Подсказка при осмотре: Из поверхности артефакта торчит открытый диод."
      ],
      "group": "Инструменты",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerPulsing",
        "tip": "xenoarch-trigger-tip-pulsing",
        "components": [
          {
            "type": "XATToolUse",
            "requiredTool": "Pulsing"
          },
          {
            "type": "XATExaminableText",
            "examineText": "xenoarch-trigger-examine-pulsing"
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    },
    {
      "id": "TriggerTimer",
      "name": "Регулярная само-активация",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Между срабатываниями таймера выбирается случайная задержка 80–120 с. Осмотрите артефакт вблизи: число в описании показывает оставшиеся секунды до следующей попытки."
      ],
      "group": "Действия",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerTimer",
        "tip": "xenoarch-trigger-tip-timer",
        "components": [
          {
            "type": "XATTimer",
            "possibleDelayInSeconds": {
              "min": 80,
              "max": 120
            }
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    },
    {
      "id": "TriggerBlood",
      "name": "Кровь",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Обеспечьте контакт (Touch) артефакта минимум с 5 ед. одного из реагентов: кровь, голубая кровь, кровь насекомого, слизь, анаэробная кровь, кровь зомби, древесный сок, серная кровь. Подходит обливание; держать ёмкость рядом недостаточно. Порог относится к одному событию контакта, а не сумме мелких порций."
      ],
      "group": "Реагенты",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerBlood",
        "tip": "xenoarch-trigger-tip-blood",
        "components": [
          {
            "type": "XATReactive",
            "reagents": [
              "Blood",
              "CopperBlood",
              "InsectBlood",
              "Slime",
              "AmmoniaBlood",
              "ZombieBlood",
              "Sap",
              "SulfurBlood"
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    },
    {
      "id": "TriggerThrow",
      "name": "Бросок",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Бросьте сам ручной артефакт и дождитесь его приземления. Удар другим брошенным предметом — иной стимул. Этот вариант доступен только артефактам-предметам."
      ],
      "group": "Действия",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerThrow",
        "tip": "xenoarch-trigger-tip-throw",
        "whitelist": {
          "components": [
            "Item"
          ]
        },
        "components": [
          {
            "type": "XATItemLand"
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    },
    {
      "id": "TriggerDeath",
      "name": "Смерть",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Требуется событие смерти существа в радиусе 15 клеток. Уже лежащий труп сам по себе не создаёт новое событие смерти."
      ],
      "group": "Окружение",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerDeath",
        "tip": "xenoarch-trigger-tip-death",
        "components": [
          {
            "type": "XATDeath"
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    },
    {
      "id": "TriggerMagnet",
      "name": "Магнитные волны",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Разместите включённые магнитные ботинки в радиусе 2 клеток либо активируйте утилизационный магнит в радиусе 40 клеток. Для большого магнита учитывается момент активации."
      ],
      "group": "Окружение",
      "raw": {
        "type": "xenoArchTrigger",
        "id": "TriggerMagnet",
        "tip": "xenoarch-trigger-tip-magnet",
        "components": [
          {
            "type": "XATMagnet"
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/triggers.yml"
    }
  ],
  "effects": [
    {
      "id": "XenoArtifactEffectUniversalIntercom",
      "name": "Дистанционная связь",
      "active": false,
      "status": "Вне стандартных таблиц",
      "steps": [
        "Получает возможность радиосвязи."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactEffectUniversalIntercom",
        "parent": "BaseOneTimeXenoArtifactEffect",
        "description": "Obtains ability of long-distance communication device",
        "components": [
          {
            "type": "XAEApplyComponents",
            "components": [
              {
                "type": "RadioMicrophone",
                "powerRequired": false,
                "toggleOnInteract": false,
                "listenRange": 3
              },
              {
                "type": "Speech"
              },
              {
                "type": "RadioSpeaker",
                "toggleOnInteract": false
              },
              {
                "type": "ActivatableUI",
                "key": "enum.IntercomUiKey.Key"
              },
              {
                "type": "Intercom",
                "requiresPower": false,
                "supportedChannels": [
                  "Common",
                  "CentCom",
                  "Command",
                  "Engineering",
                  "Medical",
                  "Science",
                  "Security",
                  "Service",
                  "Supply"
                ]
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactBecomeRandomInstrument",
      "name": "Становится музыкальным инструментом",
      "active": false,
      "status": "Вне стандартных таблиц",
      "steps": [
        "Превращается в музыкальный инструмент."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactBecomeRandomInstrument",
        "parent": "BaseOneTimeXenoArtifactEffect",
        "description": "Obtains ability of musical instrument",
        "components": [
          {
            "type": "XAEApplyComponents",
            "components": [
              {
                "type": "Instrument"
              },
              {
                "type": "ActivatableUI",
                "singleUser": true,
                "verbText": "verb-instrument-openui",
                "key": "enum.InstrumentUiKey.Key"
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactStorage",
      "name": "Внутреннее хранилище",
      "active": false,
      "status": "Вне стандартных таблиц",
      "steps": [
        "Получает внутреннее хранилище."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactStorage",
        "parent": "BaseOneTimeXenoArtifactEffect",
        "description": "Obtains ability of hidden storage",
        "components": [
          {
            "type": "XAEApplyComponents",
            "components": [
              {
                "type": "Item",
                "size": "Huge"
              },
              {
                "type": "Storage",
                "maxItemSize": "Huge",
                "grid": [
                  "0,0,10,5"
                ]
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactPhasing",
      "name": "Становится нематериальным",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Убирает столкновения: артефакт может проходить через препятствия."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactPhasing",
        "parent": "BaseOneTimeXenoArtifactEffect",
        "description": "Becomes phased",
        "components": [
          {
            "type": "XAERemoveCollision"
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactWandering",
      "name": "Начинает хаотично перемещаться",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Самостоятельно и хаотично перемещается."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactWandering",
        "parent": "BaseOneTimeXenoArtifactEffect",
        "description": "Starts to move sporadically",
        "components": [
          {
            "type": "XAEApplyComponents",
            "components": [
              {
                "type": "RandomWalk",
                "minSpeed": 12,
                "maxSpeed": 20,
                "minStepCooldown": 1,
                "maxStepCooldown": 3
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactSolutionStorage",
      "name": "Становится ёмкостью для реагентов",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Становится ёмкостью для раствора: 150 единиц."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactSolutionStorage",
        "parent": "BaseOneTimeXenoArtifactEffect",
        "description": "Obtains ability of container for chemical solutions",
        "components": [
          {
            "type": "XAEApplyComponents",
            "components": [
              {
                "type": "SolutionContainerManager",
                "solutions": {
                  "beaker": {
                    "maxVol": 150
                  }
                }
              },
              {
                "type": "FitsInDispenser",
                "solution": "beaker"
              },
              {
                "type": "RefillableSolution",
                "solution": "beaker"
              },
              {
                "type": "DrainableSolution",
                "solution": "beaker"
              },
              {
                "type": "ExaminableSolution",
                "solution": "beaker"
              },
              {
                "type": "DrawableSolution",
                "solution": "beaker"
              },
              {
                "type": "InjectableSolution",
                "solution": "beaker"
              },
              {
                "type": "SolutionTransfer",
                "canChangeTransferAmount": true
              },
              {
                "type": "Edible",
                "edible": "Drink",
                "solution": "beaker",
                "destroyOnEmpty": false,
                "utensil": "None"
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactSpeedUp",
      "name": "Ускоряет движение носителя",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Ускоряет держателя: ходьба ×1,2, бег ×1,3."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactSpeedUp",
        "parent": "BaseOneTimeXenoArtifactEffect",
        "description": "Improves holder movement speed",
        "components": [
          {
            "type": "XAEApplyComponents",
            "components": [
              {
                "type": "HeldSpeedModifier",
                "walkModifier": 1.2,
                "sprintModifier": 1.3
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactDrill",
      "name": "Становится дрелью",
      "active": true,
      "status": "Только ручные артефакты",
      "steps": [
        "Работает как режущий инструмент / дрель; урон: 18 колющего и 4 ушибами."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactDrill",
        "parent": "BaseOneTimeXenoArtifactEffect",
        "description": "Obtains ability of drill",
        "components": [
          {
            "type": "XAEApplyComponents",
            "components": [
              {
                "type": "MeleeWeapon",
                "damage": {
                  "types": {
                    "Piercing": 18,
                    "Blunt": 4
                  }
                },
                "soundHit": {
                  "path": "/Audio/Weapons/bladeslice.ogg"
                }
              },
              {
                "type": "Sharp"
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactGenerateEnergy",
      "name": "Производит электроэнергию",
      "active": false,
      "status": "Вне стандартных таблиц",
      "steps": [
        "Вырабатывает 20 000 единиц мощности при подключении к высоковольтной сети."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactGenerateEnergy",
        "parent": "BaseOneTimeXenoArtifactEffect",
        "description": "Produces power",
        "components": [
          {
            "type": "XAEApplyComponents",
            "components": [
              {
                "type": "PowerSupplier",
                "supplyRate": 20000
              },
              {
                "type": "NodeContainer",
                "examinable": true,
                "nodes": {
                  "output_hv": {
                    "nodeGroupID": "HVPower"
                  }
                }
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactGun",
      "name": "Становится огнестрельным оружием",
      "active": false,
      "status": "Вне стандартных таблиц",
      "steps": [
        "Получает свойства огнестрельного оружия с патронами Magnum."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactGun",
        "parent": "BaseOneTimeXenoArtifactEffect",
        "description": "Obtains ability of firearm",
        "components": [
          {
            "type": "XAEApplyComponents",
            "applyIfAlreadyHave": true,
            "refreshOnReactivate": true,
            "components": [
              {
                "type": "RevolverAmmoProvider",
                "whitelist": {
                  "tags": [
                    "CartridgeMagnum",
                    "SpeedLoaderMagnum"
                  ]
                },
                "proto": "CartridgeMagnum",
                "capacity": 7,
                "chambers": [
                  true,
                  true,
                  true,
                  true,
                  true,
                  true,
                  true
                ],
                "ammoSlots": [
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null
                ],
                "soundEject": {
                  "path": "/Audio/Weapons/Guns/MagOut/revolver_magout.ogg"
                },
                "soundInsert": {
                  "path": "/Audio/Weapons/Guns/MagIn/revolver_magin.ogg"
                }
              },
              {
                "type": "Gun",
                "selectedMode": "SemiAuto",
                "fireRate": 2,
                "availableModes": [
                  "SemiAuto",
                  "FullAuto"
                ],
                "soundGunshot": {
                  "path": "/Audio/Weapons/Guns/Gunshots/revolver.ogg"
                }
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactGhost",
      "name": "Обретает разум",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Может быть занят призраком: артефакт сможет двигаться и говорить."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactGhost",
        "parent": "BaseOneTimeXenoArtifactEffect",
        "description": "Becomes sentient",
        "components": [
          {
            "type": "XAEApplyComponents",
            "components": [
              {
                "type": "GhostRole",
                "allowMovement": true,
                "allowSpeech": true,
                "makeSentient": true,
                "name": "ghost-role-information-artifact-name",
                "description": "ghost-role-information-artifact-description",
                "rules": "ghost-role-information-freeagent-rules",
                "raffle": {
                  "settings": "default"
                },
                "mindRoles": [
                  "MindRoleGhostRoleFreeAgent"
                ]
              },
              {
                "type": "GhostTakeoverAvailable"
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactOmnitool",
      "name": "Становится универсальным инструментом",
      "active": true,
      "status": "Только ручные артефакты",
      "steps": [
        "Работает как переключаемый набор инструментов: отвёртка, лом, ключ, кусачки и мультитул; множитель скорости 2."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactOmnitool",
        "parent": "BaseOneTimeXenoArtifactEffect",
        "description": "Obtains ability of omnitool",
        "components": [
          {
            "type": "XAEApplyComponents",
            "components": [
              {
                "type": "UserInterface",
                "interfaces": {
                  "enum.SignalLinkerUiKey.Key": {
                    "type": "SignalPortSelectorBoundUserInterface"
                  }
                }
              },
              {
                "type": "ToolTileCompatible"
              },
              {
                "type": "Tool",
                "qualities": [
                  "Screwing"
                ],
                "speedModifier": 2,
                "useSound": "/Audio/Items/drill_use.ogg"
              },
              {
                "type": "Tag",
                "tags": [
                  "Multitool"
                ]
              },
              {
                "type": "MultipleTool",
                "statusShowBehavior": true,
                "entries": [
                  {
                    "behavior": "Screwing",
                    "useSound": {
                      "path": "/Audio/Items/drill_use.ogg"
                    },
                    "changeSound": {
                      "path": "/Audio/Items/change_drill.ogg"
                    }
                  },
                  {
                    "behavior": "Prying",
                    "useSound": {
                      "path": "/Audio/Items/jaws_pry.ogg"
                    },
                    "changeSound": {
                      "path": "/Audio/Items/change_drill.ogg"
                    }
                  },
                  {
                    "behavior": "Anchoring",
                    "useSound": {
                      "path": "/Audio/Items/ratchet.ogg"
                    },
                    "changeSound": {
                      "path": "/Audio/Items/change_drill.ogg"
                    }
                  },
                  {
                    "behavior": "Cutting",
                    "useSound": {
                      "path": "/Audio/Items/jaws_cut.ogg"
                    },
                    "changeSound": {
                      "path": "/Audio/Items/change_drill.ogg"
                    }
                  },
                  {
                    "behavior": "Pulsing",
                    "changeSound": {
                      "path": "/Audio/Items/change_drill.ogg"
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactEffectBadFeeling",
      "name": "Тревожное послание",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Передаёт сообщения находящимся рядом персонажам. Послание само по себе не означает нанесение урона."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactEffectBadFeeling",
        "parent": "BaseXenoArtifactEffect",
        "description": "Broadcasts sublime message",
        "components": [
          {
            "type": "XAETelepathic",
            "messages": [
              "badfeeling-artifact-1",
              "badfeeling-artifact-2",
              "badfeeling-artifact-3",
              "badfeeling-artifact-4",
              "badfeeling-artifact-5",
              "badfeeling-artifact-6",
              "badfeeling-artifact-7",
              "badfeeling-artifact-8",
              "badfeeling-artifact-9",
              "badfeeling-artifact-10",
              "badfeeling-artifact-11",
              "badfeeling-artifact-12",
              "badfeeling-artifact-13",
              "badfeeling-artifact-14",
              "badfeeling-artifact-15"
            ],
            "drastic": [
              "badfeeling-artifact-drastic-1",
              "badfeeling-artifact-drastic-2",
              "badfeeling-artifact-drastic-3",
              "badfeeling-artifact-drastic-4",
              "badfeeling-artifact-drastic-5",
              "badfeeling-artifact-drastic-6"
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactEffectGoodFeeling",
      "name": "Воодушевляющее послание",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Передаёт сообщения находящимся рядом персонажам. Послание само по себе не означает нанесение урона."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactEffectGoodFeeling",
        "parent": "BaseXenoArtifactEffect",
        "description": "Broadcasts sublime message",
        "components": [
          {
            "type": "XAETelepathic",
            "messages": [
              "goodfeeling-artifact-1",
              "goodfeeling-artifact-2",
              "goodfeeling-artifact-3",
              "goodfeeling-artifact-4",
              "goodfeeling-artifact-5",
              "goodfeeling-artifact-6",
              "goodfeeling-artifact-7",
              "goodfeeling-artifact-8",
              "goodfeeling-artifact-9",
              "goodfeeling-artifact-10",
              "goodfeeling-artifact-11",
              "goodfeeling-artifact-12",
              "goodfeeling-artifact-13",
              "goodfeeling-artifact-14"
            ],
            "drastic": [
              "goodfeeling-artifact-drastic-1",
              "goodfeeling-artifact-drastic-2",
              "goodfeeling-artifact-drastic-3",
              "goodfeeling-artifact-drastic-4",
              "goodfeeling-artifact-drastic-5",
              "goodfeeling-artifact-drastic-6"
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactEffectJunkSpawn",
      "name": "Создаёт перерабатываемый мусор",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Создаёт предметы или существ из таблицы вариантов ниже. Состав зависит от случайного выбора; весь список одновременно не гарантирован."
      ],
      "group": "Создание",
      "chemicals": [],
      "spawned": [
        {
          "id": "GenericTrashItems",
          "name": "Перерабатываемый мусор",
          "weight": 35
        },
        {
          "id": "AllPlushiesTable",
          "name": "Плюшевые игрушки",
          "weight": 1
        }
      ],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactEffectJunkSpawn",
        "parent": "BaseXenoArtifactEffect",
        "description": "Create recyclable junk",
        "components": [
          {
            "type": "XAEApplyComponents",
            "applyIfAlreadyHave": true,
            "refreshOnReactivate": true,
            "components": [
              {
                "type": "EntityTableSpawner",
                "deleteSpawnerAfterSpawn": false,
                "table": {
                  "rolls": {
                    "range": "1, 4"
                  },
                  "children": [
                    {
                      "tableId": "GenericTrashItems",
                      "weight": 35
                    },
                    {
                      "tableId": "AllPlushiesTable",
                      "weight": 1
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactEffectLightFlicker",
      "name": "Слабые электромагнитные помехи",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Заставляет освещение рядом мерцать."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactEffectLightFlicker",
        "parent": "BaseXenoArtifactEffect",
        "description": "Minor electromagnetic interference",
        "components": [
          {
            "type": "XAELightFlicker"
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactPotassiumWave",
      "name": "Выделяет калий",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Создаёт предметы или существ из таблицы вариантов ниже. Состав зависит от случайного выбора; весь список одновременно не гарантирован.",
        "Создаёт лужу с 1–1 выбранными реагентами из списка ниже. Состав выбирается для узла; список не означает, что все вещества появятся одновременно."
      ],
      "group": "Химия",
      "chemicals": [
        {
          "id": "Potassium",
          "name": "калий"
        }
      ],
      "spawned": [
        {
          "id": "FoodBanana",
          "name": "банан",
          "probability": 0.5,
          "rolls": {
            "value": 6
          }
        }
      ],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactPotassiumWave",
        "parent": "BaseXenoArtifactEffect",
        "description": "Produces potassium",
        "components": [
          {
            "type": "XAEApplyComponents",
            "applyIfAlreadyHave": true,
            "refreshOnReactivate": true,
            "components": [
              {
                "type": "EntityTableSpawner",
                "deleteSpawnerAfterSpawn": false,
                "table": {
                  "children": [
                    {
                      "id": "FoodBanana",
                      "rolls": {
                        "value": 6
                      },
                      "prob": 0.5
                    }
                  ]
                }
              }
            ]
          },
          {
            "type": "XAECreatePuddle",
            "chemAmount": {
              "min": 1,
              "max": 1
            },
            "chemicalSolution": {
              "maxVol": 100,
              "canReact": false
            },
            "possibleChemicals": [
              "Potassium"
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactFloraSpawn",
      "name": "Порождает флору",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Создаёт предметы или существ из таблицы вариантов ниже. Состав зависит от случайного выбора; весь список одновременно не гарантирован."
      ],
      "group": "Создание",
      "chemicals": [],
      "spawned": [
        {
          "id": "RandomFloraTree",
          "name": "спавнер случайное дерево"
        }
      ],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactFloraSpawn",
        "parent": "BaseXenoArtifactEffect",
        "description": "Produces flora",
        "components": [
          {
            "type": "XAEApplyComponents",
            "applyIfAlreadyHave": true,
            "refreshOnReactivate": true,
            "components": [
              {
                "type": "EntityTableSpawner",
                "deleteSpawnerAfterSpawn": false,
                "table": {
                  "children": [
                    {
                      "id": "RandomFloraTree"
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactChemicalPuddle",
      "name": "Создаёт лужу базовых реагентов",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Создаёт лужу с 1–3 выбранными реагентами из списка ниже. Состав выбирается для узла; список не означает, что все вещества появятся одновременно."
      ],
      "group": "Химия",
      "chemicals": [
        {
          "id": "Aluminium",
          "name": "алюминий"
        },
        {
          "id": "Carbon",
          "name": "углерод"
        },
        {
          "id": "Chlorine",
          "name": "хлор"
        },
        {
          "id": "Copper",
          "name": "медь"
        },
        {
          "id": "Ethanol",
          "name": "этанол"
        },
        {
          "id": "Fluorine",
          "name": "фтор"
        },
        {
          "id": "Sugar",
          "name": "сахар"
        },
        {
          "id": "Hydrogen",
          "name": "водород"
        },
        {
          "id": "Iodine",
          "name": "йод"
        },
        {
          "id": "Iron",
          "name": "железо"
        },
        {
          "id": "Lithium",
          "name": "литий"
        },
        {
          "id": "Mercury",
          "name": "ртуть"
        },
        {
          "id": "Nitrogen",
          "name": "азот"
        },
        {
          "id": "Oxygen",
          "name": "кислород"
        },
        {
          "id": "Phosphorus",
          "name": "фосфор"
        },
        {
          "id": "Potassium",
          "name": "калий"
        },
        {
          "id": "Radium",
          "name": "радий"
        },
        {
          "id": "Silicon",
          "name": "кремний"
        },
        {
          "id": "Sodium",
          "name": "натрий"
        },
        {
          "id": "Water",
          "name": "вода"
        },
        {
          "id": "Sulfur",
          "name": "сера"
        }
      ],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactChemicalPuddle",
        "parent": "BaseXenoArtifactEffect",
        "description": "Produces puddle of chemical mixture",
        "components": [
          {
            "type": "XAECreatePuddle",
            "chemAmount": {
              "min": 1,
              "max": 3
            },
            "replaceDescription": true,
            "chemicalSolution": {
              "maxVol": 500,
              "canReact": false
            },
            "possibleChemicals": [
              "Aluminium",
              "Carbon",
              "Chlorine",
              "Copper",
              "Ethanol",
              "Fluorine",
              "Sugar",
              "Hydrogen",
              "Iodine",
              "Iron",
              "Lithium",
              "Mercury",
              "Nitrogen",
              "Oxygen",
              "Phosphorus",
              "Potassium",
              "Radium",
              "Silicon",
              "Sodium",
              "Water",
              "Sulfur"
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactThrowThingsAround",
      "name": "Схлопывание пространства",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Разбрасывает окружающие предметы. Закрепите оборудование и уберите свободные опасные предметы."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactThrowThingsAround",
        "parent": "BaseXenoArtifactEffect",
        "description": "Minor implosion",
        "components": [
          {
            "type": "XAEThrowThingsAround"
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactColdWave",
      "name": "Охлаждает газ",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Меняет температуру газа на своей и соседних клетках в сторону 50 K (-223.15 °C), шагом до 100 K за активацию. Целевая температура достигается не обязательно за один раз."
      ],
      "group": "Атмосфера",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactColdWave",
        "parent": "BaseXenoArtifactEffect",
        "description": "Cools down surrounding gas",
        "components": [
          {
            "type": "XAETemperature",
            "targetTemp": 50
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactHeatWave",
      "name": "Сильно нагревает газ",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Меняет температуру газа на своей и соседних клетках в сторону 500 K (226.85 °C), шагом до 100 K за активацию. Целевая температура достигается не обязательно за один раз."
      ],
      "group": "Атмосфера",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactHeatWave",
        "parent": "BaseXenoArtifactEffect",
        "description": "Heats up surrounding gas greatly",
        "components": [
          {
            "type": "XAETemperature",
            "targetTemp": 500
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactFoamMild",
      "name": "Создаёт пену со случайным реагентом",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Пена содержит один выбранный для узла реагент из списка ниже. Подсказка анализатора может сразу показывать выбранное вещество. Название «полезная» или «мягкая» не гарантирует безопасность контакта."
      ],
      "group": "Химия",
      "chemicals": [
        {
          "id": "Oxygen",
          "name": "кислород"
        },
        {
          "id": "Plasma",
          "name": "плазма"
        },
        {
          "id": "Blood",
          "name": "кровь"
        },
        {
          "id": "SpaceCleaner",
          "name": "космический очиститель"
        },
        {
          "id": "Nutriment",
          "name": "питательные вещества"
        },
        {
          "id": "SpaceLube",
          "name": "космическая смазка"
        },
        {
          "id": "Ethanol",
          "name": "этанол"
        },
        {
          "id": "Mercury",
          "name": "ртуть"
        },
        {
          "id": "VentCrud",
          "name": "VentCrud"
        },
        {
          "id": "WeldingFuel",
          "name": "сварочное топливо"
        },
        {
          "id": "JuiceThatMakesYouWeh",
          "name": "сок, заставляющий говорить Вех"
        }
      ],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactFoamMild",
        "parent": "BaseXenoArtifactEffect",
        "description": "Produces chemical foam",
        "components": [
          {
            "type": "XAEFoam",
            "replaceDescription": true,
            "reagents": [
              "Oxygen",
              "Plasma",
              "Blood",
              "SpaceCleaner",
              "Nutriment",
              "SpaceLube",
              "Ethanol",
              "Mercury",
              "VentCrud",
              "WeldingFuel",
              "JuiceThatMakesYouWeh"
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactRandomInstrumentSpawn",
      "name": "Материализует музыкальный инструмент",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Создаёт предметы или существ из таблицы вариантов ниже. Состав зависит от случайного выбора; весь список одновременно не гарантирован."
      ],
      "group": "Создание",
      "chemicals": [],
      "spawned": [
        {
          "id": "RandomInstruments",
          "name": "спавнер случайный инструмент"
        }
      ],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactRandomInstrumentSpawn",
        "parent": "BaseXenoArtifactEffect",
        "description": "Creates musical instrument",
        "components": [
          {
            "type": "XenoArtifactNode",
            "maxDurability": 2,
            "maxDurabilityCanDecreaseBy": {
              "min": 0,
              "max": 1
            }
          },
          {
            "type": "XAEApplyComponents",
            "applyIfAlreadyHave": true,
            "refreshOnReactivate": true,
            "components": [
              {
                "type": "EntityTableSpawner",
                "deleteSpawnerAfterSpawn": false,
                "table": {
                  "children": [
                    {
                      "id": "RandomInstruments"
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactMonkeySpawn",
      "name": "Порождает примата",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Создаёт предметы или существ из таблицы вариантов ниже. Состав зависит от случайного выбора; весь список одновременно не гарантирован."
      ],
      "group": "Создание",
      "chemicals": [],
      "spawned": [
        {
          "id": "MobMonkey",
          "name": "обезьяна",
          "weight": 95
        },
        {
          "id": "MobGorilla",
          "name": "горилла",
          "weight": 4.5
        },
        {
          "id": "MobMonkeySyndicateAgent",
          "name": "{ ent-MobBaseSyndicateMonkey }",
          "weight": 0.5
        }
      ],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactMonkeySpawn",
        "parent": "BaseXenoArtifactEffect",
        "description": "Creates primate",
        "components": [
          {
            "type": "XenoArtifactNode",
            "maxDurability": 3,
            "maxDurabilityCanDecreaseBy": {
              "min": 0,
              "max": 2
            }
          },
          {
            "type": "XAEApplyComponents",
            "applyIfAlreadyHave": true,
            "refreshOnReactivate": true,
            "components": [
              {
                "type": "EntityTableSpawner",
                "deleteSpawnerAfterSpawn": false,
                "table": {
                  "children": [
                    {
                      "id": "MobMonkey",
                      "weight": 95
                    },
                    {
                      "id": "MobGorilla",
                      "weight": 4.5
                    },
                    {
                      "id": "MobMonkeySyndicateAgent",
                      "weight": 0.5
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactRadioactive",
      "name": "Становится слабо радиоактивным",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Становится постоянным источником радиации. Интенсивность: 1."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactRadioactive",
        "parent": "BaseOneTimeXenoArtifactEffect",
        "description": "Becomes mildly radioactive",
        "components": [
          {
            "type": "XAEApplyComponents",
            "applyIfAlreadyHave": true,
            "refreshOnReactivate": true,
            "components": [
              {
                "type": "RadiationSource",
                "intensity": 1,
                "slope": 0.3
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactChargeBattery",
      "name": "Заряжает батареи вокруг",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Заряжает батареи в области действия.",
        "Передаёт сообщения находящимся рядом персонажам. Послание само по себе не означает нанесение урона."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactChargeBattery",
        "parent": "BaseXenoArtifactEffect",
        "description": "Charges up batteries",
        "components": [
          {
            "type": "XAEChargeBattery"
          },
          {
            "type": "XAETelepathic",
            "messages": [
              "charge-artifact-popup"
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactKnock",
      "name": "Вызывает электромагнитные помехи",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Открывает двери вокруг. Учитывайте доступ из испытательной камеры в соседние помещения.",
        "Заставляет освещение рядом мерцать."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactKnock",
        "parent": "BaseXenoArtifactEffect",
        "description": "Mild electromagnetic interference",
        "components": [
          {
            "type": "XAEKnock"
          },
          {
            "type": "XAELightFlicker"
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactMagnet",
      "name": "Создаёт небольшую зону притяжения",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Создаёт поле, которое перемещает окружающие объекты. Радиус 3 клетки; притягивает."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactMagnet",
        "parent": "BaseOneTimeXenoArtifactEffect",
        "description": "Create small gravity well",
        "components": [
          {
            "type": "XAEApplyComponents",
            "applyIfAlreadyHave": true,
            "refreshOnReactivate": true,
            "components": [
              {
                "type": "GravityWell",
                "maxRange": 3,
                "baseRadialAcceleration": 1,
                "baseTangentialAcceleration": 3
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactMagnetNegative",
      "name": "Создаёт небольшую зону отталкивания",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Создаёт поле, которое перемещает окружающие объекты. Радиус 3 клетки; отталкивает."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactMagnetNegative",
        "parent": "BaseOneTimeXenoArtifactEffect",
        "description": "Create small gravity well",
        "components": [
          {
            "type": "XAEApplyComponents",
            "applyIfAlreadyHave": true,
            "refreshOnReactivate": true,
            "components": [
              {
                "type": "GravityWell",
                "maxRange": 3,
                "baseRadialAcceleration": -1,
                "baseTangentialAcceleration": -3
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactStealth",
      "name": "Создаёт оптические помехи",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Становится менее заметным в покое; движение повышает видимость."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactStealth",
        "parent": "BaseOneTimeXenoArtifactEffect",
        "description": "Create light interference",
        "components": [
          {
            "type": "XAEApplyComponents",
            "components": [
              {
                "type": "Stealth",
                "hadOutline": true
              },
              {
                "type": "StealthOnMove",
                "passiveVisibilityRate": -0.1,
                "movementVisibilityRate": 0.1
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactRareMaterialSpawn",
      "name": "Создаёт случайную руду",
      "active": false,
      "status": "Вне стандартных таблиц",
      "steps": [
        "Создаёт предметы или существ из таблицы вариантов ниже. Состав зависит от случайного выбора; весь список одновременно не гарантирован."
      ],
      "group": "Создание",
      "chemicals": [],
      "spawned": [
        {
          "id": "SilverOre1",
          "name": "{ ent-SilverOre }",
          "probability": 0.3,
          "rolls": {
            "value": 6
          }
        },
        {
          "id": "PlasmaOre1",
          "name": "{ ent-PlasmaOre }",
          "probability": 0.3,
          "rolls": {
            "value": 6
          }
        },
        {
          "id": "GoldOre1",
          "name": "{ ent-GoldOre }",
          "probability": 0.3,
          "rolls": {
            "value": 6
          }
        },
        {
          "id": "UraniumOre1",
          "name": "{ ent-UraniumOre }",
          "probability": 0.3,
          "rolls": {
            "value": 6
          }
        }
      ],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactRareMaterialSpawn",
        "parent": "BaseXenoArtifactEffect",
        "description": "Create rare materials",
        "components": [
          {
            "type": "XAEApplyComponents",
            "applyIfAlreadyHave": true,
            "refreshOnReactivate": true,
            "components": [
              {
                "type": "EntityTableSpawner",
                "deleteSpawnerAfterSpawn": false,
                "table": {
                  "children": [
                    {
                      "id": "SilverOre1",
                      "rolls": {
                        "value": 6
                      },
                      "prob": 0.3
                    },
                    {
                      "id": "PlasmaOre1",
                      "rolls": {
                        "value": 6
                      },
                      "prob": 0.3
                    },
                    {
                      "id": "GoldOre1",
                      "rolls": {
                        "value": 6
                      },
                      "prob": 0.3
                    },
                    {
                      "id": "UraniumOre1",
                      "rolls": {
                        "value": 6
                      },
                      "prob": 0.3
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactRareMaterialSpawnSilver",
      "name": "Порождает редкую руду",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Создаёт предметы или существ из таблицы вариантов ниже. Состав зависит от случайного выбора; весь список одновременно не гарантирован."
      ],
      "group": "Создание",
      "chemicals": [],
      "spawned": [
        {
          "id": "SilverOre1",
          "name": "{ ent-SilverOre }",
          "probability": 0.3,
          "rolls": {
            "value": 6
          }
        }
      ],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactRareMaterialSpawnSilver",
        "parent": "BaseXenoArtifactEffect",
        "description": "Create rare materials",
        "components": [
          {
            "type": "XenoArtifactNode",
            "maxDurability": 4,
            "maxDurabilityCanDecreaseBy": {
              "min": 0,
              "max": 2
            }
          },
          {
            "type": "XAEApplyComponents",
            "applyIfAlreadyHave": true,
            "refreshOnReactivate": true,
            "components": [
              {
                "type": "EntityTableSpawner",
                "deleteSpawnerAfterSpawn": false,
                "table": {
                  "children": [
                    {
                      "id": "SilverOre1",
                      "rolls": {
                        "value": 6
                      },
                      "prob": 0.3
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactRareMaterialSpawnPlasma",
      "name": "Порождает плазму",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Создаёт предметы или существ из таблицы вариантов ниже. Состав зависит от случайного выбора; весь список одновременно не гарантирован."
      ],
      "group": "Создание",
      "chemicals": [],
      "spawned": [
        {
          "id": "PlasmaOre1",
          "name": "{ ent-PlasmaOre }",
          "probability": 0.3,
          "rolls": {
            "value": 6
          }
        }
      ],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactRareMaterialSpawnPlasma",
        "parent": "BaseXenoArtifactEffect",
        "description": "Create plasma",
        "components": [
          {
            "type": "XenoArtifactNode",
            "maxDurability": 4,
            "maxDurabilityCanDecreaseBy": {
              "min": 0,
              "max": 2
            }
          },
          {
            "type": "XAEApplyComponents",
            "applyIfAlreadyHave": true,
            "refreshOnReactivate": true,
            "components": [
              {
                "type": "EntityTableSpawner",
                "deleteSpawnerAfterSpawn": false,
                "table": {
                  "children": [
                    {
                      "id": "PlasmaOre1",
                      "rolls": {
                        "value": 6
                      },
                      "prob": 0.3
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactRareMaterialSpawnGold",
      "name": "Порождает золото",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Создаёт предметы или существ из таблицы вариантов ниже. Состав зависит от случайного выбора; весь список одновременно не гарантирован."
      ],
      "group": "Создание",
      "chemicals": [],
      "spawned": [
        {
          "id": "GoldOre1",
          "name": "{ ent-GoldOre }",
          "probability": 0.3,
          "rolls": {
            "value": 6
          }
        }
      ],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactRareMaterialSpawnGold",
        "parent": "BaseXenoArtifactEffect",
        "description": "Create gold",
        "components": [
          {
            "type": "XenoArtifactNode",
            "maxDurability": 3,
            "maxDurabilityCanDecreaseBy": {
              "min": 0,
              "max": 1
            }
          },
          {
            "type": "XAEApplyComponents",
            "applyIfAlreadyHave": true,
            "refreshOnReactivate": true,
            "components": [
              {
                "type": "EntityTableSpawner",
                "deleteSpawnerAfterSpawn": false,
                "table": {
                  "children": [
                    {
                      "id": "GoldOre1",
                      "rolls": {
                        "value": 6
                      },
                      "prob": 0.3
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactRareMaterialSpawnUranium",
      "name": "Порождает уран",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Создаёт предметы или существ из таблицы вариантов ниже. Состав зависит от случайного выбора; весь список одновременно не гарантирован."
      ],
      "group": "Создание",
      "chemicals": [],
      "spawned": [
        {
          "id": "UraniumOre1",
          "name": "{ ent-UraniumOre }",
          "probability": 0.3,
          "rolls": {
            "value": 3
          }
        }
      ],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactRareMaterialSpawnUranium",
        "parent": "BaseXenoArtifactEffect",
        "description": "Create uranium",
        "components": [
          {
            "type": "XenoArtifactNode",
            "maxDurability": 4,
            "maxDurabilityCanDecreaseBy": {
              "min": 0,
              "max": 2
            }
          },
          {
            "type": "XAEApplyComponents",
            "applyIfAlreadyHave": true,
            "refreshOnReactivate": true,
            "components": [
              {
                "type": "EntityTableSpawner",
                "deleteSpawnerAfterSpawn": false,
                "table": {
                  "children": [
                    {
                      "id": "UraniumOre1",
                      "rolls": {
                        "value": 3
                      },
                      "prob": 0.3
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactAngryCarpSpawn",
      "name": "Порождает кровожадную рыбу",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Создаёт предметы или существ из таблицы вариантов ниже. Состав зависит от случайного выбора; весь список одновременно не гарантирован."
      ],
      "group": "Создание",
      "chemicals": [],
      "spawned": [
        {
          "id": "MobCarpMagic",
          "name": "мэджикарп",
          "weight": 1
        },
        {
          "id": "MobCarpHolo",
          "name": "голокарп",
          "weight": 1
        }
      ],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactAngryCarpSpawn",
        "parent": "BaseXenoArtifactEffect",
        "description": "Create hostile fish",
        "components": [
          {
            "type": "XenoArtifactNode",
            "maxDurability": 3,
            "maxDurabilityCanDecreaseBy": {
              "min": 0,
              "max": 2
            }
          },
          {
            "type": "XAEApplyComponents",
            "applyIfAlreadyHave": true,
            "refreshOnReactivate": true,
            "components": [
              {
                "type": "EntityTableSpawner",
                "deleteSpawnerAfterSpawn": false,
                "table": {
                  "children": [
                    {
                      "id": "MobCarpMagic",
                      "weight": 1
                    },
                    {
                      "id": "MobCarpHolo",
                      "weight": 1
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactFaunaSpawn",
      "name": "Порождает фауну",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Создаёт предметы или существ из таблицы вариантов ниже. Состав зависит от случайного выбора; весь список одновременно не гарантирован."
      ],
      "group": "Создание",
      "chemicals": [],
      "spawned": [
        {
          "id": "MobAdultSlimesYellowAngry",
          "name": "жёлтый слайм"
        },
        {
          "id": "MobAngryBee",
          "name": "пчела",
          "amount": {
            "range": "2, 5"
          }
        },
        {
          "id": "MobBearSpace",
          "name": "космический медведь"
        },
        {
          "id": "MobXenoRavager",
          "name": "Разрушитель",
          "probability": 0.1
        },
        {
          "id": "MobTick",
          "name": "космический клещ",
          "amount": {
            "range": "1, 2"
          }
        },
        {
          "id": "MobSpiderSpace",
          "name": "космический паук"
        },
        {
          "id": "MobPurpleSnake",
          "name": "космическая гадюка"
        },
        {
          "id": "MobKangarooSpace",
          "name": "космический кенгуру"
        },
        {
          "id": "MobPig",
          "name": "свинья"
        },
        {
          "id": "MobParrot",
          "name": "{ ent-MobParrotBase }",
          "amount": {
            "range": "1, 2"
          }
        },
        {
          "id": "MobKangaroo",
          "name": "кенгуру"
        },
        {
          "id": "MobFox",
          "name": "лиса"
        },
        {
          "id": "MobPenguin",
          "name": "пингвин"
        },
        {
          "id": "MobCrab",
          "name": "краб",
          "amount": {
            "range": "1, 2"
          }
        },
        {
          "id": "MobFrog",
          "name": "лягушка",
          "amount": {
            "range": "1, 3"
          }
        },
        {
          "id": "MobPossum",
          "name": "поссум"
        },
        {
          "id": "MobRaccoon",
          "name": "енот"
        },
        {
          "id": "MobFerret",
          "name": "хорёк"
        },
        {
          "id": "MobMoproach",
          "name": "швабракан",
          "amount": {
            "range": "1, 2"
          }
        },
        {
          "id": "MobHamster",
          "name": "хомяк",
          "amount": {
            "range": "1, 2"
          }
        },
        {
          "id": "MobMothroach",
          "name": "таракамоль",
          "amount": {
            "range": "1, 2"
          }
        },
        {
          "id": "MobCorgiPuppy",
          "name": "щенок корги",
          "amount": {
            "range": "1, 2"
          }
        },
        {
          "id": "MobCatKitten",
          "name": "котёнок",
          "amount": {
            "range": "1, 2"
          }
        },
        {
          "id": "MobCat",
          "name": "кошка",
          "amount": {
            "range": "1, 2"
          }
        },
        {
          "id": "MobCatShadow",
          "name": "теневой кот",
          "probability": 0.1
        },
        {
          "id": "MobBee",
          "name": "пчела",
          "amount": {
            "range": "2, 5"
          }
        },
        {
          "id": "MobMouse",
          "name": "мышь",
          "amount": {
            "range": "2, 5"
          }
        },
        {
          "id": "MobChicken",
          "name": "курица",
          "amount": {
            "range": "2, 5"
          }
        },
        {
          "id": "MobDuckMallard",
          "name": "кряква",
          "amount": {
            "range": "2, 5"
          }
        },
        {
          "id": "MobGoat",
          "name": "коза",
          "amount": {
            "range": "1, 3"
          }
        },
        {
          "id": "MobGoose",
          "name": "гусь",
          "amount": {
            "range": "1, 2"
          }
        },
        {
          "id": "MobClownSpider",
          "name": "клоун-паук"
        },
        {
          "id": "MobGiantSpider",
          "name": "тарантул"
        },
        {
          "id": "MobDragon",
          "name": "{ ent-BaseMobDragon }",
          "probability": 0.03
        }
      ],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactFaunaSpawn",
        "parent": "BaseXenoArtifactEffect",
        "description": "Create friendly fauna",
        "components": [
          {
            "type": "XenoArtifactNode",
            "maxDurability": 4,
            "maxDurabilityCanDecreaseBy": {
              "min": 0,
              "max": 3
            }
          },
          {
            "type": "XAEApplyComponents",
            "applyIfAlreadyHave": true,
            "refreshOnReactivate": true,
            "components": [
              {
                "type": "EntityTableSpawner",
                "deleteSpawnerAfterSpawn": false,
                "table": {
                  "children": [
                    {
                      "id": "MobAdultSlimesYellowAngry"
                    },
                    {
                      "id": "MobAngryBee",
                      "amount": {
                        "range": "2, 5"
                      }
                    },
                    {
                      "id": "MobBearSpace"
                    },
                    {
                      "id": "MobXenoRavager",
                      "prob": 0.1
                    },
                    {
                      "id": "MobTick",
                      "amount": {
                        "range": "1, 2"
                      }
                    },
                    {
                      "id": "MobSpiderSpace"
                    },
                    {
                      "id": "MobPurpleSnake"
                    },
                    {
                      "id": "MobKangarooSpace"
                    },
                    {
                      "id": "MobPig"
                    },
                    {
                      "id": "MobParrot",
                      "amount": {
                        "range": "1, 2"
                      }
                    },
                    {
                      "id": "MobKangaroo"
                    },
                    {
                      "id": "MobFox"
                    },
                    {
                      "id": "MobPenguin"
                    },
                    {
                      "id": "MobCrab",
                      "amount": {
                        "range": "1, 2"
                      }
                    },
                    {
                      "id": "MobFrog",
                      "amount": {
                        "range": "1, 3"
                      }
                    },
                    {
                      "id": "MobPossum"
                    },
                    {
                      "id": "MobRaccoon"
                    },
                    {
                      "id": "MobFerret"
                    },
                    {
                      "id": "MobMoproach",
                      "amount": {
                        "range": "1, 2"
                      }
                    },
                    {
                      "id": "MobHamster",
                      "amount": {
                        "range": "1, 2"
                      }
                    },
                    {
                      "id": "MobMothroach",
                      "amount": {
                        "range": "1, 2"
                      }
                    },
                    {
                      "id": "MobCorgiPuppy",
                      "amount": {
                        "range": "1, 2"
                      }
                    },
                    {
                      "id": "MobCatKitten",
                      "amount": {
                        "range": "1, 2"
                      }
                    },
                    {
                      "id": "MobCat",
                      "amount": {
                        "range": "1, 2"
                      }
                    },
                    {
                      "id": "MobCatShadow",
                      "prob": 0.1
                    },
                    {
                      "id": "MobBee",
                      "amount": {
                        "range": "2, 5"
                      }
                    },
                    {
                      "id": "MobMouse",
                      "amount": {
                        "range": "2, 5"
                      }
                    },
                    {
                      "id": "MobChicken",
                      "amount": {
                        "range": "2, 5"
                      }
                    },
                    {
                      "id": "MobDuckMallard",
                      "amount": {
                        "range": "2, 5"
                      }
                    },
                    {
                      "id": "MobGoat",
                      "amount": {
                        "range": "1, 3"
                      }
                    },
                    {
                      "id": "MobGoose",
                      "amount": {
                        "range": "1, 2"
                      }
                    },
                    {
                      "id": "MobClownSpider"
                    },
                    {
                      "id": "MobGiantSpider"
                    },
                    {
                      "id": "MobDragon",
                      "prob": 0.03
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactCashSpawn",
      "name": "Порождает космические кредиты",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Создаёт предметы или существ из таблицы вариантов ниже. Состав зависит от случайного выбора; весь список одновременно не гарантирован."
      ],
      "group": "Создание",
      "chemicals": [],
      "spawned": [
        {
          "id": "SpaceCash10",
          "name": "{ ent-SpaceCash }",
          "weight": 0.75
        },
        {
          "id": "SpaceCash100",
          "name": "{ ent-SpaceCash }",
          "weight": 0.5
        },
        {
          "id": "SpaceCash500",
          "name": "{ ent-SpaceCash }",
          "weight": 0.25
        },
        {
          "id": "SpaceCash1000",
          "name": "{ ent-SpaceCash }",
          "weight": 0.1
        }
      ],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactCashSpawn",
        "parent": "BaseXenoArtifactEffect",
        "description": "Create money",
        "components": [
          {
            "type": "XenoArtifactNode",
            "maxDurability": 2,
            "maxDurabilityCanDecreaseBy": {
              "min": 0,
              "max": 1
            }
          },
          {
            "type": "XAEApplyComponents",
            "applyIfAlreadyHave": true,
            "refreshOnReactivate": true,
            "components": [
              {
                "type": "EntityTableSpawner",
                "deleteSpawnerAfterSpawn": false,
                "table": {
                  "rolls": {
                    "range": "2, 4"
                  },
                  "children": [
                    {
                      "id": "SpaceCash10",
                      "weight": 0.75
                    },
                    {
                      "id": "SpaceCash100",
                      "weight": 0.5
                    },
                    {
                      "id": "SpaceCash500",
                      "weight": 0.25
                    },
                    {
                      "id": "SpaceCash1000",
                      "weight": 0.1
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactShatterWindows",
      "name": "Разбивает окна вокруг",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Повреждает окна вокруг: шанс 75% для подходящего объекта, 200 структурного урона. Возможна разгерметизация."
      ],
      "group": "Воздействие",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactShatterWindows",
        "parent": "BaseXenoArtifactEffect",
        "description": "Break windows",
        "components": [
          {
            "type": "XenoArtifactNode",
            "maxDurability": 3,
            "maxDurabilityCanDecreaseBy": {
              "min": 0,
              "max": 2
            }
          },
          {
            "type": "XAEDamageInArea",
            "damageChance": 0.75,
            "whitelist": {
              "tags": [
                "Window"
              ]
            },
            "damage": {
              "types": {
                "Structural": 200
              }
            }
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactFoamGood",
      "name": "Создаёт пену с лекарством",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Пена содержит один выбранный для узла реагент из списка ниже. Подсказка анализатора может сразу показывать выбранное вещество. Название «полезная» или «мягкая» не гарантирует безопасность контакта."
      ],
      "group": "Химия",
      "chemicals": [
        {
          "id": "Dermaline",
          "name": "дермалин"
        },
        {
          "id": "Arithrazine",
          "name": "аритразин"
        },
        {
          "id": "Bicaridine",
          "name": "бикаридин"
        },
        {
          "id": "Inaprovaline",
          "name": "инапровалин"
        },
        {
          "id": "Kelotane",
          "name": "келотан"
        },
        {
          "id": "Dexalin",
          "name": "дексалин"
        },
        {
          "id": "Omnizine",
          "name": "омнизин"
        }
      ],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactFoamGood",
        "parent": "BaseXenoArtifactEffect",
        "description": "Creates wave of helpful foam",
        "components": [
          {
            "type": "XenoArtifactNode",
            "maxDurability": 7,
            "maxDurabilityCanDecreaseBy": {
              "min": 0,
              "max": 5
            }
          },
          {
            "type": "XAEFoam",
            "replaceDescription": true,
            "reagents": [
              "Dermaline",
              "Arithrazine",
              "Bicaridine",
              "Inaprovaline",
              "Kelotane",
              "Dexalin",
              "Omnizine"
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactFoamDangerous",
      "name": "Создаёт пену с опасным реагентом",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Пена содержит один выбранный для узла реагент из списка ниже. Подсказка анализатора может сразу показывать выбранное вещество. Название «полезная» или «мягкая» не гарантирует безопасность контакта."
      ],
      "group": "Химия",
      "chemicals": [
        {
          "id": "Tritium",
          "name": "Tritium"
        },
        {
          "id": "Plasma",
          "name": "плазма"
        },
        {
          "id": "SulfuricAcid",
          "name": "серная кислота"
        },
        {
          "id": "SpaceDrugs",
          "name": "космический мираж"
        },
        {
          "id": "Nocturine",
          "name": "ноктюрин"
        },
        {
          "id": "MuteToxin",
          "name": "токсин немоты"
        },
        {
          "id": "Napalm",
          "name": "напалм"
        },
        {
          "id": "CarpoToxin",
          "name": "карпотоксин"
        },
        {
          "id": "ChloralHydrate",
          "name": "хлоральгидрат"
        },
        {
          "id": "Mold",
          "name": "плесень"
        },
        {
          "id": "Amatoxin",
          "name": "аматоксин"
        }
      ],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactFoamDangerous",
        "parent": "BaseXenoArtifactEffect",
        "description": "Creates wave of harmful foam",
        "components": [
          {
            "type": "XAEFoam",
            "minFoamAmount": 20,
            "maxFoamAmount": 30,
            "replaceDescription": true,
            "reagents": [
              "Tritium",
              "Plasma",
              "SulfuricAcid",
              "SpaceDrugs",
              "Nocturine",
              "MuteToxin",
              "Napalm",
              "CarpoToxin",
              "ChloralHydrate",
              "Mold",
              "Amatoxin"
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactPuddleRare",
      "name": "Создаёт лужу редких реагентов",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Создаёт лужу с 1–3 выбранными реагентами из списка ниже. Состав выбирается для узла; список не означает, что все вещества появятся одновременно."
      ],
      "group": "Химия",
      "chemicals": [
        {
          "id": "Dermaline",
          "name": "дермалин"
        },
        {
          "id": "Arithrazine",
          "name": "аритразин"
        },
        {
          "id": "Bicaridine",
          "name": "бикаридин"
        },
        {
          "id": "Inaprovaline",
          "name": "инапровалин"
        },
        {
          "id": "Kelotane",
          "name": "келотан"
        },
        {
          "id": "Dexalin",
          "name": "дексалин"
        },
        {
          "id": "Omnizine",
          "name": "омнизин"
        },
        {
          "id": "Napalm",
          "name": "напалм"
        },
        {
          "id": "Toxin",
          "name": "токсин"
        },
        {
          "id": "Epinephrine",
          "name": "эпинефрин"
        },
        {
          "id": "Cognizine",
          "name": "когнизин"
        },
        {
          "id": "Ultravasculine",
          "name": "ультраваскулин"
        },
        {
          "id": "Desoxyephedrine",
          "name": "дезоксиэфедрин"
        },
        {
          "id": "Pax",
          "name": "пакс"
        },
        {
          "id": "Siderlac",
          "name": "сидерлак"
        }
      ],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactPuddleRare",
        "parent": "BaseXenoArtifactEffect",
        "description": "Creates puddle of helpful chemicals",
        "components": [
          {
            "type": "XAECreatePuddle",
            "chemAmount": {
              "min": 1,
              "max": 3
            },
            "replaceDescription": true,
            "chemicalSolution": {
              "maxVol": 500,
              "canReact": false
            },
            "possibleChemicals": [
              "Dermaline",
              "Arithrazine",
              "Bicaridine",
              "Inaprovaline",
              "Kelotane",
              "Dexalin",
              "Omnizine",
              "Napalm",
              "Toxin",
              "Epinephrine",
              "Cognizine",
              "Ultravasculine",
              "Desoxyephedrine",
              "Pax",
              "Siderlac"
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactAnomalySpawn",
      "name": "Порождает аномалию",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Создаёт предметы или существ из таблицы вариантов ниже. Состав зависит от случайного выбора; весь список одновременно не гарантирован."
      ],
      "group": "Создание",
      "chemicals": [],
      "spawned": [
        {
          "id": "RandomAnomalySpawner",
          "name": "спавнер случайный аномалия"
        }
      ],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactAnomalySpawn",
        "parent": "BaseOneTimeXenoArtifactEffect",
        "description": "Creates anomaly",
        "components": [
          {
            "type": "XAEApplyComponents",
            "applyIfAlreadyHave": true,
            "refreshOnReactivate": true,
            "components": [
              {
                "type": "EntityTableSpawner",
                "deleteSpawnerAfterSpawn": false,
                "table": {
                  "children": [
                    {
                      "id": "RandomAnomalySpawner"
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactIgnite",
      "name": "Пирокинез",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Поджигает объекты в радиусе действия. Подготовьте средства тушения до испытания."
      ],
      "group": "Воздействие",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactIgnite",
        "parent": "BaseXenoArtifactEffect",
        "description": "Pyrokinesis",
        "components": [
          {
            "type": "XAEIgnite",
            "range": 7,
            "fireStack": {
              "min": 3,
              "max": 6
            }
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactTeleport",
      "name": "Телепортация",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Телепортирует сам артефакт на случайное расстояние от 6 до 15 клеток."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactTeleport",
        "parent": "BaseXenoArtifactEffect",
        "description": "Teleportation",
        "components": [
          {
            "type": "XAERandomTeleportInvoker"
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactEmp",
      "name": "Опасные электромагнитные помехи",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Создаёт электромагнитный импульс: может нарушить работу электроники и батарей рядом."
      ],
      "group": "Воздействие",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactEmp",
        "parent": "BaseXenoArtifactEffect",
        "description": "Dangerous electromagnetic interference",
        "components": [
          {
            "type": "XenoArtifactNode",
            "maxDurability": 5,
            "maxDurabilityCanDecreaseBy": {
              "min": 0,
              "max": 3
            }
          },
          {
            "type": "XAEEmpInArea"
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactPolyMonkey",
      "name": "Временно превращает плоть в шерсть",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Превращает существ в радиусе 2 клеток в «обезьяна» (MobMonkey) на 20 секунд. Возврат также предусмотрен при критическом состоянии или смерти."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactPolyMonkey",
        "parent": "BaseXenoArtifactEffect",
        "description": "Temporarily reshape flesh to fur",
        "components": [
          {
            "type": "XAEPolymorph"
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactPolyLizard",
      "name": "Временно превращает плоть в чешую",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Превращает существ в радиусе 2 клеток в «ящерица» (MobLizard) на 20 секунд. Возврат также предусмотрен при критическом состоянии или смерти."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactPolyLizard",
        "parent": "BaseXenoArtifactEffect",
        "description": "Temporarily reshape flesh to scale",
        "components": [
          {
            "type": "XAEPolymorph",
            "polymorphPrototypeName": "ArtifactLizard"
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactPolyLuminous",
      "name": "Временно превращает плоть в свет",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Превращает существ в радиусе 2 клеток в «{ ent-MobLivingLight }» (MobLuminousPerson) на 20 секунд. Возврат также предусмотрен при критическом состоянии или смерти."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactPolyLuminous",
        "parent": "BaseXenoArtifactEffect",
        "description": "Temporarily reshape flesh to light",
        "components": [
          {
            "type": "XAEPolymorph",
            "polymorphPrototypeName": "ArtifactLuminous"
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactRadioactiveStrong",
      "name": "Становится сильно радиоактивным",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Становится постоянным источником радиации. Интенсивность: 2."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactRadioactiveStrong",
        "parent": "BaseOneTimeXenoArtifactEffect",
        "description": "Becomes highly radioactive",
        "components": [
          {
            "type": "XAEApplyComponents",
            "applyIfAlreadyHave": true,
            "refreshOnReactivate": true,
            "components": [
              {
                "type": "RadiationSource",
                "intensity": 2,
                "slope": 0.3
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactMaterialSpawnGlass",
      "name": "Порождает стекло",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Создаёт предметы или существ из таблицы вариантов ниже. Состав зависит от случайного выбора; весь список одновременно не гарантирован."
      ],
      "group": "Создание",
      "chemicals": [],
      "spawned": [
        {
          "id": "SheetGlass",
          "name": "{ ent-SheetGlassBase }"
        }
      ],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactMaterialSpawnGlass",
        "parent": "BaseXenoArtifactEffect",
        "description": "Create glass",
        "components": [
          {
            "type": "XAEApplyComponents",
            "applyIfAlreadyHave": true,
            "refreshOnReactivate": true,
            "components": [
              {
                "type": "EntityTableSpawner",
                "deleteSpawnerAfterSpawn": false,
                "table": {
                  "children": [
                    {
                      "id": "SheetGlass"
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactMaterialSpawnSteel",
      "name": "Порождает сталь",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Создаёт предметы или существ из таблицы вариантов ниже. Состав зависит от случайного выбора; весь список одновременно не гарантирован."
      ],
      "group": "Создание",
      "chemicals": [],
      "spawned": [
        {
          "id": "SheetSteel",
          "name": "сталь"
        }
      ],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactMaterialSpawnSteel",
        "parent": "BaseXenoArtifactEffect",
        "description": "Create steel",
        "components": [
          {
            "type": "XAEApplyComponents",
            "applyIfAlreadyHave": true,
            "refreshOnReactivate": true,
            "components": [
              {
                "type": "EntityTableSpawner",
                "deleteSpawnerAfterSpawn": false,
                "table": {
                  "children": [
                    {
                      "id": "SheetSteel"
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactMaterialSpawnPlastic",
      "name": "Порождает пластик",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Создаёт предметы или существ из таблицы вариантов ниже. Состав зависит от случайного выбора; весь список одновременно не гарантирован."
      ],
      "group": "Создание",
      "chemicals": [],
      "spawned": [
        {
          "id": "SheetPlastic",
          "name": "пластик"
        }
      ],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactMaterialSpawnPlastic",
        "parent": "BaseXenoArtifactEffect",
        "description": "Create plastic",
        "components": [
          {
            "type": "XAEApplyComponents",
            "applyIfAlreadyHave": true,
            "refreshOnReactivate": true,
            "components": [
              {
                "type": "EntityTableSpawner",
                "deleteSpawnerAfterSpawn": false,
                "table": {
                  "children": [
                    {
                      "id": "SheetPlastic"
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactPortal",
      "name": "Создаёт кратковременный блюспейс-портал",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Создаёт временный блюспейс-портал."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactPortal",
        "parent": "BaseXenoArtifactEffect",
        "description": "Create short-living bluespace portal",
        "components": [
          {
            "type": "XAEPortal"
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactArtifactSpawn",
      "name": "Порождает артефакт",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Создаёт предметы или существ из таблицы вариантов ниже. Состав зависит от случайного выбора; весь список одновременно не гарантирован."
      ],
      "group": "Создание",
      "chemicals": [],
      "spawned": [
        {
          "id": "RandomArtifactSpawner",
          "name": "случайный артефакт"
        }
      ],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactArtifactSpawn",
        "parent": "BaseXenoArtifactEffect",
        "description": "Create artifact",
        "components": [
          {
            "type": "XenoArtifactNode",
            "maxDurability": 2,
            "maxDurabilityCanDecreaseBy": {
              "min": 0,
              "max": 1
            }
          },
          {
            "type": "XAEApplyComponents",
            "applyIfAlreadyHave": true,
            "refreshOnReactivate": true,
            "components": [
              {
                "type": "EntityTableSpawner",
                "deleteSpawnerAfterSpawn": false,
                "table": {
                  "children": [
                    {
                      "id": "RandomArtifactSpawner"
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactShuffle",
      "name": "Меняет местами разумных существ",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Меняет местами разумных существ вокруг.",
        "Передаёт сообщения находящимся рядом персонажам. Послание само по себе не означает нанесение урона."
      ],
      "group": "Свойства и перемещение",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactShuffle",
        "parent": "BaseXenoArtifactEffect",
        "description": "Switch places of sentient beings",
        "components": [
          {
            "type": "XAEShuffle"
          },
          {
            "type": "XAETelepathic",
            "range": 7.5,
            "messages": [
              "shuffle-artifact-popup"
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactHealAll",
      "name": "Чудесное исцеление",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "В радиусе 8 клеток лечит по 100 единиц ушибов, порезов, уколов, теплового, холодового и электрического урона. Не является лечением всех типов повреждений."
      ],
      "group": "Воздействие",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactHealAll",
        "parent": "BaseXenoArtifactEffect",
        "description": "Miraclous healing",
        "components": [
          {
            "type": "XAEDamageInArea",
            "damageChance": 1,
            "radius": 8,
            "whitelist": {
              "components": [
                "MobState"
              ]
            },
            "damage": {
              "types": {
                "Blunt": -100,
                "Piercing": -100,
                "Slash": -100,
                "Heat": -100,
                "Cold": -100,
                "Shock": -100
              }
            }
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactTesla",
      "name": "Массовое разрушение: сингулярность",
      "active": false,
      "status": "Вне стандартных таблиц",
      "steps": [
        "Создаёт предметы или существ из таблицы вариантов ниже. Состав зависит от случайного выбора; весь список одновременно не гарантирован."
      ],
      "group": "Создание",
      "chemicals": [],
      "spawned": [
        {
          "id": "Singularity",
          "name": "гравитационная сингулярность"
        }
      ],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactTesla",
        "parent": "BaseOneTimeXenoArtifactEffect",
        "description": "Mass destruction",
        "components": [
          {
            "type": "XAEApplyComponents",
            "applyIfAlreadyHave": true,
            "refreshOnReactivate": true,
            "components": [
              {
                "type": "EntityTableSpawner",
                "deleteSpawnerAfterSpawn": false,
                "table": {
                  "children": [
                    {
                      "id": "Singularity"
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactSingularity",
      "name": "Неминуемая гибель: тесла",
      "active": false,
      "status": "Вне стандартных таблиц",
      "steps": [
        "Создаёт предметы или существ из таблицы вариантов ниже. Состав зависит от случайного выбора; весь список одновременно не гарантирован."
      ],
      "group": "Создание",
      "chemicals": [],
      "spawned": [
        {
          "id": "TeslaEnergyBall",
          "name": "шаровая молния"
        }
      ],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactSingularity",
        "parent": "BaseOneTimeXenoArtifactEffect",
        "description": "Imminent doom",
        "components": [
          {
            "type": "XAEApplyComponents",
            "applyIfAlreadyHave": true,
            "refreshOnReactivate": true,
            "components": [
              {
                "type": "EntityTableSpawner",
                "deleteSpawnerAfterSpawn": false,
                "table": {
                  "children": [
                    {
                      "id": "TeslaEnergyBall"
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactExplosionScary",
      "name": "Маленькая высокоскоростная ядерная реакция",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Вызывает взрыв. Вид и интенсивность определяются параметрами узла."
      ],
      "group": "Воздействие",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactExplosionScary",
        "parent": "BaseOneTimeXenoArtifactEffect",
        "description": "Small scale high-speed nuclear reaction",
        "components": [
          {
            "type": "XAETriggerExplosives"
          },
          {
            "type": "Explosive",
            "deleteAfterExplosion": false,
            "explosionType": "Radioactive",
            "totalIntensity": 300,
            "intensitySlope": 2,
            "maxIntensity": 1.5,
            "canCreateVacuum": false,
            "repeatable": true
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactBoom",
      "name": "Взрыв",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Вызывает взрыв. Вид и интенсивность определяются параметрами узла."
      ],
      "group": "Воздействие",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactBoom",
        "parent": "BaseOneTimeXenoArtifactEffect",
        "description": "Explosion",
        "components": [
          {
            "type": "XAETriggerExplosives"
          },
          {
            "type": "Explosive",
            "deleteAfterExplosion": false,
            "explosionType": "Default",
            "totalIntensity": 500,
            "intensitySlope": 2.5,
            "maxIntensity": 50,
            "repeatable": true
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactEffectCreationGasPlasma",
      "name": "Выделяет плазму",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Выделяет газ: плазма — 300 моль. Меняет состав и давление атмосферы."
      ],
      "group": "Атмосфера",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactEffectCreationGasPlasma",
        "parent": "BaseXenoArtifactEffect",
        "description": "Expels plasma",
        "components": [
          {
            "type": "XAECreateGas",
            "gases": {
              "Plasma": 300
            }
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactEffectCreationGasTritium",
      "name": "Выделяет тритий",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Выделяет газ: тритий — 300 моль. Меняет состав и давление атмосферы."
      ],
      "group": "Атмосфера",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactEffectCreationGasTritium",
        "parent": "BaseXenoArtifactEffect",
        "description": "Expels tritium",
        "components": [
          {
            "type": "XAECreateGas",
            "gases": {
              "Tritium": 300
            }
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactEffectCreationGasAmmonia",
      "name": "Выделяет аммиак",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Выделяет газ: аммиак — 300 моль. Меняет состав и давление атмосферы."
      ],
      "group": "Атмосфера",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactEffectCreationGasAmmonia",
        "parent": "BaseXenoArtifactEffect",
        "description": "Expels ammonia",
        "components": [
          {
            "type": "XAECreateGas",
            "gases": {
              "Ammonia": 300
            }
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactEffectCreationGasFrezon",
      "name": "Выделяет фрезон",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Выделяет газ: фрезон — 300 моль. Меняет состав и давление атмосферы."
      ],
      "group": "Атмосфера",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactEffectCreationGasFrezon",
        "parent": "BaseXenoArtifactEffect",
        "description": "Expels frezon",
        "components": [
          {
            "type": "XAECreateGas",
            "gases": {
              "Frezon": 300
            }
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactEffectCreationGasNitrousOxide",
      "name": "Выделяет оксид азота",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Выделяет газ: оксид азота — 300 моль. Меняет состав и давление атмосферы."
      ],
      "group": "Атмосфера",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactEffectCreationGasNitrousOxide",
        "parent": "BaseXenoArtifactEffect",
        "description": "Expels nitrous oxide",
        "components": [
          {
            "type": "XAECreateGas",
            "gases": {
              "NitrousOxide": 300
            }
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    },
    {
      "id": "XenoArtifactEffectCreationGasCarbonDioxide",
      "name": "Выделяет углекислый газ",
      "active": true,
      "status": "Стандартная генерация",
      "steps": [
        "Выделяет газ: диоксид углерода — 300 моль. Меняет состав и давление атмосферы."
      ],
      "group": "Атмосфера",
      "chemicals": [],
      "spawned": [],
      "raw": {
        "type": "entity",
        "id": "XenoArtifactEffectCreationGasCarbonDioxide",
        "parent": "BaseXenoArtifactEffect",
        "description": "Expels carbon dioxide",
        "components": [
          {
            "type": "XAECreateGas",
            "gases": {
              "CarbonDioxide": 300
            }
          }
        ]
      },
      "source": "Resources/Prototypes/XenoArch/effects.yml"
    }
  ]
};
