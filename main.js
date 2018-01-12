var target = "Michal Stachanczyk"

var population = ["QACSDFASFGREGTdsad", 
                  "ujsroaqFdsdREGocnw",
                  "fsdfrreWDASAWEdsaS",
                  "fgfdsdeWDASjgfdsaS",
                  "Stachanczyk Michal"];

var distance = function(a, b) {
  var minLength = Math.min(a.length, b.length)
  var maxLength = Math.max(a.length, b.length)

  var distance = 0;
  for (var i=0; i<minLength; i++) {
    var valA = a.charCodeAt(i);
    var valB = b.charCodeAt(i);
    distance += Math.abs(parseInt(valA) - parseInt(valB))
  }

  for (var i=0; i<maxLength-minLength; i++){
    distance += 255;
  }
  return distance;
}

var child = function (a, b) {  
  var mid = a.length / 2;

  var child = "";
  var i=0;
  for (; i<mid; i++) {
    child += a[i];
  }
  for (; i<b.length; i++) {
    if (b[i] == undefined) {
      console.log("ups")
    }
    child += b[i];
  }

  var randpos = Math.round(Math.random() * (a.length - 1.0));

  if (randpos > a.length - 1) {
    randpos = a.length - 1;
  }

  var newValue = child.charCodeAt(randpos) + (1.0 + Math.random() * 2.0);
  if (newValue < 32)
    newValue = 32;
  else if (newValue > 127)
    newValue = 127; 

  child[randpos] = String.fromCharCode(newValue);
  //console.log("Child: " + child + " [" + distance(child, target) + "]");

  return child;
}

var d = 1000;//distance(population[0], population[1]);

for (var g=0; g<1000; g++) {
  var childs = [];
  var weights = [];

  for (var j=0; j<population.length; j++) {
    for (var k=j+1; k<population.length; k++) {
      if (population[k] == undefined)
      {
        console.log("ups")
      }
      var c = child(population[j], population[k]);

      if (c == undefined) {
        console.log("undefijned child");
      }
      var weight = distance(target, c);
      //if (weight <= d) {
        if (childs.length > 0) {
          var wlen = weights.length;
          var added = false;
          for (var w=0; w<wlen;w++) {
            if (weight < weights[w] && !added) {
              weights.splice(w, 0, weight);
              childs.splice(w, 0, c);//{value: c, w: weight});
              added = true;
            }
          }
          if (!added) {
            childs.push(c)
            weights.push(weight)
          }
        } else {
          childs.push(c)
          weights.push(weight)
        }
      //}
    }
  }

  var popLen = Math.min(childs.length, 32);
  population = [];
  for (var s=0; s<popLen; s++) {
    population.push(childs[s]);
  }
  d = Math.min(d, weights[(popLen-1)]);
 
  console.log("Population count: " + population.length + " [" + g + ":" + d + "]")
}

//console.log("Distance: " + distance(population[0], population[1]))
//console.log("Child: " + child(population[0], population[1]))

