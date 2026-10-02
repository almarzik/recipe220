// The species graph and plant effects come from the same prototypes as recipes.
module.exports = function buildBotany({ prototypes, reagents, locales, ingredient }) {
  const translate = key => locales[key] || key;
  const seeds = [...prototypes.values()].filter(p=>p.type==='seed');
  const plants=seeds.map(p=>({
    id:p.id,name:translate(p.displayName||p.name||p.id),seedName:translate(p.name||p.id),
    packet:p.packetPrototype?ingredient('entity',p.packetPrototype):null,
    products:(p.productPrototypes||[]).map(id=>ingredient('entity',id)),
    mutations:p.mutationPrototypes||[],source:p._source,
    chemicals:Object.entries(p.chemicals||{}).map(([id,quantity])=>({...ingredient('reagent',id),...quantity})),
    potency:p.potency??1,yield:p.yield??0,harvestRepeat:p.harvestRepeat??'NoRepeat',
    aliases:p.id==='meatwheat'?['мясная пшеница','мясопшеница']:[]
  }));
  const random=prototypes.get('RandomPlantMutationList:RandomPlantMutations');
  const mutationNames={Sentient:'Разумность',Slippery:'Скользкие плоды',ChangeSpecies:'Смена вида',Unviable:'Нежизнеспособность',ChangeWaterConsumption:'Расход воды',ChangeNutrientConsumption:'Расход питательных веществ',ChangeIdealHeat:'Предпочитаемая температура',ChangeHeatTolerance:'Переносимость температуры',ChangeToxinsTolerance:'Устойчивость к токсинам',ChangeLowPressureTolerance:'Переносимость низкого давления',ChangeHighPressureTolerance:'Переносимость высокого давления',ChangePestTolerance:'Устойчивость к вредителям',ChangeWeedTolerance:'Устойчивость к сорнякам',ChangeEndurance:'Выносливость',ChangeYield:'Урожайность',ChangeLifespan:'Продолжительность жизни',ChangeMaturation:'Время созревания',ChangeProduction:'Интервал урожая',ChangePotency:'Потенция',ChangeSeedless:'Бессемянность',Lignification:'Одревеснение',Kudzufication:'Кудзу',ChangeScreaming:'Крик',ChangeChemicals:'Состав реагентов в урожае',ChangeExudeGasses:'Выделение газов',ChangeConsumeGasses:'Поглощение газов',ChangeHarvest:'Повторяемость урожая'};
  const attributes={PlantAdjustHealth:'Здоровье',PlantAdjustToxins:'Токсины',PlantAdjustNutrition:'Питание',PlantAdjustWater:'Вода',PlantAdjustPests:'Вредители',PlantAdjustWeeds:'Сорняки',PlantAdjustMutationLevel:'Уровень мутации',PlantAdjustMutationMod:'Модификатор мутаций',PlantAdjustPotency:'Потенция',PlantAdjustYield:'Урожайность',PlantAffectGrowth:'Рост'};
  const special={PlantCryoxadone:'Омолаживает живое растение, сдвигает время следующего урожая и пропускает один цикл старения.',PlantRestoreSeeds:'Восстанавливает способность давать семена.',PlantMutateChemicals:'Случайно добавляет реагент в урожай или увеличивает его максимальное содержание.',RobustHarvest:'Повышает потенцию на 3 до 50. Выше 30 делает растение бессемянным; при достигнутом пределе есть шанс 10% уменьшить урожайность, если она больше 1.',PlantDiethylamine:'Две независимые проверки с шансом 10%: +1 к сроку жизни и +1 к выносливости живого изменяемого растения.',PlantPhalanximine:'Возвращает жизнеспособность семенам живого изменяемого растения.',PlantRemoveKudzu:'Удаляет кудзу.',PlantMutateSpeciesChange:'Случайно выбирает другой вид из списка мутаций растения.'};
  const plantReagents=[...reagents.values()].filter(p=>p.plantMetabolism?.length).map(p=>({
    ...ingredient('reagent',p.id),source:p._source,description:translate(p.desc||''),
    effects:p.plantMetabolism.map(e=>({type:e.__effect,label:attributes[e.__effect]||special[e.__effect]||('Особый эффект: '+e.__effect),amount:e.amount,probability:e.probability??1,conditions:e.conditions||[],raw:e}))
  }));
  const chemicalPool=prototypes.get('weightedRandomFillSolution:RandomPickBotanyReagent');
  return {
    plants,plantReagents,
    randomMutations:(random?.mutations||[]).map(m=>({...m,label:mutationNames[m.name]||translate(m.description||m.name),source:random._source})),
    randomChemicals:(chemicalPool?.fills||[]).flatMap(group=>(group.reagents||[]).map(id=>({...ingredient('reagent',id),weight:group.weight,maxRoll:group.quantity}))),
    sources:['Content.Server/Botany/Systems/MutationSystem.cs','Content.Server/Botany/Systems/PlantHolderSystem.cs','Content.Server/EntityEffects/Effects/Botany/PlantMutateSpeciesChangeEntityEffectSystem.cs','Content.Server/EntityEffects/Effects/Botany/PlantAttributes/PlantCryoxadoneEntityEffectSystem.cs','Content.Server/EntityEffects/Effects/Botany/PlantMutateChemicalsEntityEffectSystem.cs']
  };
};
