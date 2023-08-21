import { fisicaData } from "./fisica.js";


import {queryCache, selectedNode, vGraph,linkCache} from './DataHandler.js'
import { update } from "./force_directed_graph.js";
import {directTree,reverseTree} from './collapsibleIndentTree.js'
import {quantityTree} from './quantityTree.js'
import {resourcesTree} from './resourcesTree.js'

const fisica= document.getElementById('fisicaExample'),
    resultsContainer = document.getElementById("result"),
    reverseContainer = document.getElementById("reverse"),
    imgContainer = document.getElementById("img"),
    quantityContainer=document.getElementById("quantity"),
    resourcesContainer=document.getElementById("resources")

fisica.onclick=function(){
    console.log("fisica");
    showExample(fisicaData);
}

function showExample(json){
    vGraph.data={"nodes":[],"links":[]};
    vGraph.data.nodes=json.vGraph.nodes;
    linkCache.data={};
    json.vGraph.links.forEach(element => {
        linkCache.data[element.source.wid+element.target.wid]=element.target.wid;
        vGraph.pushLink({"source":vGraph.data.nodes[element.source.index],"target":vGraph.data.nodes[element.target.index],"weight":1,name:element.name})
    });

    queryCache.data=json.queryCache;
    const item=vGraph.data.nodes[0];
    selectedNode.value=item;
    if(resultsContainer.hasChildNodes()){
        resultsContainer.removeChild(resultsContainer.lastChild);
        quantityContainer.removeChild(quantityContainer.lastChild);
        resourcesContainer.removeChild(resourcesContainer.lastChild);
        reverseContainer.removeChild(reverseContainer.lastChild);
    }
    update(vGraph.data);
    resultsContainer.appendChild(directTree.restart(queryCache.data[item.wid].direct.root));
    reverseContainer.appendChild(reverseTree.restart(queryCache.data[item.wid].reverse.root));
    quantityContainer.appendChild(quantityTree(queryCache.data[item.wid].quantity.root));
    resources.appendChild(resourcesTree(queryCache.data[item.wid].resources.root));
    imgContainer.src=queryCache.data[item.wid].img; 
    document.getElementById('description').textContent=queryCache.data[item.wid].description;
    document.getElementById('wikilink').href =queryCache.data[item.wid].article;
    languageSelector.value = json.language;
    
    exampleModal.style.display="none"; 

}