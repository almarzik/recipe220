(function(scope){
  const groups=['Завтраки','Супы','Салаты','Основные блюда','Паста','Пицца','Пироги','Хлеб и выпечка','Десерты','Торты','Батончики и печенье'];
  const utensils=new Set(['FoodBowlBig','FoodPlateMuffinTin','FoodPlateTin','FoodPlate','FoodPlateSmall','FoodKebabSkewer'].map(id=>'entity:'+id));
  function produceOptions(data){
    return [...new Map(data.botany.plants.flatMap(p=>p.products).filter(p=>p.key.startsWith('entity:Food')&&p.key!=='entity:FoodEgg').map(p=>[p.key,p])).values()].sort((a,b)=>a.name.localeCompare(b.name,'ru'));
  }
  // ChefvendInventory: Resources/Prototypes/Catalog/VendingMachines/Inventories/chefvend.yml.
  // Container contents: Food/ingredients.yml, Food/Containers/condiments.yml and Drinks/drinks-cartons.yml.
  const chefStock=[
    ['ReagentContainerFlour','Мука','reagent:Flour'],['ReagentContainerCornmeal','Кукурузная мука','reagent:Cornmeal'],
    ['ReagentContainerSugar','Сахар','reagent:Sugar'],['ReagentContainerRice','Рис','reagent:Rice'],
    ['FoodShakerSalt','Соль','reagent:TableSalt'],['FoodCondimentBottleEnzyme','Универсальный фермент','reagent:Enzyme'],
    ['FoodCondimentBottleHotsauce','Острый соус','reagent:Hotsauce'],['FoodCondimentBottleKetchup','Кетчуп','reagent:Ketchup'],
    ['FoodCondimentBottleBBQ','Соус барбекю','reagent:BbqSauce'],['FoodCondimentBottleVinegar','Уксус','reagent:Vinegar'],
    ['ReagentContainerOliveoil','Оливковое масло','reagent:OilOlive'],['ReagentContainerMayo','Майонез','reagent:Mayo'],
    ['FoodContainerEgg','Яйца','entity:FoodEgg','reagent:Egg'],['DrinkMilkCarton','Молоко','reagent:Milk'],
    ['DrinkSoyMilkCarton','Соевое молоко','reagent:MilkSoy'],['FoodButter','Сливочное масло'],['FoodCheese','Сыр'],
    ['FoodMeat','Мясо'],['FoodCataria','Кошачья мята'],['VariantCubeBox','Коробка животных кубиков (без автоматического учёта мяса)']
  ].map(([id,name,...grants])=>({key:'stock:'+id,name,group:'ШефВенд',grants:['entity:'+id,...grants]}));
  function stockOptions(data){
    const options=[...chefStock,
      {key:'animal:goat',name:'Коза — козье молоко; после разделки — мясо',group:'Животные',grants:['reagent:MilkGoat','entity:FoodMeat']},
      {key:'animal:pig',name:'Свинья — бекон после разделки',group:'Животные',grants:['entity:FoodMeatBacon']},
      ...produceOptions(data).map(p=>({...p,group:'Ботаника',grants:[p.key]}))];
    const covered=new Set(options.flatMap(p=>p.grants));
    const produced=new Set(data.recipes.flatMap(r=>r.outputs.map(o=>o.key)));
    for(const r of data.recipes.filter(r=>r.category==='food'))for(const i of r.ingredients){
      if(covered.has(i.key)||i.key==='reagent:Water'||utensils.has(i.key))continue;
      if(!(i.key.startsWith('reagent:')||i.key.startsWith('entity:')&&!produced.has(i.key)))continue;
      options.push({key:i.key,name:i.name,group:'Другие продукты',grants:[i.key]});covered.add(i.key);
    }
    return options;
  }
  function stockFilter(data,selected){return produceFilter(data,selected,true);}
  function produceFilter(data,selected,strict=false){
    const crops=new Set(produceOptions(data).map(p=>p.key)),available=new Set(selected),producers=new Map();
    if(strict)for(const option of stockOptions(data))if(available.has(option.key))option.grants.forEach(key=>available.add(key));
    // Pantry staples can be obtained without growing plants. Juices and food preparations cannot.
    const pantry=new Set([...data.baseReagents,'Flour','Sugar','Rice','Water','Milk','SoyMilk','Cream','TableSalt','Egg','OilOlive','Oil','Cornmeal','Chocolate','Enzyme','Blackpepper','Vinegar'].map(id=>'reagent:'+id));
    for(const r of data.recipes){
      if(!(r.category==='food'||r.id.startsWith('juice:')||r.id.startsWith('slice:')||r.id.startsWith('grind:')))continue;
      for(const o of r.outputs){
        // Extraction of generic chemicals (blood, nutriment, etc.) is not a crop requirement.
        if(/^(juice|grind):/.test(r.id)&&o.key.startsWith('reagent:')&&!/^reagent:(Juice|CapsaicinOil$|CocoaPowder$)/.test(o.key))continue;
        if(!producers.has(o.key))producers.set(o.key,[]);producers.get(o.key).push(r);
      }
    }
    function ingredient(key,path){
      if(strict&&utensils.has(key))return {ok:true,used:false};
      if(strict&&available.has(key))return {ok:true,used:true};
      if(crops.has(key))return {ok:available.has(key),used:available.has(key)};
      if(strict?key==='reagent:Water':pantry.has(key))return {ok:true,used:false};
      if(path.has(key))return {ok:false,used:false};
      const variants=producers.get(key);
      if(!variants?.length)return {ok:!strict,used:false};
      const next=new Set(path);next.add(key);
      const results=variants.map(r=>combine(r.ingredients,next));
      return results.find(r=>r.ok&&r.used)||results.find(r=>r.ok)||{ok:false,used:false};
    }
    function combine(ingredients,path){
      let used=false;
      for(const i of ingredients){const result=ingredient(i.key,path);if(!result.ok)return {ok:false,used:false};used ||= result.used;}
      return {ok:true,used};
    }
    return r=>{const result=combine(r.ingredients,new Set(r.outputs.map(o=>o.key)));return result.ok&&result.used;};
  }
  function pickMenu(recipes,count=10,existingOutputs=[],random=Math.random,filter=()=>true){
    const used=new Set(existingOutputs),chosen=[];
    const eligible=recipes.filter(r=>r.category==='food'&&r.id.startsWith('microwave:')&&groups.includes(r.group)&&!r.note&&r.outputs[0]?.key.startsWith('entity:Food')&&filter(r));
    const shuffled=items=>{const copy=[...items];for(let i=copy.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;};
    function take(pool){for(const r of shuffled(pool)){const key=r.outputs[0].key;if(used.has(key))continue;chosen.push(r);used.add(key);return;}}
    for(const group of shuffled(groups)){if(chosen.length>=count)break;take(eligible.filter(r=>r.group===group));}
    while(chosen.length<count){const before=chosen.length;take(eligible);if(chosen.length===before)break;}
    return chosen;
  }
  scope.ChefMenu={pickMenu,produceOptions,produceFilter,stockOptions,stockFilter};
})(typeof module==='object'&&module.exports?module.exports:window);
