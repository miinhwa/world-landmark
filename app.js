const appRoot = document.documentElement;
const canvas = document.getElementById('canvas');
const paletteButtons = Array.from(document.querySelectorAll('.block[data-type]'));
const themeSelect = document.getElementById('themeSelect');
const fontSelect = document.getElementById('fontSelect');
const radiusRange = document.getElementById('radiusRange');
const gridToggle = document.getElementById('gridToggle');
const exportBtn = document.getElementById('exportBtn');
const clearBtn = document.getElementById('clearBtn');

function applyTheme(theme){
    appRoot.classList.remove('theme-aurora','theme-sunset','theme-ocean','theme-forest','theme-mono');
    appRoot.classList.add(`theme-${theme}`);
}

function applyFont(font){
    document.body.style.fontFamily = `${font}, Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Playfair Display", sans-serif`;
}

function applyRadius(value){
    document.documentElement.style.setProperty('--radius', `${value}px`);
}

function toggleGrid(enabled){
    canvas.classList.toggle('grid-off', !enabled);
}

function bindBlockControls(block){
    const moveButtons = block.querySelectorAll('[data-move]');
    const delBtn = block.querySelector('[data-del]');
    const dupBtn = block.querySelector('[data-dup]');
    moveButtons.forEach(btn=>{
        btn.addEventListener('click', ()=>{
            const dir = btn.getAttribute('data-move');
            if(dir === 'up' && block.previousElementSibling){
                canvas.insertBefore(block, block.previousElementSibling);
            }else if(dir === 'down' && block.nextElementSibling){
                canvas.insertBefore(block.nextElementSibling, block);
            }
            toggleEmptyHint();
        })
    })
    delBtn?.addEventListener('click', ()=>{ block.remove(); toggleEmptyHint(); })
    dupBtn?.addEventListener('click', ()=>{
        const clone = block.cloneNode(true);
        canvas.insertBefore(clone, block.nextElementSibling);
        bindBlockControls(clone);
        toggleEmptyHint();
    })
}

function createBlock(type){
    const tpl = document.getElementById(`tpl-${type}`);
    const node = tpl.content.firstElementChild.cloneNode(true);
    if(type==='footer'){
        const yearSpan = node.querySelector('.year');
        if(yearSpan){ yearSpan.textContent = new Date().getFullYear(); }
    }
    bindBlockControls(node);
    canvas.appendChild(node);
    toggleEmptyHint();
    node.scrollIntoView({behavior:'smooth', block:'center'});
}

function toggleEmptyHint(){
    const hasBlocks = canvas.querySelectorAll('section, footer').length > 0;
    canvas.querySelector('.empty-hint')?.classList.toggle('hidden', hasBlocks);
}

paletteButtons.forEach(btn=>{
    btn.addEventListener('click', ()=> createBlock(btn.dataset.type));
})

themeSelect.addEventListener('change', (e)=> applyTheme(e.target.value));
fontSelect.addEventListener('change', (e)=> applyFont(e.target.value));
radiusRange.addEventListener('input', (e)=> applyRadius(e.target.value));
gridToggle.addEventListener('change', (e)=> toggleGrid(e.target.checked));

clearBtn.addEventListener('click', ()=>{
    if(confirm('Очистить холст?')){
        canvas.querySelectorAll('section, footer').forEach(n=>n.remove());
        toggleEmptyHint();
    }
})

exportBtn.addEventListener('click', ()=>{
    const cloned = document.documentElement.cloneNode(true);
    // Remove controls and scripts
    cloned.querySelectorAll('.b-controls').forEach(n=>n.remove());
    cloned.querySelectorAll('script').forEach(n=>n.remove());
    // Remove builder-only UI
    cloned.querySelectorAll('.sidebar, .empty-hint').forEach(n=>n.remove());
    // Expand stage to pure content
    const mainStage = cloned.querySelector('.stage');
    const canvasClone = cloned.getElementById('canvas');
    if(mainStage && canvasClone){
        mainStage.outerHTML = canvasClone.innerHTML;
    }
    // Tweak title
    const title = cloned.querySelector('title');
    if(title){ title.textContent = 'Мой сайт'; }

    const html = '<!DOCTYPE html>\n' + cloned.outerHTML;
    const blob = new Blob([html], {type:'text/html'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'site.html';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
})

// defaults
applyTheme('aurora');
applyRadius(14);
toggleGrid(true);


