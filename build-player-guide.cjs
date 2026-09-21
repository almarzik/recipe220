const fs=require('node:fs');
const path=require('node:path');
const raw=fs.readFileSync(path.join(__dirname,'player-guides/chemistry-original.txt'),'utf8');
const plain=raw.replace(/\[(?:\/?(?:head|italic|bold|color))(?:=[^\]]*)?\]/g,'').replace(/\r/g,'');
const labels={
  '1':['Подготовка рабочего места','Оборудование и порядок загрузки реагентов'],
  '1.1':['Помощь ботаникам','Необязательный этап · требуется дополнительный запас реагентов'],
  '2':['Механические повреждения','Бикаридин, бруизин, лацеринол и пунктураз'],
  '3':['Ожоги','Лепоразин, келотан, инсузин и пиразин'],
  '4':['Промежуточные реагенты','Хироналин, мутаген, соль, дексалин и аммиак'],
  '5':['Радиация, удушье и другие задачи','Аритразин, дексалин-плюс, физраствор и фалангимин'],
  '5.1':['Криогенная медицина','Церебрин, криоксадон и доксарубиксадон'],
  '6':['Кислоты и яды','Сигинат, дифенгидрамин и советы автора'],
  '8':['Дополнительные лекарства','Ницерголин и окулин · по необходимости'],
  '9':['Продвинутые расходники','Сети и нити · по желанию, с пополнением запасов'],
  'end':['После основной работы','Пополнение лекарств и дополнительные идеи автора']
};
const links={Бикаридин:'Bicaridine',Бруизин:'Bruizine',Лацеринол:'Lacerinol',Пунктураз:'Puncturase',Лепоразин:'Leporazine',Келотан:'Kelotane',Инсузин:'Insuzine',Пиразин:'Pyrazine',Аритразин:'Arithrazine','Дексалин +':'DexalinPlus',Физраствор:'Saline',Фалангимин:'Phalanximine',Церебрин:'Cerebrin',Криоксадон:'Cryoxadone',Доксарубиксадон:'Doxarubixadone',Сигинат:'Sigynate',Дифенгидрамин:'Diphenhydramine',Ницерголин:'Nicergoline',Окулин:'Oculine',Дермалин:'Dermaline','Транексамовая кислота':'TranexamicAcid',Криптобиолин:'Cryptobiolin',Мутаген:'UnstableMutagen','Left-4-zed':'Left4Zed',Диловен:'Dylovene'};
const stock=[];
for(const line of plain.split('\n')){
  const match=line.trim().match(/^(\d+)\s*-\s*([^-]+?)\s*-\s*(.+)$/);
  if(match)stock.push({amount:Number(match[1]),name:match[2].trim(),jugs:match[3].trim()});
}
const markers=[...plain.matchAll(/^(?:Этап\s+(\d+(?:\.\d+)?)|Конец)([^\n]*)/gm)];
const sections=markers.map((match,index)=>{
  const id=match[1]||'end';
  const content=plain.slice(match.index+match[0].length,markers[index+1]?.index??plain.length).trim();
  const blocks=[];let current;
  for(const line of content.split('\n').map(s=>s.trim()).filter(Boolean)){
    const recipe=Object.keys(links).find(name=>line.toLowerCase().startsWith(name.toLowerCase())&&/^(?:[:.]|\s+\d|,\s*\d|\s+по\s+\d|\s+[–—])/.test(line.slice(name.length)));
    const prepMatch=line.match(/^\*?Варим\s+\d+\s+(хироналина|мутагена|столовой соли|дексы|амиака|келотана)/i);
    const preparation=prepMatch?({хироналина:['Хироналин','Hyronalin'],мутагена:['Мутаген','UnstableMutagen'],'столовой соли':['Столовая соль','TableSalt'],дексы:['Дексалин','Dexalin'],амиака:['Аммиак','Ammonia'],келотана:['Келотан','Kelotane']}[prepMatch[1].toLowerCase()]):null;
    const special=line.startsWith('Совет!')?'Совет автора':line.startsWith('*Варим')?'Промежуточная заготовка':line.startsWith('Сети варим')?'Сети':line.startsWith('Нити варим')?'Нити':null;
    if(recipe||preparation||special||!current){current={title:recipe||preparation?.[0]||special||'Порядок работы',recipeId:recipe?'reaction:'+links[recipe]:preparation?'reaction:'+preparation[1]:null,paragraphs:[]};blocks.push(current);}
    const body=recipe?line.slice(recipe.length).replace(/^\s*[:.,–—]\s*/,''):line.replace(/^\*/,'');
    if(body)current.paragraphs.push(body);
  }
  return {id,...Object.fromEntries(['title','subtitle'].map((key,i)=>[key,labels[id][i]])),blocks};
});
const guide={id:'luna-chemistry',title:'Личный гайд на химку',author:'Травница Луна',source:'player-guides/chemistry-original.txt',stock,stockNote:'По автору: кувшины берутся из раздатчика химикатов, затем дополняются из химмастера. Звёздочки обозначают количество кувшинов из Химкомата; обозначения сохранены как в оригинале.',sections};
for(const section of sections)for(const [index,block] of section.blocks.entries()){
  block.cardId=`player:${guide.id}:${section.id}:${index}`;
  block.batch=require('./player-batches.cjs')(section.id,block);
}
const cards=sections.flatMap(section=>section.blocks.filter(b=>b.batch).map(b=>({id:b.cardId,name:b.title,category:'chem',playerGuide:true,author:guide.author,stage:section.id,stageTitle:section.title,source:guide.source,prototype:b.cardId,officialRecipeId:b.recipeId,ingredients:b.batch.ingredients,outputs:[],conditions:[],method:'Партия игрока',steps:b.paragraphs.flatMap(p=>p.split(/(?<=[.!?])\s+(?=[А-ЯЁ])/u)),yieldText:b.batch.yieldText,note:b.batch.note})));
fs.writeFileSync(path.join(__dirname,'player-guides.js'),'// Structured from the supplied player guide; not game prototype data.\nwindow.PLAYER_GUIDES = '+JSON.stringify([guide],null,2)+';\nwindow.PLAYER_RECIPES = '+JSON.stringify(cards,null,2)+';\n');
console.log(`Imported ${stock.length} stock entries, ${sections.length} sections, ${sections.reduce((n,s)=>n+s.blocks.length,0)} blocks.`);
