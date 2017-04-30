# vquery


### 了解jquery的$选择符

```js
$(function(){
    $('#btn').click(function(){
        alert($(this).value);
    })
})
```

* $后面因为能直接跟（），就说明$其实就是一个函数；
* 从上面的代码中可以看出，函数$至少可以接收三种参数：
    + 函数
    + 对象 this
    + 字符串：id选择器'#btn'、类选择器'.btn'、标签选择器'button'

### 封装vquery

> 注释1: vquery是面向对象实现的，所以要写一个构造函数，构造函数可以接收上面提到的三种参数，一般来说若函数接受的参数为obj则用oArg，若接受的参数为字符串则用sArg，若接受的参数为function则用fnArg表示，但这三种都不合适，此处用到一种表示vArg，即变量参数可以表示一切参数类型；

> 注释2：jquery的特性：平常我们在使用jquey时，都是同时写好几个, 事件队列是jquery的特性之一；

> 注释3：jquery选择器的含义：$('.div') 选择符本身不会对选择对象做任何操作；真正对对象执行操作的是，选择符后面的方法，执行不同的方法，就会对选择符进行不同的操作；**选择器本身就是去选择元素** 
```js
    //导航栏
    $(function(){
        ....
    })
    //轮播图
    $(function(){

    })
    //幻灯片
    $(function(){

    })
```

```js
    //1.参数的命名规范，见上注释；
    function Vquery (vArg){

        // 步骤4一部分 作为容器，盛放呗选择器选中的元素；
        this.elements = [];
        
        //2.选择器要**根据传进来参数的不同，去做不同的事情**,所以第一步应该对传进来的vArg做类型判别；
        switch(typeof vArg){
            case 'function':
            //---out-of-date-window.onload = vArg;----
            // 3. 若expressing vArg的值是一个function,则将function作为一个事件处理程序，利用DOM0级，绑定到window的时间处理程序属性onload上面，这样当页面加载完毕之后，就会触发onload事件，从而执行vArg函数；
            /*  html页面中
                new Vqery(function(){
                    alert('a');
                })
                类似于jquey中：
                $(function(){
                    alert('a');
                })
            */
            //   - 这里有一个问题,利用DOM0级事件处理程序，无法为同一个对象的同一个属性绑定多个事件处理函数，即无法做到下面这样： 参见注释2：jquery的特性
            /*
                new Vquery(function(){
                    alert('导航栏区域');
                })
                new Vquery(function(){
                    alert('幻灯片区域');
                }) 
            */
            //解决的办法是利用DOM2级事件处理程序，进行事件绑定,以实现添加多个事件处理函数的目的;
            //由于浏览器之间兼容能力的不同，此处使用能够隔离浏览器差异的js库；
            //利用js库，将函数vArg绑定到window对象的load事件属性上；
            myAddEvent(window,load,vArg);
            break;
            //=============================================================================

            //4. 当typeof vArg的值为string时
            //  - 此时又会分三种情况：'#id' '.class' 'tagName'
            //  - 即可以通过字符串的第一个字符，而判断出三种情形，然后针对不同的情形，给出不同的处理方式；
            
            //  - 当vArg为string时，new Vquery(string) 充当的就是选择器的功能了；类似于$('#btn');参考注释3，选择器本事不会对元素进行任何的操作，其仅仅是用来选择元素，所以此处我们定义一个属性this.element = []; 作为一个容器，用来存放被选中的元素；
            case 'string':
                switch(vArg.charat()){
                 
                    case '#': //ID
                       // 4.1 以ID去选中元素，并将元素放到elements中间去；直接将vArg放到getElementById()肯定是不可以的，因为不能带有'#';
                        var obj = document.getElementById(vArg.substring(1));
                        this.elements.push(obj);
                        break;
                    case '.': //class
                        // 4.2 用class去选中元素，与上面的步骤一样，只不过业务实现上，要用到getByClass库；
                        break;
                    default : //tagName

                }
                break; 
        }
    }

    // 库一： 能够隔离浏览器差异的DOM2级，事件绑定库；
    //    - 原理是使用，浏览器的能力检测；
    function myAddEvent(obj,sEv,fn){
        if(obj.attachEvent){
            obj.attachEvent('on'+sEv,fn);
        }else{
            obj.addEventListener(sEv,fn,false);
        }
    }

    // 库二： getByClass

    function getByClass(oParent,sClass){
        // 获取所有
        var aEle = oParent.getElementByTagName('*');
        var aResult = [];
        var i = 0;
        //逐一比对
        for (i=0; i<aEle.length; i++){
            if(aEle[i].className == sclass){
                aResult.push(aEle[i]);
            }
        }
        //结构返回
        return aResult;
    }

    
      
```