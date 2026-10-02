window.ANOMALY_DATA = {
  "anomalies": [
    {
      "id": "AnomalyPyroclastic",
      "name": "Пирокластическая",
      "family": "Пирокластическая",
      "effect": "Нагрев, огонь и огненные снаряды; при сильном развитии выделяет плазму.",
      "critical": "Пожары и усиление тепловых эффектов.",
      "advice": "Подготовьте пожарную защиту, огнетушитель и контроль атмосферы. Не размещайте горючие запасы рядом.",
      "source": "Resources/Prototypes/Entities/Structures/Specific/Anomaly/anomalies.yml",
      "core": "AnomalyCorePyroclastic",
      "raw": {
        "type": "entity",
        "id": "AnomalyPyroclastic",
        "parent": "BaseAnomaly",
        "suffix": "Pyroclastic",
        "components": [
          {
            "type": "AmbientSound",
            "volume": 5,
            "range": 5,
            "sound": {
              "path": "/Audio/Ambience/Objects/fireplace.ogg"
            }
          },
          {
            "type": "Anomaly",
            "corePrototype": "AnomalyCorePyroclastic",
            "coreInertPrototype": "AnomalyCorePyroclasticInert",
            "supercriticalSoundAtAnimationStart": {
              "collection": "AnomalyPyroSupercritical"
            }
          },
          {
            "type": "Sprite",
            "sprite": "Structures/Specific/Anomalies/pyro_anom.rsi",
            "layers": [
              {
                "state": "anom",
                "map": [
                  "enum.AnomalyVisualLayers.Base"
                ]
              },
              {
                "state": "pulse",
                "map": [
                  "enum.AnomalyVisualLayers.Animated"
                ],
                "visible": false
              }
            ]
          },
          {
            "type": "PointLight",
            "radius": 6,
            "energy": 7.5,
            "color": "#E25822",
            "castShadows": false
          },
          {
            "type": "PyroclasticAnomaly"
          },
          {
            "type": "TempAffectingAnomaly",
            "tempChangePerSecond": 25,
            "hotspotExposeTemperature": 1000
          },
          {
            "type": "GasProducerAnomaly",
            "releasedGas": 3,
            "releaseOnMaxSeverity": true,
            "spawnRadius": 4,
            "tileCount": 5,
            "tempChange": 420
          },
          {
            "type": "ProjectileAnomaly",
            "projectilePrototype": "ProjectileAnomalyFireball",
            "projectileSpeed": 0.5,
            "minProjectiles": 3,
            "maxProjectiles": 6
          },
          {
            "type": "IgnitionSource",
            "temperature": 800,
            "ignited": true
          },
          {
            "type": "IgniteOnCollide",
            "fixtureId": "fix1",
            "fireStacks": 1
          },
          {
            "type": "DamageOnInteract",
            "damage": {
              "types": {
                "Heat": 10
              }
            },
            "popupText": "anomaly-component-contact-damage"
          },
          {
            "type": "DamageOnAttacked",
            "damage": {
              "types": {
                "Heat": 10
              }
            }
          }
        ]
      },
      "components": [
        {
          "type": "Anomaly",
          "offset": "0, 0.15",
          "pulseSound": {
            "collection": "RadiationPulse",
            "params": {
              "volume": 5
            }
          },
          "pulseRun": true,
          "corePrototype": "AnomalyCorePyroclastic",
          "coreInertPrototype": "AnomalyCorePyroclasticInert",
          "supercriticalSoundAtAnimationStart": {
            "collection": "AnomalyPyroSupercritical"
          }
        },
        {
          "type": "AmbientSound",
          "range": 5,
          "volume": 5,
          "sound": {
            "path": "/Audio/Ambience/Objects/fireplace.ogg"
          }
        },
        {
          "type": "Transform",
          "anchored": false
        },
        {
          "type": "Physics",
          "bodyType": "Dynamic",
          "bodyStatus": "InAir"
        },
        {
          "type": "Fixtures",
          "fixtures": {
            "fix1": {
              "shape": {
                "radius": 0.35
              },
              "density": 50,
              "mask": [
                "FlyingMobMask"
              ],
              "layer": [
                "FlyingMobLayer"
              ]
            }
          }
        },
        {
          "type": "Sprite",
          "noRot": true,
          "drawdepth": "Effects",
          "sprite": "Structures/Specific/Anomalies/pyro_anom.rsi",
          "layers": [
            {
              "state": "anom",
              "map": [
                "enum.AnomalyVisualLayers.Base"
              ]
            },
            {
              "state": "pulse",
              "map": [
                "enum.AnomalyVisualLayers.Animated"
              ],
              "visible": false
            }
          ]
        },
        {
          "type": "InteractionOutline"
        },
        {
          "type": "Clickable"
        },
        {
          "type": "Damageable"
        },
        {
          "type": "Appearance"
        },
        {
          "type": "AnimationPlayer"
        },
        {
          "type": "GuideHelp",
          "guides": [
            "AnomalousResearch"
          ]
        },
        {
          "type": "EmitSoundOnSpawn",
          "sound": {
            "path": "/Audio/Effects/teleport_arrival.ogg"
          }
        },
        {
          "type": "RadiationSource",
          "intensity": 4,
          "slope": 0.7
        },
        {
          "type": "RandomWalk",
          "minSpeed": 0,
          "maxSpeed": 0
        },
        {
          "type": "SecretDataAnomaly",
          "randomStartSecretMin": 0,
          "randomStartSecretMax": 2
        },
        {
          "type": "WarpPoint",
          "follow": true,
          "location": "anomaly"
        },
        {
          "type": "DamageOnInteract",
          "damage": {
            "types": {
              "Heat": 10
            }
          },
          "popupText": "anomaly-component-contact-damage"
        },
        {
          "type": "DamageOnAttacked",
          "damage": {
            "types": {
              "Heat": 10
            }
          }
        },
        {
          "type": "PointLight",
          "radius": 6,
          "energy": 7.5,
          "color": "#E25822",
          "castShadows": false
        },
        {
          "type": "PyroclasticAnomaly"
        },
        {
          "type": "TempAffectingAnomaly",
          "tempChangePerSecond": 25,
          "hotspotExposeTemperature": 1000
        },
        {
          "type": "GasProducerAnomaly",
          "releasedGas": 3,
          "releaseOnMaxSeverity": true,
          "spawnRadius": 4,
          "tileCount": 5,
          "tempChange": 420
        },
        {
          "type": "ProjectileAnomaly",
          "projectilePrototype": "ProjectileAnomalyFireball",
          "projectileSpeed": 0.5,
          "minProjectiles": 3,
          "maxProjectiles": 6
        },
        {
          "type": "IgnitionSource",
          "temperature": 800,
          "ignited": true
        },
        {
          "type": "IgniteOnCollide",
          "fixtureId": "fix1",
          "fireStacks": 1
        }
      ]
    },
    {
      "id": "AnomalyGravity",
      "name": "Гравитационная",
      "family": "Гравитационная",
      "effect": "Воздействует на движение и разбрасывает объекты при импульсе.",
      "critical": "Удаляет участки пола и сильнее разбрасывает объекты; возможна разгерметизация.",
      "advice": "Закрепите оборудование, уберите свободные предметы и предусмотрите защиту от разгерметизации.",
      "source": "Resources/Prototypes/Entities/Structures/Specific/Anomaly/anomalies.yml",
      "core": "AnomalyCoreGravity",
      "raw": {
        "type": "entity",
        "id": "AnomalyGravity",
        "parent": "BaseAnomaly",
        "suffix": "Gravity",
        "components": [
          {
            "type": "Anomaly",
            "corePrototype": "AnomalyCoreGravity",
            "coreInertPrototype": "AnomalyCoreGravityInert",
            "supercriticalSoundAtAnimationStart": {
              "collection": "AnomalyGravitySupercritical"
            },
            "supercriticalDuration": "15s"
          },
          {
            "type": "Sprite",
            "layers": [
              {
                "state": "anom2",
                "map": [
                  "enum.AnomalyVisualLayers.Base"
                ]
              },
              {
                "state": "anom2-pulse",
                "map": [
                  "enum.AnomalyVisualLayers.Animated"
                ],
                "visible": false
              }
            ]
          },
          {
            "type": "PointLight",
            "radius": 5,
            "energy": 20,
            "color": "#1e070e",
            "castShadows": false
          },
          {
            "type": "GravityAnomaly"
          },
          {
            "type": "GravityWell"
          },
          {
            "type": "RadiationSource"
          },
          {
            "type": "Physics",
            "bodyType": "Dynamic",
            "bodyStatus": "InAir"
          },
          {
            "type": "CanMoveInAir"
          },
          {
            "type": "RandomWalk"
          },
          {
            "type": "SingularityDistortion",
            "intensity": 1000,
            "falloffPower": 2.7
          }
        ]
      },
      "components": [
        {
          "type": "Anomaly",
          "offset": "0, 0.15",
          "pulseSound": {
            "collection": "RadiationPulse",
            "params": {
              "volume": 5
            }
          },
          "pulseRun": true,
          "corePrototype": "AnomalyCoreGravity",
          "coreInertPrototype": "AnomalyCoreGravityInert",
          "supercriticalSoundAtAnimationStart": {
            "collection": "AnomalyGravitySupercritical"
          },
          "supercriticalDuration": "15s"
        },
        {
          "type": "AmbientSound",
          "range": 5,
          "volume": -5,
          "sound": {
            "path": "/Audio/Ambience/anomaly_drone.ogg"
          }
        },
        {
          "type": "Transform",
          "anchored": false
        },
        {
          "type": "Physics",
          "bodyType": "Dynamic",
          "bodyStatus": "InAir"
        },
        {
          "type": "Fixtures",
          "fixtures": {
            "fix1": {
              "shape": {
                "radius": 0.35
              },
              "density": 50,
              "mask": [
                "FlyingMobMask"
              ],
              "layer": [
                "FlyingMobLayer"
              ]
            }
          }
        },
        {
          "type": "Sprite",
          "noRot": true,
          "drawdepth": "Effects",
          "sprite": "Structures/Specific/anomaly.rsi",
          "layers": [
            {
              "state": "anom2",
              "map": [
                "enum.AnomalyVisualLayers.Base"
              ]
            },
            {
              "state": "anom2-pulse",
              "map": [
                "enum.AnomalyVisualLayers.Animated"
              ],
              "visible": false
            }
          ]
        },
        {
          "type": "InteractionOutline"
        },
        {
          "type": "Clickable"
        },
        {
          "type": "Damageable"
        },
        {
          "type": "Appearance"
        },
        {
          "type": "AnimationPlayer"
        },
        {
          "type": "GuideHelp",
          "guides": [
            "AnomalousResearch"
          ]
        },
        {
          "type": "EmitSoundOnSpawn",
          "sound": {
            "path": "/Audio/Effects/teleport_arrival.ogg"
          }
        },
        {
          "type": "RadiationSource",
          "intensity": 4,
          "slope": 0.7
        },
        {
          "type": "RandomWalk",
          "minSpeed": 0,
          "maxSpeed": 0
        },
        {
          "type": "SecretDataAnomaly",
          "randomStartSecretMin": 0,
          "randomStartSecretMax": 2
        },
        {
          "type": "WarpPoint",
          "follow": true,
          "location": "anomaly"
        },
        {
          "type": "DamageOnInteract",
          "damage": {
            "types": {
              "Radiation": 10
            }
          },
          "popupText": "anomaly-component-contact-damage"
        },
        {
          "type": "DamageOnAttacked",
          "damage": {
            "types": {
              "Radiation": 10
            }
          }
        },
        {
          "type": "PointLight",
          "radius": 5,
          "energy": 20,
          "color": "#1e070e",
          "castShadows": false
        },
        {
          "type": "GravityAnomaly"
        },
        {
          "type": "GravityWell"
        },
        {
          "type": "CanMoveInAir"
        },
        {
          "type": "SingularityDistortion",
          "intensity": 1000,
          "falloffPower": 2.7
        }
      ]
    },
    {
      "id": "AnomalyElectricity",
      "name": "Электрическая",
      "family": "Электрическая",
      "effect": "Поражает током и выпускает молнии.",
      "critical": "Усиленные разряды и электромагнитный импульс.",
      "advice": "Используйте электрозащиту и дистанцию. Держите резервный сканер и батареи вне зоны воздействия.",
      "source": "Resources/Prototypes/Entities/Structures/Specific/Anomaly/anomalies.yml",
      "core": "AnomalyCoreElectricity",
      "raw": {
        "type": "entity",
        "id": "AnomalyElectricity",
        "parent": "BaseAnomaly",
        "suffix": "Electricity",
        "components": [
          {
            "type": "Anomaly",
            "corePrototype": "AnomalyCoreElectricity",
            "coreInertPrototype": "AnomalyCoreElectricityInert",
            "supercriticalSoundAtAnimationStart": {
              "collection": "AnomalyElectricitySupercritical"
            }
          },
          {
            "type": "Sprite",
            "layers": [
              {
                "state": "anom3",
                "map": [
                  "enum.AnomalyVisualLayers.Base"
                ]
              },
              {
                "state": "anom3-pulse",
                "map": [
                  "enum.AnomalyVisualLayers.Animated"
                ],
                "visible": false
              }
            ]
          },
          {
            "type": "PointLight",
            "radius": 2,
            "energy": 5,
            "color": "#ffffaa",
            "castShadows": false
          },
          {
            "type": "ElectricityAnomaly"
          },
          {
            "type": "Electrified"
          }
        ]
      },
      "components": [
        {
          "type": "Anomaly",
          "offset": "0, 0.15",
          "pulseSound": {
            "collection": "RadiationPulse",
            "params": {
              "volume": 5
            }
          },
          "pulseRun": true,
          "corePrototype": "AnomalyCoreElectricity",
          "coreInertPrototype": "AnomalyCoreElectricityInert",
          "supercriticalSoundAtAnimationStart": {
            "collection": "AnomalyElectricitySupercritical"
          }
        },
        {
          "type": "AmbientSound",
          "range": 5,
          "volume": -5,
          "sound": {
            "path": "/Audio/Ambience/anomaly_drone.ogg"
          }
        },
        {
          "type": "Transform",
          "anchored": false
        },
        {
          "type": "Physics",
          "bodyType": "Dynamic",
          "bodyStatus": "InAir"
        },
        {
          "type": "Fixtures",
          "fixtures": {
            "fix1": {
              "shape": {
                "radius": 0.35
              },
              "density": 50,
              "mask": [
                "FlyingMobMask"
              ],
              "layer": [
                "FlyingMobLayer"
              ]
            }
          }
        },
        {
          "type": "Sprite",
          "noRot": true,
          "drawdepth": "Effects",
          "sprite": "Structures/Specific/anomaly.rsi",
          "layers": [
            {
              "state": "anom3",
              "map": [
                "enum.AnomalyVisualLayers.Base"
              ]
            },
            {
              "state": "anom3-pulse",
              "map": [
                "enum.AnomalyVisualLayers.Animated"
              ],
              "visible": false
            }
          ]
        },
        {
          "type": "InteractionOutline"
        },
        {
          "type": "Clickable"
        },
        {
          "type": "Damageable"
        },
        {
          "type": "Appearance"
        },
        {
          "type": "AnimationPlayer"
        },
        {
          "type": "GuideHelp",
          "guides": [
            "AnomalousResearch"
          ]
        },
        {
          "type": "EmitSoundOnSpawn",
          "sound": {
            "path": "/Audio/Effects/teleport_arrival.ogg"
          }
        },
        {
          "type": "RadiationSource",
          "intensity": 4,
          "slope": 0.7
        },
        {
          "type": "RandomWalk",
          "minSpeed": 0,
          "maxSpeed": 0
        },
        {
          "type": "SecretDataAnomaly",
          "randomStartSecretMin": 0,
          "randomStartSecretMax": 2
        },
        {
          "type": "WarpPoint",
          "follow": true,
          "location": "anomaly"
        },
        {
          "type": "DamageOnInteract",
          "damage": {
            "types": {
              "Radiation": 10
            }
          },
          "popupText": "anomaly-component-contact-damage"
        },
        {
          "type": "DamageOnAttacked",
          "damage": {
            "types": {
              "Radiation": 10
            }
          }
        },
        {
          "type": "PointLight",
          "radius": 2,
          "energy": 5,
          "color": "#ffffaa",
          "castShadows": false
        },
        {
          "type": "ElectricityAnomaly"
        },
        {
          "type": "Electrified"
        }
      ]
    },
    {
      "id": "AnomalyFlesh",
      "name": "Плотяная",
      "family": "Плотяная",
      "effect": "Создаёт плотяной пол, препятствия и враждебных существ.",
      "critical": "Массовое появление плоти, существ и плотяной лозы. Даже при остановке возможны дополнительные существа.",
      "advice": "Согласуйте прикрытие, оставьте свободный выход и не считайте исчезновение аномалии окончанием опасности.",
      "source": "Resources/Prototypes/Entities/Structures/Specific/Anomaly/anomalies.yml",
      "core": "AnomalyCoreFlesh",
      "raw": {
        "type": "entity",
        "id": "AnomalyFlesh",
        "parent": "BaseAnomaly",
        "suffix": "Flesh",
        "components": [
          {
            "type": "Anomaly",
            "corePrototype": "AnomalyCoreFlesh",
            "coreInertPrototype": "AnomalyCoreFleshInert",
            "minPulseLength": 180,
            "maxPulseLength": 300,
            "supercriticalSoundAtAnimationStart": {
              "collection": "AnomalyFleshSupercritical"
            }
          },
          {
            "type": "Sprite",
            "layers": [
              {
                "state": "anom5",
                "map": [
                  "enum.AnomalyVisualLayers.Base"
                ]
              },
              {
                "state": "anom5-pulse",
                "map": [
                  "enum.AnomalyVisualLayers.Animated"
                ],
                "visible": false
              }
            ]
          },
          {
            "type": "PointLight",
            "radius": 2,
            "energy": 7.5,
            "color": "#cb5b7e",
            "castShadows": false
          },
          {
            "type": "TileSpawnAnomaly",
            "entries": [
              {
                "settings": {
                  "spawnOnPulse": true,
                  "spawnOnStabilityChanged": true,
                  "minAmount": 3,
                  "maxAmount": 7,
                  "maxRange": 4
                },
                "floor": "FloorFlesh"
              },
              {
                "settings": {
                  "spawnOnSuperCritical": true,
                  "minAmount": 10,
                  "maxAmount": 30,
                  "maxRange": 10
                },
                "floor": "FloorFlesh"
              }
            ]
          },
          {
            "type": "EntitySpawnAnomaly",
            "entries": [
              {
                "settings": {
                  "spawnOnPulse": true,
                  "minAmount": 1,
                  "maxAmount": 4,
                  "minRange": 1.5,
                  "maxRange": 2.5
                },
                "spawns": [
                  "FleshBlocker"
                ]
              },
              {
                "settings": {
                  "spawnOnPulse": true,
                  "maxAmount": 3,
                  "minRange": 3,
                  "maxRange": 4.5
                },
                "spawns": [
                  "MobFleshJared",
                  "MobFleshGolem",
                  "MobFleshClamp",
                  "MobFleshLover"
                ]
              },
              {
                "settings": {
                  "spawnOnSuperCritical": true,
                  "minAmount": 10,
                  "maxAmount": 15,
                  "minRange": 5,
                  "maxRange": 15
                },
                "spawns": [
                  "FleshBlocker"
                ]
              },
              {
                "settings": {
                  "spawnOnSuperCritical": true,
                  "minAmount": 5,
                  "maxAmount": 10,
                  "maxRange": 8
                },
                "spawns": [
                  "MobFleshJared",
                  "MobFleshGolem",
                  "MobFleshClamp",
                  "MobFleshLover"
                ]
              },
              {
                "settings": {
                  "spawnOnSuperCritical": true,
                  "minAmount": 5,
                  "maxAmount": 8,
                  "maxRange": 10
                },
                "spawns": [
                  "FleshKudzu"
                ]
              },
              {
                "settings": {
                  "spawnOnShutdown": true,
                  "maxAmount": 2,
                  "maxRange": 1
                },
                "spawns": [
                  "MobFleshJared",
                  "MobFleshGolem",
                  "MobFleshClamp",
                  "MobFleshLover",
                  "FleshKudzu"
                ]
              }
            ]
          }
        ]
      },
      "components": [
        {
          "type": "Anomaly",
          "offset": "0, 0.15",
          "pulseSound": {
            "collection": "RadiationPulse",
            "params": {
              "volume": 5
            }
          },
          "pulseRun": true,
          "corePrototype": "AnomalyCoreFlesh",
          "coreInertPrototype": "AnomalyCoreFleshInert",
          "minPulseLength": 180,
          "maxPulseLength": 300,
          "supercriticalSoundAtAnimationStart": {
            "collection": "AnomalyFleshSupercritical"
          }
        },
        {
          "type": "AmbientSound",
          "range": 5,
          "volume": -5,
          "sound": {
            "path": "/Audio/Ambience/anomaly_drone.ogg"
          }
        },
        {
          "type": "Transform",
          "anchored": false
        },
        {
          "type": "Physics",
          "bodyType": "Dynamic",
          "bodyStatus": "InAir"
        },
        {
          "type": "Fixtures",
          "fixtures": {
            "fix1": {
              "shape": {
                "radius": 0.35
              },
              "density": 50,
              "mask": [
                "FlyingMobMask"
              ],
              "layer": [
                "FlyingMobLayer"
              ]
            }
          }
        },
        {
          "type": "Sprite",
          "noRot": true,
          "drawdepth": "Effects",
          "sprite": "Structures/Specific/anomaly.rsi",
          "layers": [
            {
              "state": "anom5",
              "map": [
                "enum.AnomalyVisualLayers.Base"
              ]
            },
            {
              "state": "anom5-pulse",
              "map": [
                "enum.AnomalyVisualLayers.Animated"
              ],
              "visible": false
            }
          ]
        },
        {
          "type": "InteractionOutline"
        },
        {
          "type": "Clickable"
        },
        {
          "type": "Damageable"
        },
        {
          "type": "Appearance"
        },
        {
          "type": "AnimationPlayer"
        },
        {
          "type": "GuideHelp",
          "guides": [
            "AnomalousResearch"
          ]
        },
        {
          "type": "EmitSoundOnSpawn",
          "sound": {
            "path": "/Audio/Effects/teleport_arrival.ogg"
          }
        },
        {
          "type": "RadiationSource",
          "intensity": 4,
          "slope": 0.7
        },
        {
          "type": "RandomWalk",
          "minSpeed": 0,
          "maxSpeed": 0
        },
        {
          "type": "SecretDataAnomaly",
          "randomStartSecretMin": 0,
          "randomStartSecretMax": 2
        },
        {
          "type": "WarpPoint",
          "follow": true,
          "location": "anomaly"
        },
        {
          "type": "DamageOnInteract",
          "damage": {
            "types": {
              "Radiation": 10
            }
          },
          "popupText": "anomaly-component-contact-damage"
        },
        {
          "type": "DamageOnAttacked",
          "damage": {
            "types": {
              "Radiation": 10
            }
          }
        },
        {
          "type": "PointLight",
          "radius": 2,
          "energy": 7.5,
          "color": "#cb5b7e",
          "castShadows": false
        },
        {
          "type": "TileSpawnAnomaly",
          "entries": [
            {
              "settings": {
                "spawnOnPulse": true,
                "spawnOnStabilityChanged": true,
                "minAmount": 3,
                "maxAmount": 7,
                "maxRange": 4
              },
              "floor": "FloorFlesh"
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 10,
                "maxAmount": 30,
                "maxRange": 10
              },
              "floor": "FloorFlesh"
            }
          ]
        },
        {
          "type": "EntitySpawnAnomaly",
          "entries": [
            {
              "settings": {
                "spawnOnPulse": true,
                "minAmount": 1,
                "maxAmount": 4,
                "minRange": 1.5,
                "maxRange": 2.5
              },
              "spawns": [
                "FleshBlocker"
              ]
            },
            {
              "settings": {
                "spawnOnPulse": true,
                "maxAmount": 3,
                "minRange": 3,
                "maxRange": 4.5
              },
              "spawns": [
                "MobFleshJared",
                "MobFleshGolem",
                "MobFleshClamp",
                "MobFleshLover"
              ]
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 10,
                "maxAmount": 15,
                "minRange": 5,
                "maxRange": 15
              },
              "spawns": [
                "FleshBlocker"
              ]
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 5,
                "maxAmount": 10,
                "maxRange": 8
              },
              "spawns": [
                "MobFleshJared",
                "MobFleshGolem",
                "MobFleshClamp",
                "MobFleshLover"
              ]
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 5,
                "maxAmount": 8,
                "maxRange": 10
              },
              "spawns": [
                "FleshKudzu"
              ]
            },
            {
              "settings": {
                "spawnOnShutdown": true,
                "maxAmount": 2,
                "maxRange": 1
              },
              "spawns": [
                "MobFleshJared",
                "MobFleshGolem",
                "MobFleshClamp",
                "MobFleshLover",
                "FleshKudzu"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "AnomalyBluespace",
      "name": "Блюспейс",
      "family": "Блюспейс",
      "effect": "Телепортирует и перемешивает положение существ; меняет параметры портала.",
      "critical": "Разбрасывает существ по случайным позициям на станции.",
      "advice": "Держите связь с отделом, не работайте в одиночку и подготовьте защиту на случай опасного места телепортации.",
      "source": "Resources/Prototypes/Entities/Structures/Specific/Anomaly/anomalies.yml",
      "core": "AnomalyCoreBluespace",
      "raw": {
        "type": "entity",
        "id": "AnomalyBluespace",
        "parent": "BaseAnomaly",
        "suffix": "Bluespace",
        "components": [
          {
            "type": "Sprite",
            "layers": [
              {
                "state": "anom4",
                "map": [
                  "enum.AnomalyVisualLayers.Base"
                ]
              },
              {
                "state": "anom4-pulse",
                "map": [
                  "enum.AnomalyVisualLayers.Animated"
                ],
                "visible": false
              }
            ]
          },
          {
            "type": "PointLight",
            "radius": 2,
            "energy": 7.5,
            "color": "#00ccff",
            "castShadows": false
          },
          {
            "type": "BluespaceAnomaly"
          },
          {
            "type": "Portal"
          },
          {
            "type": "Fixtures",
            "fixtures": {
              "fix1": {
                "shape": {
                  "radius": 0.35
                },
                "density": 50,
                "mask": [
                  "MobMask"
                ],
                "layer": [
                  "MobLayer"
                ]
              },
              "portalFixture": {
                "shape": {
                  "bounds": "-0.25,-0.48,0.25,0.48"
                },
                "mask": [
                  "FullTileMask"
                ],
                "layer": [
                  "WallLayer"
                ],
                "hard": false
              }
            }
          },
          {
            "type": "Anomaly",
            "corePrototype": "AnomalyCoreBluespace",
            "coreInertPrototype": "AnomalyCoreBluespaceInert",
            "supercriticalSoundAtAnimationStart": {
              "collection": "AnomalyBluespaceSupercritical"
            },
            "pulseSound": {
              "collection": "RadiationPulse",
              "params": {
                "volume": 5
              }
            }
          }
        ]
      },
      "components": [
        {
          "type": "Anomaly",
          "offset": "0, 0.15",
          "pulseSound": {
            "collection": "RadiationPulse",
            "params": {
              "volume": 5
            }
          },
          "pulseRun": true,
          "corePrototype": "AnomalyCoreBluespace",
          "coreInertPrototype": "AnomalyCoreBluespaceInert",
          "supercriticalSoundAtAnimationStart": {
            "collection": "AnomalyBluespaceSupercritical"
          }
        },
        {
          "type": "AmbientSound",
          "range": 5,
          "volume": -5,
          "sound": {
            "path": "/Audio/Ambience/anomaly_drone.ogg"
          }
        },
        {
          "type": "Transform",
          "anchored": false
        },
        {
          "type": "Physics",
          "bodyType": "Dynamic",
          "bodyStatus": "InAir"
        },
        {
          "type": "Fixtures",
          "fixtures": {
            "fix1": {
              "shape": {
                "radius": 0.35
              },
              "density": 50,
              "mask": [
                "MobMask"
              ],
              "layer": [
                "MobLayer"
              ]
            },
            "portalFixture": {
              "shape": {
                "bounds": "-0.25,-0.48,0.25,0.48"
              },
              "mask": [
                "FullTileMask"
              ],
              "layer": [
                "WallLayer"
              ],
              "hard": false
            }
          }
        },
        {
          "type": "Sprite",
          "noRot": true,
          "drawdepth": "Effects",
          "sprite": "Structures/Specific/anomaly.rsi",
          "layers": [
            {
              "state": "anom4",
              "map": [
                "enum.AnomalyVisualLayers.Base"
              ]
            },
            {
              "state": "anom4-pulse",
              "map": [
                "enum.AnomalyVisualLayers.Animated"
              ],
              "visible": false
            }
          ]
        },
        {
          "type": "InteractionOutline"
        },
        {
          "type": "Clickable"
        },
        {
          "type": "Damageable"
        },
        {
          "type": "Appearance"
        },
        {
          "type": "AnimationPlayer"
        },
        {
          "type": "GuideHelp",
          "guides": [
            "AnomalousResearch"
          ]
        },
        {
          "type": "EmitSoundOnSpawn",
          "sound": {
            "path": "/Audio/Effects/teleport_arrival.ogg"
          }
        },
        {
          "type": "RadiationSource",
          "intensity": 4,
          "slope": 0.7
        },
        {
          "type": "RandomWalk",
          "minSpeed": 0,
          "maxSpeed": 0
        },
        {
          "type": "SecretDataAnomaly",
          "randomStartSecretMin": 0,
          "randomStartSecretMax": 2
        },
        {
          "type": "WarpPoint",
          "follow": true,
          "location": "anomaly"
        },
        {
          "type": "DamageOnInteract",
          "damage": {
            "types": {
              "Radiation": 10
            }
          },
          "popupText": "anomaly-component-contact-damage"
        },
        {
          "type": "DamageOnAttacked",
          "damage": {
            "types": {
              "Radiation": 10
            }
          }
        },
        {
          "type": "PointLight",
          "radius": 2,
          "energy": 7.5,
          "color": "#00ccff",
          "castShadows": false
        },
        {
          "type": "BluespaceAnomaly"
        },
        {
          "type": "Portal"
        }
      ]
    },
    {
      "id": "AnomalyIce",
      "name": "Ледяная",
      "family": "Ледяная",
      "effect": "Охлаждает атмосферу, создаёт ледяную корку и выпускает сосульки.",
      "critical": "Криогенный взрыв; также предусмотрено выделение фрезона.",
      "advice": "Подготовьте защиту от холода, контролируйте газовую смесь и избегайте обледеневших проходов.",
      "source": "Resources/Prototypes/Entities/Structures/Specific/Anomaly/anomalies.yml",
      "core": "AnomalyCoreIce",
      "raw": {
        "type": "entity",
        "id": "AnomalyIce",
        "parent": "BaseAnomaly",
        "suffix": "Ice",
        "components": [
          {
            "type": "Sprite",
            "sprite": "Structures/Specific/Anomalies/ice_anom.rsi",
            "layers": [
              {
                "state": "anom",
                "map": [
                  "enum.AnomalyVisualLayers.Base"
                ]
              },
              {
                "state": "pulse",
                "map": [
                  "enum.AnomalyVisualLayers.Animated"
                ],
                "visible": false
              }
            ]
          },
          {
            "type": "PointLight",
            "radius": 2,
            "energy": 2.5,
            "color": "#befaff",
            "castShadows": false
          },
          {
            "type": "Anomaly",
            "corePrototype": "AnomalyCoreIce",
            "coreInertPrototype": "AnomalyCoreIceInert",
            "supercriticalSoundAtAnimationStart": {
              "collection": "AnomalyIceSupercritical"
            }
          },
          {
            "type": "ExplosionAnomaly",
            "supercriticalExplosion": "Cryo",
            "explosionTotalIntensity": 300,
            "explosionDropoff": 2,
            "explosionMaxTileIntensity": 20
          },
          {
            "type": "ProjectileAnomaly",
            "projectilePrototype": "ProjectileIcicle"
          },
          {
            "type": "EntitySpawnAnomaly",
            "entries": [
              {
                "settings": {
                  "spawnOnStabilityChanged": true,
                  "minAmount": 5,
                  "maxAmount": 15,
                  "maxRange": 4
                },
                "spawns": [
                  "IceCrust"
                ]
              }
            ]
          },
          {
            "type": "TempAffectingAnomaly",
            "tempChangePerSecond": -25,
            "hotspotExposeTemperature": -1000
          },
          {
            "type": "GasProducerAnomaly",
            "releasedGas": 8,
            "releaseOnMaxSeverity": true,
            "spawnRadius": 0
          },
          {
            "type": "DamageOnInteract",
            "damage": {
              "types": {
                "Cold": 10
              }
            },
            "popupText": "anomaly-component-contact-damage"
          },
          {
            "type": "DamageOnAttacked",
            "damage": {
              "types": {
                "Cold": 10
              }
            }
          }
        ]
      },
      "components": [
        {
          "type": "Anomaly",
          "offset": "0, 0.15",
          "pulseSound": {
            "collection": "RadiationPulse",
            "params": {
              "volume": 5
            }
          },
          "pulseRun": true,
          "corePrototype": "AnomalyCoreIce",
          "coreInertPrototype": "AnomalyCoreIceInert",
          "supercriticalSoundAtAnimationStart": {
            "collection": "AnomalyIceSupercritical"
          }
        },
        {
          "type": "AmbientSound",
          "range": 5,
          "volume": -5,
          "sound": {
            "path": "/Audio/Ambience/anomaly_drone.ogg"
          }
        },
        {
          "type": "Transform",
          "anchored": false
        },
        {
          "type": "Physics",
          "bodyType": "Dynamic",
          "bodyStatus": "InAir"
        },
        {
          "type": "Fixtures",
          "fixtures": {
            "fix1": {
              "shape": {
                "radius": 0.35
              },
              "density": 50,
              "mask": [
                "FlyingMobMask"
              ],
              "layer": [
                "FlyingMobLayer"
              ]
            }
          }
        },
        {
          "type": "Sprite",
          "noRot": true,
          "drawdepth": "Effects",
          "sprite": "Structures/Specific/Anomalies/ice_anom.rsi",
          "layers": [
            {
              "state": "anom",
              "map": [
                "enum.AnomalyVisualLayers.Base"
              ]
            },
            {
              "state": "pulse",
              "map": [
                "enum.AnomalyVisualLayers.Animated"
              ],
              "visible": false
            }
          ]
        },
        {
          "type": "InteractionOutline"
        },
        {
          "type": "Clickable"
        },
        {
          "type": "Damageable"
        },
        {
          "type": "Appearance"
        },
        {
          "type": "AnimationPlayer"
        },
        {
          "type": "GuideHelp",
          "guides": [
            "AnomalousResearch"
          ]
        },
        {
          "type": "EmitSoundOnSpawn",
          "sound": {
            "path": "/Audio/Effects/teleport_arrival.ogg"
          }
        },
        {
          "type": "RadiationSource",
          "intensity": 4,
          "slope": 0.7
        },
        {
          "type": "RandomWalk",
          "minSpeed": 0,
          "maxSpeed": 0
        },
        {
          "type": "SecretDataAnomaly",
          "randomStartSecretMin": 0,
          "randomStartSecretMax": 2
        },
        {
          "type": "WarpPoint",
          "follow": true,
          "location": "anomaly"
        },
        {
          "type": "DamageOnInteract",
          "damage": {
            "types": {
              "Cold": 10
            }
          },
          "popupText": "anomaly-component-contact-damage"
        },
        {
          "type": "DamageOnAttacked",
          "damage": {
            "types": {
              "Cold": 10
            }
          }
        },
        {
          "type": "PointLight",
          "radius": 2,
          "energy": 2.5,
          "color": "#befaff",
          "castShadows": false
        },
        {
          "type": "ExplosionAnomaly",
          "supercriticalExplosion": "Cryo",
          "explosionTotalIntensity": 300,
          "explosionDropoff": 2,
          "explosionMaxTileIntensity": 20
        },
        {
          "type": "ProjectileAnomaly",
          "projectilePrototype": "ProjectileIcicle"
        },
        {
          "type": "EntitySpawnAnomaly",
          "entries": [
            {
              "settings": {
                "spawnOnStabilityChanged": true,
                "minAmount": 5,
                "maxAmount": 15,
                "maxRange": 4
              },
              "spawns": [
                "IceCrust"
              ]
            }
          ]
        },
        {
          "type": "TempAffectingAnomaly",
          "tempChangePerSecond": -25,
          "hotspotExposeTemperature": -1000
        },
        {
          "type": "GasProducerAnomaly",
          "releasedGas": 8,
          "releaseOnMaxSeverity": true,
          "spawnRadius": 0
        }
      ]
    },
    {
      "id": "AnomalyRockUranium",
      "name": "Каменная · уран",
      "family": "Каменная",
      "effect": "Меняет пол, создаёт породу, кристаллы и рудные варианты; среди созданного могут быть крабы.",
      "critical": "Большое количество породы, кристаллов и рудных крабов.",
      "advice": "Не застраивайте путь отхода оборудованием. Подготовьте инструмент для расчистки и прикрытие от существ.",
      "source": "Resources/Prototypes/Entities/Structures/Specific/Anomaly/anomalies.yml",
      "core": "AnomalyCoreRock",
      "raw": {
        "type": "entity",
        "id": "AnomalyRockUranium",
        "parent": "AnomalyRockBase",
        "suffix": "Rock, Uranium",
        "components": [
          {
            "type": "Sprite",
            "color": "#52ff39"
          },
          {
            "type": "PointLight",
            "radius": 2,
            "energy": 7.5,
            "color": "#52ff39"
          },
          {
            "type": "EntitySpawnAnomaly",
            "entries": [
              {
                "settings": {
                  "spawnOnPulse": true,
                  "minAmount": 8,
                  "maxAmount": 15,
                  "minRange": 4.5,
                  "maxRange": 7.5
                },
                "spawns": [
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroidUranium",
                  "WallSpawnAsteroidUraniumCrab"
                ]
              },
              {
                "settings": {
                  "spawnOnPulse": true,
                  "maxAmount": 3,
                  "minRange": 2.5,
                  "maxRange": 4.5
                },
                "spawns": [
                  "CrystalGreen"
                ]
              },
              {
                "settings": {
                  "spawnOnSuperCritical": true,
                  "minAmount": 30,
                  "maxAmount": 40,
                  "minRange": 5,
                  "maxRange": 15
                },
                "spawns": [
                  "CrystalGreen",
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroidUraniumCrab"
                ]
              },
              {
                "settings": {
                  "spawnOnSuperCritical": true,
                  "minAmount": 6,
                  "maxAmount": 10,
                  "maxRange": 5
                },
                "spawns": [
                  "MobSpawnCrabUranium"
                ]
              }
            ]
          }
        ]
      },
      "components": [
        {
          "type": "Anomaly",
          "offset": "0, 0.15",
          "pulseSound": {
            "collection": "RadiationPulse",
            "params": {
              "volume": 5
            }
          },
          "pulseRun": true,
          "corePrototype": "AnomalyCoreRock",
          "coreInertPrototype": "AnomalyCoreRockInert",
          "minPulseLength": 180,
          "maxPulseLength": 300,
          "supercriticalSoundAtAnimationStart": {
            "collection": "AnomalyRockSupercritical"
          }
        },
        {
          "type": "AmbientSound",
          "range": 5,
          "volume": -5,
          "sound": {
            "path": "/Audio/Ambience/anomaly_drone.ogg"
          }
        },
        {
          "type": "Transform",
          "anchored": false
        },
        {
          "type": "Physics",
          "bodyType": "Dynamic",
          "bodyStatus": "InAir"
        },
        {
          "type": "Fixtures",
          "fixtures": {
            "fix1": {
              "shape": {
                "radius": 0.35
              },
              "density": 50,
              "mask": [
                "FlyingMobMask"
              ],
              "layer": [
                "FlyingMobLayer"
              ]
            }
          }
        },
        {
          "type": "Sprite",
          "noRot": true,
          "drawdepth": "Effects",
          "sprite": "Structures/Specific/anomaly.rsi",
          "layers": [
            {
              "state": "anom6",
              "map": [
                "enum.AnomalyVisualLayers.Base"
              ]
            },
            {
              "state": "anom6-pulse",
              "map": [
                "enum.AnomalyVisualLayers.Animated"
              ],
              "visible": false
            }
          ],
          "color": "#52ff39"
        },
        {
          "type": "InteractionOutline"
        },
        {
          "type": "Clickable"
        },
        {
          "type": "Damageable"
        },
        {
          "type": "Appearance"
        },
        {
          "type": "AnimationPlayer"
        },
        {
          "type": "GuideHelp",
          "guides": [
            "AnomalousResearch"
          ]
        },
        {
          "type": "EmitSoundOnSpawn",
          "sound": {
            "path": "/Audio/Effects/teleport_arrival.ogg"
          }
        },
        {
          "type": "RadiationSource",
          "intensity": 4,
          "slope": 0.7
        },
        {
          "type": "RandomWalk",
          "minSpeed": 0,
          "maxSpeed": 0
        },
        {
          "type": "SecretDataAnomaly",
          "randomStartSecretMin": 0,
          "randomStartSecretMax": 2
        },
        {
          "type": "WarpPoint",
          "follow": true,
          "location": "anomaly"
        },
        {
          "type": "DamageOnInteract",
          "damage": {
            "types": {
              "Radiation": 10
            }
          },
          "popupText": "anomaly-component-contact-damage"
        },
        {
          "type": "DamageOnAttacked",
          "damage": {
            "types": {
              "Radiation": 10
            }
          }
        },
        {
          "type": "PointLight",
          "radius": 2,
          "energy": 7.5,
          "color": "#52ff39",
          "castShadows": false
        },
        {
          "type": "TileSpawnAnomaly",
          "entries": [
            {
              "settings": {
                "spawnOnPulse": true,
                "minAmount": 15,
                "maxAmount": 20,
                "maxRange": 7.5
              },
              "floor": "FloorAsteroidTile"
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 30,
                "maxAmount": 50,
                "maxRange": 12
              },
              "floor": "FloorAsteroidTile"
            }
          ]
        },
        {
          "type": "EntitySpawnAnomaly",
          "entries": [
            {
              "settings": {
                "spawnOnPulse": true,
                "minAmount": 8,
                "maxAmount": 15,
                "minRange": 4.5,
                "maxRange": 7.5
              },
              "spawns": [
                "WallSpawnAsteroid",
                "WallSpawnAsteroid",
                "WallSpawnAsteroidUranium",
                "WallSpawnAsteroidUraniumCrab"
              ]
            },
            {
              "settings": {
                "spawnOnPulse": true,
                "maxAmount": 3,
                "minRange": 2.5,
                "maxRange": 4.5
              },
              "spawns": [
                "CrystalGreen"
              ]
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 30,
                "maxAmount": 40,
                "minRange": 5,
                "maxRange": 15
              },
              "spawns": [
                "CrystalGreen",
                "WallSpawnAsteroid",
                "WallSpawnAsteroid",
                "WallSpawnAsteroidUraniumCrab"
              ]
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 6,
                "maxAmount": 10,
                "maxRange": 5
              },
              "spawns": [
                "MobSpawnCrabUranium"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "AnomalyRockBananium",
      "name": "Каменная · бананиум",
      "family": "Каменная",
      "effect": "Меняет пол, создаёт породу, кристаллы и рудные варианты; среди созданного могут быть крабы.",
      "critical": "Большое количество породы, кристаллов и рудных крабов.",
      "advice": "Не застраивайте путь отхода оборудованием. Подготовьте инструмент для расчистки и прикрытие от существ.",
      "source": "Resources/Prototypes/Entities/Structures/Specific/Anomaly/anomalies.yml",
      "core": "AnomalyCoreRock",
      "raw": {
        "type": "entity",
        "id": "AnomalyRockBananium",
        "parent": "AnomalyRockBase",
        "suffix": "Rock, Bananium",
        "components": [
          {
            "type": "Sprite",
            "color": "#ddde40"
          },
          {
            "type": "PointLight",
            "radius": 2,
            "energy": 7.5,
            "color": "#ddde40"
          },
          {
            "type": "EntitySpawnAnomaly",
            "entries": [
              {
                "settings": {
                  "spawnOnPulse": true,
                  "minAmount": 8,
                  "maxAmount": 15,
                  "minRange": 4.5,
                  "maxRange": 7.5
                },
                "spawns": [
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroidBananium",
                  "WallSpawnAsteroidBananiumCrab"
                ]
              },
              {
                "settings": {
                  "spawnOnPulse": true,
                  "maxAmount": 3,
                  "minRange": 2.5,
                  "maxRange": 4.5
                },
                "spawns": [
                  "CrystalYellow"
                ]
              },
              {
                "settings": {
                  "spawnOnSuperCritical": true,
                  "minAmount": 30,
                  "maxAmount": 40,
                  "minRange": 5,
                  "maxRange": 15
                },
                "spawns": [
                  "CrystalYellow",
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroidBananiumCrab"
                ]
              },
              {
                "settings": {
                  "spawnOnSuperCritical": true,
                  "minAmount": 3,
                  "maxAmount": 6,
                  "maxRange": 5
                },
                "spawns": [
                  "MobSpawnCrabBananium"
                ]
              }
            ]
          }
        ]
      },
      "components": [
        {
          "type": "Anomaly",
          "offset": "0, 0.15",
          "pulseSound": {
            "collection": "RadiationPulse",
            "params": {
              "volume": 5
            }
          },
          "pulseRun": true,
          "corePrototype": "AnomalyCoreRock",
          "coreInertPrototype": "AnomalyCoreRockInert",
          "minPulseLength": 180,
          "maxPulseLength": 300,
          "supercriticalSoundAtAnimationStart": {
            "collection": "AnomalyRockSupercritical"
          }
        },
        {
          "type": "AmbientSound",
          "range": 5,
          "volume": -5,
          "sound": {
            "path": "/Audio/Ambience/anomaly_drone.ogg"
          }
        },
        {
          "type": "Transform",
          "anchored": false
        },
        {
          "type": "Physics",
          "bodyType": "Dynamic",
          "bodyStatus": "InAir"
        },
        {
          "type": "Fixtures",
          "fixtures": {
            "fix1": {
              "shape": {
                "radius": 0.35
              },
              "density": 50,
              "mask": [
                "FlyingMobMask"
              ],
              "layer": [
                "FlyingMobLayer"
              ]
            }
          }
        },
        {
          "type": "Sprite",
          "noRot": true,
          "drawdepth": "Effects",
          "sprite": "Structures/Specific/anomaly.rsi",
          "layers": [
            {
              "state": "anom6",
              "map": [
                "enum.AnomalyVisualLayers.Base"
              ]
            },
            {
              "state": "anom6-pulse",
              "map": [
                "enum.AnomalyVisualLayers.Animated"
              ],
              "visible": false
            }
          ],
          "color": "#ddde40"
        },
        {
          "type": "InteractionOutline"
        },
        {
          "type": "Clickable"
        },
        {
          "type": "Damageable"
        },
        {
          "type": "Appearance"
        },
        {
          "type": "AnimationPlayer"
        },
        {
          "type": "GuideHelp",
          "guides": [
            "AnomalousResearch"
          ]
        },
        {
          "type": "EmitSoundOnSpawn",
          "sound": {
            "path": "/Audio/Effects/teleport_arrival.ogg"
          }
        },
        {
          "type": "RadiationSource",
          "intensity": 4,
          "slope": 0.7
        },
        {
          "type": "RandomWalk",
          "minSpeed": 0,
          "maxSpeed": 0
        },
        {
          "type": "SecretDataAnomaly",
          "randomStartSecretMin": 0,
          "randomStartSecretMax": 2
        },
        {
          "type": "WarpPoint",
          "follow": true,
          "location": "anomaly"
        },
        {
          "type": "DamageOnInteract",
          "damage": {
            "types": {
              "Radiation": 10
            }
          },
          "popupText": "anomaly-component-contact-damage"
        },
        {
          "type": "DamageOnAttacked",
          "damage": {
            "types": {
              "Radiation": 10
            }
          }
        },
        {
          "type": "PointLight",
          "radius": 2,
          "energy": 7.5,
          "color": "#ddde40",
          "castShadows": false
        },
        {
          "type": "TileSpawnAnomaly",
          "entries": [
            {
              "settings": {
                "spawnOnPulse": true,
                "minAmount": 15,
                "maxAmount": 20,
                "maxRange": 7.5
              },
              "floor": "FloorAsteroidTile"
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 30,
                "maxAmount": 50,
                "maxRange": 12
              },
              "floor": "FloorAsteroidTile"
            }
          ]
        },
        {
          "type": "EntitySpawnAnomaly",
          "entries": [
            {
              "settings": {
                "spawnOnPulse": true,
                "minAmount": 8,
                "maxAmount": 15,
                "minRange": 4.5,
                "maxRange": 7.5
              },
              "spawns": [
                "WallSpawnAsteroid",
                "WallSpawnAsteroid",
                "WallSpawnAsteroidBananium",
                "WallSpawnAsteroidBananiumCrab"
              ]
            },
            {
              "settings": {
                "spawnOnPulse": true,
                "maxAmount": 3,
                "minRange": 2.5,
                "maxRange": 4.5
              },
              "spawns": [
                "CrystalYellow"
              ]
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 30,
                "maxAmount": 40,
                "minRange": 5,
                "maxRange": 15
              },
              "spawns": [
                "CrystalYellow",
                "WallSpawnAsteroid",
                "WallSpawnAsteroid",
                "WallSpawnAsteroidBananiumCrab"
              ]
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 3,
                "maxAmount": 6,
                "maxRange": 5
              },
              "spawns": [
                "MobSpawnCrabBananium"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "AnomalyRockQuartz",
      "name": "Каменная · кварц",
      "family": "Каменная",
      "effect": "Меняет пол, создаёт породу, кристаллы и рудные варианты; среди созданного могут быть крабы.",
      "critical": "Большое количество породы, кристаллов и рудных крабов.",
      "advice": "Не застраивайте путь отхода оборудованием. Подготовьте инструмент для расчистки и прикрытие от существ.",
      "source": "Resources/Prototypes/Entities/Structures/Specific/Anomaly/anomalies.yml",
      "core": "AnomalyCoreRock",
      "raw": {
        "type": "entity",
        "id": "AnomalyRockQuartz",
        "parent": "AnomalyRockBase",
        "suffix": "Rock, Quartz",
        "components": [
          {
            "type": "Sprite",
            "color": "#fb4747"
          },
          {
            "type": "PointLight",
            "radius": 2,
            "energy": 7.5,
            "color": "#fb4747"
          },
          {
            "type": "EntitySpawnAnomaly",
            "entries": [
              {
                "settings": {
                  "spawnOnPulse": true,
                  "minAmount": 8,
                  "maxAmount": 15,
                  "minRange": 4.5,
                  "maxRange": 7.5
                },
                "spawns": [
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroidQuartz",
                  "WallSpawnAsteroidQuartzCrab"
                ]
              },
              {
                "settings": {
                  "spawnOnPulse": true,
                  "maxAmount": 3,
                  "minRange": 2.5,
                  "maxRange": 4.5
                },
                "spawns": [
                  "CrystalGrey"
                ]
              },
              {
                "settings": {
                  "spawnOnSuperCritical": true,
                  "minAmount": 30,
                  "maxAmount": 40,
                  "minRange": 5,
                  "maxRange": 15
                },
                "spawns": [
                  "CrystalGrey",
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroidQuartzCrab"
                ]
              },
              {
                "settings": {
                  "spawnOnSuperCritical": true,
                  "minAmount": 6,
                  "maxAmount": 10,
                  "maxRange": 5
                },
                "spawns": [
                  "MobSpawnCrabQuartz"
                ]
              }
            ]
          }
        ]
      },
      "components": [
        {
          "type": "Anomaly",
          "offset": "0, 0.15",
          "pulseSound": {
            "collection": "RadiationPulse",
            "params": {
              "volume": 5
            }
          },
          "pulseRun": true,
          "corePrototype": "AnomalyCoreRock",
          "coreInertPrototype": "AnomalyCoreRockInert",
          "minPulseLength": 180,
          "maxPulseLength": 300,
          "supercriticalSoundAtAnimationStart": {
            "collection": "AnomalyRockSupercritical"
          }
        },
        {
          "type": "AmbientSound",
          "range": 5,
          "volume": -5,
          "sound": {
            "path": "/Audio/Ambience/anomaly_drone.ogg"
          }
        },
        {
          "type": "Transform",
          "anchored": false
        },
        {
          "type": "Physics",
          "bodyType": "Dynamic",
          "bodyStatus": "InAir"
        },
        {
          "type": "Fixtures",
          "fixtures": {
            "fix1": {
              "shape": {
                "radius": 0.35
              },
              "density": 50,
              "mask": [
                "FlyingMobMask"
              ],
              "layer": [
                "FlyingMobLayer"
              ]
            }
          }
        },
        {
          "type": "Sprite",
          "noRot": true,
          "drawdepth": "Effects",
          "sprite": "Structures/Specific/anomaly.rsi",
          "layers": [
            {
              "state": "anom6",
              "map": [
                "enum.AnomalyVisualLayers.Base"
              ]
            },
            {
              "state": "anom6-pulse",
              "map": [
                "enum.AnomalyVisualLayers.Animated"
              ],
              "visible": false
            }
          ],
          "color": "#fb4747"
        },
        {
          "type": "InteractionOutline"
        },
        {
          "type": "Clickable"
        },
        {
          "type": "Damageable"
        },
        {
          "type": "Appearance"
        },
        {
          "type": "AnimationPlayer"
        },
        {
          "type": "GuideHelp",
          "guides": [
            "AnomalousResearch"
          ]
        },
        {
          "type": "EmitSoundOnSpawn",
          "sound": {
            "path": "/Audio/Effects/teleport_arrival.ogg"
          }
        },
        {
          "type": "RadiationSource",
          "intensity": 4,
          "slope": 0.7
        },
        {
          "type": "RandomWalk",
          "minSpeed": 0,
          "maxSpeed": 0
        },
        {
          "type": "SecretDataAnomaly",
          "randomStartSecretMin": 0,
          "randomStartSecretMax": 2
        },
        {
          "type": "WarpPoint",
          "follow": true,
          "location": "anomaly"
        },
        {
          "type": "DamageOnInteract",
          "damage": {
            "types": {
              "Radiation": 10
            }
          },
          "popupText": "anomaly-component-contact-damage"
        },
        {
          "type": "DamageOnAttacked",
          "damage": {
            "types": {
              "Radiation": 10
            }
          }
        },
        {
          "type": "PointLight",
          "radius": 2,
          "energy": 7.5,
          "color": "#fb4747",
          "castShadows": false
        },
        {
          "type": "TileSpawnAnomaly",
          "entries": [
            {
              "settings": {
                "spawnOnPulse": true,
                "minAmount": 15,
                "maxAmount": 20,
                "maxRange": 7.5
              },
              "floor": "FloorAsteroidTile"
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 30,
                "maxAmount": 50,
                "maxRange": 12
              },
              "floor": "FloorAsteroidTile"
            }
          ]
        },
        {
          "type": "EntitySpawnAnomaly",
          "entries": [
            {
              "settings": {
                "spawnOnPulse": true,
                "minAmount": 8,
                "maxAmount": 15,
                "minRange": 4.5,
                "maxRange": 7.5
              },
              "spawns": [
                "WallSpawnAsteroid",
                "WallSpawnAsteroid",
                "WallSpawnAsteroidQuartz",
                "WallSpawnAsteroidQuartzCrab"
              ]
            },
            {
              "settings": {
                "spawnOnPulse": true,
                "maxAmount": 3,
                "minRange": 2.5,
                "maxRange": 4.5
              },
              "spawns": [
                "CrystalGrey"
              ]
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 30,
                "maxAmount": 40,
                "minRange": 5,
                "maxRange": 15
              },
              "spawns": [
                "CrystalGrey",
                "WallSpawnAsteroid",
                "WallSpawnAsteroid",
                "WallSpawnAsteroidQuartzCrab"
              ]
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 6,
                "maxAmount": 10,
                "maxRange": 5
              },
              "spawns": [
                "MobSpawnCrabQuartz"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "AnomalyRockSilver",
      "name": "Каменная · серебро",
      "family": "Каменная",
      "effect": "Меняет пол, создаёт породу, кристаллы и рудные варианты; среди созданного могут быть крабы.",
      "critical": "Большое количество породы, кристаллов и рудных крабов.",
      "advice": "Не застраивайте путь отхода оборудованием. Подготовьте инструмент для расчистки и прикрытие от существ.",
      "source": "Resources/Prototypes/Entities/Structures/Specific/Anomaly/anomalies.yml",
      "core": "AnomalyCoreRock",
      "raw": {
        "type": "entity",
        "id": "AnomalyRockSilver",
        "parent": "AnomalyRockBase",
        "suffix": "Rock, Silver",
        "components": [
          {
            "type": "Sprite",
            "color": "#47f8ff"
          },
          {
            "type": "PointLight",
            "radius": 2,
            "energy": 7.5,
            "color": "#47f8ff"
          },
          {
            "type": "EntitySpawnAnomaly",
            "entries": [
              {
                "settings": {
                  "spawnOnPulse": true,
                  "minAmount": 8,
                  "maxAmount": 15,
                  "minRange": 4.5,
                  "maxRange": 7.5
                },
                "spawns": [
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroidSilver",
                  "WallSpawnAsteroidSilverCrab"
                ]
              },
              {
                "settings": {
                  "spawnOnPulse": true,
                  "maxAmount": 3,
                  "minRange": 2.5,
                  "maxRange": 4.5
                },
                "spawns": [
                  "CrystalCyan"
                ]
              },
              {
                "settings": {
                  "spawnOnSuperCritical": true,
                  "minAmount": 30,
                  "maxAmount": 40,
                  "minRange": 5,
                  "maxRange": 15
                },
                "spawns": [
                  "CrystalCyan",
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroidSilverCrab"
                ]
              },
              {
                "settings": {
                  "spawnOnSuperCritical": true,
                  "minAmount": 6,
                  "maxAmount": 10,
                  "maxRange": 5
                },
                "spawns": [
                  "MobSpawnCrabSilver"
                ]
              }
            ]
          }
        ]
      },
      "components": [
        {
          "type": "Anomaly",
          "offset": "0, 0.15",
          "pulseSound": {
            "collection": "RadiationPulse",
            "params": {
              "volume": 5
            }
          },
          "pulseRun": true,
          "corePrototype": "AnomalyCoreRock",
          "coreInertPrototype": "AnomalyCoreRockInert",
          "minPulseLength": 180,
          "maxPulseLength": 300,
          "supercriticalSoundAtAnimationStart": {
            "collection": "AnomalyRockSupercritical"
          }
        },
        {
          "type": "AmbientSound",
          "range": 5,
          "volume": -5,
          "sound": {
            "path": "/Audio/Ambience/anomaly_drone.ogg"
          }
        },
        {
          "type": "Transform",
          "anchored": false
        },
        {
          "type": "Physics",
          "bodyType": "Dynamic",
          "bodyStatus": "InAir"
        },
        {
          "type": "Fixtures",
          "fixtures": {
            "fix1": {
              "shape": {
                "radius": 0.35
              },
              "density": 50,
              "mask": [
                "FlyingMobMask"
              ],
              "layer": [
                "FlyingMobLayer"
              ]
            }
          }
        },
        {
          "type": "Sprite",
          "noRot": true,
          "drawdepth": "Effects",
          "sprite": "Structures/Specific/anomaly.rsi",
          "layers": [
            {
              "state": "anom6",
              "map": [
                "enum.AnomalyVisualLayers.Base"
              ]
            },
            {
              "state": "anom6-pulse",
              "map": [
                "enum.AnomalyVisualLayers.Animated"
              ],
              "visible": false
            }
          ],
          "color": "#47f8ff"
        },
        {
          "type": "InteractionOutline"
        },
        {
          "type": "Clickable"
        },
        {
          "type": "Damageable"
        },
        {
          "type": "Appearance"
        },
        {
          "type": "AnimationPlayer"
        },
        {
          "type": "GuideHelp",
          "guides": [
            "AnomalousResearch"
          ]
        },
        {
          "type": "EmitSoundOnSpawn",
          "sound": {
            "path": "/Audio/Effects/teleport_arrival.ogg"
          }
        },
        {
          "type": "RadiationSource",
          "intensity": 4,
          "slope": 0.7
        },
        {
          "type": "RandomWalk",
          "minSpeed": 0,
          "maxSpeed": 0
        },
        {
          "type": "SecretDataAnomaly",
          "randomStartSecretMin": 0,
          "randomStartSecretMax": 2
        },
        {
          "type": "WarpPoint",
          "follow": true,
          "location": "anomaly"
        },
        {
          "type": "DamageOnInteract",
          "damage": {
            "types": {
              "Radiation": 10
            }
          },
          "popupText": "anomaly-component-contact-damage"
        },
        {
          "type": "DamageOnAttacked",
          "damage": {
            "types": {
              "Radiation": 10
            }
          }
        },
        {
          "type": "PointLight",
          "radius": 2,
          "energy": 7.5,
          "color": "#47f8ff",
          "castShadows": false
        },
        {
          "type": "TileSpawnAnomaly",
          "entries": [
            {
              "settings": {
                "spawnOnPulse": true,
                "minAmount": 15,
                "maxAmount": 20,
                "maxRange": 7.5
              },
              "floor": "FloorAsteroidTile"
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 30,
                "maxAmount": 50,
                "maxRange": 12
              },
              "floor": "FloorAsteroidTile"
            }
          ]
        },
        {
          "type": "EntitySpawnAnomaly",
          "entries": [
            {
              "settings": {
                "spawnOnPulse": true,
                "minAmount": 8,
                "maxAmount": 15,
                "minRange": 4.5,
                "maxRange": 7.5
              },
              "spawns": [
                "WallSpawnAsteroid",
                "WallSpawnAsteroid",
                "WallSpawnAsteroidSilver",
                "WallSpawnAsteroidSilverCrab"
              ]
            },
            {
              "settings": {
                "spawnOnPulse": true,
                "maxAmount": 3,
                "minRange": 2.5,
                "maxRange": 4.5
              },
              "spawns": [
                "CrystalCyan"
              ]
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 30,
                "maxAmount": 40,
                "minRange": 5,
                "maxRange": 15
              },
              "spawns": [
                "CrystalCyan",
                "WallSpawnAsteroid",
                "WallSpawnAsteroid",
                "WallSpawnAsteroidSilverCrab"
              ]
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 6,
                "maxAmount": 10,
                "maxRange": 5
              },
              "spawns": [
                "MobSpawnCrabSilver"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "AnomalyRockGold",
      "name": "Каменная · золото",
      "family": "Каменная",
      "effect": "Меняет пол, создаёт породу, кристаллы и рудные варианты; среди созданного могут быть крабы.",
      "critical": "Большое количество породы, кристаллов и рудных крабов.",
      "advice": "Не застраивайте путь отхода оборудованием. Подготовьте инструмент для расчистки и прикрытие от существ.",
      "source": "Resources/Prototypes/Entities/Structures/Specific/Anomaly/anomalies.yml",
      "core": "AnomalyCoreRock",
      "raw": {
        "type": "entity",
        "id": "AnomalyRockGold",
        "parent": "AnomalyRockBase",
        "suffix": "Rock, Gold",
        "components": [
          {
            "type": "Sprite",
            "color": "#e3ba70"
          },
          {
            "type": "PointLight",
            "radius": 2,
            "energy": 7.5,
            "color": "#e3ba70"
          },
          {
            "type": "EntitySpawnAnomaly",
            "entries": [
              {
                "settings": {
                  "spawnOnPulse": true,
                  "minAmount": 8,
                  "maxAmount": 15,
                  "minRange": 4.5,
                  "maxRange": 7.5
                },
                "spawns": [
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroidGold",
                  "WallSpawnAsteroidGoldCrab"
                ]
              },
              {
                "settings": {
                  "spawnOnPulse": true,
                  "maxAmount": 3,
                  "minRange": 2.5,
                  "maxRange": 4.5
                },
                "spawns": [
                  "CrystalYellow"
                ]
              },
              {
                "settings": {
                  "spawnOnSuperCritical": true,
                  "minAmount": 30,
                  "maxAmount": 40,
                  "minRange": 5,
                  "maxRange": 15
                },
                "spawns": [
                  "CrystalYellow",
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroidGoldCrab"
                ]
              },
              {
                "settings": {
                  "spawnOnSuperCritical": true,
                  "minAmount": 6,
                  "maxAmount": 10,
                  "maxRange": 5
                },
                "spawns": [
                  "MobSpawnCrabGold"
                ]
              }
            ]
          }
        ]
      },
      "components": [
        {
          "type": "Anomaly",
          "offset": "0, 0.15",
          "pulseSound": {
            "collection": "RadiationPulse",
            "params": {
              "volume": 5
            }
          },
          "pulseRun": true,
          "corePrototype": "AnomalyCoreRock",
          "coreInertPrototype": "AnomalyCoreRockInert",
          "minPulseLength": 180,
          "maxPulseLength": 300,
          "supercriticalSoundAtAnimationStart": {
            "collection": "AnomalyRockSupercritical"
          }
        },
        {
          "type": "AmbientSound",
          "range": 5,
          "volume": -5,
          "sound": {
            "path": "/Audio/Ambience/anomaly_drone.ogg"
          }
        },
        {
          "type": "Transform",
          "anchored": false
        },
        {
          "type": "Physics",
          "bodyType": "Dynamic",
          "bodyStatus": "InAir"
        },
        {
          "type": "Fixtures",
          "fixtures": {
            "fix1": {
              "shape": {
                "radius": 0.35
              },
              "density": 50,
              "mask": [
                "FlyingMobMask"
              ],
              "layer": [
                "FlyingMobLayer"
              ]
            }
          }
        },
        {
          "type": "Sprite",
          "noRot": true,
          "drawdepth": "Effects",
          "sprite": "Structures/Specific/anomaly.rsi",
          "layers": [
            {
              "state": "anom6",
              "map": [
                "enum.AnomalyVisualLayers.Base"
              ]
            },
            {
              "state": "anom6-pulse",
              "map": [
                "enum.AnomalyVisualLayers.Animated"
              ],
              "visible": false
            }
          ],
          "color": "#e3ba70"
        },
        {
          "type": "InteractionOutline"
        },
        {
          "type": "Clickable"
        },
        {
          "type": "Damageable"
        },
        {
          "type": "Appearance"
        },
        {
          "type": "AnimationPlayer"
        },
        {
          "type": "GuideHelp",
          "guides": [
            "AnomalousResearch"
          ]
        },
        {
          "type": "EmitSoundOnSpawn",
          "sound": {
            "path": "/Audio/Effects/teleport_arrival.ogg"
          }
        },
        {
          "type": "RadiationSource",
          "intensity": 4,
          "slope": 0.7
        },
        {
          "type": "RandomWalk",
          "minSpeed": 0,
          "maxSpeed": 0
        },
        {
          "type": "SecretDataAnomaly",
          "randomStartSecretMin": 0,
          "randomStartSecretMax": 2
        },
        {
          "type": "WarpPoint",
          "follow": true,
          "location": "anomaly"
        },
        {
          "type": "DamageOnInteract",
          "damage": {
            "types": {
              "Radiation": 10
            }
          },
          "popupText": "anomaly-component-contact-damage"
        },
        {
          "type": "DamageOnAttacked",
          "damage": {
            "types": {
              "Radiation": 10
            }
          }
        },
        {
          "type": "PointLight",
          "radius": 2,
          "energy": 7.5,
          "color": "#e3ba70",
          "castShadows": false
        },
        {
          "type": "TileSpawnAnomaly",
          "entries": [
            {
              "settings": {
                "spawnOnPulse": true,
                "minAmount": 15,
                "maxAmount": 20,
                "maxRange": 7.5
              },
              "floor": "FloorAsteroidTile"
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 30,
                "maxAmount": 50,
                "maxRange": 12
              },
              "floor": "FloorAsteroidTile"
            }
          ]
        },
        {
          "type": "EntitySpawnAnomaly",
          "entries": [
            {
              "settings": {
                "spawnOnPulse": true,
                "minAmount": 8,
                "maxAmount": 15,
                "minRange": 4.5,
                "maxRange": 7.5
              },
              "spawns": [
                "WallSpawnAsteroid",
                "WallSpawnAsteroid",
                "WallSpawnAsteroidGold",
                "WallSpawnAsteroidGoldCrab"
              ]
            },
            {
              "settings": {
                "spawnOnPulse": true,
                "maxAmount": 3,
                "minRange": 2.5,
                "maxRange": 4.5
              },
              "spawns": [
                "CrystalYellow"
              ]
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 30,
                "maxAmount": 40,
                "minRange": 5,
                "maxRange": 15
              },
              "spawns": [
                "CrystalYellow",
                "WallSpawnAsteroid",
                "WallSpawnAsteroid",
                "WallSpawnAsteroidGoldCrab"
              ]
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 6,
                "maxAmount": 10,
                "maxRange": 5
              },
              "spawns": [
                "MobSpawnCrabGold"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "AnomalyRockIron",
      "name": "Каменная · железо",
      "family": "Каменная",
      "effect": "Меняет пол, создаёт породу, кристаллы и рудные варианты; среди созданного могут быть крабы.",
      "critical": "Большое количество породы, кристаллов и рудных крабов.",
      "advice": "Не застраивайте путь отхода оборудованием. Подготовьте инструмент для расчистки и прикрытие от существ.",
      "source": "Resources/Prototypes/Entities/Structures/Specific/Anomaly/anomalies.yml",
      "core": "AnomalyCoreRock",
      "raw": {
        "type": "entity",
        "id": "AnomalyRockIron",
        "parent": "AnomalyRockBase",
        "suffix": "Rock, Iron",
        "components": [
          {
            "type": "Sprite",
            "color": "#ff8227"
          },
          {
            "type": "PointLight",
            "radius": 2,
            "energy": 7.5,
            "color": "#ff8227"
          },
          {
            "type": "EntitySpawnAnomaly",
            "entries": [
              {
                "settings": {
                  "spawnOnPulse": true,
                  "minAmount": 8,
                  "maxAmount": 15,
                  "minRange": 4.5,
                  "maxRange": 7.5
                },
                "spawns": [
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroidIron",
                  "WallSpawnAsteroidIronCrab"
                ]
              },
              {
                "settings": {
                  "spawnOnPulse": true,
                  "maxAmount": 3,
                  "minRange": 2.5,
                  "maxRange": 4.5
                },
                "spawns": [
                  "CrystalOrange"
                ]
              },
              {
                "settings": {
                  "spawnOnSuperCritical": true,
                  "minAmount": 30,
                  "maxAmount": 40,
                  "minRange": 5,
                  "maxRange": 15
                },
                "spawns": [
                  "CrystalOrange",
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroidIronCrab"
                ]
              },
              {
                "settings": {
                  "spawnOnSuperCritical": true,
                  "minAmount": 6,
                  "maxAmount": 10,
                  "maxRange": 5
                },
                "spawns": [
                  "MobSpawnCrabIron"
                ]
              }
            ]
          }
        ]
      },
      "components": [
        {
          "type": "Anomaly",
          "offset": "0, 0.15",
          "pulseSound": {
            "collection": "RadiationPulse",
            "params": {
              "volume": 5
            }
          },
          "pulseRun": true,
          "corePrototype": "AnomalyCoreRock",
          "coreInertPrototype": "AnomalyCoreRockInert",
          "minPulseLength": 180,
          "maxPulseLength": 300,
          "supercriticalSoundAtAnimationStart": {
            "collection": "AnomalyRockSupercritical"
          }
        },
        {
          "type": "AmbientSound",
          "range": 5,
          "volume": -5,
          "sound": {
            "path": "/Audio/Ambience/anomaly_drone.ogg"
          }
        },
        {
          "type": "Transform",
          "anchored": false
        },
        {
          "type": "Physics",
          "bodyType": "Dynamic",
          "bodyStatus": "InAir"
        },
        {
          "type": "Fixtures",
          "fixtures": {
            "fix1": {
              "shape": {
                "radius": 0.35
              },
              "density": 50,
              "mask": [
                "FlyingMobMask"
              ],
              "layer": [
                "FlyingMobLayer"
              ]
            }
          }
        },
        {
          "type": "Sprite",
          "noRot": true,
          "drawdepth": "Effects",
          "sprite": "Structures/Specific/anomaly.rsi",
          "layers": [
            {
              "state": "anom6",
              "map": [
                "enum.AnomalyVisualLayers.Base"
              ]
            },
            {
              "state": "anom6-pulse",
              "map": [
                "enum.AnomalyVisualLayers.Animated"
              ],
              "visible": false
            }
          ],
          "color": "#ff8227"
        },
        {
          "type": "InteractionOutline"
        },
        {
          "type": "Clickable"
        },
        {
          "type": "Damageable"
        },
        {
          "type": "Appearance"
        },
        {
          "type": "AnimationPlayer"
        },
        {
          "type": "GuideHelp",
          "guides": [
            "AnomalousResearch"
          ]
        },
        {
          "type": "EmitSoundOnSpawn",
          "sound": {
            "path": "/Audio/Effects/teleport_arrival.ogg"
          }
        },
        {
          "type": "RadiationSource",
          "intensity": 4,
          "slope": 0.7
        },
        {
          "type": "RandomWalk",
          "minSpeed": 0,
          "maxSpeed": 0
        },
        {
          "type": "SecretDataAnomaly",
          "randomStartSecretMin": 0,
          "randomStartSecretMax": 2
        },
        {
          "type": "WarpPoint",
          "follow": true,
          "location": "anomaly"
        },
        {
          "type": "DamageOnInteract",
          "damage": {
            "types": {
              "Radiation": 10
            }
          },
          "popupText": "anomaly-component-contact-damage"
        },
        {
          "type": "DamageOnAttacked",
          "damage": {
            "types": {
              "Radiation": 10
            }
          }
        },
        {
          "type": "PointLight",
          "radius": 2,
          "energy": 7.5,
          "color": "#ff8227",
          "castShadows": false
        },
        {
          "type": "TileSpawnAnomaly",
          "entries": [
            {
              "settings": {
                "spawnOnPulse": true,
                "minAmount": 15,
                "maxAmount": 20,
                "maxRange": 7.5
              },
              "floor": "FloorAsteroidTile"
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 30,
                "maxAmount": 50,
                "maxRange": 12
              },
              "floor": "FloorAsteroidTile"
            }
          ]
        },
        {
          "type": "EntitySpawnAnomaly",
          "entries": [
            {
              "settings": {
                "spawnOnPulse": true,
                "minAmount": 8,
                "maxAmount": 15,
                "minRange": 4.5,
                "maxRange": 7.5
              },
              "spawns": [
                "WallSpawnAsteroid",
                "WallSpawnAsteroid",
                "WallSpawnAsteroidIron",
                "WallSpawnAsteroidIronCrab"
              ]
            },
            {
              "settings": {
                "spawnOnPulse": true,
                "maxAmount": 3,
                "minRange": 2.5,
                "maxRange": 4.5
              },
              "spawns": [
                "CrystalOrange"
              ]
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 30,
                "maxAmount": 40,
                "minRange": 5,
                "maxRange": 15
              },
              "spawns": [
                "CrystalOrange",
                "WallSpawnAsteroid",
                "WallSpawnAsteroid",
                "WallSpawnAsteroidIronCrab"
              ]
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 6,
                "maxAmount": 10,
                "maxRange": 5
              },
              "spawns": [
                "MobSpawnCrabIron"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "AnomalyRockCoal",
      "name": "Каменная · уголь",
      "family": "Каменная",
      "effect": "Меняет пол, создаёт породу, кристаллы и рудные варианты; среди созданного могут быть крабы.",
      "critical": "Большое количество породы, кристаллов и рудных крабов.",
      "advice": "Не застраивайте путь отхода оборудованием. Подготовьте инструмент для расчистки и прикрытие от существ.",
      "source": "Resources/Prototypes/Entities/Structures/Specific/Anomaly/anomalies.yml",
      "core": "AnomalyCoreRock",
      "raw": {
        "type": "entity",
        "id": "AnomalyRockCoal",
        "parent": "AnomalyRockBase",
        "suffix": "Rock, Coal",
        "components": [
          {
            "type": "Sprite",
            "color": "#484848"
          },
          {
            "type": "PointLight",
            "radius": 2,
            "energy": 7.5,
            "color": "#484848"
          },
          {
            "type": "EntitySpawnAnomaly",
            "entries": [
              {
                "settings": {
                  "spawnOnPulse": true,
                  "minAmount": 8,
                  "maxAmount": 15,
                  "minRange": 4.5,
                  "maxRange": 7.5
                },
                "spawns": [
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroidCoal",
                  "WallSpawnAsteroidCoalCrab"
                ]
              },
              {
                "settings": {
                  "spawnOnPulse": true,
                  "maxAmount": 3,
                  "minRange": 2.5,
                  "maxRange": 4.5
                },
                "spawns": [
                  "CrystalBlack"
                ]
              },
              {
                "settings": {
                  "spawnOnSuperCritical": true,
                  "minAmount": 30,
                  "maxAmount": 40,
                  "minRange": 5,
                  "maxRange": 15
                },
                "spawns": [
                  "CrystalBlack",
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroid",
                  "WallSpawnAsteroidCoalCrab"
                ]
              },
              {
                "settings": {
                  "spawnOnSuperCritical": true,
                  "minAmount": 6,
                  "maxAmount": 10,
                  "maxRange": 5
                },
                "spawns": [
                  "MobSpawnCrabCoal"
                ]
              }
            ]
          }
        ]
      },
      "components": [
        {
          "type": "Anomaly",
          "offset": "0, 0.15",
          "pulseSound": {
            "collection": "RadiationPulse",
            "params": {
              "volume": 5
            }
          },
          "pulseRun": true,
          "corePrototype": "AnomalyCoreRock",
          "coreInertPrototype": "AnomalyCoreRockInert",
          "minPulseLength": 180,
          "maxPulseLength": 300,
          "supercriticalSoundAtAnimationStart": {
            "collection": "AnomalyRockSupercritical"
          }
        },
        {
          "type": "AmbientSound",
          "range": 5,
          "volume": -5,
          "sound": {
            "path": "/Audio/Ambience/anomaly_drone.ogg"
          }
        },
        {
          "type": "Transform",
          "anchored": false
        },
        {
          "type": "Physics",
          "bodyType": "Dynamic",
          "bodyStatus": "InAir"
        },
        {
          "type": "Fixtures",
          "fixtures": {
            "fix1": {
              "shape": {
                "radius": 0.35
              },
              "density": 50,
              "mask": [
                "FlyingMobMask"
              ],
              "layer": [
                "FlyingMobLayer"
              ]
            }
          }
        },
        {
          "type": "Sprite",
          "noRot": true,
          "drawdepth": "Effects",
          "sprite": "Structures/Specific/anomaly.rsi",
          "layers": [
            {
              "state": "anom6",
              "map": [
                "enum.AnomalyVisualLayers.Base"
              ]
            },
            {
              "state": "anom6-pulse",
              "map": [
                "enum.AnomalyVisualLayers.Animated"
              ],
              "visible": false
            }
          ],
          "color": "#484848"
        },
        {
          "type": "InteractionOutline"
        },
        {
          "type": "Clickable"
        },
        {
          "type": "Damageable"
        },
        {
          "type": "Appearance"
        },
        {
          "type": "AnimationPlayer"
        },
        {
          "type": "GuideHelp",
          "guides": [
            "AnomalousResearch"
          ]
        },
        {
          "type": "EmitSoundOnSpawn",
          "sound": {
            "path": "/Audio/Effects/teleport_arrival.ogg"
          }
        },
        {
          "type": "RadiationSource",
          "intensity": 4,
          "slope": 0.7
        },
        {
          "type": "RandomWalk",
          "minSpeed": 0,
          "maxSpeed": 0
        },
        {
          "type": "SecretDataAnomaly",
          "randomStartSecretMin": 0,
          "randomStartSecretMax": 2
        },
        {
          "type": "WarpPoint",
          "follow": true,
          "location": "anomaly"
        },
        {
          "type": "DamageOnInteract",
          "damage": {
            "types": {
              "Radiation": 10
            }
          },
          "popupText": "anomaly-component-contact-damage"
        },
        {
          "type": "DamageOnAttacked",
          "damage": {
            "types": {
              "Radiation": 10
            }
          }
        },
        {
          "type": "PointLight",
          "radius": 2,
          "energy": 7.5,
          "color": "#484848",
          "castShadows": false
        },
        {
          "type": "TileSpawnAnomaly",
          "entries": [
            {
              "settings": {
                "spawnOnPulse": true,
                "minAmount": 15,
                "maxAmount": 20,
                "maxRange": 7.5
              },
              "floor": "FloorAsteroidTile"
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 30,
                "maxAmount": 50,
                "maxRange": 12
              },
              "floor": "FloorAsteroidTile"
            }
          ]
        },
        {
          "type": "EntitySpawnAnomaly",
          "entries": [
            {
              "settings": {
                "spawnOnPulse": true,
                "minAmount": 8,
                "maxAmount": 15,
                "minRange": 4.5,
                "maxRange": 7.5
              },
              "spawns": [
                "WallSpawnAsteroid",
                "WallSpawnAsteroid",
                "WallSpawnAsteroidCoal",
                "WallSpawnAsteroidCoalCrab"
              ]
            },
            {
              "settings": {
                "spawnOnPulse": true,
                "maxAmount": 3,
                "minRange": 2.5,
                "maxRange": 4.5
              },
              "spawns": [
                "CrystalBlack"
              ]
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 30,
                "maxAmount": 40,
                "minRange": 5,
                "maxRange": 15
              },
              "spawns": [
                "CrystalBlack",
                "WallSpawnAsteroid",
                "WallSpawnAsteroid",
                "WallSpawnAsteroidCoalCrab"
              ]
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 6,
                "maxAmount": 10,
                "maxRange": 5
              },
              "spawns": [
                "MobSpawnCrabCoal"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "AnomalyFlora",
      "name": "Растительная",
      "family": "Растительная",
      "effect": "Создаёт травяной пол и растительность.",
      "critical": "Разрастание флоры и появление агрессивного кудзу.",
      "advice": "Ограничьте распространение растений, держите доступ к аномалии и проходы свободными.",
      "source": "Resources/Prototypes/Entities/Structures/Specific/Anomaly/anomalies.yml",
      "core": "AnomalyCoreFlora",
      "raw": {
        "type": "entity",
        "id": "AnomalyFlora",
        "parent": "BaseAnomaly",
        "suffix": "Flora",
        "components": [
          {
            "type": "Sprite",
            "drawdepth": "Mobs",
            "sprite": "Structures/Specific/Anomalies/flora_anom.rsi",
            "layers": [
              {
                "state": "anom",
                "map": [
                  "enum.AnomalyVisualLayers.Base"
                ]
              },
              {
                "state": "pulse",
                "map": [
                  "enum.AnomalyVisualLayers.Animated"
                ],
                "visible": false
              }
            ]
          },
          {
            "type": "PointLight",
            "radius": 8,
            "energy": 8.5,
            "color": "#6270bb"
          },
          {
            "type": "Anomaly",
            "animationTime": 6,
            "offset": "0, 0",
            "corePrototype": "AnomalyCoreFlora",
            "coreInertPrototype": "AnomalyCoreFloraInert",
            "minPulseLength": 60,
            "maxPulseLength": 120,
            "supercriticalSoundAtAnimationStart": {
              "collection": "AnomalyFloraSupercritical"
            }
          },
          {
            "type": "TileSpawnAnomaly",
            "entries": [
              {
                "settings": {
                  "spawnOnPulse": true,
                  "minAmount": 3,
                  "maxAmount": 7,
                  "maxRange": 5
                },
                "floor": "FloorAstroGrass"
              },
              {
                "settings": {
                  "spawnOnSuperCritical": true,
                  "minAmount": 10,
                  "maxAmount": 30,
                  "maxRange": 15
                },
                "floor": "FloorAstroGrass"
              }
            ]
          },
          {
            "type": "EntitySpawnAnomaly",
            "entries": [
              {
                "settings": {
                  "spawnOnPulse": true,
                  "minAmount": 2,
                  "maxAmount": 5,
                  "maxRange": 2
                },
                "spawns": [
                  "KudzuFlowerFriendly"
                ]
              },
              {
                "settings": {
                  "spawnOnSuperCritical": true,
                  "minAmount": 5,
                  "maxAmount": 10,
                  "maxRange": 6
                },
                "spawns": [
                  "KudzuFlowerAngry"
                ]
              }
            ]
          }
        ]
      },
      "components": [
        {
          "type": "Anomaly",
          "offset": "0, 0",
          "pulseSound": {
            "collection": "RadiationPulse",
            "params": {
              "volume": 5
            }
          },
          "pulseRun": true,
          "animationTime": 6,
          "corePrototype": "AnomalyCoreFlora",
          "coreInertPrototype": "AnomalyCoreFloraInert",
          "minPulseLength": 60,
          "maxPulseLength": 120,
          "supercriticalSoundAtAnimationStart": {
            "collection": "AnomalyFloraSupercritical"
          }
        },
        {
          "type": "AmbientSound",
          "range": 5,
          "volume": -5,
          "sound": {
            "path": "/Audio/Ambience/anomaly_drone.ogg"
          }
        },
        {
          "type": "Transform",
          "anchored": false
        },
        {
          "type": "Physics",
          "bodyType": "Dynamic",
          "bodyStatus": "InAir"
        },
        {
          "type": "Fixtures",
          "fixtures": {
            "fix1": {
              "shape": {
                "radius": 0.35
              },
              "density": 50,
              "mask": [
                "FlyingMobMask"
              ],
              "layer": [
                "FlyingMobLayer"
              ]
            }
          }
        },
        {
          "type": "Sprite",
          "noRot": true,
          "drawdepth": "Mobs",
          "sprite": "Structures/Specific/Anomalies/flora_anom.rsi",
          "layers": [
            {
              "state": "anom",
              "map": [
                "enum.AnomalyVisualLayers.Base"
              ]
            },
            {
              "state": "pulse",
              "map": [
                "enum.AnomalyVisualLayers.Animated"
              ],
              "visible": false
            }
          ]
        },
        {
          "type": "InteractionOutline"
        },
        {
          "type": "Clickable"
        },
        {
          "type": "Damageable"
        },
        {
          "type": "Appearance"
        },
        {
          "type": "AnimationPlayer"
        },
        {
          "type": "GuideHelp",
          "guides": [
            "AnomalousResearch"
          ]
        },
        {
          "type": "EmitSoundOnSpawn",
          "sound": {
            "path": "/Audio/Effects/teleport_arrival.ogg"
          }
        },
        {
          "type": "RadiationSource",
          "intensity": 4,
          "slope": 0.7
        },
        {
          "type": "RandomWalk",
          "minSpeed": 0,
          "maxSpeed": 0
        },
        {
          "type": "SecretDataAnomaly",
          "randomStartSecretMin": 0,
          "randomStartSecretMax": 2
        },
        {
          "type": "WarpPoint",
          "follow": true,
          "location": "anomaly"
        },
        {
          "type": "DamageOnInteract",
          "damage": {
            "types": {
              "Radiation": 10
            }
          },
          "popupText": "anomaly-component-contact-damage"
        },
        {
          "type": "DamageOnAttacked",
          "damage": {
            "types": {
              "Radiation": 10
            }
          }
        },
        {
          "type": "PointLight",
          "radius": 8,
          "energy": 8.5,
          "color": "#6270bb"
        },
        {
          "type": "TileSpawnAnomaly",
          "entries": [
            {
              "settings": {
                "spawnOnPulse": true,
                "minAmount": 3,
                "maxAmount": 7,
                "maxRange": 5
              },
              "floor": "FloorAstroGrass"
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 10,
                "maxAmount": 30,
                "maxRange": 15
              },
              "floor": "FloorAstroGrass"
            }
          ]
        },
        {
          "type": "EntitySpawnAnomaly",
          "entries": [
            {
              "settings": {
                "spawnOnPulse": true,
                "minAmount": 2,
                "maxAmount": 5,
                "maxRange": 2
              },
              "spawns": [
                "KudzuFlowerFriendly"
              ]
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 5,
                "maxAmount": 10,
                "maxRange": 6
              },
              "spawns": [
                "KudzuFlowerAngry"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "AnomalyLiquid",
      "name": "Жидкостная",
      "family": "Жидкостная",
      "effect": "Производит случайные реагенты, лужи и воздействует ими на существ.",
      "critical": "Расширенное химическое воздействие и появление реагентных слизней.",
      "advice": "Определите реагенты перед контактом. Не считайте жидкость лекарством по цвету; подготовьте уборку и медицинскую помощь.",
      "source": "Resources/Prototypes/Entities/Structures/Specific/Anomaly/anomalies.yml",
      "core": "AnomalyCoreLiquid",
      "raw": {
        "type": "entity",
        "id": "AnomalyLiquid",
        "parent": "BaseAnomaly",
        "suffix": "Liquid",
        "components": [
          {
            "type": "Sprite",
            "sprite": "Structures/Specific/Anomalies/liquid_anom.rsi",
            "layers": [
              {
                "state": "anom",
                "map": [
                  "enum.AnomalyVisualLayers.Base"
                ]
              },
              {
                "state": "pulse",
                "map": [
                  "enum.AnomalyVisualLayers.Animated"
                ],
                "visible": false
              }
            ]
          },
          {
            "type": "RandomSprite",
            "selected": {
              "enum.AnomalyVisualLayers.Base": {
                "anom": "#ffffff"
              },
              "enum.AnomalyVisualLayers.Animated": {
                "pulse": "#ffffff"
              }
            }
          },
          {
            "type": "PointLight",
            "radius": 4,
            "energy": 3.5,
            "color": "#bbbbbb"
          },
          {
            "type": "BadFood"
          },
          {
            "type": "Anomaly",
            "corePrototype": "AnomalyCoreLiquid",
            "coreInertPrototype": "AnomalyCoreLiquidInert",
            "minPulseLength": 60,
            "maxPulseLength": 120,
            "supercriticalSoundAtAnimationStart": {
              "collection": "AnomalyFluidSupercritical"
            }
          },
          {
            "type": "EntitySpawnAnomaly",
            "entries": [
              {
                "settings": {
                  "spawnOnSuperCritical": true,
                  "minAmount": 3,
                  "maxAmount": 8,
                  "maxRange": 2
                },
                "spawns": [
                  "ReagentSlimeSpawner"
                ]
              }
            ]
          },
          {
            "type": "SolutionContainerManager",
            "solutions": {
              "anomaly": {
                "maxVol": 1500
              }
            }
          },
          {
            "type": "PuddleCreateAnomaly",
            "solution": "anomaly"
          },
          {
            "type": "InjectionAnomaly",
            "solution": "anomaly",
            "superCriticalInjectRadius": 10
          },
          {
            "type": "ReagentProducerAnomaly",
            "solution": "anomaly",
            "needRecolor": true,
            "dangerousChemicals": [
              "UnstableMutagen",
              "Mold",
              "PolytrinicAcid",
              "FerrochromicAcid",
              "FluorosulfuricAcid",
              "SulfuricAcid",
              "HeartbreakerToxin",
              "VentCrud",
              "UncookedAnimalProteins",
              "Thermite",
              "Napalm",
              "Phlogiston",
              "ChlorineTrifluoride",
              "FoamingAgent",
              "BuzzochloricBees",
              "RobustHarvest"
            ],
            "usefulChemicals": [
              "Cryptobiolin",
              "Dylovene",
              "Arithrazine",
              "Bicaridine",
              "Cryoxadone",
              "Dermaline",
              "Dexalin",
              "DexalinPlus",
              "Epinephrine",
              "Leporazine",
              "Ambuzol",
              "Tricordrazine",
              "Artifexium",
              "Ethylredoxrazine"
            ],
            "funChemicals": [
              "Desoxyephedrine",
              "Ephedrine",
              "THC",
              "SpaceDrugs",
              "Nocturine",
              "MuteToxin",
              "NorepinephricAcid",
              "Pax",
              "Ipecac",
              "Cognizine",
              "Beer",
              "SpaceGlue",
              "SpaceLube",
              "CogChamp",
              "Honk",
              "Carpetium",
              "JuiceThatMakesYouWeh"
            ]
          },
          {
            "type": "Edible",
            "edible": "Drink",
            "solution": "anomaly",
            "destroyOnEmpty": false,
            "utensil": "Spoon"
          },
          {
            "type": "DrainableSolution",
            "solution": "anomaly"
          },
          {
            "type": "DrawableSolution",
            "solution": "anomaly"
          },
          {
            "type": "ExaminableSolution",
            "solution": "anomaly",
            "exactVolume": true,
            "locVolume": "examinable-solution-on-examine-volume-no-max"
          },
          {
            "type": "RefillableSolution",
            "solution": "anomaly"
          },
          {
            "type": "InjectableSolution",
            "solution": "beaker"
          }
        ]
      },
      "components": [
        {
          "type": "Anomaly",
          "offset": "0, 0.15",
          "pulseSound": {
            "collection": "RadiationPulse",
            "params": {
              "volume": 5
            }
          },
          "pulseRun": true,
          "corePrototype": "AnomalyCoreLiquid",
          "coreInertPrototype": "AnomalyCoreLiquidInert",
          "minPulseLength": 60,
          "maxPulseLength": 120,
          "supercriticalSoundAtAnimationStart": {
            "collection": "AnomalyFluidSupercritical"
          }
        },
        {
          "type": "AmbientSound",
          "range": 5,
          "volume": -5,
          "sound": {
            "path": "/Audio/Ambience/anomaly_drone.ogg"
          }
        },
        {
          "type": "Transform",
          "anchored": false
        },
        {
          "type": "Physics",
          "bodyType": "Dynamic",
          "bodyStatus": "InAir"
        },
        {
          "type": "Fixtures",
          "fixtures": {
            "fix1": {
              "shape": {
                "radius": 0.35
              },
              "density": 50,
              "mask": [
                "FlyingMobMask"
              ],
              "layer": [
                "FlyingMobLayer"
              ]
            }
          }
        },
        {
          "type": "Sprite",
          "noRot": true,
          "drawdepth": "Effects",
          "sprite": "Structures/Specific/Anomalies/liquid_anom.rsi",
          "layers": [
            {
              "state": "anom",
              "map": [
                "enum.AnomalyVisualLayers.Base"
              ]
            },
            {
              "state": "pulse",
              "map": [
                "enum.AnomalyVisualLayers.Animated"
              ],
              "visible": false
            }
          ]
        },
        {
          "type": "InteractionOutline"
        },
        {
          "type": "Clickable"
        },
        {
          "type": "Damageable"
        },
        {
          "type": "Appearance"
        },
        {
          "type": "AnimationPlayer"
        },
        {
          "type": "GuideHelp",
          "guides": [
            "AnomalousResearch"
          ]
        },
        {
          "type": "EmitSoundOnSpawn",
          "sound": {
            "path": "/Audio/Effects/teleport_arrival.ogg"
          }
        },
        {
          "type": "RadiationSource",
          "intensity": 4,
          "slope": 0.7
        },
        {
          "type": "RandomWalk",
          "minSpeed": 0,
          "maxSpeed": 0
        },
        {
          "type": "SecretDataAnomaly",
          "randomStartSecretMin": 0,
          "randomStartSecretMax": 2
        },
        {
          "type": "WarpPoint",
          "follow": true,
          "location": "anomaly"
        },
        {
          "type": "DamageOnInteract",
          "damage": {
            "types": {
              "Radiation": 10
            }
          },
          "popupText": "anomaly-component-contact-damage"
        },
        {
          "type": "DamageOnAttacked",
          "damage": {
            "types": {
              "Radiation": 10
            }
          }
        },
        {
          "type": "RandomSprite",
          "selected": {
            "enum.AnomalyVisualLayers.Base": {
              "anom": "#ffffff"
            },
            "enum.AnomalyVisualLayers.Animated": {
              "pulse": "#ffffff"
            }
          }
        },
        {
          "type": "PointLight",
          "radius": 4,
          "energy": 3.5,
          "color": "#bbbbbb"
        },
        {
          "type": "BadFood"
        },
        {
          "type": "EntitySpawnAnomaly",
          "entries": [
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 3,
                "maxAmount": 8,
                "maxRange": 2
              },
              "spawns": [
                "ReagentSlimeSpawner"
              ]
            }
          ]
        },
        {
          "type": "SolutionContainerManager",
          "solutions": {
            "anomaly": {
              "maxVol": 1500
            }
          }
        },
        {
          "type": "PuddleCreateAnomaly",
          "solution": "anomaly"
        },
        {
          "type": "InjectionAnomaly",
          "solution": "anomaly",
          "superCriticalInjectRadius": 10
        },
        {
          "type": "ReagentProducerAnomaly",
          "solution": "anomaly",
          "needRecolor": true,
          "dangerousChemicals": [
            "UnstableMutagen",
            "Mold",
            "PolytrinicAcid",
            "FerrochromicAcid",
            "FluorosulfuricAcid",
            "SulfuricAcid",
            "HeartbreakerToxin",
            "VentCrud",
            "UncookedAnimalProteins",
            "Thermite",
            "Napalm",
            "Phlogiston",
            "ChlorineTrifluoride",
            "FoamingAgent",
            "BuzzochloricBees",
            "RobustHarvest"
          ],
          "usefulChemicals": [
            "Cryptobiolin",
            "Dylovene",
            "Arithrazine",
            "Bicaridine",
            "Cryoxadone",
            "Dermaline",
            "Dexalin",
            "DexalinPlus",
            "Epinephrine",
            "Leporazine",
            "Ambuzol",
            "Tricordrazine",
            "Artifexium",
            "Ethylredoxrazine"
          ],
          "funChemicals": [
            "Desoxyephedrine",
            "Ephedrine",
            "THC",
            "SpaceDrugs",
            "Nocturine",
            "MuteToxin",
            "NorepinephricAcid",
            "Pax",
            "Ipecac",
            "Cognizine",
            "Beer",
            "SpaceGlue",
            "SpaceLube",
            "CogChamp",
            "Honk",
            "Carpetium",
            "JuiceThatMakesYouWeh"
          ]
        },
        {
          "type": "Edible",
          "edible": "Drink",
          "solution": "anomaly",
          "destroyOnEmpty": false,
          "utensil": "Spoon"
        },
        {
          "type": "DrainableSolution",
          "solution": "anomaly"
        },
        {
          "type": "DrawableSolution",
          "solution": "anomaly"
        },
        {
          "type": "ExaminableSolution",
          "solution": "anomaly",
          "exactVolume": true,
          "locVolume": "examinable-solution-on-examine-volume-no-max"
        },
        {
          "type": "RefillableSolution",
          "solution": "anomaly"
        },
        {
          "type": "InjectableSolution",
          "solution": "beaker"
        }
      ]
    },
    {
      "id": "AnomalyShadow",
      "name": "Теневая",
      "family": "Теневая",
      "effect": "Создаёт слабые теневые заросли.",
      "critical": "Создаёт значительно больше теневых зарослей на большой площади.",
      "advice": "Подготовьте освещение и средство расчистки. Следите за распространением за пределами места исследования.",
      "source": "Resources/Prototypes/Entities/Structures/Specific/Anomaly/anomalies.yml",
      "core": "AnomalyCoreShadow",
      "raw": {
        "type": "entity",
        "id": "AnomalyShadow",
        "parent": "BaseAnomaly",
        "suffix": "Shadow",
        "components": [
          {
            "type": "Sprite",
            "sprite": "Structures/Specific/Anomalies/shadow_anom.rsi",
            "layers": [
              {
                "state": "anom",
                "map": [
                  "enum.AnomalyVisualLayers.Base"
                ]
              },
              {
                "state": "pulse",
                "map": [
                  "enum.AnomalyVisualLayers.Animated"
                ],
                "visible": false
              }
            ]
          },
          {
            "type": "PointLight",
            "radius": 1.5,
            "energy": 12.5,
            "color": "#793a80"
          },
          {
            "type": "AmbientSound",
            "range": 5,
            "volume": -5,
            "sound": {
              "path": "/Audio/Ambience/anomaly_scary.ogg"
            }
          },
          {
            "type": "Anomaly",
            "corePrototype": "AnomalyCoreShadow",
            "coreInertPrototype": "AnomalyCoreShadowInert",
            "minPulseLength": 60,
            "maxPulseLength": 120,
            "animationTime": 4,
            "offset": "-0.1,0.1",
            "supercriticalSoundAtAnimationStart": {
              "collection": "AnomalyShadowSupercritical"
            }
          },
          {
            "type": "EntitySpawnAnomaly",
            "entries": [
              {
                "settings": {
                  "spawnOnPulse": true,
                  "spawnOnSuperCritical": true,
                  "minAmount": 10,
                  "maxAmount": 20,
                  "maxRange": 4
                },
                "spawns": [
                  "ShadowKudzuWeak"
                ]
              },
              {
                "settings": {
                  "spawnOnSuperCritical": true,
                  "minAmount": 30,
                  "maxAmount": 40,
                  "maxRange": 50
                },
                "spawns": [
                  "ShadowKudzu"
                ]
              }
            ]
          },
          {
            "type": "Portal",
            "arrivalSound": "/Audio/Items/hiss.ogg",
            "departureSound": "/Audio/Items/hiss.ogg"
          },
          {
            "type": "Tag",
            "tags": [
              "SpookyFog"
            ]
          },
          {
            "type": "DamageOnInteract",
            "damage": {
              "types": {
                "Cold": 10
              }
            },
            "popupText": "anomaly-component-contact-damage"
          },
          {
            "type": "DamageOnAttacked",
            "damage": {
              "types": {
                "Cold": 10
              }
            }
          }
        ]
      },
      "components": [
        {
          "type": "Anomaly",
          "offset": "-0.1,0.1",
          "pulseSound": {
            "collection": "RadiationPulse",
            "params": {
              "volume": 5
            }
          },
          "pulseRun": true,
          "corePrototype": "AnomalyCoreShadow",
          "coreInertPrototype": "AnomalyCoreShadowInert",
          "minPulseLength": 60,
          "maxPulseLength": 120,
          "animationTime": 4,
          "supercriticalSoundAtAnimationStart": {
            "collection": "AnomalyShadowSupercritical"
          }
        },
        {
          "type": "AmbientSound",
          "range": 5,
          "volume": -5,
          "sound": {
            "path": "/Audio/Ambience/anomaly_scary.ogg"
          }
        },
        {
          "type": "Transform",
          "anchored": false
        },
        {
          "type": "Physics",
          "bodyType": "Dynamic",
          "bodyStatus": "InAir"
        },
        {
          "type": "Fixtures",
          "fixtures": {
            "fix1": {
              "shape": {
                "radius": 0.35
              },
              "density": 50,
              "mask": [
                "FlyingMobMask"
              ],
              "layer": [
                "FlyingMobLayer"
              ]
            }
          }
        },
        {
          "type": "Sprite",
          "noRot": true,
          "drawdepth": "Effects",
          "sprite": "Structures/Specific/Anomalies/shadow_anom.rsi",
          "layers": [
            {
              "state": "anom",
              "map": [
                "enum.AnomalyVisualLayers.Base"
              ]
            },
            {
              "state": "pulse",
              "map": [
                "enum.AnomalyVisualLayers.Animated"
              ],
              "visible": false
            }
          ]
        },
        {
          "type": "InteractionOutline"
        },
        {
          "type": "Clickable"
        },
        {
          "type": "Damageable"
        },
        {
          "type": "Appearance"
        },
        {
          "type": "AnimationPlayer"
        },
        {
          "type": "GuideHelp",
          "guides": [
            "AnomalousResearch"
          ]
        },
        {
          "type": "EmitSoundOnSpawn",
          "sound": {
            "path": "/Audio/Effects/teleport_arrival.ogg"
          }
        },
        {
          "type": "RadiationSource",
          "intensity": 4,
          "slope": 0.7
        },
        {
          "type": "RandomWalk",
          "minSpeed": 0,
          "maxSpeed": 0
        },
        {
          "type": "SecretDataAnomaly",
          "randomStartSecretMin": 0,
          "randomStartSecretMax": 2
        },
        {
          "type": "WarpPoint",
          "follow": true,
          "location": "anomaly"
        },
        {
          "type": "DamageOnInteract",
          "damage": {
            "types": {
              "Cold": 10
            }
          },
          "popupText": "anomaly-component-contact-damage"
        },
        {
          "type": "DamageOnAttacked",
          "damage": {
            "types": {
              "Cold": 10
            }
          }
        },
        {
          "type": "PointLight",
          "radius": 1.5,
          "energy": 12.5,
          "color": "#793a80"
        },
        {
          "type": "EntitySpawnAnomaly",
          "entries": [
            {
              "settings": {
                "spawnOnPulse": true,
                "spawnOnSuperCritical": true,
                "minAmount": 10,
                "maxAmount": 20,
                "maxRange": 4
              },
              "spawns": [
                "ShadowKudzuWeak"
              ]
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 30,
                "maxAmount": 40,
                "maxRange": 50
              },
              "spawns": [
                "ShadowKudzu"
              ]
            }
          ]
        },
        {
          "type": "Portal",
          "arrivalSound": "/Audio/Items/hiss.ogg",
          "departureSound": "/Audio/Items/hiss.ogg"
        },
        {
          "type": "Tag",
          "tags": [
            "SpookyFog"
          ]
        }
      ]
    },
    {
      "id": "AnomalyTech",
      "name": "Технологическая",
      "family": "Технологическая",
      "effect": "Создаёт случайные сигнальные связи с устройствами и посылает сигналы по таймеру и при импульсах.",
      "critical": "Массово связывает устройства; возможен эффект емага.",
      "advice": "Удалите лишние управляемые устройства из окружения. После опыта проверьте шлюзы, сигнализацию и подключения.",
      "source": "Resources/Prototypes/Entities/Structures/Specific/Anomaly/anomalies.yml",
      "core": "AnomalyCoreTech",
      "raw": {
        "type": "entity",
        "id": "AnomalyTech",
        "parent": "BaseAnomaly",
        "suffix": "Tech",
        "components": [
          {
            "type": "Sprite",
            "sprite": "Structures/Specific/Anomalies/tech_anom.rsi",
            "layers": [
              {
                "state": "bg",
                "map": [
                  "enum.AnomalyVisualLayers.Base"
                ]
              },
              {
                "state": "bg_powered",
                "map": [
                  "enum.AnomalyVisualLayers.Animated"
                ],
                "visible": false,
                "shader": "unshaded"
              },
              {
                "state": "part1"
              },
              {
                "state": "part2"
              },
              {
                "state": "part3"
              },
              {
                "state": "part4"
              }
            ]
          },
          {
            "type": "PointLight",
            "radius": 6.5,
            "energy": 3.5,
            "color": "#56c1e8"
          },
          {
            "type": "Anomaly",
            "corePrototype": "AnomalyCoreTech",
            "coreInertPrototype": "AnomalyCoreTechInert",
            "minPulseLength": 60,
            "maxPulseLength": 120,
            "supercriticalSoundAtAnimationStart": {
              "collection": "AnomalyTechSupercritical"
            }
          },
          {
            "type": "TechAnomaly"
          },
          {
            "type": "DeviceLinkSource",
            "ports": [
              "Pulse",
              "Timer"
            ]
          }
        ]
      },
      "components": [
        {
          "type": "Anomaly",
          "offset": "0, 0.15",
          "pulseSound": {
            "collection": "RadiationPulse",
            "params": {
              "volume": 5
            }
          },
          "pulseRun": true,
          "corePrototype": "AnomalyCoreTech",
          "coreInertPrototype": "AnomalyCoreTechInert",
          "minPulseLength": 60,
          "maxPulseLength": 120,
          "supercriticalSoundAtAnimationStart": {
            "collection": "AnomalyTechSupercritical"
          }
        },
        {
          "type": "AmbientSound",
          "range": 5,
          "volume": -5,
          "sound": {
            "path": "/Audio/Ambience/anomaly_drone.ogg"
          }
        },
        {
          "type": "Transform",
          "anchored": false
        },
        {
          "type": "Physics",
          "bodyType": "Dynamic",
          "bodyStatus": "InAir"
        },
        {
          "type": "Fixtures",
          "fixtures": {
            "fix1": {
              "shape": {
                "radius": 0.35
              },
              "density": 50,
              "mask": [
                "FlyingMobMask"
              ],
              "layer": [
                "FlyingMobLayer"
              ]
            }
          }
        },
        {
          "type": "Sprite",
          "noRot": true,
          "drawdepth": "Effects",
          "sprite": "Structures/Specific/Anomalies/tech_anom.rsi",
          "layers": [
            {
              "state": "bg",
              "map": [
                "enum.AnomalyVisualLayers.Base"
              ]
            },
            {
              "state": "bg_powered",
              "map": [
                "enum.AnomalyVisualLayers.Animated"
              ],
              "visible": false,
              "shader": "unshaded"
            },
            {
              "state": "part1"
            },
            {
              "state": "part2"
            },
            {
              "state": "part3"
            },
            {
              "state": "part4"
            }
          ]
        },
        {
          "type": "InteractionOutline"
        },
        {
          "type": "Clickable"
        },
        {
          "type": "Damageable"
        },
        {
          "type": "Appearance"
        },
        {
          "type": "AnimationPlayer"
        },
        {
          "type": "GuideHelp",
          "guides": [
            "AnomalousResearch"
          ]
        },
        {
          "type": "EmitSoundOnSpawn",
          "sound": {
            "path": "/Audio/Effects/teleport_arrival.ogg"
          }
        },
        {
          "type": "RadiationSource",
          "intensity": 4,
          "slope": 0.7
        },
        {
          "type": "RandomWalk",
          "minSpeed": 0,
          "maxSpeed": 0
        },
        {
          "type": "SecretDataAnomaly",
          "randomStartSecretMin": 0,
          "randomStartSecretMax": 2
        },
        {
          "type": "WarpPoint",
          "follow": true,
          "location": "anomaly"
        },
        {
          "type": "DamageOnInteract",
          "damage": {
            "types": {
              "Radiation": 10
            }
          },
          "popupText": "anomaly-component-contact-damage"
        },
        {
          "type": "DamageOnAttacked",
          "damage": {
            "types": {
              "Radiation": 10
            }
          }
        },
        {
          "type": "PointLight",
          "radius": 6.5,
          "energy": 3.5,
          "color": "#56c1e8"
        },
        {
          "type": "TechAnomaly"
        },
        {
          "type": "DeviceLinkSource",
          "ports": [
            "Pulse",
            "Timer"
          ]
        }
      ]
    },
    {
      "id": "AnomalySanta",
      "name": "Подарочная",
      "family": "Подарочная",
      "effect": "Создаёт подарки и праздничные предметы, разбрасывает банки напитка.",
      "critical": "Создаёт особые случайные подарки. Содержимое не гарантированно безопасно.",
      "advice": "Разбирайте результаты отдельно от работающей установки. Это специальный вариант; наличие зависит от способа появления.",
      "source": "Resources/Prototypes/Entities/Structures/Specific/Anomaly/anomalies.yml",
      "core": "AnomalyCoreSanta",
      "raw": {
        "type": "entity",
        "id": "AnomalySanta",
        "parent": "BaseAnomaly",
        "suffix": "Santa",
        "components": [
          {
            "type": "Sprite",
            "drawdepth": "Mobs",
            "sprite": "Structures/Specific/Anomalies/santa_anom.rsi",
            "layers": [
              {
                "state": "anom",
                "map": [
                  "enum.AnomalyVisualLayers.Base"
                ]
              },
              {
                "state": "pulse",
                "map": [
                  "enum.AnomalyVisualLayers.Animated"
                ],
                "visible": false
              }
            ]
          },
          {
            "type": "PointLight",
            "radius": 8,
            "energy": 8.5,
            "color": "#db8127"
          },
          {
            "type": "Anomaly",
            "animationTime": 6,
            "offset": "0, 0",
            "corePrototype": "AnomalyCoreSanta",
            "coreInertPrototype": "AnomalyCoreSantaInert",
            "minPulseLength": 60,
            "maxPulseLength": 120,
            "supercriticalSoundAtAnimationStart": {
              "collection": "AnomalyPresentSupercritical"
            }
          },
          {
            "type": "EntitySpawnAnomaly",
            "entries": [
              {
                "settings": {
                  "spawnOnPulse": true,
                  "minAmount": 2,
                  "maxAmount": 5,
                  "maxRange": 5
                },
                "spawns": [
                  "PresentRandom",
                  "PresentRandomCoal",
                  "PresentRandomCash",
                  "ClothingHeadHatSantahat",
                  "FoodCakeChristmasSlice"
                ]
              },
              {
                "settings": {
                  "spawnOnSuperCritical": true,
                  "minAmount": 10,
                  "maxAmount": 20,
                  "maxRange": 6
                },
                "spawns": [
                  "PresentRandomInsane"
                ]
              }
            ]
          },
          {
            "type": "ProjectileAnomaly",
            "projectilePrototype": "DrinkLemonLimeCranberryCan",
            "minProjectiles": 1,
            "maxProjectiles": 3
          }
        ]
      },
      "components": [
        {
          "type": "Anomaly",
          "offset": "0, 0",
          "pulseSound": {
            "collection": "RadiationPulse",
            "params": {
              "volume": 5
            }
          },
          "pulseRun": true,
          "animationTime": 6,
          "corePrototype": "AnomalyCoreSanta",
          "coreInertPrototype": "AnomalyCoreSantaInert",
          "minPulseLength": 60,
          "maxPulseLength": 120,
          "supercriticalSoundAtAnimationStart": {
            "collection": "AnomalyPresentSupercritical"
          }
        },
        {
          "type": "AmbientSound",
          "range": 5,
          "volume": -5,
          "sound": {
            "path": "/Audio/Ambience/anomaly_drone.ogg"
          }
        },
        {
          "type": "Transform",
          "anchored": false
        },
        {
          "type": "Physics",
          "bodyType": "Dynamic",
          "bodyStatus": "InAir"
        },
        {
          "type": "Fixtures",
          "fixtures": {
            "fix1": {
              "shape": {
                "radius": 0.35
              },
              "density": 50,
              "mask": [
                "FlyingMobMask"
              ],
              "layer": [
                "FlyingMobLayer"
              ]
            }
          }
        },
        {
          "type": "Sprite",
          "noRot": true,
          "drawdepth": "Mobs",
          "sprite": "Structures/Specific/Anomalies/santa_anom.rsi",
          "layers": [
            {
              "state": "anom",
              "map": [
                "enum.AnomalyVisualLayers.Base"
              ]
            },
            {
              "state": "pulse",
              "map": [
                "enum.AnomalyVisualLayers.Animated"
              ],
              "visible": false
            }
          ]
        },
        {
          "type": "InteractionOutline"
        },
        {
          "type": "Clickable"
        },
        {
          "type": "Damageable"
        },
        {
          "type": "Appearance"
        },
        {
          "type": "AnimationPlayer"
        },
        {
          "type": "GuideHelp",
          "guides": [
            "AnomalousResearch"
          ]
        },
        {
          "type": "EmitSoundOnSpawn",
          "sound": {
            "path": "/Audio/Effects/teleport_arrival.ogg"
          }
        },
        {
          "type": "RadiationSource",
          "intensity": 4,
          "slope": 0.7
        },
        {
          "type": "RandomWalk",
          "minSpeed": 0,
          "maxSpeed": 0
        },
        {
          "type": "SecretDataAnomaly",
          "randomStartSecretMin": 0,
          "randomStartSecretMax": 2
        },
        {
          "type": "WarpPoint",
          "follow": true,
          "location": "anomaly"
        },
        {
          "type": "DamageOnInteract",
          "damage": {
            "types": {
              "Radiation": 10
            }
          },
          "popupText": "anomaly-component-contact-damage"
        },
        {
          "type": "DamageOnAttacked",
          "damage": {
            "types": {
              "Radiation": 10
            }
          }
        },
        {
          "type": "PointLight",
          "radius": 8,
          "energy": 8.5,
          "color": "#db8127"
        },
        {
          "type": "EntitySpawnAnomaly",
          "entries": [
            {
              "settings": {
                "spawnOnPulse": true,
                "minAmount": 2,
                "maxAmount": 5,
                "maxRange": 5
              },
              "spawns": [
                "PresentRandom",
                "PresentRandomCoal",
                "PresentRandomCash",
                "ClothingHeadHatSantahat",
                "FoodCakeChristmasSlice"
              ]
            },
            {
              "settings": {
                "spawnOnSuperCritical": true,
                "minAmount": 10,
                "maxAmount": 20,
                "maxRange": 6
              },
              "spawns": [
                "PresentRandomInsane"
              ]
            }
          ]
        },
        {
          "type": "ProjectileAnomaly",
          "projectilePrototype": "DrinkLemonLimeCranberryCan",
          "minProjectiles": 1,
          "maxProjectiles": 3
        }
      ]
    }
  ],
  "behaviors": [
    {
      "id": "FullSafe",
      "name": "Аномалия чрезвычайно стабильна. Крайне редкие импульсы.",
      "details": [
        "Интервал между импульсами ×3; мощность ×0.5; очки ×0.05; чувствительность к частицам ×1."
      ],
      "raw": {
        "type": "anomalyBehavior",
        "id": "FullSafe",
        "pulseFrequencyModifier": 3,
        "pulsePowerModifier": 0.5,
        "earnPointModifier": 0.05,
        "description": "anomaly-behavior-safe"
      },
      "source": "Resources/Prototypes/Anomaly/behaviours.yml"
    },
    {
      "id": "Slow",
      "name": "Частота импульсов значительно снижена.",
      "details": [
        "Интервал между импульсами ×2; мощность ×1; очки ×0.5; чувствительность к частицам ×1."
      ],
      "raw": {
        "type": "anomalyBehavior",
        "id": "Slow",
        "pulseFrequencyModifier": 2,
        "earnPointModifier": 0.5,
        "description": "anomaly-behavior-slow"
      },
      "source": "Resources/Prototypes/Anomaly/behaviours.yml"
    },
    {
      "id": "Light",
      "name": "Мощность импульсов значительно снижена.",
      "details": [
        "Интервал между импульсами ×1; мощность ×0.5; очки ×0.5; чувствительность к частицам ×1."
      ],
      "raw": {
        "type": "anomalyBehavior",
        "id": "Light",
        "pulsePowerModifier": 0.5,
        "earnPointModifier": 0.5,
        "description": "anomaly-behavior-light"
      },
      "source": "Resources/Prototypes/Anomaly/behaviours.yml"
    },
    {
      "id": "Balanced",
      "name": "Отклонения поведения не обнаружены.",
      "details": [
        "Интервал между импульсами ×1; мощность ×1; очки ×1; чувствительность к частицам ×1."
      ],
      "raw": {
        "type": "anomalyBehavior",
        "id": "Balanced",
        "earnPointModifier": 1,
        "description": "anomaly-behavior-balanced"
      },
      "source": "Resources/Prototypes/Anomaly/behaviours.yml"
    },
    {
      "id": "DelayedForce",
      "name": "Частота пульсаций значительно снижена, но их сила повышена.",
      "details": [
        "Интервал между импульсами ×2; мощность ×2; очки ×1.15; чувствительность к частицам ×1."
      ],
      "raw": {
        "type": "anomalyBehavior",
        "id": "DelayedForce",
        "earnPointModifier": 1.15,
        "description": "anomaly-behavior-delayed-force",
        "pulseFrequencyModifier": 2,
        "pulsePowerModifier": 2
      },
      "source": "Resources/Prototypes/Anomaly/behaviours.yml"
    },
    {
      "id": "Rapid",
      "name": "Частота пульсаций значительно повышена, но их сила снижена.",
      "details": [
        "Интервал между импульсами ×0.5; мощность ×0.5; очки ×1.15; чувствительность к частицам ×1."
      ],
      "raw": {
        "type": "anomalyBehavior",
        "id": "Rapid",
        "earnPointModifier": 1.15,
        "description": "anomaly-behavior-rapid",
        "pulseFrequencyModifier": 0.5,
        "pulsePowerModifier": 0.5
      },
      "source": "Resources/Prototypes/Anomaly/behaviours.yml"
    },
    {
      "id": "BalancedSecret",
      "name": "Обнаружены помехи. Некоторые данные не могут быть считаны",
      "details": [
        "Интервал между импульсами ×1; мощность ×1; очки ×1.2; чувствительность к частицам ×1.",
        "Скрывает от 2 до 3 показателей сканера. Неизвестное значение не означает нулевое."
      ],
      "raw": {
        "type": "anomalyBehavior",
        "id": "BalancedSecret",
        "earnPointModifier": 1.2,
        "description": "anomaly-behavior-secret",
        "components": [
          {
            "type": "SecretDataAnomaly",
            "randomStartSecretMin": 2,
            "randomStartSecretMax": 3
          }
        ]
      },
      "source": "Resources/Prototypes/Anomaly/behaviours.yml"
    },
    {
      "id": "Reflect",
      "name": "Обнаружено защитное покрытие.",
      "details": [
        "Интервал между импульсами ×1; мощность ×1; очки ×1.1; чувствительность к частицам ×0.5.",
        "Отражает энергетические снаряды с вероятностью 50%. Не стойте на линии отражения."
      ],
      "raw": {
        "type": "anomalyBehavior",
        "id": "Reflect",
        "earnPointModifier": 1.1,
        "particleSensivity": 0.5,
        "description": "anomaly-behavior-reflect",
        "components": [
          {
            "type": "Reflect",
            "reflectProb": 0.5,
            "reflects": [
              "Energy"
            ]
          }
        ]
      },
      "source": "Resources/Prototypes/Anomaly/behaviours.yml"
    },
    {
      "id": "NonSensivity",
      "name": "Обнаружена слабая реакция на частицы.",
      "details": [
        "Интервал между импульсами ×1; мощность ×1; очки ×0.8; чувствительность к частицам ×0.5."
      ],
      "raw": {
        "type": "anomalyBehavior",
        "id": "NonSensivity",
        "earnPointModifier": 0.8,
        "particleSensivity": 0.5,
        "description": "anomaly-behavior-nonsensivity"
      },
      "source": "Resources/Prototypes/Anomaly/behaviours.yml"
    },
    {
      "id": "Sensivity",
      "name": "Обнаружена сильная реакция на частицы.",
      "details": [
        "Интервал между импульсами ×1; мощность ×1; очки ×1.2; чувствительность к частицам ×1.5."
      ],
      "raw": {
        "type": "anomalyBehavior",
        "id": "Sensivity",
        "earnPointModifier": 1.2,
        "particleSensivity": 1.5,
        "description": "anomaly-behavior-sensivity"
      },
      "source": "Resources/Prototypes/Anomaly/behaviours.yml"
    },
    {
      "id": "Fast",
      "name": "Частота импульсов значительно повышена.",
      "details": [
        "Интервал между импульсами ×0.5; мощность ×1; очки ×1.9; чувствительность к частицам ×1."
      ],
      "raw": {
        "type": "anomalyBehavior",
        "id": "Fast",
        "earnPointModifier": 1.9,
        "pulseFrequencyModifier": 0.5,
        "description": "anomaly-behavior-fast"
      },
      "source": "Resources/Prototypes/Anomaly/behaviours.yml"
    },
    {
      "id": "Strenght",
      "name": "Мощность импульсов значительно повышена.",
      "details": [
        "Интервал между импульсами ×1; мощность ×1.5; очки ×1.4; чувствительность к частицам ×1."
      ],
      "raw": {
        "type": "anomalyBehavior",
        "id": "Strenght",
        "pulsePowerModifier": 1.5,
        "earnPointModifier": 1.4,
        "description": "anomaly-behavior-strenght"
      },
      "source": "Resources/Prototypes/Anomaly/behaviours.yml"
    },
    {
      "id": "Inconstancy",
      "name": "Обнаружено непостоянство. Со временем типы частиц могут поменяться.",
      "details": [
        "Интервал между импульсами ×1; мощность ×1; очки ×1.7; чувствительность к частицам ×1.",
        "Может перемешивать роли частиц при импульсе: вероятность 100%. Повторно сканируйте перед следующим воздействием."
      ],
      "raw": {
        "type": "anomalyBehavior",
        "id": "Inconstancy",
        "earnPointModifier": 1.7,
        "description": "anomaly-behavior-inconstancy",
        "components": [
          {
            "type": "ShuffleParticlesAnomaly",
            "shuffleOnPulse": true,
            "prob": 1
          }
        ]
      },
      "source": "Resources/Prototypes/Anomaly/behaviours.yml"
    },
    {
      "id": "InconstancyParticle",
      "name": "Обнаружено непостоянство. Со временем типы частиц могут поменяться.",
      "details": [
        "Интервал между импульсами ×1; мощность ×1; очки ×1.8; чувствительность к частицам ×1.",
        "Может перемешивать роли частиц при попадании частицы: вероятность 80%. Повторно сканируйте перед следующим воздействием."
      ],
      "raw": {
        "type": "anomalyBehavior",
        "id": "InconstancyParticle",
        "earnPointModifier": 1.8,
        "description": "anomaly-behavior-inconstancy",
        "components": [
          {
            "type": "ShuffleParticlesAnomaly",
            "shuffleOnParticleHit": true,
            "prob": 0.8
          }
        ]
      },
      "source": "Resources/Prototypes/Anomaly/behaviours.yml"
    },
    {
      "id": "Jumping",
      "name": "Обнаружена координатная нестабильность.",
      "details": [
        "Интервал между импульсами ×1; мощность ×1; очки ×1.8; чувствительность к частицам ×1.",
        "Перемещается с интервалом 15–25 с на 1–4 клетки. Перепроверяйте местоположение."
      ],
      "raw": {
        "type": "anomalyBehavior",
        "id": "Jumping",
        "earnPointModifier": 1.8,
        "description": "anomaly-behavior-moving",
        "components": [
          {
            "type": "ChaoticJump",
            "jumpMinInterval": 15,
            "jumpMaxInterval": 25,
            "rangeMin": 1,
            "rangeMax": 4,
            "effect": "PuddleSparkle"
          }
        ]
      },
      "source": "Resources/Prototypes/Anomaly/behaviours.yml"
    },
    {
      "id": "FullUnknown",
      "name": "Обнаружены помехи. Некоторые данные не могут быть считаны",
      "details": [
        "Интервал между импульсами ×1; мощность ×1; очки ×1.9; чувствительность к частицам ×1.",
        "Скрывает от 4 до 6 показателей сканера. Неизвестное значение не означает нулевое."
      ],
      "raw": {
        "type": "anomalyBehavior",
        "id": "FullUnknown",
        "earnPointModifier": 1.9,
        "description": "anomaly-behavior-secret",
        "components": [
          {
            "type": "SecretDataAnomaly",
            "randomStartSecretMin": 4,
            "randomStartSecretMax": 6
          }
        ]
      },
      "source": "Resources/Prototypes/Anomaly/behaviours.yml"
    },
    {
      "id": "Invisibility",
      "name": "Обнаружено искажение светового потока.",
      "details": [
        "Интервал между импульсами ×1; мощность ×1; очки ×1.6; чувствительность к частицам ×1.",
        "Может становиться малозаметной; используйте локатор и следите за окружением."
      ],
      "raw": {
        "type": "anomalyBehavior",
        "id": "Invisibility",
        "earnPointModifier": 1.6,
        "description": "anomaly-behavior-invisibility",
        "components": [
          {
            "type": "Stealth",
            "maxVisibility": 1.2
          },
          {
            "type": "StealthOnMove",
            "passiveVisibilityRate": -0.37,
            "movementVisibilityRate": 0.2
          }
        ]
      },
      "source": "Resources/Prototypes/Anomaly/behaviours.yml"
    },
    {
      "id": "JumpingUnknown",
      "name": "Обнаружена координатная нестабильность.",
      "details": [
        "Интервал между импульсами ×1; мощность ×1; очки ×1.9; чувствительность к частицам ×1.",
        "Перемещается с интервалом 15–25 с на 1–1 клетки. Перепроверяйте местоположение.",
        "Скрывает от 3 до 5 показателей сканера. Неизвестное значение не означает нулевое."
      ],
      "raw": {
        "type": "anomalyBehavior",
        "id": "JumpingUnknown",
        "earnPointModifier": 1.9,
        "description": "anomaly-behavior-moving",
        "components": [
          {
            "type": "ChaoticJump",
            "jumpMinInterval": 15,
            "jumpMaxInterval": 25,
            "rangeMin": 1,
            "rangeMax": 1,
            "effect": "PuddleSparkle"
          },
          {
            "type": "SecretDataAnomaly",
            "randomStartSecretMin": 3,
            "randomStartSecretMax": 5
          }
        ]
      },
      "source": "Resources/Prototypes/Anomaly/behaviours.yml"
    },
    {
      "id": "FastUnknown",
      "name": "Частота импульсов значительно повышена.",
      "details": [
        "Интервал между импульсами ×0.5; мощность ×1; очки ×1.9; чувствительность к частицам ×1.",
        "Скрывает от 3 до 5 показателей сканера. Неизвестное значение не означает нулевое."
      ],
      "raw": {
        "type": "anomalyBehavior",
        "id": "FastUnknown",
        "earnPointModifier": 1.9,
        "pulseFrequencyModifier": 0.5,
        "description": "anomaly-behavior-fast",
        "components": [
          {
            "type": "SecretDataAnomaly",
            "randomStartSecretMin": 3,
            "randomStartSecretMax": 5
          }
        ]
      },
      "source": "Resources/Prototypes/Anomaly/behaviours.yml"
    },
    {
      "id": "InconstancyParticleUnknown",
      "name": "Обнаружено непостоянство. Со временем типы частиц могут поменяться.",
      "details": [
        "Интервал между импульсами ×1; мощность ×1; очки ×1.95; чувствительность к частицам ×1.",
        "Может перемешивать роли частиц при попадании частицы: вероятность 50%. Повторно сканируйте перед следующим воздействием.",
        "Скрывает от 3 до 5 показателей сканера. Неизвестное значение не означает нулевое."
      ],
      "raw": {
        "type": "anomalyBehavior",
        "id": "InconstancyParticleUnknown",
        "earnPointModifier": 1.95,
        "description": "anomaly-behavior-inconstancy",
        "components": [
          {
            "type": "ShuffleParticlesAnomaly",
            "shuffleOnParticleHit": true,
            "prob": 0.5
          },
          {
            "type": "SecretDataAnomaly",
            "randomStartSecretMin": 3,
            "randomStartSecretMax": 5
          }
        ]
      },
      "source": "Resources/Prototypes/Anomaly/behaviours.yml"
    },
    {
      "id": "InvisibilityJumping",
      "name": "Обнаружено искажение светового потока.",
      "details": [
        "Интервал между импульсами ×1; мощность ×1; очки ×1.95; чувствительность к частицам ×1.",
        "Перемещается с интервалом 15–25 с на 1–1 клетки. Перепроверяйте местоположение.",
        "Может становиться малозаметной; используйте локатор и следите за окружением."
      ],
      "raw": {
        "type": "anomalyBehavior",
        "id": "InvisibilityJumping",
        "earnPointModifier": 1.95,
        "description": "anomaly-behavior-invisibility",
        "components": [
          {
            "type": "ChaoticJump",
            "jumpMinInterval": 15,
            "jumpMaxInterval": 25,
            "rangeMin": 1,
            "rangeMax": 1,
            "effect": "PuddleSparkle"
          },
          {
            "type": "Stealth",
            "maxVisibility": 1.2
          },
          {
            "type": "StealthOnMove",
            "passiveVisibilityRate": -0.37,
            "movementVisibilityRate": 0.2
          }
        ]
      },
      "source": "Resources/Prototypes/Anomaly/behaviours.yml"
    }
  ],
  "generated": "2026-09-14"
};
