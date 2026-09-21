window.ENGINEERING_DATA = {
  "gases": [
    {
      "type": "gas",
      "id": "Oxygen",
      "name": "Кислород",
      "abbreviation": "gas-oxygen-abbreviation",
      "molarHeatCapacity": 20,
      "heatCapacityRatio": 1.4,
      "molarMass": 32,
      "color": "#2887E8",
      "reagent": "Oxygen",
      "pricePerMole": 0,
      "isOxidizer": true,
      "source": "Resources/Prototypes/Atmospherics/gases.yml"
    },
    {
      "type": "gas",
      "id": "Nitrogen",
      "name": "Азот",
      "abbreviation": "gas-nitrogen-abbreviation",
      "molarHeatCapacity": 30,
      "heatCapacityRatio": 1.4,
      "molarMass": 28,
      "color": "#DA1010",
      "reagent": "Nitrogen",
      "pricePerMole": 0,
      "source": "Resources/Prototypes/Atmospherics/gases.yml"
    },
    {
      "type": "gas",
      "id": "CarbonDioxide",
      "name": "Диоксид углерода",
      "abbreviation": "gas-carbon-dioxide-abbreviation",
      "molarHeatCapacity": 30,
      "heatCapacityRatio": 1.3,
      "molarMass": 44,
      "color": "#4e4e4e",
      "reagent": "CarbonDioxide",
      "pricePerMole": 0,
      "source": "Resources/Prototypes/Atmospherics/gases.yml"
    },
    {
      "type": "gas",
      "id": "Plasma",
      "name": "Плазма",
      "abbreviation": "gas-plasma-abbreviation",
      "molarHeatCapacity": 200,
      "heatCapacityRatio": 1.7,
      "molarMass": 120,
      "gasOverlaySprite": {
        "sprite": "/Textures/SS220/Effects/atmospherics.rsi",
        "state": "plasma"
      },
      "color": "#FF3300",
      "reagent": "Plasma",
      "pricePerMole": 0,
      "isFuel": true,
      "source": "Resources/Prototypes/Atmospherics/gases.yml"
    },
    {
      "type": "gas",
      "id": "Tritium",
      "name": "Тритий",
      "abbreviation": "gas-tritium-abbreviation",
      "molarHeatCapacity": 10,
      "heatCapacityRatio": 1.3,
      "molarMass": 6,
      "gasOverlaySprite": {
        "sprite": "/Textures/SS220/Effects/atmospherics.rsi",
        "state": "tritium"
      },
      "color": "#3BBF58",
      "reagent": "Tritium",
      "pricePerMole": 2.5,
      "isFuel": true,
      "source": "Resources/Prototypes/Atmospherics/gases.yml"
    },
    {
      "type": "gas",
      "id": "WaterVapor",
      "name": "Водяной пар",
      "abbreviation": "gas-water-vapor-abbreviation",
      "molarHeatCapacity": 40,
      "heatCapacityRatio": 1.33,
      "molarMass": 18,
      "gasOverlaySprite": {
        "sprite": "/Textures/SS220/Effects/atmospherics.rsi",
        "state": "water_vapor"
      },
      "color": "#9BBFBE",
      "reagent": "Water",
      "pricePerMole": 0,
      "source": "Resources/Prototypes/Atmospherics/gases.yml"
    },
    {
      "type": "gas",
      "id": "Ammonia",
      "name": "Аммиак",
      "abbreviation": "gas-ammonia-abbreviation",
      "molarHeatCapacity": 20,
      "heatCapacityRatio": 1.4,
      "molarMass": 44,
      "gasOverlaySprite": {
        "sprite": "/Textures/SS220/Effects/atmospherics.rsi",
        "state": "miasma"
      },
      "gasMolesVisible": 2,
      "gasVisibilityFactor": 3.5,
      "color": "#56941E",
      "reagent": "Ammonia",
      "pricePerMole": 0.15,
      "source": "Resources/Prototypes/Atmospherics/gases.yml"
    },
    {
      "type": "gas",
      "id": "NitrousOxide",
      "name": "Оксид азота",
      "abbreviation": "gas-nitrous-oxide-abbreviation",
      "molarHeatCapacity": 40,
      "heatCapacityRatio": 1.3,
      "molarMass": 44,
      "color": "#8F00FF",
      "reagent": "NitrousOxide",
      "pricePerMole": 1,
      "source": "Resources/Prototypes/Atmospherics/gases.yml"
    },
    {
      "type": "gas",
      "id": "Frezon",
      "name": "Фрезон",
      "abbreviation": "gas-frezon-abbreviation",
      "molarHeatCapacity": 600,
      "heatCapacityRatio": 1.33,
      "molarMass": 50,
      "gasOverlaySprite": {
        "sprite": "/Textures/SS220/Effects/atmospherics.rsi",
        "state": "frezon"
      },
      "gasMolesVisible": 0.6,
      "color": "#3a758c",
      "reagent": "Frezon",
      "pricePerMole": 2.5,
      "source": "Resources/Prototypes/Atmospherics/gases.yml"
    }
  ],
  "reactions": [
    {
      "type": "gasReaction",
      "id": "PlasmaFire",
      "priority": -2,
      "minimumTemperature": 373.149,
      "minimumRequirements": {
        "Oxygen": 0.01,
        "Plasma": 0.01
      },
      "effects": [
        {
          "type": "PlasmaFireReaction"
        }
      ],
      "source": "Resources/Prototypes/Atmospherics/reactions.yml"
    },
    {
      "type": "gasReaction",
      "id": "TritiumFire",
      "priority": -1,
      "minimumTemperature": 373.149,
      "minimumRequirements": {
        "Oxygen": 0.01,
        "Tritium": 0.01
      },
      "effects": [
        {
          "type": "TritiumFireReaction"
        }
      ],
      "source": "Resources/Prototypes/Atmospherics/reactions.yml"
    },
    {
      "type": "gasReaction",
      "id": "FrezonCoolant",
      "priority": 1,
      "minimumTemperature": 23.15,
      "minimumRequirements": {
        "Nitrogen": 0.01,
        "Frezon": 0.01
      },
      "effects": [
        {
          "type": "FrezonCoolantReaction"
        }
      ],
      "source": "Resources/Prototypes/Atmospherics/reactions.yml"
    },
    {
      "type": "gasReaction",
      "id": "FrezonProduction",
      "priority": 2,
      "maximumTemperature": 73.15,
      "minimumRequirements": {
        "Oxygen": 0.01,
        "Nitrogen": 0.01,
        "Tritium": 0.01
      },
      "effects": [
        {
          "type": "FrezonProductionReaction"
        }
      ],
      "source": "Resources/Prototypes/Atmospherics/reactions.yml"
    },
    {
      "type": "gasReaction",
      "id": "AmmoniaOxygenReaction",
      "priority": 2,
      "minimumTemperature": 323.149,
      "minimumRequirements": {
        "Oxygen": 0.01,
        "Ammonia": 0.01
      },
      "effects": [
        {
          "type": "AmmoniaOxygenReaction"
        }
      ],
      "source": "Resources/Prototypes/Atmospherics/reactions.yml"
    },
    {
      "type": "gasReaction",
      "id": "N2ODecomposition",
      "priority": 0,
      "minimumTemperature": 850,
      "minimumRequirements": {
        "NitrousOxide": 0.01
      },
      "effects": [
        {
          "type": "N2ODecompositionReaction"
        }
      ],
      "source": "Resources/Prototypes/Atmospherics/reactions.yml"
    }
  ],
  "constants": {
    "R": 8.314462618,
    "T0C": 273.15,
    "SuperSaturationThreshold": 96,
    "SuperSaturationEnds": 32,
    "PlasmaMinimumBurnTemperature": 373.15,
    "PlasmaUpperTemperature": 1643.15,
    "OxygenBurnRateBase": 1.4,
    "PlasmaOxygenFullburn": 10,
    "PlasmaBurnRateDelta": 9,
    "FirePlasmaEnergyReleased": 160000,
    "MinimumTritiumOxyburnEnergy": 143000,
    "TritiumBurnOxyFactor": 100,
    "TritiumBurnTritFactor": 10,
    "TritiumBurnFuelRatio": 2,
    "FireHydrogenEnergyReleased": 2840000,
    "FrezonProductionMaxEfficiencyTemperature": 73.15,
    "FrezonProductionNitrogenRatio": 10,
    "FrezonProductionTritRatio": 50,
    "FrezonProductionConversionRate": 50,
    "FrezonCoolLowerTemperature": 23.15,
    "FrezonCoolMidTemperature": 373.15,
    "FrezonNitrogenCoolRatio": 5,
    "FrezonCoolEnergyReleased": -600000,
    "N2ODecompositionRate": 2,
    "AmmoniaOxygenReactionRate": 10
  },
  "images": {
    "Oxygen": {
      "layers": [
        {
          "src": "assets/84179c65828c245d446c.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        }
      ],
      "prototype": "OxygenCanister"
    },
    "Nitrogen": {
      "layers": [
        {
          "src": "assets/41e36089cf71d12dc1df.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        }
      ],
      "prototype": "NitrogenCanister"
    },
    "CarbonDioxide": {
      "layers": [
        {
          "src": "assets/620b926711351a272988.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        }
      ],
      "prototype": "CarbonDioxideCanister"
    },
    "Plasma": {
      "layers": [
        {
          "src": "assets/e4485a89f352775d83bd.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        }
      ],
      "prototype": "PlasmaCanister"
    },
    "Tritium": {
      "layers": [
        {
          "src": "assets/56b73556235b88e4f151.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        }
      ],
      "prototype": "TritiumCanister"
    },
    "WaterVapor": {
      "layers": [
        {
          "src": "assets/930086866600bb4bece9.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        }
      ],
      "prototype": "WaterVaporCanister"
    },
    "Ammonia": {
      "layers": [
        {
          "src": "assets/f09e71b477aac30b3c08.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        }
      ],
      "prototype": "AmmoniaCanister"
    },
    "NitrousOxide": {
      "layers": [
        {
          "src": "assets/e1ef4ac434e0a027b766.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        }
      ],
      "prototype": "NitrousOxideCanister"
    },
    "Frezon": {
      "layers": [
        {
          "src": "assets/e33aab16ff6f38cb884c.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        }
      ],
      "prototype": "FrezonCanister"
    },
    "PlasmaFire": {
      "layers": [
        {
          "src": "assets/e4485a89f352775d83bd.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        }
      ],
      "prototype": "PlasmaCanister"
    },
    "TritiumFire": {
      "layers": [
        {
          "src": "assets/56b73556235b88e4f151.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        }
      ],
      "prototype": "TritiumCanister"
    },
    "FrezonProduction": {
      "layers": [
        {
          "src": "assets/e33aab16ff6f38cb884c.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        }
      ],
      "prototype": "FrezonCanister"
    },
    "FrezonCoolant": {
      "layers": [
        {
          "src": "assets/eacf2e784061acdcd7be.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        },
        {
          "src": "assets/1888455377c8f5561168.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        },
        {
          "src": "assets/3f28e738494aef75ea05.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        },
        {
          "src": "assets/eba3cffd5666514eb43c.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 192,
          "sheetHeight": 192
        }
      ],
      "prototype": "GasThermoMachineFreezer"
    },
    "AmmoniaOxygenReaction": {
      "layers": [
        {
          "src": "assets/f09e71b477aac30b3c08.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        }
      ],
      "prototype": "AmmoniaCanister"
    },
    "N2ODecomposition": {
      "layers": [
        {
          "src": "assets/e1ef4ac434e0a027b766.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        }
      ],
      "prototype": "NitrousOxideCanister"
    },
    "sm": {
      "layers": [
        {
          "src": "assets/4e5c3dd2efbb9af4f8fc.png",
          "width": 32,
          "height": 48,
          "sheetWidth": 96,
          "sheetHeight": 48
        },
        {
          "src": "assets/2de115cf60227ddcd5ff.png",
          "width": 32,
          "height": 48,
          "sheetWidth": 128,
          "sheetHeight": 48
        }
      ],
      "prototype": "SuperMatterCrystal"
    },
    "emitter": {
      "layers": [
        {
          "src": "assets/60b2b53f155508943fb7.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        },
        {
          "src": "assets/c9ef5f387dffd7d16f13.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        }
      ],
      "prototype": "SMEmitter"
    },
    "economy": {
      "layers": [
        {
          "src": "assets/e33aab16ff6f38cb884c.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        }
      ],
      "prototype": "FrezonCanister"
    },
    "calculator": {
      "layers": [
        {
          "src": "assets/8b3612d046b358afe81f.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        },
        {
          "src": "assets/f3d26b3341765c3d8f4d.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        }
      ],
      "prototype": "GasMixer"
    },
    "equipment-0": {
      "layers": [
        {
          "src": "assets/94e3bff31a7ca5cd7256.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        }
      ],
      "prototype": "GasAnalyzer"
    },
    "equipment-1": {
      "layers": [
        {
          "src": "assets/8b3612d046b358afe81f.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        },
        {
          "src": "assets/f3d26b3341765c3d8f4d.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        }
      ],
      "prototype": "GasMixer"
    },
    "equipment-2": {
      "layers": [
        {
          "src": "assets/8b3612d046b358afe81f.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        },
        {
          "src": "assets/73333fb7dd6c52e48f31.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        }
      ],
      "prototype": "GasFilter"
    },
    "equipment-3": {
      "layers": [
        {
          "src": "assets/ac4f2afb308288019ffd.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        },
        {
          "src": "assets/a4bfb663a9380043ed53.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        }
      ],
      "prototype": "GasPressurePump"
    },
    "equipment-4": {
      "layers": [
        {
          "src": "assets/ac4f2afb308288019ffd.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        },
        {
          "src": "assets/30506dc7ddbea4f92e2f.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        }
      ],
      "prototype": "GasValve"
    },
    "equipment-5": {
      "layers": [
        {
          "src": "assets/833eaa0604ae3d865680.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        },
        {
          "src": "assets/6e3d2cd78d3353cc83d4.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        },
        {
          "src": "assets/3f28e738494aef75ea05.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        },
        {
          "src": "assets/b4b3cb5b50d52afecf44.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 192,
          "sheetHeight": 192
        }
      ],
      "prototype": "GasThermoMachineHeater"
    },
    "equipment-6": {
      "layers": [
        {
          "src": "assets/cd17e04a65263cd050f0.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        },
        {
          "src": "assets/9cd992b103ece39cf91f.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        }
      ],
      "prototype": "GasVentScrubber"
    },
    "equipment-7": {
      "layers": [
        {
          "src": "assets/797eaf368f1d8880c11a.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        }
      ],
      "prototype": "StorageCanister"
    },
    "equipment-8": {
      "layers": [
        {
          "src": "assets/c7f353a293373ca3f14c.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        },
        {
          "src": "assets/3b1cd978a313f84b3fdd.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 128,
          "sheetHeight": 64
        },
        {
          "src": "assets/b1be5c285b13ad5b1c7f.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        }
      ],
      "prototype": "GasRecycler"
    },
    "equipment-9": {
      "layers": [
        {
          "src": "assets/411c60059df24c84f321.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        },
        {
          "src": "assets/b7acc9399f55f28b6394.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        },
        {
          "src": "assets/c967b9d889497d765bf5.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        },
        {
          "src": "assets/29377c65082b94a609c0.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        }
      ],
      "prototype": "BaseGasCondenser"
    },
    "practice-0": {
      "layers": [
        {
          "src": "assets/ac4f2afb308288019ffd.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        },
        {
          "src": "assets/30506dc7ddbea4f92e2f.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        }
      ],
      "prototype": "GasValve"
    },
    "practice-1": {
      "layers": [
        {
          "src": "assets/56b73556235b88e4f151.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        }
      ],
      "prototype": "TritiumCanister"
    },
    "practice-2": {
      "layers": [
        {
          "src": "assets/cd17e04a65263cd050f0.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        },
        {
          "src": "assets/7dcfb57f0a8a327dde62.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        }
      ],
      "prototype": "GasVentPump"
    },
    "practice-3": {
      "layers": [
        {
          "src": "assets/cd17e04a65263cd050f0.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        },
        {
          "src": "assets/9cd992b103ece39cf91f.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        }
      ],
      "prototype": "GasVentScrubber"
    },
    "practice-4": {
      "layers": [
        {
          "src": "assets/94e3bff31a7ca5cd7256.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 32,
          "sheetHeight": 32
        }
      ],
      "prototype": "GasAnalyzer"
    },
    "practice-5": {
      "layers": [
        {
          "src": "assets/8b3612d046b358afe81f.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        },
        {
          "src": "assets/f3d26b3341765c3d8f4d.png",
          "width": 32,
          "height": 32,
          "sheetWidth": 64,
          "sheetHeight": 64
        }
      ],
      "prototype": "GasMixer"
    }
  },
  "generated": "2026-09-16"
};
