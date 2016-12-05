# rotatepic
this is a js plugin use html5 canvas to rorate pic
and needn't jquery
i found user css3 to rotate is slow so i write the plugin

#Demo
![alt tag](https://github.com/Javebean/rotatepic/blob/master/pic/rorate.gif)

#Usage
relax , it's very easy!

```javascript
 var rotate = new Rotate({
    	canvasHeight:500,
    	canvasWidth:300,
    	canvasBgcolor: '#fff',
    	canvasBorderWidth: '1px',
    	canvasBorderColor: 'red',
    	imageSrc:'pic/hah.png'
    });
    
    $("#clockwise").click(function(){ 
        rotate.clockwise();
    });

    $("#counterclockwise").click(function(){ 
        rotate.counterclockwise();
    });
```

