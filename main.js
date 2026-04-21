class onderdeel{
    constructor(kleur){
        this.c= kleur;
        this.x= "width:100px";
        this.y= "height:100px";
    }
    static Generate(){
        let r = new Array;
        for(let i = 0; i < 10;i++){
            let a; 
            if(i%2 == 0){
                 a = new onderdeel("groen");
            }else{
                 a = new onderdeel("rood");
            }
            r[i] = a;
        }
        return r
    }
}


let a = onderdeel.Generate();
for(let i = 0; i < 10;i++){
        document.body.innerHTML += "<div class='"+a[i].c+"' style='"+a[i].x + "; "+a[i].y +"'></div>";
}