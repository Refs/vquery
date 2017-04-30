function Vquery(vArg){
    switch (typeof vArg){
        case 'function':
        // window.onload = vArg;
        myAddEvent(window,'load',vArg);
        break;
    }
}
function myAddEvent(obj,sEv,fn){
    if(obj.attachEvent){
        obj.attachEvent('on'+sEv,fn);
    }else{
        obj.addEventListener(sEv,fn,false);
    }
}