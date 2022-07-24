const resultBlock = document.querySelector(".result");
let filterList = [];
let paddingBlock = 5.5;

function getInfo(){
    fetch('./data.json')
    .then((response) => {
        response.json()
        .then(result => {
            insertData(result);
        })
    })
}

function filterAdd(obj){
    if(!filterList.includes(obj)){
        if(filterList.length === 0){
            document.querySelector(".filter").style.display = "flex";
            document.getElementById(`filter__${obj}`).style.display = "flex";
            document.querySelector(".result").style.paddingTop = '5.5rem';
            filterList.push(obj);
        }else{
            if(filterList.length % 2 === 0){
                paddingBlock += 3;
                document.querySelector(".result").style.paddingTop = `${paddingBlock}rem`;
                document.getElementById(`filter__${obj}`).style.display = "flex";
                filterList.push(obj);
            }else{
                document.getElementById(`filter__${obj}`).style.display = "flex";
                filterList.push(obj);
            }
        }
    }
    hideBlock(obj)
}

function hideBlock(l){
    let n = 1;
    while(n < 11){
        let blockCheck = '';
        for(let i = 0; i < document.getElementById(n).children[1].children[0].children.length; i++){
            if(document.getElementById(n).children[1].children[0].children[i].classList.value === l){
                blockCheck+='+'
            }else{
                blockCheck+='-'
            }
        }
        console.log(document.getElementById(n).children[1].children[0].children[0])
        if(!blockCheck.includes('+')){
            document.getElementById(n).style.display = 'none';
        }
        n++; 
        blockCheck = '';
    }
}

function clearButton(){
    console.log(document.querySelector('.filter__list').children)
    let l = 0;
    let n = 1;

    while(l < 16){
        if(n < 11){
            document.getElementById(n).style.display = 'grid';
            document.querySelector('.filter__list').children[l].style.display = 'none';
            n++;
            l++;
        }else{
            document.querySelector('.filter__list').children[l].style.display = 'none';
            l++;
        }
    }
document.querySelector(".filter").style.display = 'none';
document.querySelector('.result').style.paddingTop =  '3.5rem';
}

function deleteFilter(o){
    let n = 1;
    let tempList = [];
    filterList.forEach(block => {
        console.log(block)
        if(`filter__${block}` !== o){
            tempList.push(block);
        }
    })
    filterList = tempList;
    while(n < 11){
        filterList.forEach(block => {
            let tempresp = '';
            for(let o = 0; o < document.getElementById(n).children[1].children[0].children.length; o++){
                if(document.getElementById(n).children[1].children[0].children[o].classList.value === block){
                    tempresp += '+';
                }else{
                    tempresp += '-';
                }
            }
            if(document.getElementById(n).style.display === 'none'){
                if(tempresp.includes('+')){
                    document.getElementById(n).style.display = 'grid';
                }
            }
            
            tempresp = '';
        })
        n++;
    }
    document.getElementById(o).style.display = 'none';
    if(filterList.length === 0){
        document.querySelector(".filter").style.display = 'none';
        document.querySelector('.result').style.paddingTop =  '3.5rem';
        for(let u = 1; u < 11; u++) {
            document.getElementById(u).style.display = 'grid';
        }
    }else{
        if(filterList.length % 2 === 0){
            paddingBlock -= 3;
            document.querySelector(".result").style.paddingTop = `${paddingBlock}rem`;
        }
    }
}

function insertData(data){
    data.forEach(dataBlock => {
        let languages = '';
        let tools = '';
        dataBlock.languages.forEach(language => {
            switch(language){
                case "HTML":
                    languages += `<li class="html" onclick="filterAdd('html')">${language}</li>`;
                    break;
                case "CSS":
                    languages += `<li class="css" onclick="filterAdd('css')">${language}</li>`;
                    break;
                case "JavaScript":
                    languages += `<li class="js" onclick="filterAdd('js')">${language}</li>`;
                    break;
                case "Python":
                    languages += `<li class="python" onclick="filterAdd('python')">${language}</li>`;
                    break;
                case "Ruby":
                    languages += `<li class="ruby" onclick="filterAdd('ruby')">${language}</li>`;
                    break;
            }
        })
        dataBlock.tools.forEach(tool => {
            switch(tool){
                case "React":
                    tools += `<li class="react" onclick="filterAdd('react')">${tool}</li>`;
                    break;
                case "Sass":
                    tools += `<li class="sass" onclick="filterAdd('sass')">${tool}</li>`;
                    break;
                case "Ruby":
                    tools += `<li class="ruby" onclick="filterAdd('ruby')">${tool}</li>`;
                    break;
                case "RoR":
                    tools += `<li class="ror" onclick="filterAdd('ror')">${tool}</li>`;
                    break;
                case "Vue":
                    tools += `<li class="vue" onclick="filterAdd('vue')">${tool}</li>`;
                    break;
                case "Django":
                    tools += `<li class="django" onclick="filterAdd('django')">${tool}</li>`;
                    break;
            }
        })
            
        resultBlock.innerHTML += (
            `
                <div class="result__block ${dataBlock.new ? 'includeNew' : ''}" id="${dataBlock.id}">
                    <div class="result__block__head">
                        <div class="result__block__head__img">
                            <img src="${dataBlock.logo}" alt="Logo iamge">
                        </div>
                        <div class="result__block__head__block">
                            <div class="result__block__head__name">
                                <p class="company-name">${dataBlock.company}</p>
                                <div class="result__block__head__name__additional">
                                    <p class="${dataBlock.new ? "new-block" : ""}">${dataBlock.new ? 'NEW!' : ''}</p>
                                    <p class="${dataBlock.featured ? 'featured-block' : ''}">${dataBlock.featured ? 'FEATURED' : ''}</p>
                                </div>
                            </div>
                            <div>
                                <div class="result__block__head__specialization">
                                    <p>${dataBlock.position}</p>
                                </div>
                                <div class="result__block__head__preference">
                                    <ul class="result__block__head__preference__list">
                                        <li id="posted">${dataBlock.postedAt}</li>
                                        <li>${dataBlock.contract}</li>
                                        <li>${dataBlock.location}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="result__block__bottom">
                        <ul class="result__block__bottom__list">
                            <li class="${dataBlock.role.toLowerCase()}" onclick="filterAdd('${dataBlock.role.toLowerCase()}')">${dataBlock.role}</li>
                            <li class="${dataBlock.level.toLowerCase()}" onclick="filterAdd('${dataBlock.level.toLowerCase()}')">${dataBlock.level}</li>
                            ${languages}
                            ${tools}
                        </ul>
                    </div>
                </div>
            `
        )
    })
}