const express=require('express');
const bodyParser=require('body-parser');

const app=express();
app.use(bodyParser.json());
var fs = require('fs');
app.get("/",function(req,res){
  var eta=0.5;
  var u= 1;
  var h_initial=10;
  var v_sq= 2*10*h_initial;
  var v=Math.sqrt(v_sq);
  var t_initial= Math.sqrt((2*h_initial)/10);
  var s_initial=u*t_initial;
  var horizontal=u*t;
  var data=[];
  var h=h_initial;
  var t=t_initial;
  var s=s_initial;
  data.push({
    x_cord:s_initial,
    y_cord:h_initial,
    time:t_initial

  });
var count =1;
  while(h > 0.000000001){
    h=eta*eta*h;
    t=2*eta*t;
    s=s+u*eta*t;
    count=count+1;
    data.push({
      x_cord:s,
      y_cord:h,
      time:t

    });


  }
  var result={
    data_total:data,
    count_total:count
  }


res.json(result);
});
app.post('/',function(req,res){
console.log(req.body);

  var eta=req.body.eta;
  var u= req.body.initial_v;
  var h_initial=req.body.initial_h;
  var v_sq= 2*10*h_initial;
  var v=Math.sqrt(v_sq);
  var t_initial= Math.sqrt((2*h_initial)/10);
  var s_initial=u*t_initial;
  var horizontal=u*t;
  var data=[];
  var h=h_initial;
  var t=t_initial;
  var s=s_initial;
  data.push({
    x_cord:s_initial,
    y_cord:h_initial,
    time:t_initial

  });
var count =1;
  while(h > 0.000000001){
    h=eta*eta*h;
    t=2*eta*t;
    s=s+u*eta*t;
    count=count+1;
    data.push({
      x_cord:s,
      y_cord:h,
      time:t

    });


  }
  var result={
    data_total:data,
    count_total:count
  }
fs.writeFile('data.json',result,finished);
function finished(error){
  console.log(error);
}

res.send(result);

});
app.get('/about',function(req,res){
  res.send('this si about hotel ');
});
app.listen(3000,function(){
    console.log('server started on port 3000');
})
