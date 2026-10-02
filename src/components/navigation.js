(()=>{
  'use strict';
  const pages={recipes:{section:'catalog',workspace:true},medical:{section:'medical'},botany:{section:'botany',workspace:true},scientist:{section:'scientist'},engineering:{section:'engineering'},players:{section:'players',workspace:true},security:{section:'security'}};
  function mount({onWorkspaceVisible=()=>{}}={}){
    function show(page){const current=pages[page];if(!current)return;
      for(const [id,config] of Object.entries(pages)){document.getElementById(config.section).hidden=id!==page;document.getElementById('tab-'+id).setAttribute('aria-pressed',String(id===page));}
      for(const selector of ['.workspace','.workspace-heading','#workspace-jump'])document.querySelector(selector).hidden=!current.workspace;
      if(current.workspace)onWorkspaceVisible();
    }
    for(const id of Object.keys(pages))document.getElementById('tab-'+id).addEventListener('click',()=>show(id));
    return {show};
  }
  window.WorkbenchNavigation={mount};
})();
