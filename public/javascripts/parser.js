function parseAndDisplay(Data){
    alert(Data)
    let container = document.querySelector('#techDetContainer');
    var text = document.createElement('div');
    var xmp = document.createElement('xmp');
    var list = document.createElement('li')

    let codeMode = false;
    let listMode = false;
    let textMode = true;
    
    for(var i = 0; i < Data.length; i++){
        //switching modes on off accordingly
        if(!codeMode && Data.charAt(i) == '#'){
            codeMode = true;
        }else if(codeMode && Data.charAt(i) == '#'){
            codeMode = false;;   
        }
      
        if(!listMode && Data.charAt(i) == '-'){
            listMode = true;
        }else if(listMode && Data.charAt(i) == '-'){
            listMode = false;
        }

        if(!codeMode && !listMode){
            textMode = true;
        }else{
            textMode = false;
        }
        //text mode
        if(textMode){
            if(Data.charAt(i) != '#' && Data.charAt(i) != '-'){
                text.textContent += Data.charAt(i);
            }
        }else{
                container.appendChild(text);
                var text = document.createElement('div');
        }

        //code Mode
        if(codeMode){
            if(Data.charAt(i) != '#'){
                xmp.textContent += Data.charAt(i);
            }
        }else{
                container.appendChild(xmp);
                var xmp = document.createElement('xmp');
        }

        //list Mode
        //text mode
        if(listMode && !codeMode){
            if(Data.charAt(i) != '-'){
                list.textContent += Data.charAt(i);
            }
        }else{
                container.appendChild(list);
                var list = document.createElement('li');
        }       
    }
    //remove empty list, xmp, and div from the document.
    document.querySelectorAll('li').forEach(function(node) {
        if(node.textContent == ''){
            node.parentElement.removeChild(node);
        }
    });

    document.querySelectorAll('div').forEach(function(node) {
        if(node.textContent == ''){
            node.parentElement.removeChild(node);
        }
    });

    document.querySelectorAll('xmp').forEach(function(node) {
        if(node.textContent == ''){
            node.parentElement.removeChild(node);
        }
    });
}

