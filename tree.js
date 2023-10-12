
let canvas = document.getElementById("canvas"); 
let context = canvas.getContext("2d");

let angleIncrement = (30*Math.PI)/180;
let startY = canvas.height;
let startX = canvas.width/2;

let height = (canvas.height*8)/24;

let thickness = 1;
let maxDepth = 5;
let count = 0;
let branchPropagation = 10;
let randomness = 10;
let drawLine = (x1,y1,x2,y2,thickness,color)=>{
    context.lineWidth = thickness;
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.closePath();
    context.stroke();
}

// drawLine(10,10,1000,1000,10,"black");

let drawBranch = (x,y,length,thickness,angle,depth)=>{
    if (depth>maxDepth) return;
    let endX = x-length*Math.sin(angle);
    let endY = y-length*Math.cos(angle);

    drawLine(x,y,endX,endY,thickness,"black");

    let newHeight = (length*8)/12;
    let newThickness = (thickness * 2)/3;
    let angleStart;
    // angleIncrement = Math.PI/(branchPropagation+1);

    if (branchPropagation % 2==0)
    {
        angleStart = angle - angleIncrement/2 - (Math.trunc(branchPropagation/2)-1)*angleIncrement;
    }
    else 
    {
        angleStart = angle - Math.trunc(branchPropagation/2)*angleIncrement;
    }

    for (let i=0;i<branchPropagation;i++)
    {
        drawBranch(endX,endY,newHeight,newThickness,angleStart+i*angleIncrement 
            // +((Math.random()-0.5)*randomness*Math.PI)/180
            ,depth+1);
    }
};

let createRect = (x,y,height,width,color)=>
{
    context.fillStyle = color;
    context.fillRect(x,y,width,height);
}
let drawTree = ()=>
{
    createRect(0,0,canvas.width,canvas.height,'#EEEEEE');
    // randomness-=0.1;
    angleIncrement-=0.005;
    drawBranch(startX,startY,height,thickness,0,Math.PI/2);
    requestAnimationFrame(drawTree);
}
drawTree();

