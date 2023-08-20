(function () {
  let btnAddFolder = document.querySelector("#addFolder");
  let divbreadcrumb = document.querySelector("#breadcrumb");
  let aRootPath = document.querySelector("a[purpose ='path']");
  let btnAddTextFile = document.querySelector("#addTextFile");
  let divContainer = document.querySelector("#container");
  let templates = document.querySelector("#templates");
  let divApp = document.querySelector("#app");
  let divAppTitleBar = document.querySelector("#app-title-bar");
  let divAppTitle = document.querySelector("#app-title");
  let divAppMenuBar = document.querySelector("#app-menu-bar");
  let divAppBody = document.querySelector("#app-body");
  let resources = [];
  let cfid = -1;
  let rid = 0;
  btnAddFolder.addEventListener("click", addFolder);
  btnAddTextFile.addEventListener("click", addTextFile);
  aRootPath.addEventListener("click", viewFolderFromPath);

  function addFolder() {
    let rname = prompt("Enter folder name");
    if (!rname) {
      //empty name validation
      alert("Empty name is not allowed.");
      return;
    }
    rname = rname.trim();
    //uniqueness validation
    let alreadyExists = resources.some(
      (r) => r.rname == rname && r.pid == cfid
    );
    if (alreadyExists == true) {
      alert(rname + " is already in use . Try some other name");
      return;
    }
    let pid = cfid;
    rid++;
    addFolderHTML(rname, rid, pid);
    resources.push({
      rid: rid,
      rname: rname,
      rtype: "folder",
      pid: cfid,
    });

    saveToStorage();
  }

  function addTextFile(){
    let rname = prompt("Enter folder name");
    if (!rname) {
      //empty name validation
      alert("Empty name is not allowed.");
      return;
    }
    rname = rname.trim();
    //uniqueness validation
    let alreadyExists = resources.some(
      (r) => r.rname == rname && r.pid == cfid
    );
    if (alreadyExists == true) {
      alert(rname + " is already in use . Try some other name");
      return;
    }
    let pid = cfid;
    rid++;
    addTextFileHTML(rname, rid, pid);
    resources.push({
      rid: rid,
      rname: rname,
      rtype: "text-file",
      pid: cfid,
    });

    saveToStorage();
  }
  function addFolderHTML(rname, rid, pid) {
    let divFolderTemplate = templates.content.querySelector(".folder");
    let divFolder = document.importNode(divFolderTemplate, true);

    let spanRename = divFolder.querySelector("[action=rename");
    let spanDelete = divFolder.querySelector("[action=delete");
    let spanView = divFolder.querySelector("[action=view");
    let divName = divFolder.querySelector("[purpose=name]");

    spanRename.addEventListener("click", renameFolder);
    spanDelete.addEventListener("click", deleteFolder);
    spanView.addEventListener("click", viewFolder);
    divName.innerHTML = rname;
    divFolder.setAttribute("rid", rid);
    divFolder.setAttribute("pid", pid);
    divContainer.appendChild(divFolder);
  }

  function addTextFileHTML(rname, rid, pid) {
    let divTextFileTemplate = templates.content.querySelector(".text-file");
    let divTextFile = document.importNode(divTextFileTemplate, true);

    let spanRename = divTextFile.querySelector("[action=rename");
    let spanDelete = divTextFile.querySelector("[action=delete");
    let spanView = divTextFile.querySelector("[action=view");
    let divName =divTextFile.querySelector("[purpose=name]");

    spanRename.addEventListener("click", renameTextFile);
    spanDelete.addEventListener("click", deleteTextFile);
    spanView.addEventListener("click", viewTextFile);
    divName.innerHTML = rname;
    divTextFile.setAttribute("rid", rid);
    divTextFile.setAttribute("pid", pid);
    divContainer.appendChild(divTextFile);
   
    
  }

  function deleteFolder() {
   let spanDelete = this;
   let divFolder = spanDelete.parentNode;
    let divName = divFolder.querySelector("[purpose='name']");

    let fidTBD = parseInt(divFolder.getAttribute("rid"));
    let fname = divName.innerHTML;

    let sure = confirm(`Are you sure to delete ${fname} ?`);
    if(!sure) {
      return;
    }

    
   

    
    //delete from html
    divContainer.removeChild(divFolder);
    
    //delete from storage
    deleteHelper(fidTBD);
    // delete from ram
    saveToStorage();
  }
function deleteHelper(fidTBD){
  let children = resources.filter(f=> r.pid == fidTBD);
  for( let i =0; i < children.length; i++){
    deleteHelper(children[i].rid);
  }

  let ridx = resources.findIndex(r => r.rid == fid);
  console.log(resources[ridx].rname);
  resources.splice(ridx,1);
}

function deleteTextFile() {
  let spanDelete = this;
  let divTextFile = spanDelete.parentNode;
  let divName =divTextFile.querySelector("[purpose ='name']");
  
  let fidTBD = parseInt(divTextFile.getAttribute("rid"));
  let fname = divName.innerHTML;

  let sure = confirm(`Are you sure to dlete ${fname} ?`);
  if(!sure) {
    return
  }

  //html 
  divContainer.removeChild(divTextFile);

  let ridx = resources.findIndex( r=> r.id == fidTBD);
  resources.splice(ridx, 1);

  saveToStorage();
}


  function renameFolder() {
    let nrame = prompt("Enter new File name");
    if (nrame != null) {
      nrame = nrame.trim();
    }

    if (!nrame) {
      //empty validaton
      alert("Empty name is not allowed.");
      return;
    }

    let spanRename = this;
    let divFolder = spanRename.parentNode;
    let divName = divFolder.querySelector("[purpose=name]");
    let orname = divName.innerHTML;
    let ridTBU = parseInt(divFolder.getAttribute("rid"));
    if (nrame == orname) {
      alert("please enter a new name");
    }

    let alreadyExists = resources.some(
      (r) => r.rname == nrame && r.pid == cfid
    );
    if (alreadyExists == true) {
      alert(nrame + "already exists.");
      return;
    }

    //change html
    divName.innerHTML = nrame;
    //change ram
    let resource = resources.find((r) => r.rid == r.ridTBU);
    resource.name = rname;
    //change storage
    saveToStorage();
  }
  function renameTextFile() {

    let nrame = prompt("Enter folder name");
    if (nrame != null) {
      nrame = nrame.trim();
    }

    if (!nrame) {
      //empty validaton
      alert("Empty name is not allowed.");
      return;
    }

    let spanRename = this;
    let divFolder = spanRename.parentNode;
    let divName = divFolder.querySelector("[purpose=name]");
    let orname = divName.innerHTML;
    let ridTBU = parseInt(divFolder.getAttribute("rid"));
    if (nrame == orname) {
      alert("please enter a new name");
    }

    let alreadyExists = resources.some(
      (r) => r.rname == nrame && r.pid == cfid
    );
    if (alreadyExists == true) {
      alert(nrame + "already exists.");
      return;
    }

    //change html
    divName.innerHTML = nrame;
    //change ram
    let resource = resources.find((r) => r.rid == r.ridTBU);
    resource.name = rname;
    //change storage
    saveToStorage();
  }

  function viewFolderFromPath() {
    let aPath = this;
    let fid = parseInt(aPath.getAttribute("rid"));

    while (aPath.nextSibling) {
      aPath.parentNode.removeChild(aPath.nextSibling);
    }
    cfid = fid;
    divContainer.innerHTML = "";
    for (let i = 0; i < resources.length; i++) {
      if (resources[i].pid == cfid) {
        if( resources[i].rtype == "folder"){
          addFolderHTML(resources[i].rname, resources[i].rid, resources[i].pid);

        } else if(resources[i].rtype =="text-file"){
          addTextFileHTML(resources[i].rname, resources[i].rid, resources[i].pid);

        }
      }
  } }

  function viewFolder() {
    let spanView = this;
    let divFolder = spanView.parentNode;
    let divName = divFolder.querySelector("[purpose ='name']");

    let fname = divName.innerHTML;
    let fid = parseInt(divFolder.getAttribute("rid"));

    let apathTemplate = templates.content.querySelector("a[purpose='path']");
    let aPath = document.importNode(apathTemplate, true);

    aPath.innerHTML = fname;
    aPath.setAttribute("rid", fid);
    aPath.addEventListener("click", viewFolderFromPath);
    divbreadcrumb.appendChild(aPath);

    cfid = fid;
    divContainer.innerHTML = "";
    for (let i = 0; i < resources.length; i++) {
      if (resources[i].pid == cfid) {
        if( resources[i].rtype == "folder"){
          addFolderHTML(resources[i].rname, resources[i].rid, resources[i].pid);

        } else if(resources[i].rtype =="text-file"){
          addTextFileHTML(resources[i].rname, resources[i].rid, resources[i].pid);

        }
      }
     
     
    }for (let i = 0; i < resources.length; i++) {
      if (resources[i].pid == cfid) {
        if( resources[i].rtype == "folder"){
          addFolderHTML(resources[i].rname, resources[i].rid, resources[i].pid);

        } else if(resources[i].rtype =="file"){
          addTextFileHTML(resources[i].rname, resources[i].rid, resources[i].pid);

        }
      }
    }
  }
  

  function viewTextFile() {
    let spanView  = this;
    let divTextFile = spanView.parentNode;
    let divName= divTextFile.querySelector("[purpose=name]");
    let fname = divName.innerHTML;
    let fid = parseInt(divTextFile.getAttribute("rid"));

     let divNotePadMenuTemplate = templates.content.querySelector("[purpose=notepad-menu]");
    let divNotePadMenu= document.importNode(divNotePadMenuTemplate,true);

    divAppMenuBar.innerHTML="";
    divAppMenuBar.appendChild(divNotePadMenu);


    let divNotePadBodyTemplate =templates.content.querySelector("[purpose=notepad-body]");
    let divNotePadBody = document.importNode(divNotePadBodyTemplate,true);
    divAppBody.innerHTML="";
    
    divAppBody.appendChild(divNotePadBody);
    divAppTitle.innerHTML = fname;

    let inputBGColor =divAppMenuBar.querySelector("[action = bg-color]");
    let spanSave = divAppMenuBar.querySelector("[action=save]");
    let spanBold = divAppMenuBar.querySelector("[action=bold]");
    let spanItalic = divAppMenuBar.querySelector("[action=italic]");
    let spanUnderLine =divAppMenuBar.querySelector("[action=underline]");
  
    let inputTextColor = divAppMenuBar.querySelector("[action=fg-color]");
    let selectFontFamily = divAppMenuBar.querySelector("[action=font-family]");
    let selectFontSize = divAppMenuBar.querySelector("[action=font-size]");
    
    spanSave.addEventListener("click", saveNotepad);
    spanBold.addEventListener("click",makeNotepadBold);
    spanItalic.addEventListener("click",makeNotepadItalic);;
    spanItalic.addEventListener("click", makeNotepadUnderline);
    inputBGColor.addEventListener("change",changeNotepadBGColor);
     inputTextColor.addEventListener("change",changeNotepadTextColor);
    selectFontFamily.addEventListener("change",changeNotepadFontFamily);
    selectFontSize.addEventListener("change", changeNotepadFontsize);
    }

      function saveNotepad() {

      }
      function makeNotepadBold() {
        let textArea = divAppBody.querySelector("textArea");
        let isPressed = this.getAttribute("pressed") == "true";
        if(isPressed == false) {
          this.setAttribute("pressed", true);
          textArea.style.fontweight ="bold";
        }else {
          this.setAttribute("pressed" , false);
          textArea.style.fontweight ="normal";
        }
      }

      function makeNotepadItalic() {
        let textArea = divAppBody.querySelector("textArea");
        let isPressed = this.getAttribute("pressed") == "true";
        if(isPressed == false) {
          this.setAttribute("pressed", true);
          textArea.style.fontStyle ="italic";
        }else {
          this.setAttribute("pressed" , false);
          textArea.style.fontStyle ="normal";
        }
      }
      

      function makeNotepadUnderline() {
        let textArea = divAppBody.querySelector("textArea");
        let isPressed = this.getAttribute("pressed") == "true";
        if(isPressed == false) {
          this.setAttribute("pressed", true);
          textArea.style.fontStyle ="underline";
        }else {
          this.setAttribute("pressed" , false);
          textArea.style.fontStyle ="normal";
        }
      }
      
    function changeNotepadBGColor() {
      let color = this.value;
      let texArea = divAppBody.querySelector("textArea");
      texArea.style.backgroundColor = color;
    }

    function changeNotepadTextColor() {
      let color = this.value;
      let texArea = divAppBody.querySelector("textArea");
      texArea.style.color = color;
    }

    function changeNotepadFontsize(){
      let fontSize = this.value;
      let textArea = divAppBody.querySelector("textArea");
      textArea.style.fontSize= fontSize;
    }
    function  changeNotepadFontFamily(){
      let fontFamily= this.value;
      let textArea = divAppBody.querySelector("textArea");
      textArea.style.fontFamily= fontFamily;
    }

  function saveToStorage() {
    let rjson = JSON.stringify(resources);
    localStorage.setItem("data", rjson);
  } 

  function loadFromStorage() {
    let rjson = localStorage.getItem("data");
    if (!!rjson) {
      resources = JSON.parse(rjson);
      for (let i = 0; i < resources.length; i++) {
        if (resources[i].pid == cfid) {
          if( resources[i].rtype == "folder"){
            addFolderHTML(resources[i].rname, resources[i].rid, resources[i].pid);

          } else if(resources[i].rtype =="text-file"){
            addTextFileHTML(resources[i].rname, resources[i].rid, resources[i].pid);

          }
        }
        if (resources[i].rid > rid) {
          rid = resources[i].rid;
        }
      }
    }
  }
  loadFromStorage();
})();
 