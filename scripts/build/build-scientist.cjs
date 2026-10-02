const fs=require('node:fs'),path=require('node:path'),YAML=require('yaml');
const root=require('../project-paths.cjs').gameRoot,read=p=>fs.readFileSync(path.join(root,p),'utf8');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const locales={},descriptions={};
for(const file of walk(path.join(root,'Resources/Locale/ru-RU')).filter(p=>p.endsWith('.ftl'))){
  let key='';for(const line of fs.readFileSync(file,'utf8').split(/\r?\n/)){
    const entry=line.match(/^([\w-]+)\s*=\s*(.*)$/);if(entry){key=entry[1];if(entry[2])locales[key]=entry[2];}
    const desc=line.match(/^\s+\.desc\s*=\s*(.+)$/);if(desc)descriptions[key]=desc[1];
  }
}
const triggerSource='Resources/Prototypes/XenoArch/triggers.yml',effectSource='Resources/Prototypes/XenoArch/effects.yml';
const parse=p=>YAML.parse(read(p).replace(/!type:[\w]+/g,''));
const triggers=parse(triggerSource),effects=parse(effectSource),weights=triggers.find(p=>p.id==='DefaultTriggers').weights;
const gasNames={Oxygen:'кислород',WaterVapor:'водяной пар',CarbonDioxide:'диоксид углерода',Plasma:'плазма',Tritium:'тритий',Ammonia:'аммиак',NitrousOxide:'оксид азота',Frezon:'фрезон'};
const reagentNames={};
// Existing recipe data contains reagent names resolved from this same checkout.
const vm=require('node:vm'),context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(require('../project-paths.cjs').projectRoot, 'data/recipes.js'),'utf8'),context);
for(const r of context.window.RECIPE_DATA.recipes)for(const i of [...r.ingredients,...r.outputs])if(i.key.startsWith('reagent:'))reagentNames[i.id]=i.name;
const spawnNames={RandomFloraTree:'Случайное дерево',RandomInstruments:'Случайный музыкальный инструмент',RandomAnomalySpawner:'Случайная аномалия',RandomArtifactSpawner:'Случайный артефакт',GenericTrashItems:'Перерабатываемый мусор',AllPlushiesTable:'Плюшевые игрушки'};
const reagent=id=>reagentNames[id]||id,entity=id=>locales['ent-'+id]||spawnNames[id]||id;
const toolNames={Anchoring:'Гаечный ключ',Prying:'Лом',Screwing:'Отвёртка',Pulsing:'Мультитул'};
function explainTrigger(p){
  const steps=[],groups=[];
  for(const c of p.components){switch(c.type){
    case 'XATCompNearby':steps.push(`Играйте на музыкальном инструменте в радиусе ${c.radius} клеток от артефакта. Нужен активный инструмент, а не просто речь или звук рации.`);groups.push('Окружение');break;
    case 'XATTemperature':steps.push(`Измените температуру газа на клетке артефакта до ${c.triggerOnHigherTemp?'не ниже':'не выше'} ${c.targetTemperature} K (${(c.targetTemperature-273.15).toFixed(2)} °C). Проверяется атмосфера, а не температура предмета в руке.`);groups.push('Атмосфера');break;
    case 'XATDamageThresholdReached':steps.push(`Нанесите артефакту суммарно ${Object.entries(c.typesNeeded||c.groupsNeeded).map(([k,v])=>`${v} ед. ${({Heat:'теплового урона',Cold:'урона холодом',Radiation:'радиационного урона',Brute:'физического урона (ушибы, порезы, уколы)'})[k]||k}`).join(', ')}. Урон от самого артефакта не учитывается.`);groups.push('Воздействие');break;
    case 'XATGas':steps.push(c.shouldBePresent===false?`Снизьте количество кислорода на клетке артефакта до ${c.moles} моль или меньше. Полное отсутствие кислорода не обязательно.`:`Подайте газ «${gasNames[c.targetGas]||c.targetGas}» на клетку артефакта. Порог — ${c.moles||'0,1 × стандартное количество молей в клетке'}; проверяется количество газа, не процент состава.`);groups.push('Атмосфера');break;
    case 'XATReactive':steps.push(`Обеспечьте контакт (Touch) артефакта минимум с ${c.minQuantity||5} ед. одного из реагентов: ${c.reagents.map(reagent).join(', ')}. Подходит обливание; держать ёмкость рядом недостаточно. Порог относится к одному событию контакта, а не сумме мелких порций.`);groups.push('Реагенты');break;
    case 'XATPressure':steps.push(`Измените давление газа на клетке артефакта: ${c.maxPressureThreshold?'не ниже '+c.maxPressureThreshold:'не выше '+c.minPressureThreshold} кПа. Используйте изолированную испытательную камеру и газовый анализатор.`);groups.push('Атмосфера');break;
    case 'XATExamine':steps.push('Подойдите к артефакту на дистанцию подробного осмотра и используйте «Осмотреть» (обычно Shift + клик). Осмотр призраком не учитывается.');groups.push('Действия');break;
    case 'XATInteraction':steps.push('Взаимодействуйте с артефактом. Этот вариант задан в прототипах, но исключён из DefaultTriggers.');groups.push('Действия');break;
    case 'XATToolUse':steps.push(`${toolNames[c.requiredTool]||c.requiredTool}: примените инструмент к артефакту и завершите действие. Базовое время — ${c.delay||3} с, фактическое зависит от скорости инструмента.`);groups.push('Инструменты');break;
    case 'XATExaminableText':steps.push('Подсказка при осмотре: '+locales[c.examineText]);break;
    case 'XATTimer':steps.push(`Между срабатываниями таймера выбирается случайная задержка ${c.possibleDelayInSeconds.min}–${c.possibleDelayInSeconds.max} с. Осмотрите артефакт вблизи: число в описании показывает оставшиеся секунды до следующей попытки.`);groups.push('Действия');break;
    case 'XATItemLand':steps.push('Бросьте сам ручной артефакт и дождитесь его приземления. Удар другим брошенным предметом — иной стимул. Этот вариант доступен только артефактам-предметам.');groups.push('Действия');break;
    case 'XATDeath':steps.push('Требуется событие смерти существа в радиусе 15 клеток. Уже лежащий труп сам по себе не создаёт новое событие смерти.');groups.push('Окружение');break;
    case 'XATMagnet':steps.push('Разместите включённые магнитные ботинки в радиусе 2 клеток либо активируйте утилизационный магнит в радиусе 40 клеток. Для большого магнита учитывается момент активации.');groups.push('Окружение');break;
    default:throw Error('Unknown trigger component '+c.type);
  }}return {steps,group:groups[0]||'Действия'};
}
const applied={RadioMicrophone:'Получает возможность радиосвязи.',Instrument:'Превращается в музыкальный инструмент.',Storage:'Получает внутреннее хранилище.',RandomWalk:'Самостоятельно и хаотично перемещается.',SolutionContainerManager:'Становится ёмкостью для раствора: 150 единиц.',HeldSpeedModifier:'Ускоряет держателя: ходьба ×1,2, бег ×1,3.',MeleeWeapon:'Работает как режущий инструмент / дрель; урон: 18 колющего и 4 ушибами.',PowerSupplier:'Вырабатывает 20 000 единиц мощности при подключении к высоковольтной сети.',Gun:'Получает свойства огнестрельного оружия с патронами Magnum.',GhostRole:'Может быть занят призраком: артефакт сможет двигаться и говорить.',MultipleTool:'Работает как переключаемый набор инструментов: отвёртка, лом, ключ, кусачки и мультитул; множитель скорости 2.',RadiationSource:'Становится постоянным источником радиации.',GravityWell:'Создаёт поле, которое перемещает окружающие объекты.',Stealth:'Становится менее заметным в покое; движение повышает видимость.'};
const effectText={
  XAERemoveCollision:'Убирает столкновения: артефакт может проходить через препятствия.',
  XAETelepathic:'Передаёт сообщения находящимся рядом персонажам. Послание само по себе не означает нанесение урона.',
  XAELightFlicker:'Заставляет освещение рядом мерцать.',
  XAEThrowThingsAround:'Разбрасывает окружающие предметы. Закрепите оборудование и уберите свободные опасные предметы.',
  XAEChargeBattery:'Заряжает батареи в области действия.',
  XAEKnock:'Открывает двери вокруг. Учитывайте доступ из испытательной камеры в соседние помещения.',
  XAEIgnite:'Поджигает объекты в радиусе действия. Подготовьте средства тушения до испытания.',
  XAERandomTeleportInvoker:'Телепортирует сам артефакт на случайное расстояние от 6 до 15 клеток.',
  XAEEmpInArea:'Создаёт электромагнитный импульс: может нарушить работу электроники и батарей рядом.',
  XAEPolymorph:'Временно превращает существ в радиусе 2 клеток в другую форму.',
  XAEPortal:'Создаёт временный блюспейс-портал.',
  XAEShuffle:'Меняет местами разумных существ вокруг.',
  XAETriggerExplosives:'Вызывает взрыв. Вид и интенсивность определяются параметрами узла.',
};
const extraNames={XenoArtifactEffectUniversalIntercom:'Дистанционная связь',XenoArtifactBecomeRandomInstrument:'Становится музыкальным инструментом',XenoArtifactStorage:'Внутреннее хранилище',XenoArtifactGenerateEnergy:'Производит электроэнергию',XenoArtifactGun:'Становится огнестрельным оружием',XenoArtifactRareMaterialSpawn:'Создаёт случайную руду',XenoArtifactChemicalPuddle:'Создаёт лужу базовых реагентов',XenoArtifactFoamMild:'Создаёт пену со случайным реагентом',XenoArtifactFoamGood:'Создаёт пену с лекарством',XenoArtifactFoamDangerous:'Создаёт пену с опасным реагентом',XenoArtifactPuddleRare:'Создаёт лужу редких реагентов',XenoArtifactTesla:'Массовое разрушение: сингулярность',XenoArtifactSingularity:'Неминуемая гибель: тесла'};
const defaultEffects=new Set(effects.find(p=>p.id==='XenoArtifactEffectsDefaultTable').table.children.map(c=>c.id));
const polymorphs=parse('Resources/Prototypes/Polymorphs/polymorph.yml');
const handheldEffects=new Set(effects.find(p=>p.id==='XenoArtifactEffectsHandheldOnlyTable').table.children.map(c=>c.id));
function entries(node){return [node,...(node.children||[]).flatMap(entries)];}
function explainEffect(p){
  const steps=[],chemicals=[],spawned=[];
  for(const c of p.components||[]){
    if(c.type==='XAEPolymorph'){
      const poly=polymorphs.find(v=>v.id===(c.polymorphPrototypeName||'ArtifactMonkey')).configuration;
      steps.push(`Превращает существ в радиусе ${c.range||2} клеток в «${entity(poly.entity)}» (${poly.entity}) на ${poly.duration} секунд. Возврат также предусмотрен при критическом состоянии или смерти.`);
    }else if(effectText[c.type])steps.push(effectText[c.type]);
    else if(c.type==='XAETemperature')steps.push(`Меняет температуру газа на своей и соседних клетках в сторону ${c.targetTemp} K (${(c.targetTemp-273.15).toFixed(2)} °C), шагом до ${c.spawnTemp||100} K за активацию. Целевая температура достигается не обязательно за один раз.`);
    else if(c.type==='XAECreateGas')steps.push('Выделяет газ: '+Object.entries(c.gases).map(([id,n])=>`${gasNames[id]||id} — ${n} моль`).join(', ')+'. Меняет состав и давление атмосферы.');
    else if(c.type==='XAECreatePuddle'){steps.push(`Создаёт лужу с ${c.chemAmount.min}–${c.chemAmount.max} выбранными реагентами из списка ниже. Состав выбирается для узла; список не означает, что все вещества появятся одновременно.`);chemicals.push(...c.possibleChemicals);}
    else if(c.type==='XAEFoam'){steps.push('Пена содержит один выбранный для узла реагент из списка ниже. Подсказка анализатора может сразу показывать выбранное вещество. Название «полезная» или «мягкая» не гарантирует безопасность контакта.');chemicals.push(...c.reagents);}
    else if(c.type==='XAEDamageInArea')steps.push(p.id==='XenoArtifactHealAll'?'В радиусе 8 клеток лечит по 100 единиц ушибов, порезов, уколов, теплового, холодового и электрического урона. Не является лечением всех типов повреждений.':'Повреждает окна вокруг: шанс 75% для подходящего объекта, 200 структурного урона. Возможна разгерметизация.');
    else if(c.type==='XAEApplyComponents'){
      for(const a of c.components){
        if(applied[a.type])steps.push(applied[a.type]+(a.type==='RadiationSource'?` Интенсивность: ${a.intensity}.`:a.type==='GravityWell'?` Радиус ${a.maxRange} клетки; ${a.baseRadialAcceleration<0?'отталкивает':'притягивает'}.`:''));
        if(a.type==='EntityTableSpawner'){
          const list=entries(a.table).filter(v=>v.id||v.tableId);spawned.push(...list.map(v=>({id:v.id||v.tableId,name:entity(v.id||v.tableId),probability:v.prob,weight:v.weight,rolls:v.rolls,amount:v.amount})));
          steps.push('Создаёт предметы или существ из таблицы вариантов ниже. Состав зависит от случайного выбора; весь список одновременно не гарантирован.');
        }
      }
    }else if(!['XenoArtifactNode','Explosive'].includes(c.type))throw Error('Unknown effect '+c.type);
  }
  if(!steps.length)throw Error('No explanation '+p.id);
  const group=chemicals.length?'Химия':p.components.some(c=>c.type==='XAECreateGas'||c.type==='XAETemperature')?'Атмосфера':spawned.length?'Создание':p.components.some(c=>['XAETriggerExplosives','XAEIgnite','XAEEmpInArea','XAEDamageInArea'].includes(c.type))?'Воздействие':'Свойства и перемещение';
  return {steps:[...new Set(steps)],group,chemicals:[...new Set(chemicals)].map(id=>({id,name:reagent(id)})),spawned};
}
const data={source:triggerSource,effectSource,generated:new Date().toISOString().slice(0,10),
  triggers:triggers.filter(p=>p.type==='xenoArchTrigger').map(p=>({id:p.id,name:locales[p.tip]||p.tip,active:!!weights[p.id],status:weights[p.id]?'Стандартная генерация':'Вне стандартной генерации',...explainTrigger(p),raw:p,source:triggerSource})),
  effects:effects.filter(p=>p.type==='entity'&&!p.abstract).map(p=>({id:p.id,name:descriptions['ent-'+p.id]||extraNames[p.id]||p.description,active:defaultEffects.has(p.id)||handheldEffects.has(p.id),status:defaultEffects.has(p.id)?'Стандартная генерация':handheldEffects.has(p.id)?'Только ручные артефакты':'Вне стандартных таблиц',...explainEffect(p),raw:p,source:effectSource})),
};
fs.writeFileSync(path.join(require('../project-paths.cjs').projectRoot, 'data/scientist-data.js'),'window.SCIENTIST_DATA = '+JSON.stringify(data,null,2)+';\n');
console.log(`${data.triggers.length} triggers; ${data.effects.length} effects`);
