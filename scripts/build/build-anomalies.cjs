const fs=require('node:fs'),path=require('node:path'),YAML=require('yaml');
const root=require('../project-paths.cjs').gameRoot,read=p=>fs.readFileSync(path.join(root,p),'utf8');
const source='Resources/Prototypes/Entities/Structures/Specific/Anomaly/anomalies.yml',behaviorSource='Resources/Prototypes/Anomaly/behaviours.yml';
const parse=p=>YAML.parse(read(p).replace(/!type:\w+/g,'')),protos=parse(source),byId=new Map(protos.map(p=>[p.id,p]));
function resolve(id){const p=byId.get(id);if(!p)return [];const parent=p.parent?[p.parent].flat().flatMap(resolve):[];const m=new Map(parent.map(c=>[c.type,c]));for(const c of p.components||[])m.set(c.type,{...m.get(c.type),...c});return [...m.values()];}
const families={
  Pyroclastic:['Пирокластическая','Нагрев, огонь и огненные снаряды; при сильном развитии выделяет плазму.','Пожары и усиление тепловых эффектов.','Подготовьте пожарную защиту, огнетушитель и контроль атмосферы. Не размещайте горючие запасы рядом.'],
  Gravity:['Гравитационная','Воздействует на движение и разбрасывает объекты при импульсе.','Удаляет участки пола и сильнее разбрасывает объекты; возможна разгерметизация.','Закрепите оборудование, уберите свободные предметы и предусмотрите защиту от разгерметизации.'],
  Electricity:['Электрическая','Поражает током и выпускает молнии.','Усиленные разряды и электромагнитный импульс.','Используйте электрозащиту и дистанцию. Держите резервный сканер и батареи вне зоны воздействия.'],
  Flesh:['Плотяная','Создаёт плотяной пол, препятствия и враждебных существ.','Массовое появление плоти, существ и плотяной лозы. Даже при остановке возможны дополнительные существа.','Согласуйте прикрытие, оставьте свободный выход и не считайте исчезновение аномалии окончанием опасности.'],
  Bluespace:['Блюспейс','Телепортирует и перемешивает положение существ; меняет параметры портала.','Разбрасывает существ по случайным позициям на станции.','Держите связь с отделом, не работайте в одиночку и подготовьте защиту на случай опасного места телепортации.'],
  Ice:['Ледяная','Охлаждает атмосферу, создаёт ледяную корку и выпускает сосульки.','Криогенный взрыв; также предусмотрено выделение фрезона.','Подготовьте защиту от холода, контролируйте газовую смесь и избегайте обледеневших проходов.'],
  Rock:['Каменная','Меняет пол, создаёт породу, кристаллы и рудные варианты; среди созданного могут быть крабы.','Большое количество породы, кристаллов и рудных крабов.','Не застраивайте путь отхода оборудованием. Подготовьте инструмент для расчистки и прикрытие от существ.'],
  Flora:['Растительная','Создаёт травяной пол и растительность.','Разрастание флоры и появление агрессивного кудзу.','Ограничьте распространение растений, держите доступ к аномалии и проходы свободными.'],
  Liquid:['Жидкостная','Производит случайные реагенты, лужи и воздействует ими на существ.','Расширенное химическое воздействие и появление реагентных слизней.','Определите реагенты перед контактом. Не считайте жидкость лекарством по цвету; подготовьте уборку и медицинскую помощь.'],
  Shadow:['Теневая','Создаёт слабые теневые заросли.','Создаёт значительно больше теневых зарослей на большой площади.','Подготовьте освещение и средство расчистки. Следите за распространением за пределами места исследования.'],
  Tech:['Технологическая','Создаёт случайные сигнальные связи с устройствами и посылает сигналы по таймеру и при импульсах.','Массово связывает устройства; возможен эффект емага.','Удалите лишние управляемые устройства из окружения. После опыта проверьте шлюзы, сигнализацию и подключения.'],
  Santa:['Подарочная','Создаёт подарки и праздничные предметы, разбрасывает банки напитка.','Создаёт особые случайные подарки. Содержимое не гарантированно безопасно.','Разбирайте результаты отдельно от работающей установки. Это специальный вариант; наличие зависит от способа появления.']
};
const rockNames={Uranium:'уран',Bananium:'бананиум',Quartz:'кварц',Silver:'серебро',Gold:'золото',Iron:'железо',Coal:'уголь'};
const anomalies=protos.filter(p=>!p.abstract&&resolve(p.id).some(c=>c.type==='Anomaly')).map(p=>{
  const key=p.id.replace('Anomaly',''),family=key.startsWith('Rock')?'Rock':key,info=families[family];if(!info)throw Error('Unknown anomaly '+p.id);
  const components=resolve(p.id),core=components.find(c=>c.type==='Anomaly');
  return {id:p.id,name:info[0]+(family==='Rock'?' · '+rockNames[key.slice(4)]:''),family:info[0],effect:info[1],critical:info[2],advice:info[3],source,core:core.corePrototype,raw:p,components};
});
const loc={};for(const line of read('Resources/Locale/ru-RU/anomaly/anomaly.ftl').split(/\r?\n/)){const m=line.match(/^([\w-]+)\s*=\s*(.*)$/);if(m)loc[m[1]]=m[2].replace(/\[\/?[^\]]+\]/g,'');}
const behaviors=parse(behaviorSource).filter(p=>p.type==='anomalyBehavior').map(p=>{
  const details=[`Интервал между импульсами ×${p.pulseFrequencyModifier??1}; мощность ×${p.pulsePowerModifier??1}; очки ×${p.earnPointModifier??1}; чувствительность к частицам ×${p.particleSensivity??1}.`];
  for(const c of p.components||[]){
    if(c.type==='ShuffleParticlesAnomaly')details.push(`Может перемешивать роли частиц ${c.shuffleOnPulse?'при импульсе':'при попадании частицы'}: вероятность ${Math.round(c.prob*100)}%. Повторно сканируйте перед следующим воздействием.`);
    if(c.type==='SecretDataAnomaly')details.push(`Скрывает от ${c.randomStartSecretMin} до ${c.randomStartSecretMax} показателей сканера. Неизвестное значение не означает нулевое.`);
    if(c.type==='ChaoticJump')details.push(`Перемещается с интервалом ${c.jumpMinInterval}–${c.jumpMaxInterval} с на ${c.rangeMin}–${c.rangeMax} клетки. Перепроверяйте местоположение.`);
    if(c.type==='Stealth')details.push('Может становиться малозаметной; используйте локатор и следите за окружением.');
    if(c.type==='Reflect')details.push(`Отражает энергетические снаряды с вероятностью ${c.reflectProb*100}%. Не стойте на линии отражения.`);
  }
  return {id:p.id,name:loc[p.description]||p.id,details,raw:p,source:behaviorSource};
});
fs.writeFileSync(path.join(require('../project-paths.cjs').projectRoot, 'data/anomalies-data.js'),'window.ANOMALY_DATA = '+JSON.stringify({anomalies,behaviors,generated:new Date().toISOString().slice(0,10)},null,2)+';\n');
console.log(`${anomalies.length} anomaly variants; ${behaviors.length} behaviors`);
