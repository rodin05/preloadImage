/*
arr, //必传图片地址数组array格式
need, //可不填是否需要用百分比显示加载进程true或者false
fn //可不传，此为加载完毕后的回调函数function格式
*/
function imgLazyLoad(obj){

    this.arr = obj.arr;
    this.len = this.arr.length;
    this.oImg = new Image();
    this.need = obj.need || false;
    this.fn = obj.fn||null;

    this.init();
}

imgLazyLoad.prototype.init = function(){

    this.pNode = document.createElement('div');
    this.node = document.createElement('p');
    this.node.innerHTML = '0%';

    this.pNode.style.cssText = 'width:100%;position:absolute;left:0;top:0;bottom:0;z-index:999;display:flex; justify-content: center; align-items: center; background:rgba(0,0,0,0.5);';
    this.node.style.fontSize = '50px';
    this.node.style.color = '#fff';

    if(!this.need) this.pNode.style.display='none';
    
    this.pNode.appendChild(this.node);
    document.body.appendChild(this.pNode);

    this.onload();

}

imgLazyLoad.prototype.onload = function(){

    if(!this.arr.length){
        
        this.node.innerHTML = '100%';
        this.pNode.style.display = 'none';
        this.fn && this.fn();
        return;

    } 

    var _this = this;

    this.oImg.src = this.arr[0];
    this.oImg.onload = function(){
      
        _this.arr.splice(0,1);
        _this.node.innerHTML = Math.floor(100 - (_this.arr.length/_this.len)*100) + '%';
        _this.onload(_this.arr);

    }
    
}
